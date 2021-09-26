import { URL } from "url";

import {Exercise} from './Exercise';
import {HasResourcesProvider} from './HasResourcesProvider';
import { join } from "path";
import {createNecessaryFolders} from '../../fs/persisterHelpers';
import {ResourceProvider} from './ResourceProvider';
import {FileDownloadResource} from '../../fs/FileDownloadResource';

export class Assignment implements HasResourcesProvider {

    constructor(
        readonly name: string,
        readonly exercise: Exercise,
        readonly properties: Array<AssignmentProperty>,
        readonly files = new Array<AssignmentFile>()
    ) {
        exercise.assignments.push(this);

        if (files.length === 0) {
            for (const {key, downloadLink} of this.properties) {
                if (downloadLink)
                    this.files.push(new AssignmentFile(key, downloadLink, this));
            }
        }
    }

    getNamedProperty(lookupKey: string): AssignmentProperty | undefined {
        for (const property of this.properties) {
            if (property.key === lookupKey)
                return property;
        }

        return undefined;
    }

    getResourcesProvider(): Array<ResourceProvider> {
        return this.files.map(file => file.getResourceProvider());
    }
}

export class AssignmentProperty {
    constructor(readonly key: string, readonly value: string, readonly downloadLink?: URL) {
    }
}

export class AssignmentFile {
    readonly assignmentFileType: AssignmentFileType;
    constructor(readonly filename: string, readonly downloadLink: URL, readonly assignment: Assignment) {
        this.assignmentFileType = AssignmentFile.getAssignmentFileTypeFromDownloadLink(downloadLink.toString());
    }

    static getAssignmentFileTypeFromDownloadLink (link: string): AssignmentFileType {
        if (link.includes('cmd=downloadFile'))
            return 'ass_given';
        else if (link.includes('cmd=downloadGlobalFeedbackFile'))
            return 'ass_feedback';

        return 'ass_feedback';
    }

    getResourceProvider(): FileDownloadResource {
        const exercise = this.assignment.exercise;
        return new FileDownloadResource(
            this.assignmentFileType,
            exercise.getRoot(),
            this.getSaveTo(),
            this.downloadLink.toString(),
            urlProvider => urlProvider.getGotoURL(exercise.type, exercise.refId)
        );
    }

    private getSaveTo() {
        return join(this.assignment.exercise.path, this.assignment.name, this.filename);
    }

    async persist(): Promise<void> {
        await createNecessaryFolders(this.getSaveTo());
    }
}

export type AssignmentFileType = 'ass_given' | 'ass_feedback' | 'ass_handin';

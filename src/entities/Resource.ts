import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn, Repository,
    UpdateDateColumn
} from 'typeorm';

import {RefType} from '../ilias/soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {RefObject} from './RefObject';
import {IRef} from '../ilias/models/IRef';
import {AssignmentFileType} from '../ilias/models/Assignment';

export class RootRefObject {
    @Column()
    readonly rootRefId: number;

    @Column()
    readonly rootRefName: string;

    constructor(rootRefId: number, rootRefName: string) {
        this.rootRefId = rootRefId;
        this.rootRefName = rootRefName;
    }
}

@Entity()
export class Resource {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    readonly type: ResourceType;

    @Column(() => RootRefObject)
    readonly rootRef: RootRefObject;

    @Column({ unique: true })
    readonly saveTo: string;

    // @OneToOne(() => RefObject, {
    //     nullable: true,
    //     cascade: true
    // })
    // readonly refObject: RefObject;

    // @OneToOne(() => RefObject, { nullable: true })
    // readonly parentRefObject: RefObject;

    @Column({ nullable: true })
    readonly downloadLink: string;

    @Column({ nullable: true })
    readonly targetLink: string;

    @Column({ default: 0 })
    fileSize: number;

    @Column({ default: 0 })
    fileVersion: number;

    @Column({ nullable: true })
    readonly hash: string;

    /**
     * In case the resource change, keep the previous resource, move it on the file system with an 'old' suffix.
     */
    @OneToOne(() => Resource, {
        nullable: true,
        cascade: true
    })
    @JoinColumn()
    readonly oldResource: Resource;

    @CreateDateColumn()
    readonly createdAt: Date;

    @UpdateDateColumn()
    readonly updatedAt: Date;

    @DeleteDateColumn()
    readonly deletedAt: Date;

    // TODO inject
    static repository: Repository<Resource>;

    constructor(type: ResourceType, rootRef: RootRefObject, saveTo: string, options?: ResourceOptions) {
        this.type = type;
        this.rootRef = rootRef;
        this.saveTo = saveTo;

        // this.refObject = options?.refObject;
        // this.parentRefObject = options?.parentRefObject;
        this.downloadLink = options?.downloadLink;
        this.targetLink = options?.targetLink;
        this.fileSize = options?.fileSize || 0;
        this.fileVersion = options?.fileVersion || 0;
        this.hash = options?.hash;
        this.oldResource = options?.oldResource;
    }
}

export interface ResourceOptions {
    // refObject?: RefObject,
    // parentRefObject?: RefObject,
    downloadLink?: string,
    targetLink?: string,
    fileSize?: number,
    fileVersion?: number,
    hash?: string,
    oldResource?: Resource,
}

export type ResourceType = RefType | AssignmentFileType | "video";

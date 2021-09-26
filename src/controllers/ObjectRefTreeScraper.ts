import {Exercise} from '../ilias/models/Exercise';
import {IRef} from '../ilias/models/IRef';
import {File} from '../ilias/models/File';
import {Folder} from '../ilias/models/Folder';
import {References, RefObjectXml, RefTreeRoot} from '../ilias/soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {MediaCast} from '../ilias/models/MediaCast';

export class ObjectRefTreeScraper {

    private objects: RefObjectXml[];

    constructor(readonly parent: IRef, refTreeRoot: RefTreeRoot) {
        const refObject = refTreeRoot.Objects?.Object;
        this.objects = refObject
            ? refObject instanceof Array ? refObject : [refObject]
            : [];
    }

    /**
     * Resources, might be present in multiple location, like aliases. We might get a Reference like this:
     * [
     *  {"attributes":{"ref_id":"2093676","parent_id":"2057416","accessInfo":"granted"},"TimeTarget":{"attributes":{"type":"0"},"Timing":{"attributes":{"starting_time":"1616501997","ending_time":"1616501997","visibility":"0"}},"Suggestion":{"attributes":{"starting_time":"1616501997","ending_time":"1616501997","changeable":"0"}}},"Operation":["visible","read"],"Path":{"Element":[{"attributes":{"ref_id":"1","type":"root"},"$value":"Repository"},{"attributes":{"ref_id":"1200811","type":"cat"},"$value":"iTools, Portale, weitere Angebote"},{"attributes":{"ref_id":"1091862","type":"cat"},"$value":"Affiliated Institutions"},{"attributes":{"ref_id":"447636","type":"cat"},"$value":"BeNeFri Joint Master in Computer Science"},{"attributes":{"ref_id":"1841332","type":"cat"},"$value":"FS2021"},{"attributes":{"ref_id":"2034264","type":"crs"},"$value":"FS2021: 33107/63107 Document Image Analysis"},{"attributes":{"ref_id":"2057416","type":"fold"},"$value":"Lecture"}]}},
     *  {"attributes":{"ref_id":"2100960","parent_id":"2057418","accessInfo":"granted"},"TimeTarget":{"attributes":{"type":"0"},"Timing":{"attributes":{"starting_time":"1617104786","ending_time":"1617104786","visibility":"0"}},"Suggestion":{"attributes":{"starting_time":"1617104786","ending_time":"1617104786","changeable":"0"}}},"Operation":["visible","read"],"Path":{"Element":[{"attributes":{"ref_id":"1","type":"root"},"$value":"Repository"},{"attributes":{"ref_id":"1200811","type":"cat"},"$value":"iTools, Portale, weitere Angebote"},{"attributes":{"ref_id":"1091862","type":"cat"},"$value":"Affiliated Institutions"},{"attributes":{"ref_id":"447636","type":"cat"},"$value":"BeNeFri Joint Master in Computer Science"},{"attributes":{"ref_id":"1841332","type":"cat"},"$value":"FS2021"},{"attributes":{"ref_id":"2034264","type":"crs"},"$value":"FS2021: 33107/63107 Document Image Analysis"},{"attributes":{"ref_id":"2057418","type":"fold"},"$value":"Exercise"}]}}
     * ]
     *
     * We can notice in the Path, that the value might not actually match the desired parent (as it is also aliased
     * in a different location).
     *
     * Therefore, we have to select the Reference which is relevant with the given parent
     */
    static selectRelatedReference (references: References | References[], parent: IRef): References {
        if ( ! Array.isArray(references))
            return references;

        const { refId } = parent;
        for (const reference of references) {
            const { Path } = reference;
            for (const { attributes: { ref_id } } of Path.Element) {
                if (ref_id === refId.toString())
                    return reference;
            }
        }

        throw new Error(`Not found any matching parent in the path of the given references. Looking for ${parent.refId}`);
    }

    // TODO
    //      copa: link
    //      webr: link

    getExercises(): Array<Exercise> {
        return this.objects
            .filter(object => object.attributes.type === 'exc')
            .map(object => Exercise.fromRefObject(object, this.parent));
    }

    getMediaCasts(): Array<MediaCast> {
        return this.objects
            .filter(object => object.attributes.type === 'mcst')
            .map(object => MediaCast.fromRefObject(object, this.parent));
    }

    getFiles(): Array<File> {
        return this.objects
            .filter(object => object.attributes.type === 'file')
            .map(object => File.fromRefObject(object, this.parent));
    }

    getFolders(): Array<Folder> {
        return this.objects
            .filter(object => object.attributes.type === 'fold')
            .map(object => Folder.fromRefObject(object, this.parent));
    }
}

export type RefType =
    /**
     * course
     */
    'crs'
    /**
     * link, with 'title' and link the description
     */
    | 'copa'
    /**
     * web redirect with at least a title (optional description)
     */
    | 'webr'
    /**
     * exercise page with one or more assignment
     */
    | 'exc'
    /**
     * file present in this ref
     */
    | 'file'
    /**
     * folder with its own RefTree
     */
    | 'fold'
    /**
     * Media cast, some kind of folder full of videos
     */
    | 'mcst'
    /**
     * forum
     */
    | 'frm'
    /**
     * container separator. Useless the way it is answer. No real logic found behind them unfortunately.
     * By default, the current ref tree as at least a 'Content' `itgr` and other container might be
     * added to the tree for organization, but don't appear in the path of files or any other content.
     * - I hope, I won't have filenames conflicts without there help.
     */
    | 'itgr'
    /**
     * poll
     */
    | 'poll'

export interface RefTreeRoot {
    Objects: {
        Object: RefObjectXml[]
    }
}

export interface RefObjectXml {
    attributes: {
        type: RefType
        obj_id: string
    }
    Title: string
    Description?: string
    Owner: string
    CreateDate: string
    LastUpdate: string
    ImportId: any
    Properties: Properties
    References: References | References[]
}

export interface Properties {
    Property: Property[]
}

export type PropertyName = 'fileExtension' | 'fileSize' | 'fileVersion';

export interface Property {
    attributes: {
        name: PropertyName
    }
    $value: string
}

export interface References {
    attributes: {
        ref_id: string
        parent_id: string
        accessInfo: string
    }
    TimeTarget: TimeTarget
    Operation: string[]
    Path: Path
}

export interface TimeTarget {
    attributes: {
        type: string
    }
    Timing: Timing
    Suggestion: Suggestion
}

export interface Timing {
    attributes: {
        starting_time: string
        ending_time: string
        visibility: string
    }
}

export interface Suggestion {
    attributes: {
        starting_time: string
        ending_time: string
        changeable: string
    }
}

export interface Path {
    Element: Element[]
}

export interface Element {
    attributes: {
        ref_id: string
        type: string
    }
    $value: string
}

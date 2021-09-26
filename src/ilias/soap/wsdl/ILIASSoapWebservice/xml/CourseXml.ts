import {XmlObjectType} from '../XmlObjects';

export interface CourseResultSetRow {
    ref_id: number,
    /**
     * Encoded XML that would resolve into {@link CourseXmlObjectRoot}
     */
    xml: string,
    parent_ref_id: number,
}

/**
* Short description of a Course with title and settings in opposition of Course Tree with its content.
*/
export interface CourseXmlObjectRoot {
    Course: CourseXmlObject
}

export interface CourseXmlObject {
    attributes: {
        exportVersion: string
        id: string
        showMembers: string
    }
    MetaData: MetaData
    AdvancedMetaData: AdvancedMetaData
    Settings: Settings
    Sort: Sort
    ContainerSettings: ContainerSettings
}

export interface MetaData {
    General: General
}

export interface General {
    attributes: {
        Structure: string
    }
    Identifier: Identifier
    Title: Title
    Language: Language
    Description: Description
    Keyword: Keyword
}

export interface Identifier {
    attributes: {
        Catalog: string
        Entry: string
    }
}

export interface Title {
    attributes: {
        Language: string
    }
    $value: string
}

export interface Language {
    attributes: {
        Language: string
    }
}

export interface Description {
    attributes: {
        Language: string
    }
    $value?: string
}

export interface Keyword {
    attributes: {
        Language: string
    }
}

export interface AdvancedMetaData {
    Value: Value[]
}

export interface Value {
    attributes: {
        id: string
    }
}

export interface Settings {
    Availability: Availability
    Syllabus?: string
    ImportantInformation?: string
    TargetGroup: any
    Contact: Contact
    Registration: Registration
    Period: Period
    WaitingListAutoFill: string
    CancellationEnd: any
    MinMembers: string
    ViewMode: string[]
    WelcomeMail: WelcomeMail
}

export interface Availability {
    Unlimited: any
}

export interface Contact {
    Name: any
    Responsibility: any
    Phone: any
    Email: any
    Consultation: any
}

export interface Registration {
    attributes: {
        registrationType: string
        maxMembers: string
        notification: string
        waitingList: string
    }
    Unlimited: any
}

export interface Period {
    attributes: {
        withTime: string
    }
    Start: any
    End: any
}

export interface WelcomeMail {
    attributes: {
        status: string
    }
}

export interface Sort {
    attributes: {
        direction: string
        type: string
    }
}

export interface ContainerSettings {
    ContainerSetting: XmlObjectType<string>
}

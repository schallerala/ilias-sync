export interface FileRoot {
    File: {
        attributes: {
            obj_id: string
            version: string
            max_version: string
            size: string
            type: string
            action: string
        }
        Filename: string
        Title: string
        Description: any
        Rating: string
        Versions: Versions
    }
}

export interface Versions {
    Version: Version
}

export interface Version {
    attributes: {
        version: string
        max_version: string
        date: string
        usr_id: string
        action: string
        rollback_version: string
        rollback_user_id: string
    }
}

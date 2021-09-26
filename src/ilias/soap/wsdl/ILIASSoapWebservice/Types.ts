/* tslint:disable:max-line-length no-empty-interface */

import {XmlObjectType} from './XmlObjects';

export type intArray = Array<XmlObjectType<number>>;

export type stringArray = Array<XmlObjectType<string>>;

export type doubleArray = Array<XmlObjectType<number>>;

export interface ilUserData {
    usr_idxsd: number,
    loginxsd: string,
    passwdxsd: string,
    firstnamexsd: string,
    lastnamexsd: string,
    titlexsd: string,
    genderxsd: string,
    emailxsd: string,
    second_emailxsd: string,
    institutionxsd: string,
    streetxsd: string,
    cityxsd: string,
    zipcodexsd: string,
    countryxsd: string,
    phone_officexsd: string,
    last_loginxsd: string,
    last_updatexsd: string,
    create_datexsd: string,
    hobbyxsd: string,
    departmentxsd: string,
    phone_homexsd: string,
    phone_mobilexsd: string,
    faxxsd: string,
    time_limit_ownerxsd: number,
    time_limit_unlimitedxsd: number,
    time_limit_fromxsd: number,
    time_limit_untilxsd: number,
    time_limit_messagexsd: number,
    referral_commentxsd: string,
    matriculationxsd: string,
    activexsd: number,
    accepted_agreementxsd: boolean,
    approve_datexsd: string,
    user_skinxsd: string,
    user_stylexsd: string,
    user_languagexsd: string,
    import_idxsd: string,
}

export interface ilOperation {
    ops_id: XmlObjectType<number>,
    operation: XmlObjectType<string>,
    description: XmlObjectType<string>,
}

export interface ilOperations {
    item: Array<XmlObjectType<ilOperation>>
}

export type ilOperationIds = Array<XmlObjectType<number>>;

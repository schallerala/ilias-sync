/* tslint:disable:max-line-length no-empty-interface */
import {Client} from 'soap';

import {doubleArray, ilOperations, ilUserData, intArray, stringArray} from './Types';
import {XmlObjectType} from './XmlObjects';

export interface IloginInput {
    /** xsd:string(undefined) */
    client: XmlObjectType<string>;
    /** xsd:string(undefined) */
    username: XmlObjectType<string>;
    /** xsd:string(undefined) */
    password: XmlObjectType<string>;
}

export interface IloginOutput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IloginCASInput {
    /** xsd:string(undefined) */
    client: XmlObjectType<string>;
    /** xsd:string(undefined) */
    PT: XmlObjectType<string>;
    /** xsd:string(undefined) */
    user: XmlObjectType<string>;
}

export interface IloginCASOutput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IloginLDAPInput {
    /** xsd:string(undefined) */
    client: XmlObjectType<string>;
    /** xsd:string(undefined) */
    username: XmlObjectType<string>;
    /** xsd:string(undefined) */
    password: XmlObjectType<string>;
}

export interface IloginLDAPOutput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IloginStudipUserInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IloginStudipUserOutput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IlogoutInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IlogoutOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IlookupUserInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    user_name: XmlObjectType<string>;
}

export interface IlookupUserOutput {
    /** xsd:int(undefined) */
    usr_id: XmlObjectType<number>;
}

export interface IgetUserInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IgetUserOutput {
    user_data: XmlObjectType<ilUserData>;
}

export interface IdeleteUserInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IdeleteUserOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IaddCourseInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    crs_xml: XmlObjectType<string>;
}

export interface IaddCourseOutput {
    /** xsd:int(undefined) */
    course_id: XmlObjectType<number>;
}

export interface IdeleteCourseInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    course_id: XmlObjectType<number>;
}

export interface IdeleteCourseOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IstartBackgroundTaskWorkerInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IstartBackgroundTaskWorkerOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IassignCourseMemberInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    course_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    type: XmlObjectType<string>;
}

export interface IassignCourseMemberOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IexcludeCourseMemberInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    course_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IexcludeCourseMemberOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IisAssignedToCourseInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    course_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IisAssignedToCourseOutput {
    /** xsd:int(undefined) */
    role: XmlObjectType<number>;
}

export interface IgetCourseXMLInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    course_id: XmlObjectType<number>;
}

export interface IgetCourseXMLOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IupdateCourseInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    course_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IupdateCourseOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetObjIdByImportIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    import_id: XmlObjectType<string>;
}

export interface IgetObjIdByImportIdOutput {
    /** xsd:int(undefined) */
    obj_id: XmlObjectType<number>;
}

export interface IgetRefIdsByImportIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    import_id: XmlObjectType<string>;
}

export interface IgetRefIdsByImportIdOutput {
    ref_ids: XmlObjectType<intArray>;
}

export interface IgetRefIdsByObjIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    obj_id: XmlObjectType<string>;
}

export interface IgetRefIdsByObjIdOutput {
    ref_ids: XmlObjectType<intArray>;
}

export interface IgetObjectByReferenceInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    reference_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IgetObjectByReferenceOutput {
    /** xsd:string(undefined) */
    object_xml: XmlObjectType<string>;
}

export interface IgetObjectsByTitleInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    title: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IgetObjectsByTitleOutput {
    /** xsd:string(undefined) */
    object_xml: XmlObjectType<string>;
}

export interface IsearchObjectsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    types: XmlObjectType<stringArray>;
    /** xsd:string(undefined) */
    key: XmlObjectType<string>;
    /** xsd:string(undefined) */
    combination: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IsearchObjectsOutput {
    /** xsd:string(undefined) */
    object_xml: XmlObjectType<string>;
}

export interface IgetTreeChildsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    types: XmlObjectType<stringArray>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IgetTreeChildsOutput {
    /** xsd:string(undefined) */
    object_xml: XmlObjectType<string>;
}

export interface IgetXMLTreeInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    types: XmlObjectType<stringArray>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IgetXMLTreeOutput {
    /** xsd:string(undefined) */
    object_xml: XmlObjectType<string>;
}

export interface IaddObjectInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    object_xml: XmlObjectType<string>;
}

export interface IaddObjectOutput {
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IupdateObjectsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    object_xml: XmlObjectType<string>;
}

export interface IupdateObjectsOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IaddReferenceInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    source_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
}

export interface IaddReferenceOutput {
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IdeleteObjectInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    reference_id: XmlObjectType<number>;
}

export interface IdeleteObjectOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IremoveFromSystemByImportIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    import_id: XmlObjectType<string>;
}

export interface IremoveFromSystemByImportIdOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IaddUserRoleEntryInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    role_id: XmlObjectType<number>;
}

export interface IaddUserRoleEntryOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IdeleteUserRoleEntryInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    role_id: XmlObjectType<number>;
}

export interface IdeleteUserRoleEntryOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetOperationsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IgetOperationsOutput {
    operations: XmlObjectType<ilOperations>;
}

export interface IrevokePermissionsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    role_id: XmlObjectType<number>;
}

export interface IrevokePermissionsOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgrantPermissionsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    role_id: XmlObjectType<number>;
    operations: XmlObjectType<ilOperations>;
}

export interface IgrantPermissionsOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetLocalRolesInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IgetLocalRolesOutput {
    /** xsd:string(undefined) */
    role_xml: XmlObjectType<string>;
}

export interface IgetUserRolesInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IgetUserRolesOutput {
    /** xsd:string(undefined) */
    role_xml: XmlObjectType<string>;
}

export interface IaddRoleInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    obj_xml: XmlObjectType<string>;
}

export interface IaddRoleOutput {
    role_ids: XmlObjectType<intArray>;
}

export interface IdeleteRoleInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    role_id: XmlObjectType<number>;
}

export interface IdeleteRoleOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IaddRoleFromTemplateInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    obj_xml: XmlObjectType<string>;
    /** xsd:int(undefined) */
    role_template_id: XmlObjectType<number>;
}

export interface IaddRoleFromTemplateOutput {
    role_ids: XmlObjectType<intArray>;
}

export interface IgetObjectTreeOperationsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IgetObjectTreeOperationsOutput {
    operations: XmlObjectType<ilOperations>;
}

export interface IaddGroupInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    group_xml: XmlObjectType<string>;
}

export interface IaddGroupOutput {
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IgroupExistsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    title: XmlObjectType<string>;
}

export interface IgroupExistsOutput {
    /** xsd:boolean(undefined) */
    exists: XmlObjectType<boolean>;
}

export interface IgetGroupInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IgetGroupOutput {
    /** xsd:string(undefined) */
    group_xml: XmlObjectType<string>;
}

export interface IassignGroupMemberInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    group_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    type: XmlObjectType<string>;
}

export interface IassignGroupMemberOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IexcludeGroupMemberInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    group_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IexcludeGroupMemberOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IisAssignedToGroupInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    group_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
}

export interface IisAssignedToGroupOutput {
    /** xsd:int(undefined) */
    role: XmlObjectType<number>;
}

export interface IdistributeMailsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    mail_xml: XmlObjectType<string>;
}

export interface IdistributeMailsOutput {
    /** xsd:boolean(undefined) */
    status: XmlObjectType<boolean>;
}

export interface IilCloneInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    copy_identifier: XmlObjectType<number>;
}

export interface IilCloneOutput {
    /** xsd:int(undefined) */
    new_ref_id: XmlObjectType<number>;
}

export interface IhandleECSTasksInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    server_id: XmlObjectType<number>;
}

export interface IhandleECSTasksOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IilCloneDependenciesInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    copy_identifier: XmlObjectType<number>;
}

export interface IilCloneDependenciesOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IsaveQuestionResultInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    test_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    question_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    pass: XmlObjectType<number>;
    solution: XmlObjectType<stringArray>;
}

export interface IsaveQuestionResultOutput {
    /** xsd:boolean(undefined) */
    status: XmlObjectType<boolean>;
}

export interface IsaveQuestionInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:long(undefined) */
    active_id: XmlObjectType<number>;
    /** xsd:long(undefined) */
    question_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    pass: XmlObjectType<number>;
    solution: XmlObjectType<stringArray>;
}

export interface IsaveQuestionOutput {
    /** xsd:boolean(undefined) */
    status: XmlObjectType<boolean>;
}

export interface IsaveQuestionSolutionInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:long(undefined) */
    active_id: XmlObjectType<number>;
    /** xsd:long(undefined) */
    question_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    pass: XmlObjectType<number>;
    /** xsd:string(undefined) */
    solution: XmlObjectType<string>;
}

export interface IsaveQuestionSolutionOutput {
    /** xsd:string(undefined) */
    status: XmlObjectType<string>;
}

export interface IgetQuestionSolutionInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:long(undefined) */
    active_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    question_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    pass: XmlObjectType<number>;
}

export interface IgetQuestionSolutionOutput {
    solution: XmlObjectType<stringArray>;
}

export interface IgetTestUserDataInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:long(undefined) */
    active_id: XmlObjectType<number>;
}

export interface IgetTestUserDataOutput {
    userdata: XmlObjectType<stringArray>;
}

export interface IgetPositionOfQuestionInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:long(undefined) */
    active_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    question_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    pass: XmlObjectType<number>;
}

export interface IgetPositionOfQuestionOutput {
    /** xsd:int(undefined) */
    position: XmlObjectType<number>;
}

export interface IgetPreviousReachedPointsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:long(undefined) */
    active_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    question_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    pass: XmlObjectType<number>;
}

export interface IgetPreviousReachedPointsOutput {
    position: XmlObjectType<doubleArray>;
}

export interface IgetNrOfQuestionsInPassInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:long(undefined) */
    active_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    pass: XmlObjectType<number>;
}

export interface IgetNrOfQuestionsInPassOutput {
    /** xsd:int(undefined) */
    count: XmlObjectType<number>;
}

export interface IgetStructureObjectsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IgetStructureObjectsOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IimportUsersInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    folder_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    usr_xml: XmlObjectType<string>;
    /** xsd:int(undefined) */
    conflict_rule: XmlObjectType<number>;
    /** xsd:int(undefined) */
    send_account_mail: XmlObjectType<number>;
}

export interface IimportUsersOutput {
    /** xsd:string(undefined) */
    protocol: XmlObjectType<string>;
}

export interface IgetRolesInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    role_type: XmlObjectType<string>;
    /** xsd:string(undefined) */
    id: XmlObjectType<string>;
}

export interface IgetRolesOutput {
    /** xsd:string(undefined) */
    role_xml: XmlObjectType<string>;
}

export interface IgetUsersForContainerInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    attach_roles: XmlObjectType<number>;
    /** xsd:int(undefined) */
    active: XmlObjectType<number>;
}

export interface IgetUsersForContainerOutput {
    /** xsd:string(undefined) */
    user_xml: XmlObjectType<string>;
}

export interface IgetUsersForRoleInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    role_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    attach_roles: XmlObjectType<number>;
    /** xsd:int(undefined) */
    active: XmlObjectType<number>;
}

export interface IgetUsersForRoleOutput {
    /** xsd:string(undefined) */
    user_xml: XmlObjectType<string>;
}

export interface IsearchUserInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    key_fields: XmlObjectType<stringArray>;
    /** xsd:string(undefined) */
    query_operator: XmlObjectType<string>;
    key_values: XmlObjectType<stringArray>;
    /** xsd:int(undefined) */
    attach_roles: XmlObjectType<number>;
    /** xsd:int(undefined) */
    active: XmlObjectType<number>;
}

export interface IsearchUserOutput {
    /** xsd:string(undefined) */
    user_xml: XmlObjectType<string>;
}

export interface IhasNewMailInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IhasNewMailOutput {
    /** xsd:boolean(undefined) */
    status: XmlObjectType<boolean>;
}

export interface IgetNICInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IgetNICOutput {
    /** xsd:string(undefined) */
    xmlresultset: XmlObjectType<string>;
}

export interface IgetExerciseXMLInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /**
     * xsd:int(undefined)
     *
     * Attachment mode:
     *      0 - no file contents,
     *      1 - plain content (base64encoded),
     *      2 zlib + base64,
     *      3 gzip + base64
     */
    attachment_mode: 0 | 1 | 2 | 3;
}

export interface IgetExerciseXMLOutput {
    /** xsd:string(undefined) */
    exercisexml: XmlObjectType<string>;
}

export interface IaddExerciseInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IaddExerciseOutput {
    /** xsd:int(undefined) */
    refid: XmlObjectType<number>;
}

export interface IupdateExerciseInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IupdateExerciseOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetFileXMLInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /**
     * xsd:int(undefined)
     *
     * Attachment mode:
     *      0 - no file contents
     *      1 - plain content (base64encoded)
     *      2 zlib + base64
     *      3 gzip + base64
     */
    attachment_mode: 0 | 1 | 2 | 3;
}

export interface IgetFileXMLOutput {
    /** xsd:string(undefined) */
    filexml: XmlObjectType<string>;
}

export interface IaddFileInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IaddFileOutput {
    /** xsd:int(undefined) */
    refid: XmlObjectType<number>;
}

export interface IupdateFileInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IupdateFileOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetUserXMLInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    user_ids: XmlObjectType<intArray>;
    /** xsd:int(undefined) */
    attach_roles: XmlObjectType<number>;
}

export interface IgetUserXMLOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IgetObjIdsByRefIdsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    ref_ids: XmlObjectType<intArray>;
}

export interface IgetObjIdsByRefIdsOutput {
    obj_ids: XmlObjectType<intArray>;
}

export interface IupdateGroupInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IupdateGroupOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetIMSManifestXMLInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IgetIMSManifestXMLOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IhasSCORMCertificateInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    usr_id: XmlObjectType<number>;
}

export interface IhasSCORMCertificateOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetSCORMCompletionStatusInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    usr_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IgetSCORMCompletionStatusOutput {
    /** xsd:string(undefined) */
    status: XmlObjectType<string>;
}

export interface IcopyObjectInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IcopyObjectOutput {
    /** xsd:int(undefined) */
    xml: XmlObjectType<number>;
}

export interface ImoveObjectInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
}

export interface ImoveObjectOutput {
    /** xsd:boolean(undefined) */
    result: XmlObjectType<boolean>;
}

export interface IgetTestResultsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:boolean(undefined) */
    sum_only: XmlObjectType<boolean>;
}

export interface IgetTestResultsOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IremoveTestResultsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    user_ids: XmlObjectType<intArray>;
}

export interface IremoveTestResultsOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetCoursesForUserInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    parameters: XmlObjectType<string>;
}

export interface IgetCoursesForUserOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IgetGroupsForUserInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    parameters: XmlObjectType<string>;
}

export interface IgetGroupsForUserOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IgetPathForRefIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IgetPathForRefIdOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IsearchRolesInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    key: XmlObjectType<string>;
    /** xsd:string(undefined) */
    combination: XmlObjectType<string>;
    /** xsd:string(undefined) */
    role_type: XmlObjectType<string>;
}

export interface IsearchRolesOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

// Don't use it as no parts are sent
// export interface IgetInstallationInfoXMLInput {}

export interface IgetInstallationInfoXMLOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IgetClientInfoXMLInput {
    /** xsd:string(undefined) */
    clientid: XmlObjectType<string>;
}

export interface IgetClientInfoXMLOutput {
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IgetSkillCompletionDateForTriggerRefIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    user_id: XmlObjectType<string>;
    /** xsd:string(undefined) */
    ref_id: XmlObjectType<string>;
}

export interface IgetSkillCompletionDateForTriggerRefIdOutput {
    /** xsd:string(undefined) */
    dates: XmlObjectType<string>;
}

export interface IcheckSkillUserCertificateForTriggerRefIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    user_id: XmlObjectType<string>;
    /** xsd:string(undefined) */
    ref_id: XmlObjectType<string>;
}

export interface IcheckSkillUserCertificateForTriggerRefIdOutput {
    /** xsd:string(undefined) */
    have_certificates: XmlObjectType<string>;
}

export interface IgetSkillTriggerOfAllCertificatesInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    user_id: XmlObjectType<string>;
}

export interface IgetSkillTriggerOfAllCertificatesOutput {
    /** xsd:string(undefined) */
    certificate_triggers: XmlObjectType<string>;
}

export interface IgetUserIdBySidInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IgetUserIdBySidOutput {
    /** xsd:int(undefined) */
    usr_id: XmlObjectType<number>;
}

export interface IdeleteExpiredDualOptInUserObjectsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    usr_id: XmlObjectType<number>;
}

export interface IdeleteExpiredDualOptInUserObjectsOutput {
    /** xsd:boolean(undefined) */
    status: XmlObjectType<boolean>;
}

export interface IreadWebLinkInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
}

export interface IreadWebLinkOutput {
    /** xsd:string(undefined) */
    weblinkxml: XmlObjectType<string>;
}

export interface IcreateWebLinkInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    target_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IcreateWebLinkOutput {
    /** xsd:int(undefined) */
    refid: XmlObjectType<number>;
}

export interface IupdateWebLinkInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    xml: XmlObjectType<string>;
}

export interface IupdateWebLinkOutput {
    /** xsd:boolean(undefined) */
    success: XmlObjectType<boolean>;
}

export interface IgetLearningProgressChangesInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    timestamp: XmlObjectType<string>;
    /** xsd:boolean(undefined) */
    include_ref_ids: XmlObjectType<boolean>;
    type_filter: XmlObjectType<stringArray>;
}

export interface IgetLearningProgressChangesOutput {
    /** xsd:string(undefined) */
    lp_data: XmlObjectType<string>;
}

export interface IdeleteProgressInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    ref_ids: XmlObjectType<intArray>;
    usr_ids: XmlObjectType<intArray>;
    type_filter: XmlObjectType<stringArray>;
    progress_filter: XmlObjectType<intArray>;
}

export interface IdeleteProgressOutput {
    /** xsd:boolean(undefined) */
    status: XmlObjectType<boolean>;
}

export interface IgetProgressInfoInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    progress_filter: XmlObjectType<intArray>;
}

export interface IgetProgressInfoOutput {
    /** xsd:string(undefined) */
    user_results: XmlObjectType<string>;
}

export interface IexportDataCollectionContentInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    ref_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    table_id: XmlObjectType<number>;
    /** xsd:string(undefined) */
    format: XmlObjectType<string>;
    /** xsd:string(undefined) */
    filepath: XmlObjectType<string>;
}

export interface IexportDataCollectionContentOutput {
    /** xsd:string(undefined) */
    export_path: XmlObjectType<string>;
}

export interface IprocessBackgroundTaskInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    task_id: XmlObjectType<number>;
}

export interface IprocessBackgroundTaskOutput {
    /** xsd:boolean(undefined) */
    status: XmlObjectType<boolean>;
}

export interface IaddDesktopItemsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
    reference_ids: XmlObjectType<intArray>;
}

export interface IaddDesktopItemsOutput {
    /** xsd:int(undefined) */
    num_added: XmlObjectType<number>;
}

export interface IremoveDesktopItemsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    user_id: XmlObjectType<number>;
    reference_ids: XmlObjectType<intArray>;
}

export interface IremoveDesktopItemsOutput {
    /** xsd:int(undefined) */
    num_added: XmlObjectType<number>;
}

export interface IaddUserToPositionInOrgUnitInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    position_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    usr_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    orgu_ref_id: XmlObjectType<number>;
}

export interface IaddUserToPositionInOrgUnitOutput {}

export interface IgetEmployeePositionIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IgetEmployeePositionIdOutput {
    /** xsd:int(undefined) */
    position_id: XmlObjectType<number>;
}

export interface IimportOrgUnitsSimpleXMLInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:string(undefined) */
    OrgUnitTree: XmlObjectType<string>;
}

export interface IimportOrgUnitsSimpleXMLOutput {}

export interface IgetOrgUnitsSimpleXMLInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    orgu_ref_id: XmlObjectType<number>;
}

export interface IgetOrgUnitsSimpleXMLOutput {
    /** xsd:string(undefined) */
    OrgUnitTree: XmlObjectType<string>;
}

export interface IgetPositionIdsInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IgetPositionIdsOutput {
    position_ids: XmlObjectType<intArray>;
}

export interface IgetPositionTitleInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    position_id: XmlObjectType<number>;
}

export interface IgetPositionTitleOutput {
    /** xsd:string(undefined) */
    title: XmlObjectType<string>;
}

export interface IremoveUserFromPositionInOrgUnitInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    position_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    usr_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    orgu_ref_id: XmlObjectType<number>;
}

export interface IremoveUserFromPositionInOrgUnitOutput {}

export interface IgetSuperiorPositionIdInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
}

export interface IgetSuperiorPositionIdOutput {
    /** xsd:int(undefined) */
    position_id: XmlObjectType<number>;
}

export interface IgetUserIdsOfPositionInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    position_id: XmlObjectType<number>;
}

export interface IgetUserIdsOfPositionOutput {
    usr_ids: XmlObjectType<intArray>;
}

export interface IgetUserIdsOfPositionAndOrgUnitInput {
    /** xsd:string(undefined) */
    sid: XmlObjectType<string>;
    /** xsd:int(undefined) */
    position_id: XmlObjectType<number>;
    /** xsd:int(undefined) */
    orgu_ref_id: XmlObjectType<number>;
}

export interface IgetUserIdsOfPositionAndOrgUnitOutput {
    usr_ids: XmlObjectType<intArray>;
}

export interface IILIASSoapWebservicePortSoap extends Client {
    /** ILIAS login function */
    login: (input: Partial<IloginInput>, cb: (err: any | null, result: IloginOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS login function */
    loginAsync: (input: Partial<IloginInput>, options?: any, extraHeaders?: any) => Promise<[IloginOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS login function via CAS */
    loginCAS: (input: Partial<IloginCASInput>, cb: (err: any | null, result: IloginCASOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS login function via CAS */
    loginCASAsync: (input: Partial<IloginCASInput>, options?: any, extraHeaders?: any) => Promise<[IloginCASOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS login function via LDAP */
    loginLDAP: (input: Partial<IloginLDAPInput>, cb: (err: any | null, result: IloginLDAPOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS login function via LDAP */
    loginLDAPAsync: (input: Partial<IloginLDAPInput>, options?: any, extraHeaders?: any) => Promise<[IloginLDAPOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS login function for Stud.IP-Connection. DEPRECATED: this method will be removed in ILIAS 5.3. */
    loginStudipUser: (input: Partial<IloginStudipUserInput>, cb: (err: any | null, result: IloginStudipUserOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS login function for Stud.IP-Connection. DEPRECATED: this method will be removed in ILIAS 5.3. */
    loginStudipUserAsync: (input: Partial<IloginStudipUserInput>, options?: any, extraHeaders?: any) => Promise<[IloginStudipUserOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS logout function */
    logout: (input: Partial<IlogoutInput>, cb: (err: any | null, result: IlogoutOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS logout function */
    logoutAsync: (input: Partial<IlogoutInput>, options?: any, extraHeaders?: any) => Promise<[IlogoutOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS lookupUser(): check if username exists. Return usr_id or 0 if lookup fails. */
    lookupUser: (input: Partial<IlookupUserInput>, cb: (err: any | null, result: IlookupUserOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS lookupUser(): check if username exists. Return usr_id or 0 if lookup fails. */
    lookupUserAsync: (input: Partial<IlookupUserInput>, options?: any, extraHeaders?: any) => Promise<[IlookupUserOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getUser(): get complete set of user data. DEPRECATED with release 5.2, will be deleted with 5.3. Use searchUsers() instead. */
    getUser: (input: Partial<IgetUserInput>, cb: (err: any | null, result: IgetUserOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getUser(): get complete set of user data. DEPRECATED with release 5.2, will be deleted with 5.3. Use searchUsers() instead. */
    getUserAsync: (input: Partial<IgetUserInput>, options?: any, extraHeaders?: any) => Promise<[IgetUserOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS deleteUser(). Deletes all user related data (Bookmarks, Mails ...). DEPRECATED: Use importUsers() for deletion of user data. */
    deleteUser: (input: Partial<IdeleteUserInput>, cb: (err: any | null, result: IdeleteUserOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS deleteUser(). Deletes all user related data (Bookmarks, Mails ...). DEPRECATED: Use importUsers() for deletion of user data. */
    deleteUserAsync: (input: Partial<IdeleteUserInput>, options?: any, extraHeaders?: any) => Promise<[IdeleteUserOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addCourse(). Course import. See ilias_course_0_1.dtd for details about course xml structure */
    addCourse: (input: Partial<IaddCourseInput>, cb: (err: any | null, result: IaddCourseOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addCourse(). Course import. See ilias_course_0_1.dtd for details about course xml structure */
    addCourseAsync: (input: Partial<IaddCourseInput>, options?: any, extraHeaders?: any) => Promise<[IaddCourseOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS deleteCourse(). Deletes a course. Delete courses are stored in &quot;Trash&quot; and can be undeleted in  the ILIAS administration.  */
    deleteCourse: (input: Partial<IdeleteCourseInput>, cb: (err: any | null, result: IdeleteCourseOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS deleteCourse(). Deletes a course. Delete courses are stored in &quot;Trash&quot; and can be undeleted in  the ILIAS administration.  */
    deleteCourseAsync: (input: Partial<IdeleteCourseInput>, options?: any, extraHeaders?: any) => Promise<[IdeleteCourseOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS startBackgroundTaskWorker(). */
    startBackgroundTaskWorker: (input: Partial<IstartBackgroundTaskWorkerInput>, cb: (err: any | null, result: IstartBackgroundTaskWorkerOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS startBackgroundTaskWorker(). */
    startBackgroundTaskWorkerAsync: (input: Partial<IstartBackgroundTaskWorkerInput>, options?: any, extraHeaders?: any) => Promise<[IstartBackgroundTaskWorkerOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS assignCourseMember(). Assigns an user to an existing course. Type should be &quot;Admin&quot;, &quot;Tutor&quot; or &quot;Member&quot; */
    assignCourseMember: (input: Partial<IassignCourseMemberInput>, cb: (err: any | null, result: IassignCourseMemberOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS assignCourseMember(). Assigns an user to an existing course. Type should be &quot;Admin&quot;, &quot;Tutor&quot; or &quot;Member&quot; */
    assignCourseMemberAsync: (input: Partial<IassignCourseMemberInput>, options?: any, extraHeaders?: any) => Promise<[IassignCourseMemberOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS excludeCourseMember(). Excludes an user from an existing course. */
    excludeCourseMember: (input: Partial<IexcludeCourseMemberInput>, cb: (err: any | null, result: IexcludeCourseMemberOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS excludeCourseMember(). Excludes an user from an existing course. */
    excludeCourseMemberAsync: (input: Partial<IexcludeCourseMemberInput>, options?: any, extraHeaders?: any) => Promise<[IexcludeCourseMemberOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS isAssignedToCourse(). Checks whether an user is assigned to a given course. Returns 0 =&gt; not assigned, 1 =&gt; course admin, 2 =&gt; course member or 3 =&gt; course tutor */
    isAssignedToCourse: (input: Partial<IisAssignedToCourseInput>, cb: (err: any | null, result: IisAssignedToCourseOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS isAssignedToCourse(). Checks whether an user is assigned to a given course. Returns 0 =&gt; not assigned, 1 =&gt; course admin, 2 =&gt; course member or 3 =&gt; course tutor */
    isAssignedToCourseAsync: (input: Partial<IisAssignedToCourseInput>, options?: any, extraHeaders?: any) => Promise<[IisAssignedToCourseOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getCourseXML(). Get a xml description of a specific course. */
    getCourseXML: (input: Partial<IgetCourseXMLInput>, cb: (err: any | null, result: IgetCourseXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getCourseXML(). Get a xml description of a specific course. */
    getCourseXMLAsync: (input: Partial<IgetCourseXMLInput>, options?: any, extraHeaders?: any) => Promise<[IgetCourseXMLOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS updateCourse(). Update course settings, assigned members, tutors, administrators with a given xml description */
    updateCourse: (input: Partial<IupdateCourseInput>, cb: (err: any | null, result: IupdateCourseOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS updateCourse(). Update course settings, assigned members, tutors, administrators with a given xml description */
    updateCourseAsync: (input: Partial<IupdateCourseInput>, options?: any, extraHeaders?: any) => Promise<[IupdateCourseOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getObjIdByImportId(). Get the obj_id of an ILIAS obj by a given import id. */
    getObjIdByImportId: (input: Partial<IgetObjIdByImportIdInput>, cb: (err: any | null, result: IgetObjIdByImportIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getObjIdByImportId(). Get the obj_id of an ILIAS obj by a given import id. */
    getObjIdByImportIdAsync: (input: Partial<IgetObjIdByImportIdInput>, options?: any, extraHeaders?: any) => Promise<[IgetObjIdByImportIdOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getRefIdsByImportId(). Get all reference ids by a given import id. */
    getRefIdsByImportId: (input: Partial<IgetRefIdsByImportIdInput>, cb: (err: any | null, result: IgetRefIdsByImportIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getRefIdsByImportId(). Get all reference ids by a given import id. */
    getRefIdsByImportIdAsync: (input: Partial<IgetRefIdsByImportIdInput>, options?: any, extraHeaders?: any) => Promise<[IgetRefIdsByImportIdOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getRefIdsByObjId(). Get all reference ids by a given object id. */
    getRefIdsByObjId: (input: Partial<IgetRefIdsByObjIdInput>, cb: (err: any | null, result: IgetRefIdsByObjIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getRefIdsByObjId(). Get all reference ids by a given object id. */
    getRefIdsByObjIdAsync: (input: Partial<IgetRefIdsByObjIdInput>, options?: any, extraHeaders?: any) => Promise<[IgetRefIdsByObjIdOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getObjectByReference(). Get XML-description of an ILIAS object. If a user id is given, this methods also checks the permissions of that user on the object. */
    getObjectByReference: (input: Partial<IgetObjectByReferenceInput>, cb: (err: any | null, result: IgetObjectByReferenceOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getObjectByReference(). Get XML-description of an ILIAS object. If a user id is given, this methods also checks the permissions of that user on the object. */
    getObjectByReferenceAsync: (input: Partial<IgetObjectByReferenceInput>, options?: any, extraHeaders?: any) => Promise<[IgetObjectByReferenceOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getObjectsByTitle(). Get XML-description of an ILIAS object with given title. If a user id is given this method also checks the permissions of that user on the object. */
    getObjectsByTitle: (input: Partial<IgetObjectsByTitleInput>, cb: (err: any | null, result: IgetObjectsByTitleOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getObjectsByTitle(). Get XML-description of an ILIAS object with given title. If a user id is given this method also checks the permissions of that user on the object. */
    getObjectsByTitleAsync: (input: Partial<IgetObjectsByTitleInput>, options?: any, extraHeaders?: any) => Promise<[IgetObjectsByTitleOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS searchObjects(): Searches for objects. Key is within &quot;title&quot; or &quot;description&quot; Typical calls are searchObject($sid,array(&quot;lm&quot;,&quot;crs&quot;),&quot;\&quot;this and that\&quot;&quot;,&quot;and&quot;);  If an optional user id is given, this methods also return the permissions for that user on the found objects */
    searchObjects: (input: Partial<IsearchObjectsInput>, cb: (err: any | null, result: IsearchObjectsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS searchObjects(): Searches for objects. Key is within &quot;title&quot; or &quot;description&quot; Typical calls are searchObject($sid,array(&quot;lm&quot;,&quot;crs&quot;),&quot;\&quot;this and that\&quot;&quot;,&quot;and&quot;);  If an optional user id is given, this methods also return the permissions for that user on the found objects */
    searchObjectsAsync: (input: Partial<IsearchObjectsInput>, options?: any, extraHeaders?: any) => Promise<[IsearchObjectsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getTreeChilds(): Get all child objects of a given object.Choose array of types to filter the output. Choose empty type array to receive all object types */
    getTreeChilds: (input: Partial<IgetTreeChildsInput>, cb: (err: any | null, result: IgetTreeChildsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getTreeChilds(): Get all child objects of a given object.Choose array of types to filter the output. Choose empty type array to receive all object types */
    getTreeChildsAsync: (input: Partial<IgetTreeChildsInput>, options?: any, extraHeaders?: any) => Promise<[IgetTreeChildsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getXMLTree(): Returns a xml stream with the subtree objects. */
    getXMLTree: (input: Partial<IgetXMLTreeInput>, cb: (err: any | null, result: IgetXMLTreeOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getXMLTree(): Returns a xml stream with the subtree objects. */
    getXMLTreeAsync: (input: Partial<IgetXMLTreeInput>, options?: any, extraHeaders?: any) => Promise<[IgetXMLTreeOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addObject. Create new object based on xml description under a given node (&quot;category,course,group or folder). Return created reference id of the new object. */
    addObject: (input: Partial<IaddObjectInput>, cb: (err: any | null, result: IaddObjectOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addObject. Create new object based on xml description under a given node (&quot;category,course,group or folder). Return created reference id of the new object. */
    addObjectAsync: (input: Partial<IaddObjectInput>, options?: any, extraHeaders?: any) => Promise<[IaddObjectOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS updateObjects. Update object data (title,description,owner) */
    updateObjects: (input: Partial<IupdateObjectsInput>, cb: (err: any | null, result: IupdateObjectsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS updateObjects. Update object data (title,description,owner) */
    updateObjectsAsync: (input: Partial<IupdateObjectsInput>, options?: any, extraHeaders?: any) => Promise<[IupdateObjectsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addReference. Create new link of given object to new object. Return the new reference id */
    addReference: (input: Partial<IaddReferenceInput>, cb: (err: any | null, result: IaddReferenceOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addReference. Create new link of given object to new object. Return the new reference id */
    addReferenceAsync: (input: Partial<IaddReferenceInput>, options?: any, extraHeaders?: any) => Promise<[IaddReferenceOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS deleteObject. Stores object in trash. If multiple references exist, only the reference is deleted  */
    deleteObject: (input: Partial<IdeleteObjectInput>, cb: (err: any | null, result: IdeleteObjectOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS deleteObject. Stores object in trash. If multiple references exist, only the reference is deleted  */
    deleteObjectAsync: (input: Partial<IdeleteObjectInput>, options?: any, extraHeaders?: any) => Promise<[IdeleteObjectOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS removeFromSystemByImportId(). Removes an object identified by its import id permanently from the system. All data will be deleted. There will be no possibility to restore it from the trash. Do not use this function for deleting roles or users. Use deleteUser() or deleteRole() instead. */
    removeFromSystemByImportId: (input: Partial<IremoveFromSystemByImportIdInput>, cb: (err: any | null, result: IremoveFromSystemByImportIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS removeFromSystemByImportId(). Removes an object identified by its import id permanently from the system. All data will be deleted. There will be no possibility to restore it from the trash. Do not use this function for deleting roles or users. Use deleteUser() or deleteRole() instead. */
    removeFromSystemByImportIdAsync: (input: Partial<IremoveFromSystemByImportIdInput>, options?: any, extraHeaders?: any) => Promise<[IremoveFromSystemByImportIdOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addUserRoleEntry. Assign user to role. */
    addUserRoleEntry: (input: Partial<IaddUserRoleEntryInput>, cb: (err: any | null, result: IaddUserRoleEntryOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addUserRoleEntry. Assign user to role. */
    addUserRoleEntryAsync: (input: Partial<IaddUserRoleEntryInput>, options?: any, extraHeaders?: any) => Promise<[IaddUserRoleEntryOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS deleteUserRoleEntry. Deassign user from role. */
    deleteUserRoleEntry: (input: Partial<IdeleteUserRoleEntryInput>, cb: (err: any | null, result: IdeleteUserRoleEntryOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS deleteUserRoleEntry. Deassign user from role. */
    deleteUserRoleEntryAsync: (input: Partial<IdeleteUserRoleEntryInput>, options?: any, extraHeaders?: any) => Promise<[IdeleteUserRoleEntryOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getOperations(): get complete set of RBAC operations. */
    getOperations: (input: Partial<IgetOperationsInput>, cb: (err: any | null, result: IgetOperationsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getOperations(): get complete set of RBAC operations. */
    getOperationsAsync: (input: Partial<IgetOperationsInput>, options?: any, extraHeaders?: any) => Promise<[IgetOperationsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS revokePermissions(): Revoke all permissions for a specific role on an object. */
    revokePermissions: (input: Partial<IrevokePermissionsInput>, cb: (err: any | null, result: IrevokePermissionsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS revokePermissions(): Revoke all permissions for a specific role on an object. */
    revokePermissionsAsync: (input: Partial<IrevokePermissionsInput>, options?: any, extraHeaders?: any) => Promise<[IrevokePermissionsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS grantPermissions(): Grant permissions for a specific role on an object. (Substitutes existing permission settings) */
    grantPermissions: (input: Partial<IgrantPermissionsInput>, cb: (err: any | null, result: IgrantPermissionsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS grantPermissions(): Grant permissions for a specific role on an object. (Substitutes existing permission settings) */
    grantPermissionsAsync: (input: Partial<IgrantPermissionsInput>, options?: any, extraHeaders?: any) => Promise<[IgrantPermissionsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getLocalRoles(): Get all local roles assigned to an specific object. */
    getLocalRoles: (input: Partial<IgetLocalRolesInput>, cb: (err: any | null, result: IgetLocalRolesOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getLocalRoles(): Get all local roles assigned to an specific object. */
    getLocalRolesAsync: (input: Partial<IgetLocalRolesInput>, options?: any, extraHeaders?: any) => Promise<[IgetLocalRolesOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getUserRoles(): Get all local roles assigned to an specific user.  */
    getUserRoles: (input: Partial<IgetUserRolesInput>, cb: (err: any | null, result: IgetUserRolesOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getUserRoles(): Get all local roles assigned to an specific user.  */
    getUserRolesAsync: (input: Partial<IgetUserRolesInput>, options?: any, extraHeaders?: any) => Promise<[IgetUserRolesOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addRole(): Creates new role under given node. &quot;target_id&quot; is the reference id of an ILIAS ILIAS object. E.g ref_id of crs,grp. If no role folder exists, a new role folder will be created. */
    addRole: (input: Partial<IaddRoleInput>, cb: (err: any | null, result: IaddRoleOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addRole(): Creates new role under given node. &quot;target_id&quot; is the reference id of an ILIAS ILIAS object. E.g ref_id of crs,grp. If no role folder exists, a new role folder will be created. */
    addRoleAsync: (input: Partial<IaddRoleInput>, options?: any, extraHeaders?: any) => Promise<[IaddRoleOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS deleteRole(): Deletes an role and all user assignments. Fails if it is the last role of an user */
    deleteRole: (input: Partial<IdeleteRoleInput>, cb: (err: any | null, result: IdeleteRoleOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS deleteRole(): Deletes an role and all user assignments. Fails if it is the last role of an user */
    deleteRoleAsync: (input: Partial<IdeleteRoleInput>, options?: any, extraHeaders?: any) => Promise<[IdeleteRoleOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addRole(): Creates new role under given node. &quot;target_id&quot; is the reference id of an ILIAS ILIAS object. E.g ref_id of crs,grp. If no role folder exists, a new role folder will be created. In addition to addRole the template permissions will be copied from the given role template */
    addRoleFromTemplate: (input: Partial<IaddRoleFromTemplateInput>, cb: (err: any | null, result: IaddRoleFromTemplateOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addRole(): Creates new role under given node. &quot;target_id&quot; is the reference id of an ILIAS ILIAS object. E.g ref_id of crs,grp. If no role folder exists, a new role folder will be created. In addition to addRole the template permissions will be copied from the given role template */
    addRoleFromTemplateAsync: (input: Partial<IaddRoleFromTemplateInput>, options?: any, extraHeaders?: any) => Promise<[IaddRoleFromTemplateOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getObjectTreeOperations(): Get all granted permissions for all references of an object for a specific user. Returns array of granted operations or empty array */
    getObjectTreeOperations: (input: Partial<IgetObjectTreeOperationsInput>, cb: (err: any | null, result: IgetObjectTreeOperationsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getObjectTreeOperations(): Get all granted permissions for all references of an object for a specific user. Returns array of granted operations or empty array */
    getObjectTreeOperationsAsync: (input: Partial<IgetObjectTreeOperationsInput>, options?: any, extraHeaders?: any) => Promise<[IgetObjectTreeOperationsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addGroup(): Add grop according to valid group XML @See ilias_group_0_1.dtd */
    addGroup: (input: Partial<IaddGroupInput>, cb: (err: any | null, result: IaddGroupOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addGroup(): Add grop according to valid group XML @See ilias_group_0_1.dtd */
    addGroupAsync: (input: Partial<IaddGroupInput>, options?: any, extraHeaders?: any) => Promise<[IaddGroupOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addGroup(): Check if group with given name exists.  */
    groupExists: (input: Partial<IgroupExistsInput>, cb: (err: any | null, result: IgroupExistsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addGroup(): Check if group with given name exists.  */
    groupExistsAsync: (input: Partial<IgroupExistsInput>, options?: any, extraHeaders?: any) => Promise<[IgroupExistsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getGroup(): get xml description of grouip with given reference id. */
    getGroup: (input: Partial<IgetGroupInput>, cb: (err: any | null, result: IgetGroupOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getGroup(): get xml description of grouip with given reference id. */
    getGroupAsync: (input: Partial<IgetGroupInput>, options?: any, extraHeaders?: any) => Promise<[IgetGroupOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS assignGroupMember(). Assigns an user to an existing group. Type should be &quot;Admin&quot;,&quot;Member&quot; */
    assignGroupMember: (input: Partial<IassignGroupMemberInput>, cb: (err: any | null, result: IassignGroupMemberOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS assignGroupMember(). Assigns an user to an existing group. Type should be &quot;Admin&quot;,&quot;Member&quot; */
    assignGroupMemberAsync: (input: Partial<IassignGroupMemberInput>, options?: any, extraHeaders?: any) => Promise<[IassignGroupMemberOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS excludeGroupMember(). Excludes an user from an existing group. */
    excludeGroupMember: (input: Partial<IexcludeGroupMemberInput>, cb: (err: any | null, result: IexcludeGroupMemberOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS excludeGroupMember(). Excludes an user from an existing group. */
    excludeGroupMemberAsync: (input: Partial<IexcludeGroupMemberInput>, options?: any, extraHeaders?: any) => Promise<[IexcludeGroupMemberOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS isAssignedToGroup(). Checks whether an user is assigned to a given group. Returns 0 =&gt; not assigned, 1 =&gt; group admin, 2 =&gt; group member */
    isAssignedToGroup: (input: Partial<IisAssignedToGroupInput>, cb: (err: any | null, result: IisAssignedToGroupOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS isAssignedToGroup(). Checks whether an user is assigned to a given group. Returns 0 =&gt; not assigned, 1 =&gt; group admin, 2 =&gt; group member */
    isAssignedToGroupAsync: (input: Partial<IisAssignedToGroupInput>, options?: any, extraHeaders?: any) => Promise<[IisAssignedToGroupOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS distributeMails(): Distribute ILIAS mails according according to the mail setting of the recipients as ILIAS internal mail or as e-mail. */
    distributeMails: (input: Partial<IdistributeMailsInput>, cb: (err: any | null, result: IdistributeMailsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS distributeMails(): Distribute ILIAS mails according according to the mail setting of the recipients as ILIAS internal mail or as e-mail. */
    distributeMailsAsync: (input: Partial<IdistributeMailsInput>, options?: any, extraHeaders?: any) => Promise<[IdistributeMailsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS ilClone(): Only for internal usage.Syntax, parameters may change in future releases.  */
    ilClone: (input: Partial<IilCloneInput>, cb: (err: any | null, result: IilCloneOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS ilClone(): Only for internal usage.Syntax, parameters may change in future releases.  */
    ilCloneAsync: (input: Partial<IilCloneInput>, options?: any, extraHeaders?: any) => Promise<[IilCloneOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS handleECSTasks(): Only for internal usage.Syntax, parameters may change in future releases.  */
    handleECSTasks: (input: Partial<IhandleECSTasksInput>, cb: (err: any | null, result: IhandleECSTasksOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS handleECSTasks(): Only for internal usage.Syntax, parameters may change in future releases.  */
    handleECSTasksAsync: (input: Partial<IhandleECSTasksInput>, options?: any, extraHeaders?: any) => Promise<[IhandleECSTasksOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS ilCloneDependencies(): Only for internal usage.Syntax, parameters may change in future releases.  */
    ilCloneDependencies: (input: Partial<IilCloneDependenciesInput>, cb: (err: any | null, result: IilCloneDependenciesOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS ilCloneDependencies(): Only for internal usage.Syntax, parameters may change in future releases.  */
    ilCloneDependenciesAsync: (input: Partial<IilCloneDependenciesInput>, options?: any, extraHeaders?: any) => Promise<[IilCloneDependenciesOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS saveQuesionResult: Typically called from an external assessment question to save the user input. DEPRECATED since ILIAS 3.9 */
    saveQuestionResult: (input: Partial<IsaveQuestionResultInput>, cb: (err: any | null, result: IsaveQuestionResultOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS saveQuesionResult: Typically called from an external assessment question to save the user input. DEPRECATED since ILIAS 3.9 */
    saveQuestionResultAsync: (input: Partial<IsaveQuestionResultInput>, options?: any, extraHeaders?: any) => Promise<[IsaveQuestionResultOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS saveQuestion: Saves the result of a question in a given test pass for the active test user. The active user is identified by the active ID, which assigns a user to a test. */
    saveQuestion: (input: Partial<IsaveQuestionInput>, cb: (err: any | null, result: IsaveQuestionOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS saveQuestion: Saves the result of a question in a given test pass for the active test user. The active user is identified by the active ID, which assigns a user to a test. */
    saveQuestionAsync: (input: Partial<IsaveQuestionInput>, options?: any, extraHeaders?: any) => Promise<[IsaveQuestionOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS saveQuestionSolution: Saves the result of a question in a given test pass for the active test user. The active user is identified by the active ID, which assigns a user to a test. The solution has to be an XML string which contains &amp;lt;values&amp;gt;&amp;lt;value&amp;gt;VALUE&amp;lt;/value&amp;gt;&amp;lt;value&amp;gt;VALUE&amp;lt;/value&amp;gt;&amp;lt;points&amp;gt;POINTS&amp;lt;/points&amp;gt;...&amp;lt;/values&amp;gt; where the triplet (value,value,points) can repeat n times. The result string is either TRUE or it contains an error message. */
    saveQuestionSolution: (input: Partial<IsaveQuestionSolutionInput>, cb: (err: any | null, result: IsaveQuestionSolutionOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS saveQuestionSolution: Saves the result of a question in a given test pass for the active test user. The active user is identified by the active ID, which assigns a user to a test. The solution has to be an XML string which contains &amp;lt;values&amp;gt;&amp;lt;value&amp;gt;VALUE&amp;lt;/value&amp;gt;&amp;lt;value&amp;gt;VALUE&amp;lt;/value&amp;gt;&amp;lt;points&amp;gt;POINTS&amp;lt;/points&amp;gt;...&amp;lt;/values&amp;gt; where the triplet (value,value,points) can repeat n times. The result string is either TRUE or it contains an error message. */
    saveQuestionSolutionAsync: (input: Partial<IsaveQuestionSolutionInput>, options?: any, extraHeaders?: any) => Promise<[IsaveQuestionSolutionOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getQuestionSolution: Typically called from external assessment questions to retrieve the previous input of a user. */
    getQuestionSolution: (input: Partial<IgetQuestionSolutionInput>, cb: (err: any | null, result: IgetQuestionSolutionOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getQuestionSolution: Typically called from external assessment questions to retrieve the previous input of a user. */
    getQuestionSolutionAsync: (input: Partial<IgetQuestionSolutionInput>, options?: any, extraHeaders?: any) => Promise<[IgetQuestionSolutionOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getTestUserData: Typically called from external assessment questions to retrieve data of the active user. The returned string array values are fullname, title, firstname, lastname, login. */
    getTestUserData: (input: Partial<IgetTestUserDataInput>, cb: (err: any | null, result: IgetTestUserDataOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getTestUserData: Typically called from external assessment questions to retrieve data of the active user. The returned string array values are fullname, title, firstname, lastname, login. */
    getTestUserDataAsync: (input: Partial<IgetTestUserDataInput>, options?: any, extraHeaders?: any) => Promise<[IgetTestUserDataOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getPositionOfQuestion: Returns the position of a given question for a given user in a given test pass. */
    getPositionOfQuestion: (input: Partial<IgetPositionOfQuestionInput>, cb: (err: any | null, result: IgetPositionOfQuestionOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getPositionOfQuestion: Returns the position of a given question for a given user in a given test pass. */
    getPositionOfQuestionAsync: (input: Partial<IgetPositionOfQuestionInput>, options?: any, extraHeaders?: any) => Promise<[IgetPositionOfQuestionOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getPreviousReachedPoints: Returns an array of reached points for the previous questions in a given test pass. */
    getPreviousReachedPoints: (input: Partial<IgetPreviousReachedPointsInput>, cb: (err: any | null, result: IgetPreviousReachedPointsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getPreviousReachedPoints: Returns an array of reached points for the previous questions in a given test pass. */
    getPreviousReachedPointsAsync: (input: Partial<IgetPreviousReachedPointsInput>, options?: any, extraHeaders?: any) => Promise<[IgetPreviousReachedPointsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getNrOfQuestionsInPass: Returns the question count for a given test user in a given pass. */
    getNrOfQuestionsInPass: (input: Partial<IgetNrOfQuestionsInPassInput>, cb: (err: any | null, result: IgetNrOfQuestionsInPassOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getNrOfQuestionsInPass: Returns the question count for a given test user in a given pass. */
    getNrOfQuestionsInPassAsync: (input: Partial<IgetNrOfQuestionsInPassInput>, options?: any, extraHeaders?: any) => Promise<[IgetNrOfQuestionsInPassOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getStructureObjects: delivers structure of content objects like learning modules (chapters/pages) or glossary (terms) */
    getStructureObjects: (input: Partial<IgetStructureObjectsInput>, cb: (err: any | null, result: IgetStructureObjectsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getStructureObjects: delivers structure of content objects like learning modules (chapters/pages) or glossary (terms) */
    getStructureObjectsAsync: (input: Partial<IgetStructureObjectsInput>, options?: any, extraHeaders?: any) => Promise<[IgetStructureObjectsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS import users into folder id, which should be ref_id of folder or user folder (-1:System user folder, 0: checks access at user level, otherwise refid): conflict_rule: IL_FAIL_ON_CONFLICT = 1, IL_UPDATE_ON_CONFLICT = 2, IL_IGNORE_ON_CONFLICT = 3. The Return-Value is a protocol with the columns userid, login, action, message, following xmlresultset dtd. Send Account Mail = 0 deactivates sending a mail to each user, 1 activates it */
    importUsers: (input: Partial<IimportUsersInput>, cb: (err: any | null, result: IimportUsersOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS import users into folder id, which should be ref_id of folder or user folder (-1:System user folder, 0: checks access at user level, otherwise refid): conflict_rule: IL_FAIL_ON_CONFLICT = 1, IL_UPDATE_ON_CONFLICT = 2, IL_IGNORE_ON_CONFLICT = 3. The Return-Value is a protocol with the columns userid, login, action, message, following xmlresultset dtd. Send Account Mail = 0 deactivates sending a mail to each user, 1 activates it */
    importUsersAsync: (input: Partial<IimportUsersInput>, options?: any, extraHeaders?: any) => Promise<[IimportUsersOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getRoles():if id equals -1, get all roles specified by type (global|local|user|user_login|template or empty), if type is empty all roles with all types are delivered, if id &gt; -1 and role_type &lt;&gt; user or user_login, delivers all roles which belong to a repository object with specified ref_id, if roletype is user a numeric id is interpreted as userid, if roletype is user_login it is interpreted as login,if roletype is template all role templates will be listed */
    getRoles: (input: Partial<IgetRolesInput>, cb: (err: any | null, result: IgetRolesOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getRoles():if id equals -1, get all roles specified by type (global|local|user|user_login|template or empty), if type is empty all roles with all types are delivered, if id &gt; -1 and role_type &lt;&gt; user or user_login, delivers all roles which belong to a repository object with specified ref_id, if roletype is user a numeric id is interpreted as userid, if roletype is user_login it is interpreted as login,if roletype is template all role templates will be listed */
    getRolesAsync: (input: Partial<IgetRolesInput>, options?: any, extraHeaders?: any) => Promise<[IgetRolesOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getUsersForContainer(): get all users of a specific ref_id, which can be crs, group, category or user folder (value: -1). Choose if all roles of a user should be attached (1) or not (0). set active to -1 to get all, 0, to get inactive users only, 1 to get active users only */
    getUsersForContainer: (input: Partial<IgetUsersForContainerInput>, cb: (err: any | null, result: IgetUsersForContainerOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getUsersForContainer(): get all users of a specific ref_id, which can be crs, group, category or user folder (value: -1). Choose if all roles of a user should be attached (1) or not (0). set active to -1 to get all, 0, to get inactive users only, 1 to get active users only */
    getUsersForContainerAsync: (input: Partial<IgetUsersForContainerInput>, options?: any, extraHeaders?: any) => Promise<[IgetUsersForContainerOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getUsersForRole(): get all users of a role with specified id, specify attach_roles to 1, to attach all role assignmnents; specify active: 1, to import active only, 0: inactive only, -1: both */
    getUsersForRole: (input: Partial<IgetUsersForRoleInput>, cb: (err: any | null, result: IgetUsersForRoleOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getUsersForRole(): get all users of a role with specified id, specify attach_roles to 1, to attach all role assignmnents; specify active: 1, to import active only, 0: inactive only, -1: both */
    getUsersForRoleAsync: (input: Partial<IgetUsersForRoleInput>, options?: any, extraHeaders?: any) => Promise<[IgetUsersForRoleOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS searchUser(): get all users, which match a query, consisting of the keyfields, matched with values of the field values, concatenated with the logical query operator. Specify attach_roles to 1, to attach all role assignmnents; specify active: 1, to import active only, 0: inactive only, -1: both */
    searchUser: (input: Partial<IsearchUserInput>, cb: (err: any | null, result: IsearchUserOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS searchUser(): get all users, which match a query, consisting of the keyfields, matched with values of the field values, concatenated with the logical query operator. Specify attach_roles to 1, to attach all role assignmnents; specify active: 1, to import active only, 0: inactive only, -1: both */
    searchUserAsync: (input: Partial<IsearchUserInput>, options?: any, extraHeaders?: any) => Promise<[IsearchUserOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS hasNewMail(): Checks whether the current authenticated user has a new mail. */
    hasNewMail: (input: Partial<IhasNewMailInput>, cb: (err: any | null, result: IhasNewMailOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS hasNewMail(): Checks whether the current authenticated user has a new mail. */
    hasNewMailAsync: (input: Partial<IhasNewMailInput>, options?: any, extraHeaders?: any) => Promise<[IhasNewMailOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getNIC(): DEPRECATED: use getClientInfoXML instead. was: return client information from current client as xml result set containing installation_id, installation_version, installation_url, installation_description, installation_language_default as columns */
    getNIC: (input: Partial<IgetNICInput>, cb: (err: any | null, result: IgetNICOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getNIC(): DEPRECATED: use getClientInfoXML instead. was: return client information from current client as xml result set containing installation_id, installation_version, installation_url, installation_description, installation_language_default as columns */
    getNICAsync: (input: Partial<IgetNICInput>, options?: any, extraHeaders?: any) => Promise<[IgetNICOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getExerciseXML(): returns xml description of exercise. Attachment mode: 0 - no file contents, 1 - plain content (base64encoded), 2 zlib + base64, 3 gzip + base64) */
    getExerciseXML: (input: Partial<IgetExerciseXMLInput>, cb: (err: any | null, result: IgetExerciseXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getExerciseXML(): returns xml description of exercise. Attachment mode: 0 - no file contents, 1 - plain content (base64encoded), 2 zlib + base64, 3 gzip + base64) */
    getExerciseXMLAsync: (input: Partial<IgetExerciseXMLInput>, options?: any, extraHeaders?: any) => Promise<[IgetExerciseXMLOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addExercise(): create exercise, put it into target (ref_id) and update exercise properties from xml (see ilias_exercise_3_8.dtd for details). Obj_id must not be set! */
    addExercise: (input: Partial<IaddExerciseInput>, cb: (err: any | null, result: IaddExerciseOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addExercise(): create exercise, put it into target (ref_id) and update exercise properties from xml (see ilias_exercise_3_8.dtd for details). Obj_id must not be set! */
    addExerciseAsync: (input: Partial<IaddExerciseInput>, options?: any, extraHeaders?: any) => Promise<[IaddExerciseOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS updateExercise():update existing exercise, update exercise properties from xml (see ilias_exercise_3_8.dtd for details). obj_id in xml must match according obj id of refid.! */
    updateExercise: (input: Partial<IupdateExerciseInput>, cb: (err: any | null, result: IupdateExerciseOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS updateExercise():update existing exercise, update exercise properties from xml (see ilias_exercise_3_8.dtd for details). obj_id in xml must match according obj id of refid.! */
    updateExerciseAsync: (input: Partial<IupdateExerciseInput>, options?: any, extraHeaders?: any) => Promise<[IupdateExerciseOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getFileXML(): returns xml description of file. Attachment mode: 0 - no file contents, 1 - plain content (base64encoded), 2 zlib + base64, 3 gzip + base64) */
    getFileXML: (input: Partial<IgetFileXMLInput>, cb: (err: any | null, result: IgetFileXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getFileXML(): returns xml description of file. Attachment mode: 0 - no file contents, 1 - plain content (base64encoded), 2 zlib + base64, 3 gzip + base64) */
    getFileXMLAsync: (input: Partial<IgetFileXMLInput>, options?: any, extraHeaders?: any) => Promise<[IgetFileXMLOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS addFile(): create file, put it into target (ref_id) and update file properties from xml (see ilias_file_3_8.dtd for details). Obj_id must not be set! */
    addFile: (input: Partial<IaddFileInput>, cb: (err: any | null, result: IaddFileOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS addFile(): create file, put it into target (ref_id) and update file properties from xml (see ilias_file_3_8.dtd for details). Obj_id must not be set! */
    addFileAsync: (input: Partial<IaddFileInput>, options?: any, extraHeaders?: any) => Promise<[IaddFileOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS updateFile():update existing file, update file properties from xml (see ilias_file_3_8.dtd for details). obj_id in xml must match according obj id of refid.! */
    updateFile: (input: Partial<IupdateFileInput>, cb: (err: any | null, result: IupdateFileOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS updateFile():update existing file, update file properties from xml (see ilias_file_3_8.dtd for details). obj_id in xml must match according obj id of refid.! */
    updateFileAsync: (input: Partial<IupdateFileInput>, options?: any, extraHeaders?: any) => Promise<[IupdateFileOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getUserXML(): get xml records for user ids, e.g. retrieved vom members of course xml. Returns user xml dtds. ids are numeric ids of user */
    getUserXML: (input: Partial<IgetUserXMLInput>, cb: (err: any | null, result: IgetUserXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getUserXML(): get xml records for user ids, e.g. retrieved vom members of course xml. Returns user xml dtds. ids are numeric ids of user */
    getUserXMLAsync: (input: Partial<IgetUserXMLInput>, options?: any, extraHeaders?: any) => Promise<[IgetUserXMLOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getObjIdsForRefIds: Returns a array of object ids which match the references id, given by a comma seperated string. Returns an array of ref ids, in the same order as object ids. Therefore, there might by duplicates */
    getObjIdsByRefIds: (input: Partial<IgetObjIdsByRefIdsInput>, cb: (err: any | null, result: IgetObjIdsByRefIdsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getObjIdsForRefIds: Returns a array of object ids which match the references id, given by a comma seperated string. Returns an array of ref ids, in the same order as object ids. Therefore, there might by duplicates */
    getObjIdsByRefIdsAsync: (input: Partial<IgetObjIdsByRefIdsInput>, options?: any, extraHeaders?: any) => Promise<[IgetObjIdsByRefIdsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS updateGroup(): update existing group using ref id and group xml (see DTD). */
    updateGroup: (input: Partial<IupdateGroupInput>, cb: (err: any | null, result: IupdateGroupOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS updateGroup(): update existing group using ref id and group xml (see DTD). */
    updateGroupAsync: (input: Partial<IupdateGroupInput>, options?: any, extraHeaders?: any) => Promise<[IupdateGroupOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getIMSManifestXML(): returns xml of ims manifest file (scorm learning module) referred by refid */
    getIMSManifestXML: (input: Partial<IgetIMSManifestXMLInput>, cb: (err: any | null, result: IgetIMSManifestXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getIMSManifestXML(): returns xml of ims manifest file (scorm learning module) referred by refid */
    getIMSManifestXMLAsync: (input: Partial<IgetIMSManifestXMLInput>, options?: any, extraHeaders?: any) => Promise<[IgetIMSManifestXMLOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS hasSCORMCertificate(): returns true if a certficate is available for a user referred by usr_id in a SCORM learning module referred by ref_id */
    hasSCORMCertificate: (input: Partial<IhasSCORMCertificateInput>, cb: (err: any | null, result: IhasSCORMCertificateOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS hasSCORMCertificate(): returns true if a certficate is available for a user referred by usr_id in a SCORM learning module referred by ref_id */
    hasSCORMCertificateAsync: (input: Partial<IhasSCORMCertificateInput>, options?: any, extraHeaders?: any) => Promise<[IhasSCORMCertificateOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getSCORMCompletionStatus(): returns a completion status of a scorm module */
    getSCORMCompletionStatus: (input: Partial<IgetSCORMCompletionStatusInput>, cb: (err: any | null, result: IgetSCORMCompletionStatusOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getSCORMCompletionStatus(): returns a completion status of a scorm module */
    getSCORMCompletionStatusAsync: (input: Partial<IgetSCORMCompletionStatusInput>, options?: any, extraHeaders?: any) => Promise<[IgetSCORMCompletionStatusOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS copyObject(): returns reference of copy, if copy is created directly, or the ref id of the target if copy is in progress. */
    copyObject: (input: Partial<IcopyObjectInput>, cb: (err: any | null, result: IcopyObjectOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS copyObject(): returns reference of copy, if copy is created directly, or the ref id of the target if copy is in progress. */
    copyObjectAsync: (input: Partial<IcopyObjectInput>, options?: any, extraHeaders?: any) => Promise<[IcopyObjectOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS moveObject(): returns true, if object with refid could be successfully moved to target id, other it raises an error. */
    moveObject: (input: Partial<ImoveObjectInput>, cb: (err: any | null, result: ImoveObjectOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS moveObject(): returns true, if object with refid could be successfully moved to target id, other it raises an error. */
    moveObjectAsync: (input: Partial<ImoveObjectInput>, options?: any, extraHeaders?: any) => Promise<[ImoveObjectOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getTestResults(): returns XMLResultSe */
    getTestResults: (input: Partial<IgetTestResultsInput>, cb: (err: any | null, result: IgetTestResultsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getTestResults(): returns XMLResultSe */
    getTestResultsAsync: (input: Partial<IgetTestResultsInput>, options?: any, extraHeaders?: any) => Promise<[IgetTestResultsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS removeTestResults(): remove test results for the chosen users */
    removeTestResults: (input: Partial<IremoveTestResultsInput>, cb: (err: any | null, result: IremoveTestResultsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS removeTestResults(): remove test results for the chosen users */
    removeTestResultsAsync: (input: Partial<IremoveTestResultsInput>, options?: any, extraHeaders?: any) => Promise<[IremoveTestResultsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getTestResults(): returns XMLResultSet with columns ref_id, course xml. $parameters has to contain a column user_id and a column status. Status is a logical AND combined value of (MEMBER = 1, TUTOR = 2, ADMIN = 4, OWNER = 8) and determines which courses should be returned. */
    getCoursesForUser: (input: Partial<IgetCoursesForUserInput>, cb: (err: any | null, result: IgetCoursesForUserOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getTestResults(): returns XMLResultSet with columns ref_id, course xml. $parameters has to contain a column user_id and a column status. Status is a logical AND combined value of (MEMBER = 1, TUTOR = 2, ADMIN = 4, OWNER = 8) and determines which courses should be returned. */
    getCoursesForUserAsync: (input: Partial<IgetCoursesForUserInput>, options?: any, extraHeaders?: any) => Promise<[IgetCoursesForUserOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getTestResults(): returns XMLResultSet with columns ref_id, group xml. $parameters has to contain a column user_id and a column status. Status is a logical AND combined value of (MEMBER = 1, TUTOR = 2, OWNER = 4) and determines which groups should be returned. */
    getGroupsForUser: (input: Partial<IgetGroupsForUserInput>, cb: (err: any | null, result: IgetGroupsForUserOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getTestResults(): returns XMLResultSet with columns ref_id, group xml. $parameters has to contain a column user_id and a column status. Status is a logical AND combined value of (MEMBER = 1, TUTOR = 2, OWNER = 4) and determines which groups should be returned. */
    getGroupsForUserAsync: (input: Partial<IgetGroupsForUserInput>, options?: any, extraHeaders?: any) => Promise<[IgetGroupsForUserOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getPathForRefId(): returns XMLResultSet with columns ref_id, type and title. */
    getPathForRefId: (input: Partial<IgetPathForRefIdInput>, cb: (err: any | null, result: IgetPathForRefIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getPathForRefId(): returns XMLResultSet with columns ref_id, type and title. */
    getPathForRefIdAsync: (input: Partial<IgetPathForRefIdInput>, options?: any, extraHeaders?: any) => Promise<[IgetPathForRefIdOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS searchRoles(): returns XML following role dtd with search results for given role type and search terms. */
    searchRoles: (input: Partial<IsearchRolesInput>, cb: (err: any | null, result: IsearchRolesOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS searchRoles(): returns XML following role dtd with search results for given role type and search terms. */
    searchRolesAsync: (input: Partial<IsearchRolesInput>, options?: any, extraHeaders?: any) => Promise<[IsearchRolesOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getInstallationInfoXML(): returns XML following installation_info dtd */
    getInstallationInfoXML: (input: null, cb: (err: any | null, result: IgetInstallationInfoXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getInstallationInfoXML(): returns XML following installation_info dtd */
    getInstallationInfoXMLAsync: (input: null, options?: any, extraHeaders?: any) => Promise<[IgetInstallationInfoXMLOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getClientInfoXML(): returns XML following installation_info dtd, contains the client the data of given client id */
    getClientInfoXML: (input: Partial<IgetClientInfoXMLInput>, cb: (err: any | null, result: IgetClientInfoXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getClientInfoXML(): returns XML following installation_info dtd, contains the client the data of given client id */
    getClientInfoXMLAsync: (input: Partial<IgetClientInfoXMLInput>, options?: any, extraHeaders?: any) => Promise<[IgetClientInfoXMLOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getSkillCompletionDateForTriggerRefId(). Get completion dates for skill trigger ref ids. */
    getSkillCompletionDateForTriggerRefId: (input: Partial<IgetSkillCompletionDateForTriggerRefIdInput>, cb: (err: any | null, result: IgetSkillCompletionDateForTriggerRefIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getSkillCompletionDateForTriggerRefId(). Get completion dates for skill trigger ref ids. */
    getSkillCompletionDateForTriggerRefIdAsync: (input: Partial<IgetSkillCompletionDateForTriggerRefIdInput>, options?: any, extraHeaders?: any) => Promise<[IgetSkillCompletionDateForTriggerRefIdOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS checkSkillUserCertificateForTriggerRefId(). Check user certificates for trigger ref ids. */
    checkSkillUserCertificateForTriggerRefId: (input: Partial<IcheckSkillUserCertificateForTriggerRefIdInput>, cb: (err: any | null, result: IcheckSkillUserCertificateForTriggerRefIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS checkSkillUserCertificateForTriggerRefId(). Check user certificates for trigger ref ids. */
    checkSkillUserCertificateForTriggerRefIdAsync: (input: Partial<IcheckSkillUserCertificateForTriggerRefIdInput>, options?: any, extraHeaders?: any) => Promise<[IcheckSkillUserCertificateForTriggerRefIdOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getSkillTriggerOfAllCertificates(). Check get all trigger with certificate for a user. */
    getSkillTriggerOfAllCertificates: (input: Partial<IgetSkillTriggerOfAllCertificatesInput>, cb: (err: any | null, result: IgetSkillTriggerOfAllCertificatesOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getSkillTriggerOfAllCertificates(). Check get all trigger with certificate for a user. */
    getSkillTriggerOfAllCertificatesAsync: (input: Partial<IgetSkillTriggerOfAllCertificatesInput>, options?: any, extraHeaders?: any) => Promise<[IgetSkillTriggerOfAllCertificatesOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getUserIdBySid(): returns an ILIAS usr_id for the given sid */
    getUserIdBySid: (input: Partial<IgetUserIdBySidInput>, cb: (err: any | null, result: IgetUserIdBySidOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getUserIdBySid(): returns an ILIAS usr_id for the given sid */
    getUserIdBySidAsync: (input: Partial<IgetUserIdBySidInput>, options?: any, extraHeaders?: any) => Promise<[IgetUserIdBySidOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS deleteExpiredDualOptInUserObjects(): Deletes expired user accounts caused by unconfirmed registration links in &quot;dual opt in&quot; registration method */
    deleteExpiredDualOptInUserObjects: (input: Partial<IdeleteExpiredDualOptInUserObjectsInput>, cb: (err: any | null, result: IdeleteExpiredDualOptInUserObjectsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS deleteExpiredDualOptInUserObjects(): Deletes expired user accounts caused by unconfirmed registration links in &quot;dual opt in&quot; registration method */
    deleteExpiredDualOptInUserObjectsAsync: (input: Partial<IdeleteExpiredDualOptInUserObjectsInput>, options?: any, extraHeaders?: any) => Promise<[IdeleteExpiredDualOptInUserObjectsOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS readWebLink(): returns xml description of a weblink container. */
    readWebLink: (input: Partial<IreadWebLinkInput>, cb: (err: any | null, result: IreadWebLinkOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS readWebLink(): returns xml description of a weblink container. */
    readWebLinkAsync: (input: Partial<IreadWebLinkInput>, options?: any, extraHeaders?: any) => Promise<[IreadWebLinkOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS createWebLink(): create web link container, put it into target (ref_id) and update weblink container from xml (see ilias_weblink_4_0.dtd for details). Obj_id must not be set! */
    createWebLink: (input: Partial<IcreateWebLinkInput>, cb: (err: any | null, result: IcreateWebLinkOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS createWebLink(): create web link container, put it into target (ref_id) and update weblink container from xml (see ilias_weblink_4_0.dtd for details). Obj_id must not be set! */
    createWebLinkAsync: (input: Partial<IcreateWebLinkInput>, options?: any, extraHeaders?: any) => Promise<[IcreateWebLinkOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS updateWebLink():update existing weblink, update weblink properties from xml (see ilias_weblink_4_0.dtd for details). */
    updateWebLink: (input: Partial<IupdateWebLinkInput>, cb: (err: any | null, result: IupdateWebLinkOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS updateWebLink():update existing weblink, update weblink properties from xml (see ilias_weblink_4_0.dtd for details). */
    updateWebLinkAsync: (input: Partial<IupdateWebLinkInput>, options?: any, extraHeaders?: any) => Promise<[IupdateWebLinkOutput, string, {[k: string]: any; }, string]>;
    /** ILIAS getLearningProgressChanges(): Get learning progress changes after a given timestamp. */
    getLearningProgressChanges: (input: Partial<IgetLearningProgressChangesInput>, cb: (err: any | null, result: IgetLearningProgressChangesOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** ILIAS getLearningProgressChanges(): Get learning progress changes after a given timestamp. */
    getLearningProgressChangesAsync: (input: Partial<IgetLearningProgressChangesInput>, options?: any, extraHeaders?: any) => Promise<[IgetLearningProgressChangesOutput, string, {[k: string]: any; }, string]>;
    /** Delete user progress data of objects.  */
    deleteProgress: (input: Partial<IdeleteProgressInput>, cb: (err: any | null, result: IdeleteProgressOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Delete user progress data of objects.  */
    deleteProgressAsync: (input: Partial<IdeleteProgressInput>, options?: any, extraHeaders?: any) => Promise<[IdeleteProgressOutput, string, {[k: string]: any; }, string]>;
    /** Get object learning progress information */
    getProgressInfo: (input: Partial<IgetProgressInfoInput>, cb: (err: any | null, result: IgetProgressInfoOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Get object learning progress information */
    getProgressInfoAsync: (input: Partial<IgetProgressInfoInput>, options?: any, extraHeaders?: any) => Promise<[IgetProgressInfoOutput, string, {[k: string]: any; }, string]>;
    /** Generate DataCollectionContent Export */
    exportDataCollectionContent: (input: Partial<IexportDataCollectionContentInput>, cb: (err: any | null, result: IexportDataCollectionContentOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Generate DataCollectionContent Export */
    exportDataCollectionContentAsync: (input: Partial<IexportDataCollectionContentInput>, options?: any, extraHeaders?: any) => Promise<[IexportDataCollectionContentOutput, string, {[k: string]: any; }, string]>;
    /** Process task in background */
    processBackgroundTask: (input: Partial<IprocessBackgroundTaskInput>, cb: (err: any | null, result: IprocessBackgroundTaskOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Process task in background */
    processBackgroundTaskAsync: (input: Partial<IprocessBackgroundTaskInput>, options?: any, extraHeaders?: any) => Promise<[IprocessBackgroundTaskOutput, string, {[k: string]: any; }, string]>;
    /** Add desktop items for user */
    addDesktopItems: (input: Partial<IaddDesktopItemsInput>, cb: (err: any | null, result: IaddDesktopItemsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Add desktop items for user */
    addDesktopItemsAsync: (input: Partial<IaddDesktopItemsInput>, options?: any, extraHeaders?: any) => Promise<[IaddDesktopItemsOutput, string, {[k: string]: any; }, string]>;
    /** Remove desktop items for user */
    removeDesktopItems: (input: Partial<IremoveDesktopItemsInput>, cb: (err: any | null, result: IremoveDesktopItemsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Remove desktop items for user */
    removeDesktopItemsAsync: (input: Partial<IremoveDesktopItemsInput>, options?: any, extraHeaders?: any) => Promise<[IremoveDesktopItemsOutput, string, {[k: string]: any; }, string]>;
    /** Adds a user to a position in a orgunit */
    addUserToPositionInOrgUnit: (input: Partial<IaddUserToPositionInOrgUnitInput>, cb: (err: any | null, result: IaddUserToPositionInOrgUnitOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Adds a user to a position in a orgunit */
    addUserToPositionInOrgUnitAsync: (input: Partial<IaddUserToPositionInOrgUnitInput>, options?: any, extraHeaders?: any) => Promise<[IaddUserToPositionInOrgUnitOutput, string, {[k: string]: any; }, string]>;
    /** Returns the id of the default position 'Employee' */
    getEmployeePositionId: (input: Partial<IgetEmployeePositionIdInput>, cb: (err: any | null, result: IgetEmployeePositionIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Returns the id of the default position 'Employee' */
    getEmployeePositionIdAsync: (input: Partial<IgetEmployeePositionIdInput>, options?: any, extraHeaders?: any) => Promise<[IgetEmployeePositionIdOutput, string, {[k: string]: any; }, string]>;
    /** Imports ILIAS Organisational Units (SimpleXML) */
    importOrgUnitsSimpleXML: (input: Partial<IimportOrgUnitsSimpleXMLInput>, cb: (err: any | null, result: IimportOrgUnitsSimpleXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Imports ILIAS Organisational Units (SimpleXML) */
    importOrgUnitsSimpleXMLAsync: (input: Partial<IimportOrgUnitsSimpleXMLInput>, options?: any, extraHeaders?: any) => Promise<[IimportOrgUnitsSimpleXMLOutput, string, {[k: string]: any; }, string]>;
    /** Returns the ILIAS Organisational Units (SimpleXML) */
    getOrgUnitsSimpleXML: (input: Partial<IgetOrgUnitsSimpleXMLInput>, cb: (err: any | null, result: IgetOrgUnitsSimpleXMLOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Returns the ILIAS Organisational Units (SimpleXML) */
    getOrgUnitsSimpleXMLAsync: (input: Partial<IgetOrgUnitsSimpleXMLInput>, options?: any, extraHeaders?: any) => Promise<[IgetOrgUnitsSimpleXMLOutput, string, {[k: string]: any; }, string]>;
    /** Returns an array of all existing position ids */
    getPositionIds: (input: Partial<IgetPositionIdsInput>, cb: (err: any | null, result: IgetPositionIdsOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Returns an array of all existing position ids */
    getPositionIdsAsync: (input: Partial<IgetPositionIdsInput>, options?: any, extraHeaders?: any) => Promise<[IgetPositionIdsOutput, string, {[k: string]: any; }, string]>;
    /** Returns the title of a position for a given position id */
    getPositionTitle: (input: Partial<IgetPositionTitleInput>, cb: (err: any | null, result: IgetPositionTitleOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Returns the title of a position for a given position id */
    getPositionTitleAsync: (input: Partial<IgetPositionTitleInput>, options?: any, extraHeaders?: any) => Promise<[IgetPositionTitleOutput, string, {[k: string]: any; }, string]>;
    /** Removes a user from a position in a orgunit */
    removeUserFromPositionInOrgUnit: (input: Partial<IremoveUserFromPositionInOrgUnitInput>, cb: (err: any | null, result: IremoveUserFromPositionInOrgUnitOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Removes a user from a position in a orgunit */
    removeUserFromPositionInOrgUnitAsync: (input: Partial<IremoveUserFromPositionInOrgUnitInput>, options?: any, extraHeaders?: any) => Promise<[IremoveUserFromPositionInOrgUnitOutput, string, {[k: string]: any; }, string]>;
    /** Returns the id of the default position 'Superior' */
    getSuperiorPositionId: (input: Partial<IgetSuperiorPositionIdInput>, cb: (err: any | null, result: IgetSuperiorPositionIdOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Returns the id of the default position 'Superior' */
    getSuperiorPositionIdAsync: (input: Partial<IgetSuperiorPositionIdInput>, options?: any, extraHeaders?: any) => Promise<[IgetSuperiorPositionIdOutput, string, {[k: string]: any; }, string]>;
    /** Returns ids of users in a position */
    getUserIdsOfPosition: (input: Partial<IgetUserIdsOfPositionInput>, cb: (err: any | null, result: IgetUserIdsOfPositionOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Returns ids of users in a position */
    getUserIdsOfPositionAsync: (input: Partial<IgetUserIdsOfPositionInput>, options?: any, extraHeaders?: any) => Promise<[IgetUserIdsOfPositionOutput, string, {[k: string]: any; }, string]>;
    /** Returns ids of users in a position of a given Org Unit */
    getUserIdsOfPositionAndOrgUnit: (input: Partial<IgetUserIdsOfPositionAndOrgUnitInput>, cb: (err: any | null, result: IgetUserIdsOfPositionAndOrgUnitOutput, rawResult: string,  soapHeader: {[k: string]: any; },  rawRequest: string) => any, options?: any, extraHeaders?: any) => void;
    /** Returns ids of users in a position of a given Org Unit */
    getUserIdsOfPositionAndOrgUnitAsync: (input: Partial<IgetUserIdsOfPositionAndOrgUnitInput>, options?: any, extraHeaders?: any) => Promise<[IgetUserIdsOfPositionAndOrgUnitOutput, string, {[k: string]: any; }, string]>;
}

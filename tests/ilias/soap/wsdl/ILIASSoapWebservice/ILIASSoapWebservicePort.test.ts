import avaModule, {TestInterface} from 'ava';
import { existsSync } from 'fs';
import * as soap from 'soap';
import {WSDL} from 'soap';

import {DlCookieJar, getIliasClientCookie, getIliasSessionCookie} from '../../../../../src/requests/cookies/DlCookieJar';
import { testIf } from '../../../../helpers/avaHelpers';
import {IILIASSoapWebservicePortSoap} from '../../../../../src/ilias/soap/wsdl/ILIASSoapWebservice/ILIASSoapWebservicePort';
import {createXmlResultSet, extractResultSetRows, extractValue} from '../../../../../src/ilias/soap/wsdl/ILIASSoapWebservice/XmlObjects';
import {IliasUrlProvider} from '../../../../../src/ilias/IliasUrlProvider';
import {ResultSetRoot} from '../../../../../src/ilias/soap/wsdl/ILIASSoapWebservice/xml/ResultSetXml';
import {
    CourseResultSetRow,
    CourseXmlObject
} from '../../../../../src/ilias/soap/wsdl/ILIASSoapWebservice/xml/CourseXml';
import {RefTreeRoot} from '../../../../../src/ilias/soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';
import {FileRoot} from '../../../../../src/ilias/soap/wsdl/ILIASSoapWebservice/xml/FileXml';
import {ExerciseRoot} from '../../../../../src/ilias/soap/wsdl/ILIASSoapWebservice/xml/ExerciseXml';

// TODO move
const wsdlUrl = 'https://ilias.unibe.ch/webservice/soap/server.php?wsdl';

const ava = <TestInterface<{soapClient: IILIASSoapWebservicePortSoap, sid: string, wsdlClient: WSDL}>>avaModule;

ava.before('Prepare SOAP client', async t => {
    const soapClient = t.context.soapClient = <IILIASSoapWebservicePortSoap> await soap.createClientAsync(wsdlUrl);
    t.context.wsdlClient = soapClient['wsdl'];

    const cookieJar = new DlCookieJar();
    const sessionCookie = await getIliasSessionCookie(cookieJar, IliasUrlProvider.getUniBernUrlProvider());
    const clientCookie = await getIliasClientCookie(cookieJar, IliasUrlProvider.getUniBernUrlProvider());

    if (sessionCookie && clientCookie) {
        t.context.sid = `${sessionCookie.value}::${clientCookie.value}`;
    }
});

const test = testIf(existsSync(DlCookieJar.defaultCookiesFilePath), ava);

test('SOAP getUserBySID', async t => {
    const { soapClient, sid } = t.context;
    const soapAnswer = await soapClient.getUserIdBySidAsync({ sid });

    const [ { usr_id } ] = soapAnswer;

    t.truthy(usr_id);
    const userIdValue = extractValue(usr_id);
    t.assert(userIdValue > 0);
});

test('SOAP lookupUser', async t => {
    const { soapClient, sid } = t.context;
    const soapAnswer = await soapClient.lookupUserAsync({ sid, user_name: 'a.schaller4' });

    const [ { usr_id } ] = soapAnswer;

    t.truthy(usr_id);
    const userIdValue = extractValue(usr_id);
    t.assert(userIdValue > 0);
});

test('SOAP fail to lookupUser', async t => {
    const { soapClient, sid } = t.context;
    await t.throwsAsync(
        soapClient.lookupUserAsync({ sid, user_name: 'a.humm' }),
        {
            message: /Check access failed/
        }
    );
});


test('XmlResultSet Object to Xml', t => {
    const { wsdlClient } = t.context;
    const xmlResultSet = createXmlResultSet([{ user_id: 2366114, status: 7 }], wsdlClient, [ 'user_id', 'status' ]);
    t.is(xmlResultSet, '<result><colspecs><colspec idx="0" name="user_id"></colspec><colspec idx="1" name="status"></colspec></colspecs><rows><row><column>2366114</column><column>7</column></row></rows></result>');
});


test('SOAP getCoursesForUser', async t => {
    const { soapClient, wsdlClient, sid } = t.context;

    const parameters = createXmlResultSet([{ user_id: 2366114, status: 7 }], wsdlClient, [ 'status', 'user_id' ]);
    const soapAnswer = await soapClient.getCoursesForUserAsync({
        sid,
        parameters
    });

    const [ { xml } ] = soapAnswer;

    t.truthy(xml);

    /*
        The converted XML in an object will look like this:
            {
              "result": {
                "colspecs": {
                  "colspec": [
                    { "attributes": { "idx": "0", "name": "ref_id" } },
                    { "attributes": { "idx": "1", "name": "xml" } },
                    { "attributes": { "idx": "2", "name": "parent_ref_id" } }
                  ]
                },
                "rows": {
                  "row": [
                    {
                      "column": [
                        "1531278",
                        "<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE Course PUBLIC "-//ILIAS//DTD Course//EN" "https://ilias.unibe.ch:443/xml/ilias_crs_5_0.dtd">\n<!--Export of ILIAS course 1837764 of installation 0.-->\n<Course exportVersion="2" id="il_0_crs_1837764" showMembers="Yes">\n  <MetaData>\n    <General Structure="Hierarchical">\n      <Identifier Catalog="ILIAS" Entry="il__crs_1837764"/>\n      <Title Language="de">\n        HS2019: 32032/62032 Machine Learning and Data Mining\n      </Title>\n      <Language Language="de"/>\n      <Description Language="de">\n      </Description>\n      <Keyword Language="de"/>\n    </General>\n  </MetaData>\n  <AdvancedMetaData>\n    <Value id="il_0_adv_md_field_26"/>\n    <Value id="il_0_adv_md_field_27"/>\n    <Value id="il_0_adv_md_field_28"/>\n  </AdvancedMetaData>\n  <Settings>\n    <Availability>\n      <Unlimited/>\n    </Availability>\n    <Syllabus/>\n    <ImportantInformation/>\n    <TargetGroup/>\n    <Contact>\n      <Name/>\n      <Responsibility/>\n      <Phone/>\n      <Email/>\n      <Consultation/>\n    </Contact>\n    <Registration registrationType="Direct" maxMembers="0" notification="Yes" waitingList="Yes">\n      <Unlimited/>\n    </Registration>\n    <Period withTime="0">\n      <Start/>\n      <End/>\n    </Period>\n    <WaitingListAutoFill>\n      0\n    </WaitingListAutoFill>\n    <CancellationEnd/>\n    <MinMembers>\n      0\n    </MinMembers>\n    <ViewMode>\n      0\n    </ViewMode>\n    <ViewMode>\n      0\n    </ViewMode>\n    <WelcomeMail status="1"/>\n  </Settings>\n  <Sort direction="ASC" type="Title"/>\n  <ContainerSettings>\n    <ContainerSetting id="cont_auto_rate_new_obj">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="cont_custom_md">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="cont_show_calendar">\n      1\n    </ContainerSetting>\n    <ContainerSetting id="cont_show_news">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="cont_skills">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="cont_tag_cloud">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="cont_use_news">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="hide_top_actions">\n    </ContainerSetting>\n    <ContainerSetting id="list_presentation">\n    </ContainerSetting>\n    <ContainerSetting id="news_timeline">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="news_timeline_incl_auto">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="news_timeline_landing_page">\n      0\n    </ContainerSetting>\n    <ContainerSetting id="rep_breacrumb">\n    </ContainerSetting>\n  </ContainerSettings>\n</Course>",
                        "1531263"
                      ]
                    },
                    ...
                  ]
                }
              }
            }
     */
    const coursesXmlResultSet: ResultSetRoot = wsdlClient.xmlToObject(extractValue(xml));
    t.truthy(coursesXmlResultSet);
    const courseResultSetRows: Array<CourseResultSetRow> = <Array<CourseResultSetRow>>extractResultSetRows(coursesXmlResultSet);
    t.truthy(courseResultSetRows);

    for (const courseResultSetRow of courseResultSetRows) {
        /*
            {
              "Course": {
                "attributes": {
                  "exportVersion": "2",
                  "id": "il_0_crs_1837764",
                  "showMembers": "Yes"
                },
                "MetaData": {
                  "General": {
                    "attributes": {
                      "Structure": "Hierarchical"
                    },
                    "Identifier": {
                      "attributes": {
                        "Catalog": "ILIAS",
                        "Entry": "il__crs_1837764"
                      }
                    },
                    "Title": {
                      "attributes": {
                        "Language": "de"
                      },
                      "$value": "HS2019: 32032/62032 Machine Learning and Data Mining"
                    },
                    "Language": {
                      "attributes": {
                        "Language": "de"
                      }
                    },
                    "Description": {
                      "attributes": {
                        "Language": "de"
                      }
                    },
                    "Keyword": {
                      "attributes": {
                        "Language": "de"
                      }
                    }
                  }
                },
                "AdvancedMetaData": {
                  "Value": [
                    {
                      "attributes": {
                        "id": "il_0_adv_md_field_26"
                      }
                    },
                    {
                      "attributes": {
                        "id": "il_0_adv_md_field_27"
                      }
                    },
                    {
                      "attributes": {
                        "id": "il_0_adv_md_field_28"
                      }
                    }
                  ]
                },
                "Settings": {
                  "Availability": {
                    "Unlimited": null
                  },
                  "Syllabus": null,
                  "ImportantInformation": null,
                  "TargetGroup": null,
                  "Contact": {
                    "Name": null,
                    "Responsibility": null,
                    "Phone": null,
                    "Email": null,
                    "Consultation": null
                  },
                  "Registration": {
                    "attributes": {
                      "registrationType": "Direct",
                      "maxMembers": "0",
                      "notification": "Yes",
                      "waitingList": "Yes"
                    },
                    "Unlimited": null
                  },
                  "Period": {
                    "attributes": {
                      "withTime": "0"
                    },
                    "Start": null,
                    "End": null
                  },
                  "WaitingListAutoFill": "0",
                  "CancellationEnd": null,
                  "MinMembers": "0",
                  "ViewMode": [
                    "0",
                    "0"
                  ],
                  "WelcomeMail": {
                    "attributes": {
                      "status": "1"
                    }
                  }
                },
                "Sort": {
                  "attributes": {
                    "direction": "ASC",
                    "type": "Title"
                  }
                },
                "ContainerSettings": {
                  "ContainerSetting": [
                    {
                      "attributes": {
                        "id": "cont_auto_rate_new_obj"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "cont_custom_md"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "cont_show_calendar"
                      },
                      "$value": "1"
                    },
                    {
                      "attributes": {
                        "id": "cont_show_news"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "cont_skills"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "cont_tag_cloud"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "cont_use_news"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "hide_top_actions"
                      }
                    },
                    {
                      "attributes": {
                        "id": "list_presentation"
                      }
                    },
                    {
                      "attributes": {
                        "id": "news_timeline"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "news_timeline_incl_auto"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "news_timeline_landing_page"
                      },
                      "$value": "0"
                    },
                    {
                      "attributes": {
                        "id": "rep_breacrumb"
                      }
                    }
                  ]
                }
              }
            }
         */
        const { ref_id, xml } = courseResultSetRow;

        const courseDetails: CourseXmlObject = wsdlClient.xmlToObject(xml);
        t.truthy(courseDetails);
    }
});

test('SOAP getCourseXML', async t => {
    const { soapClient, sid, wsdlClient } = t.context;
    const soapAnswer = await soapClient.getCourseXMLAsync({ sid, course_id: 1841361 });

    // xml will be the same as the xml inside a result set row
    const [ { xml } ] = soapAnswer;
    t.truthy(xml);

    const courseContent: CourseXmlObject = wsdlClient.xmlToObject(extractValue(xml));
    t.truthy(courseContent);
});

test('SOAP getTreeChilds', async t => {
    const { soapClient, sid, wsdlClient } = t.context;
    // 1841361 is a course ref id
    const soapAnswer = await soapClient.getTreeChildsAsync({ sid, ref_id: 1841361 });

    const [ { object_xml } ] = soapAnswer;
    t.truthy(object_xml);

    /*
        {
          "Objects": {
            "Object": [
              {
                "attributes": {
                  "type": "file",
                  "obj_id": "2391737"
                },
                "Title": "kickoff_meeting.pdf",
                "Description": null,
                "Owner": "1023711",
                "CreateDate": "2020-09-22 10:08:23",
                "LastUpdate": "2020-09-22 10:08:24",
                "ImportId": null,
                "Properties": {
                  "Property": [
                    {
                      "attributes": {
                        "name": "fileSize"
                      },
                      "$value": "429286"
                    },
                    {
                      "attributes": {
                        "name": "fileExtension"
                      },
                      "$value": "pdf"
                    },
                    {
                      "attributes": {
                        "name": "fileVersion"
                      },
                      "$value": "1"
                    }
                  ]
                },
                "References": {
                  "attributes": {
                    "ref_id": "1918492",
                    "parent_id": "1841361",
                    "accessInfo": "granted"
                  },
                  "TimeTarget": {
                    "attributes": {
                      "type": "0"
                    },
                    "Timing": {
                      "attributes": {
                        "starting_time": "1600762105",
                        "ending_time": "1600762105",
                        "visibility": "0"
                      }
                    },
                    "Suggestion": {
                      "attributes": {
                        "starting_time": "1600762105",
                        "ending_time": "1600762105",
                        "changeable": "0"
                      }
                    }
                  },
                  "Operation": [
                    "visible",
                    "read"
                  ],
                  "Path": {
                    "Element": [
                      {
                        "attributes": {
                          "ref_id": "1",
                          "type": "root"
                        },
                        "$value": "Repository"
                      },
                      {
                        "attributes": {
                          "ref_id": "1200811",
                          "type": "cat"
                        },
                        "$value": "iTools, Portale, weitere Angebote"
                      },
                      {
                        "attributes": {
                          "ref_id": "1091862",
                          "type": "cat"
                        },
                        "$value": "Affiliated Institutions"
                      },
                      {
                        "attributes": {
                          "ref_id": "447636",
                          "type": "cat"
                        },
                        "$value": "BeNeFri Joint Master in Computer Science"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841331",
                          "type": "cat"
                        },
                        "$value": "HS2020"
                      },
                      {
                        "attributes": {
                          "ref_id": "1945114",
                          "type": "cat"
                        },
                        "$value": "Vorlesung"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841361",
                          "type": "crs"
                        },
                        "$value": "HS2020: 63833 Seminar Data Science"
                      }
                    ]
                  }
                }
              },
              {
                "attributes": {
                  "type": "file",
                  "obj_id": "2386728"
                },
                "Title": "Report_example.pdf",
                "Description": null,
                "Owner": "1023711",
                "CreateDate": "2020-09-18 10:50:45",
                "LastUpdate": "2020-09-18 10:50:46",
                "ImportId": null,
                "Properties": {
                  "Property": [
                    {
                      "attributes": {
                        "name": "fileSize"
                      },
                      "$value": "339134"
                    },
                    {
                      "attributes": {
                        "name": "fileExtension"
                      },
                      "$value": "pdf"
                    },
                    {
                      "attributes": {
                        "name": "fileVersion"
                      },
                      "$value": "1"
                    }
                  ]
                },
                "References": {
                  "attributes": {
                    "ref_id": "1914451",
                    "parent_id": "1841361",
                    "accessInfo": "granted"
                  },
                  "TimeTarget": {
                    "attributes": {
                      "type": "0"
                    },
                    "Timing": {
                      "attributes": {
                        "starting_time": "1600419047",
                        "ending_time": "1600419047",
                        "visibility": "0"
                      }
                    },
                    "Suggestion": {
                      "attributes": {
                        "starting_time": "1600419047",
                        "ending_time": "1600419047",
                        "changeable": "0"
                      }
                    }
                  },
                  "Operation": [
                    "visible",
                    "read"
                  ],
                  "Path": {
                    "Element": [
                      {
                        "attributes": {
                          "ref_id": "1",
                          "type": "root"
                        },
                        "$value": "Repository"
                      },
                      {
                        "attributes": {
                          "ref_id": "1200811",
                          "type": "cat"
                        },
                        "$value": "iTools, Portale, weitere Angebote"
                      },
                      {
                        "attributes": {
                          "ref_id": "1091862",
                          "type": "cat"
                        },
                        "$value": "Affiliated Institutions"
                      },
                      {
                        "attributes": {
                          "ref_id": "447636",
                          "type": "cat"
                        },
                        "$value": "BeNeFri Joint Master in Computer Science"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841331",
                          "type": "cat"
                        },
                        "$value": "HS2020"
                      },
                      {
                        "attributes": {
                          "ref_id": "1945114",
                          "type": "cat"
                        },
                        "$value": "Vorlesung"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841361",
                          "type": "crs"
                        },
                        "$value": "HS2020: 63833 Seminar Data Science"
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
     */
    const courseTree: RefTreeRoot = wsdlClient.xmlToObject(extractValue(object_xml));
    t.truthy(courseTree);
});

test('SOAP getXMLTree', async t => {
    const { soapClient, sid, wsdlClient } = t.context;
    // 1841361 is a course ref id
    const soapAnswer = await soapClient.getXMLTreeAsync({ sid, ref_id: 1841361 });

    const [ { object_xml } ] = soapAnswer;
    t.truthy(object_xml);

    /*
        {
          "Objects": {
            "Object": [
              {
                "attributes": {
                  "type": "file",
                  "obj_id": "2391737"
                },
                "Title": "kickoff_meeting.pdf",
                "Description": null,
                "Owner": "1023711",
                "CreateDate": "2020-09-22 10:08:23",
                "LastUpdate": "2020-09-22 10:08:24",
                "ImportId": null,
                "Properties": {
                  "Property": [
                    {
                      "attributes": {
                        "name": "fileSize"
                      },
                      "$value": "429286"
                    },
                    {
                      "attributes": {
                        "name": "fileExtension"
                      },
                      "$value": "pdf"
                    },
                    {
                      "attributes": {
                        "name": "fileVersion"
                      },
                      "$value": "1"
                    }
                  ]
                },
                "References": {
                  "attributes": {
                    "ref_id": "1918492",
                    "parent_id": "1841361",
                    "accessInfo": "granted"
                  },
                  "TimeTarget": {
                    "attributes": {
                      "type": "0"
                    },
                    "Timing": {
                      "attributes": {
                        "starting_time": "1600762105",
                        "ending_time": "1600762105",
                        "visibility": "0"
                      }
                    },
                    "Suggestion": {
                      "attributes": {
                        "starting_time": "1600762105",
                        "ending_time": "1600762105",
                        "changeable": "0"
                      }
                    }
                  },
                  "Operation": [
                    "visible",
                    "read"
                  ],
                  "Path": {
                    "Element": [
                      {
                        "attributes": {
                          "ref_id": "1",
                          "type": "root"
                        },
                        "$value": "Repository"
                      },
                      {
                        "attributes": {
                          "ref_id": "1200811",
                          "type": "cat"
                        },
                        "$value": "iTools, Portale, weitere Angebote"
                      },
                      {
                        "attributes": {
                          "ref_id": "1091862",
                          "type": "cat"
                        },
                        "$value": "Affiliated Institutions"
                      },
                      {
                        "attributes": {
                          "ref_id": "447636",
                          "type": "cat"
                        },
                        "$value": "BeNeFri Joint Master in Computer Science"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841331",
                          "type": "cat"
                        },
                        "$value": "HS2020"
                      },
                      {
                        "attributes": {
                          "ref_id": "1945114",
                          "type": "cat"
                        },
                        "$value": "Vorlesung"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841361",
                          "type": "crs"
                        },
                        "$value": "HS2020: 63833 Seminar Data Science"
                      }
                    ]
                  }
                }
              },
              {
                "attributes": {
                  "type": "file",
                  "obj_id": "2386728"
                },
                "Title": "Report_example.pdf",
                "Description": null,
                "Owner": "1023711",
                "CreateDate": "2020-09-18 10:50:45",
                "LastUpdate": "2020-09-18 10:50:46",
                "ImportId": null,
                "Properties": {
                  "Property": [
                    {
                      "attributes": {
                        "name": "fileSize"
                      },
                      "$value": "339134"
                    },
                    {
                      "attributes": {
                        "name": "fileExtension"
                      },
                      "$value": "pdf"
                    },
                    {
                      "attributes": {
                        "name": "fileVersion"
                      },
                      "$value": "1"
                    }
                  ]
                },
                "References": {
                  "attributes": {
                    "ref_id": "1914451",
                    "parent_id": "1841361",
                    "accessInfo": "granted"
                  },
                  "TimeTarget": {
                    "attributes": {
                      "type": "0"
                    },
                    "Timing": {
                      "attributes": {
                        "starting_time": "1600419047",
                        "ending_time": "1600419047",
                        "visibility": "0"
                      }
                    },
                    "Suggestion": {
                      "attributes": {
                        "starting_time": "1600419047",
                        "ending_time": "1600419047",
                        "changeable": "0"
                      }
                    }
                  },
                  "Operation": [
                    "visible",
                    "read"
                  ],
                  "Path": {
                    "Element": [
                      {
                        "attributes": {
                          "ref_id": "1",
                          "type": "root"
                        },
                        "$value": "Repository"
                      },
                      {
                        "attributes": {
                          "ref_id": "1200811",
                          "type": "cat"
                        },
                        "$value": "iTools, Portale, weitere Angebote"
                      },
                      {
                        "attributes": {
                          "ref_id": "1091862",
                          "type": "cat"
                        },
                        "$value": "Affiliated Institutions"
                      },
                      {
                        "attributes": {
                          "ref_id": "447636",
                          "type": "cat"
                        },
                        "$value": "BeNeFri Joint Master in Computer Science"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841331",
                          "type": "cat"
                        },
                        "$value": "HS2020"
                      },
                      {
                        "attributes": {
                          "ref_id": "1945114",
                          "type": "cat"
                        },
                        "$value": "Vorlesung"
                      },
                      {
                        "attributes": {
                          "ref_id": "1841361",
                          "type": "crs"
                        },
                        "$value": "HS2020: 63833 Seminar Data Science"
                      }
                    ]
                  }
                }
              }
            ]
          }
        }

        The ref id of a file it is "References" -> "attributes" -> "ref_id": "1914451"
     */
    const courseTree: RefTreeRoot = wsdlClient.xmlToObject(extractValue(object_xml));
    t.truthy(courseTree);
});

test('SOAP getFileXML', async t => {
    const { soapClient, sid, wsdlClient } = t.context;
    const soapAnswer = await soapClient.getFileXMLAsync({ sid, ref_id: 1914451, attachment_mode: 0 });

    const [ { filexml } ] = soapAnswer;

    /*
        {
          "File": {
            "attributes": {
              "obj_id": "il_0_file_2386728",
              "version": "1",
              "max_version": "1",
              "size": "339134",
              "type": "application/pdf",
              "action": ""
            },
            "Filename": "Report_example.pdf",
            "Title": "Report_example.pdf",
            "Description": null,
            "Rating": "0",
            "Versions": {
              "Version": {
                "attributes": {
                  "version": "1",
                  "max_version": "1",
                  "date": "1600419045",
                  "usr_id": "il_0_usr_1023711",
                  "action": "create",
                  "rollback_version": "",
                  "rollback_user_id": ""
                }
              }
            }
          }
        }
     */
    const fileDetails: FileRoot = wsdlClient.xmlToObject(extractValue(filexml));
    t.truthy(fileDetails);
});

test('SOAP getExerciseXML', async t => {
    const { soapClient, sid, wsdlClient } = t.context;
    const soapAnswer = await soapClient.getExerciseXMLAsync({ sid, ref_id: 1928636, attachment_mode: 0 });

    const [ { exercisexml } ] = soapAnswer;
    t.truthy(exercisexml);

    /*
        {
          "Exercise": {
            "attributes": {
              "obj_id": "il_0_exc_2404262",
              "owner": "il_0_usr_697618"
            },
            "Title": "Project plan presentation",
            "Description": "Presentation of your Thingy project (08.10.2020).",
            "Assignment": {
              "Instruction": "<p>One member of each group should upload the slides from the project plan presentation before the course.<br /><br />Your presentation should include what technology you plan to use (framework, DB) and the features you plan to include. You can focus on your personal ideas. The presentation should last about 10 minutes (+5 minutes questions).</p>",
              "DueDate": "1602141300",
              "Files": null
            }
          }
        }

        Unfortunately, not getting any files... Therefore, scrape the HTML.
        The URL of an exercise, with ref id 1912762, is:
            https://ilias.unibe.ch/ilias.php?ref_id=1912762&target=1912762&cmd=showOverview&cmdClass=ilobjexercisegui&cmdNode=e1:qp&baseClass=ilexercisehandlergui
            {
              "baseClass": "ilexercisehandlergui",
              "cmd": "showOverview",
              "cmdClass": "ilobjexercisegui",
              "cmdNode": "e1:qp",
              "ref_id": "1912762",
              "target": "1912762"
            }
        Or use exercise redirect URL:
            https://ilias.unibe.ch/goto.php?target=exc_1912762
     */
    const exercise: ExerciseRoot = wsdlClient.xmlToObject(extractValue(exercisexml));
    t.truthy(exercise);
});

ava.todo('SOAP getRefIdsByObjId');
ava.todo('SOAP getObjectByReference');



test('SOAP getOperations', async t => {
    const { soapClient, sid } = t.context;
    const soapAnswer = await soapClient.getOperationsAsync({ sid });
    const [ { operations } ] = soapAnswer;

    t.truthy(operations);

    const firstOperationItem = operations.item[0];
    t.truthy(firstOperationItem);

    const ops_id = extractValue(firstOperationItem.ops_id);
    const operation = extractValue(firstOperationItem.operation);
    const description = extractValue(firstOperationItem.description);
    t.truthy(ops_id);
    t.truthy(operation);
    t.truthy(description);
});

test('SOAP getInstallationInfoXML', async t => {
    const { soapClient, wsdlClient } = t.context;
    const soapAnswer = await soapClient.getInstallationInfoXMLAsync(null);
    const [ { xml } ] = soapAnswer;

    t.truthy(xml);

    const clientInstallation = wsdlClient.xmlToObject(extractValue(xml));

    t.truthy(clientInstallation);
});

test('SOAP getClientInfo', async t => {
    const { soapClient, wsdlClient } = t.context;
    const soapAnswer = await soapClient.getClientInfoXMLAsync({ clientid: t.context.sid.split('::')[1] });
    const [ { xml } ] = soapAnswer;

    t.truthy(xml);

    const clientInstallation = wsdlClient.xmlToObject(extractValue(xml));

    t.truthy(clientInstallation);
});

import {Property, PropertyName} from '../ilias/soap/wsdl/ILIASSoapWebservice/xml/RefTreeXml';

export function getPropertyNamed (propertyName: PropertyName, properties: Array<Property>): string {
    return properties
        .find(prop => prop.attributes.name === propertyName)!
        .$value;
}

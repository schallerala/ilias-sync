import ava from 'ava';
import * as soap from 'soap';
const sax = require('sax');

import { splitQName } from 'soap/lib/utils';
import {
    Element,
    DefinitionsElement,
    TypesElement,
    SchemaElement,
    DocumentationElement,
    OperationElement
} from 'soap/lib/wsdl/elements';
import { ok } from 'assert';

const { WSDL } = soap;

WSDL.prototype['_parse'] = function (xml) {
    const _this = this;
    const p = sax.parser(true, null);
    const stack = [];
    let root = null;
    const options = this.options;
    p.onopentag = function (node) {
        const nsName = node.name;
        const attrs = node.attributes;
        const top = stack[stack.length - 1];
        const name = splitQName(nsName).name;

        let schemaAttrs = null;

        if (name === 'schema') {
            schemaAttrs = attrs;
        }
        if (top) {
            try {
                top.startElement(stack, nsName, attrs, options, schemaAttrs);
            }
            catch (e) {
                if (_this.options.strict) {
                    throw e;
                }
                else {
                    stack.push(new Element(nsName, attrs, options, schemaAttrs));
                }
            }
        }
        else {
            if (name === 'definitions') {
                root = new DefinitionsElement(nsName, attrs, options);
                stack.push(root);
            }
            else if (name === 'schema') {
                // Shim a structure in here to allow the proper objects to be created when merging back.
                root = new DefinitionsElement('definitions', {}, {});
                const types = new TypesElement('types', {}, {});
                const schema = new SchemaElement(nsName, attrs, options);
                types.addChild(schema);
                root.addChild(types);
                stack.push(schema);
            }
            else {
                throw new Error('Unexpected root element of WSDL or include');
            }
        }
    };
    // <---- Added
    p.ontext = function (text) {
        const top = stack[stack.length - 1];
        if (top instanceof DocumentationElement) {
            top['text'] = text;
        }
    }
    // End added ---->
    p.onclosetag = function (name) {
        const top = stack[stack.length - 1];
        ok(top, 'Unmatched close tag: ' + name);
        top.endElement(stack, name);
    };
    p.write(xml).close();
    return root;
};

OperationElement.prototype.description = function (definitions) {
    const inputDesc = this.input ? this.input.description(definitions) : null;
    const outputDesc = this.output ? this.output.description(definitions) : null;

    // <---- Added
    const documentationChildren = this.children
        .filter(child => child instanceof DocumentationElement)
        .map(documentationElement => documentationElement.description(definitions))
        .filter(documentationText => documentationText);
    // End added ---->

    const description = {
        input: inputDesc && inputDesc[Object.keys(inputDesc)[0]],
        output: outputDesc && outputDesc[Object.keys(outputDesc)[0]]
    };

    if (documentationChildren) {
        description['documentation'] = documentationChildren[0];
    }

    return description;
};

// <---- Added
DocumentationElement.prototype.description = function () {
    return this['text'];
};
// End added ---->

const wsdlUrl = 'https://ilias.unibe.ch/webservice/soap/server.php?wsdl';

/**
 * WSDL object will be able to convert object to XML or reverse it.
 * To test with concrete example
 */
ava('Reverse WSDL', t => {
    // https://ilias.unibe.ch/webservice/soap/server.php#
    const wsdl = new WSDL(wsdlUrl, 'https://ilias.unibe.ch:443/webservice/soap/server.php', {});

    t.truthy(wsdl);
});

ava('Create SOAP client', async t => {
    const soapClient = await soap.createClientAsync(wsdlUrl);

    t.truthy(soapClient);
    const description = soapClient.describe();
    t.truthy(description);

    // TODO try to go trough the hacked describe which as the documentation too to produce interfaces with `ts-morph`
    //      inspire with wsdl-to-ts: https://github.com/StenaIT/wsdl-to-ts.git (improved from the initial npm package).

    // wsdl-to-ts has been used for now.

    // see
    //      * https://ts-morph.com/details/interfaces
    //      * https://ts-morph.com/details/parameters
    //      * https://ts-morph.com/details/type-parameters
    //      * https://ts-morph.com/details/types
    //      * https://ts-morph.com/details/async
    //      * https://ts-morph.com/details/documentation
    //      * https://ts-morph.com/utilities
});

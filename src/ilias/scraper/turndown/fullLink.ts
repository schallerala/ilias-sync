import TurndownService = require('turndown');
import {Options} from 'turndown';
import { URL } from "url";

function createFullLinkRule (baseUrl: string) {
    return {
        filter: function (node: HTMLElement, options: Options): boolean {
            return node.nodeName === 'A' &&
                !! node.getAttribute('href');
        },

        replacement: function (content: string, node: HTMLElement, options: Options): string {
            const url = new URL(node.getAttribute('href'), baseUrl);
            return `[${content}](${url.toString()})`;
        }
    }
}

// Only supports inline links
export function fullLink (baseUrl: string): (t: TurndownService) => void {
    return (t: TurndownService) => t.addRule('extendedLink', createFullLinkRule(baseUrl));
}

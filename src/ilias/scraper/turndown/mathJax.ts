import TurndownService = require('turndown');
import {Options} from 'turndown';

export const mathJaxRule =  {
    filter: function (node: HTMLElement, options: Options): boolean {
        // script and attribs.type === math/tex
        return node.nodeName === 'SCRIPT' &&
            node.attributes.getNamedItem('type')?.value === 'math/tex';
    },

    replacement: function (content: string, node: HTMLElement, options: Options): string {
        return `$${node.textContent || content}$`;
    }
};

export const skipMathJaxPresentationSpan =  {
    filter: (node: HTMLElement, options: Options) => {
        return node.nodeName === 'SPAN' &&
            node.getAttribute('data-mathml') &&
            node.getAttribute('role') === 'presentation';
    },

    replacement: function (content: string, node: HTMLElement, options: Options): string {
        // return empty string to override "commonmark" rules (the initial/normal rule for a span)
        return '';
    }
};

export function mathJax (turndownService: TurndownService) {
    turndownService.addRule('skipMathJaxPresentationSpan', skipMathJaxPresentationSpan);
    turndownService.addRule('mathJax', mathJaxRule);
}

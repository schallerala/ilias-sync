import avaModule, {TestInterface} from 'ava';
import {readFileSync} from 'fs';
import {join} from 'path';
import TurndownService = require('turndown');

import {IliasUrlProvider} from '../../../src/ilias/IliasUrlProvider';
import {mathJax} from '../../../src/ilias/scraper/turndown/mathJax';
import {fullLink} from '../../../src/ilias/scraper/turndown/fullLink';

const ava = <TestInterface<{
    turndown: TurndownService,
    urlProvider: IliasUrlProvider
}>>avaModule;

ava.before('Prepare turndown', async t => {
    const urlProvider = t.context.urlProvider = IliasUrlProvider.getUniBernUrlProvider();

    const turndown = t.context.turndown = new TurndownService();
    turndown.use(mathJax);
    turndown.use(fullLink(urlProvider.baseUrl));
});

ava('Parse link', t => {
    const { turndown, urlProvider } = t.context;
    const xml = readFileSync(join(__dirname, 'resources', 'linkHtml.xml')).toString();
    const md = turndown.turndown(xml);
    const url = new URL('/goto.php?target=file_1993476', urlProvider.baseUrl);
    t.is(md, `[Other](${url.toString()})`);
});

ava('Parse MathJax as Markdown - Omega', t => {
    const { turndown } = t.context;
    const xml = readFileSync(join(__dirname, 'resources', 'mathOmegaHtml.xml')).toString();
    const md = turndown.turndown(xml);
    t.is(md, 'aka $\\omega$\\-words');
});
ava('Parse MathJax as Markdown - Rightarrow', t => {
    const { turndown } = t.context;
    const xml = readFileSync(join(__dirname, 'resources', 'mathRightarrowHtml.xml')).toString();
    const md = turndown.turndown(xml);
    t.is(md, '11\\. NBW$\\rightarrow$DMW Sketch');
});
ava('Parse MathJax as Markdown - Subscript', t => {
    const { turndown } = t.context;
    const xml = readFileSync(join(__dirname, 'resources', 'mathSubscriptHtml.xml')).toString();
    const md = turndown.turndown(xml);
    t.is(md, 'S1S$_{\\{a,b\\}}$ formula.');
});
// don't even know if it is possible
ava.todo('Parse MathJax as Markdown - without script[type="math/tex"]');
// don't even know if it is possible
ava.todo('Parse MathJax as Markdown - without span.MJX_Assistive_MathML nor script[type="math/tex"]');

import avaTest, {Implementation, TestInterface} from 'ava';

export type testImpl<Context> = (title: string, implementation: Implementation<Context>) => void;

export function testIf<Context> (predicate: boolean, ava: TestInterface<Context> = avaTest): testImpl<Context> {
    return predicate
        ? ava
        : ava.skip;
}

export function skipIf<Context> (predicate: boolean, ava: TestInterface<Context> = avaTest): testImpl<Context> {
    return testIf( ! predicate, ava);
}


export function zip<A, B> (a: Array<A>, b: Array<B>): Array<[A, B]> {
    return a.map((e, i) => [e, b[i]]);
}

export function flatMap<T1, T2> (array: Array<T1>, callbackfn: (element: T1, index: number) => Array<T2>): Array<T2> {
    return array.reduce((acc, current, index) => {
        return acc.concat(callbackfn(current, index));
    }, new Array<T2>())
}

export async function promiseFlatMap<T1, T2> (array: Array<T1>, callbackfn: (element: T1, index: number) => Promise<Array<T2>>): Promise<Array<T2>> {
    const array2d = await Promise.all(array.map(callbackfn));
    return flatMap(array2d, e => e);
}

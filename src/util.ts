export function getFirstN<T>(n: number, f: (n: number) => T, from: number = 0): T[] {
    const arr: T[] = [];

    for(let i = 0; i < n; i++) {
        arr.push(f(from + i));
    }

    return arr;
}
export function findN<T>(criteria: (value: T) => boolean, f: (n: number) => T): number {
    let n = 0;
    while(true) {
        if(criteria(f(n))) return n;
        n++
    }
}
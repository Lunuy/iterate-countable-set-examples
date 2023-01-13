

export function natural(n: number) {
    return n;
}

export function integer(n: number) {
    if (n === 0) return 0;
    const sign = (n % 2 === 0 ? 1 : -1);
    return sign * (Math.floor((n + 1) / 2));
}

export function rational(n: number): [number, number] {
    if (n === 0) return [0, 1];
    
    // Generating irreducible fraction table using Seive of eratosthenes
    function getNthIrreducibleFraction(n: number): [number, number] {
        if(n === 0) return [1, 1];

        const map = (new Array((n - 1) * n / 2)).fill(false);

        //   2 3 4 5 ... (denominator)
        // 1 0 1 3 6
        // 2   2 4 7
        // 3     5 8
        // 4       9
        // .
        // .
        // .
        // (numerator)
        function getMapIndex(denominator: number, numerator: number) {
            return (denominator - 2) * (denominator - 1) / 2 + numerator - 1;
        }

        let i = 0;
        for (
            let denominator = 2, numerator = 1;
            true;
            (() => {
                if(numerator + 1 === denominator) {
                    denominator++;
                    numerator = 1;
                } else {
                    numerator++;
                }
            })()
        ) {
            if(map[getMapIndex(denominator, numerator)] === true) {
                continue;
            }

            if(Math.floor((n - 1) / 2) === i) {
                if (n % 2 === 0) {
                    return [denominator, numerator];
                } else {
                    return [numerator, denominator];
                }
            }
            i++;

            for(let i = 2; getMapIndex(i * denominator, i * numerator) < map.length; i++) {
                map[getMapIndex(i * denominator, i * numerator)] = true;
            }
        }
    }

    const m = Math.floor((n - 1) / 2);
    const fraction = getNthIrreducibleFraction(m);
    const sign = (n % 2 === 0 ? 1 : -1);

    return [fraction[0] * sign, fraction[1]];
}

export function naturalTuple2(n: number) {
    let a = 0;
    while(n >= a) {
        n -= a;
        a++;
    }

    return [a - 1 - n, n];
}

export function naturalTuple(m: number): (n: number) => number[] {
    return (n: number) => {
        const arr: number[] = [];

        let x = n;
        for(let i = 0; i < m - 1; i++) {
            const [a, b] = naturalTuple2(x);
            arr.push(a);
            x = b;
        }
        arr.push(x);

        return arr;
    }
}

export function finiteNaturalSeries(n: number) {
    if (n === 0) return [];

    const [a, b] = naturalTuple2(n - 1);
    return naturalTuple(a + 1)(b);
}

export function naturalAndFinite(m: number): (n: number) => [number, number] {
    return (n: number) => {
        return [Math.floor(n / m), n % m];
    }
}

export function finiteNaturalSeriesLengthEqualOrLessThan(m: number): (n: number) => number[] {
    const naturalAndFiniteM = naturalAndFinite(m);
    return (n: number) => {
        if (n === 0) return [];

        const [a, b] = naturalAndFiniteM(n - 1);
        return naturalTuple(b + 1)(a);
    };
}

export function ascendingNaturalTuple(m: number): (n: number) => number[] {
    const naturalTupleM = naturalTuple(m);

    return (n: number) => {
        const incrementArr = naturalTupleM(n);

        const arr: number[] = [incrementArr[0]];
        for(let i = 1; i < m; i++) {
            arr[i] = arr[i-1] + incrementArr[i];
        }

        return arr;
    };
}

export function naturalGraph(n: number) {
    if (n === 0) return [];

    const [a, b] = naturalTuple2(n - 1);
    const nodeNumber = a + 1;
    const [c, relations] = naturalAndFinite(2 ** (nodeNumber * (nodeNumber - 1) / 2))(b);
    
    const numbers = ascendingNaturalTuple(nodeNumber)(c);


    const nodes = [];
    let relationI = 0;
    for(let i = 0; i < nodeNumber; i++) {
        const connections = [];
        for(let j = i + 1; j < nodeNumber; j++) {
            if(Math.floor((relations / (2 ** relationI)) % 2) === 1)
                connections.push(j);
            relationI++;
        }

        nodes.push({
            value: numbers[i],
            connections 
        });
    }

    return nodes;
}

// This is not about shape of graph.
// Example: [[1], [], []] is different from [[], [2], []] because
//          if there is node 0, 1, 2
//          first one is     0 - 1   2
//          second one is    0   1 - 2
export function graphStructure(n: number) {
    if (n === 0) return [];

    let i;
    for (i = 1; 2 ** (i * (i - 1) / 2) < n; i++) {
        n -= 2 ** (i * (i - 1) / 2);
    }
    const nodeNumber = i;
    const relations = n - 1;

    const nodes = [];
    let relationI = 0;
    for (let i = 0; i < nodeNumber; i++) {
        const connections = [];
        for (let j = i + 1; j < nodeNumber; j++) {
            if (Math.floor((relations / (2 ** relationI)) % 2) === 1)
                connections.push(j);
            relationI++;
        }
        nodes.push(connections);
    }

    return nodes;
}

type NaturalBinaryTree = {
    value: number;
    left: NaturalBinaryTree | null;
    right: NaturalBinaryTree | null;
};
export function naturalBinaryTree(n: number): NaturalBinaryTree {
    const [a, type] = naturalAndFinite(4)(n);
    if (type === 0) {
        return {
            value: a,
            left: null,
            right: null
        };
    } else if (type === 1) {
        const [b, c] = naturalTuple2(a);
        return {
            value: b,
            left: naturalBinaryTree(c),
            right: null
        };
    } else if (type === 2) {
        const [b, c] = naturalTuple2(a);
        return {
            value: b,
            left: null,
            right: naturalBinaryTree(c)
        };
    } else if (type === 3) {
        const [b, c, d] = naturalTuple(3)(a);
        return {
            value: b,
            left: naturalBinaryTree(c),
            right: naturalBinaryTree(d)
        };
    } else {
        throw new Error("Never");
    }
}

type BinaryTreeStructure = {
    left: BinaryTreeStructure | null;
    right: BinaryTreeStructure | null;
};
export function binaryTreeStructure(n: number): BinaryTreeStructure {
    if (n === 0) {
        return {
            left: null,
            right: null
        };
    }

    const [a, type] = naturalAndFinite(3)(n - 1);
    if (type === 0) {
        return {
            left: binaryTreeStructure(a),
            right: null
        };
    } else if (type === 1) {
        return {
            left: null,
            right: binaryTreeStructure(a)
        }
    } else if (type === 2) {
        const [b, c] = naturalTuple2(a);
        return {
            left: binaryTreeStructure(b),
            right: binaryTreeStructure(c)
        }
    } else {
        throw new Error("Never");
    }
}

type NaturalTree = {
    value: number;
    childs: NaturalTree[];
};
export function naturalTree(n: number): NaturalTree {
    const [childNumber, a] = naturalTuple2(n);
    const numbers = ascendingNaturalTuple(childNumber + 1)(a);

    const childs = [];
    for (let i = 0; i < childNumber; i++) {
        childs.push(naturalTree(numbers[i]));
    }
    const value = numbers[childNumber];

    return {
        value,
        childs
    };
}

type TreeStructure = TreeStructure[];
export function treeStructure(n: number): TreeStructure {
    if (n === 0) return [];

    const [a, b] = naturalTuple2(n);
    const childNumber = a + 1;
    const numbers = naturalTuple(childNumber)(b);

    const childs = [];
    for (const number of numbers) {
        childs.push(treeStructure(number));
    }

    return childs;
}
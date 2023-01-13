
import { ascendingNaturalTuple, binaryTreeStructure, finiteNaturalSeries, finiteNaturalSeriesLengthEqualOrLessThan, graphStructure, integer, natural, naturalAndFinite, naturalBinaryTree, naturalGraph, naturalTuple, naturalTuple2, rational, naturalTree, treeStructure } from "./countable-set";
import { findN, getFirstN } from "./util";


function demo() {
    console.log("*****================Demo================*****");
    const naturalTuple3 = naturalTuple(3);
    const naturalAndFinite3 = naturalAndFinite(3);
    const finiteNaturalSeriesLengthEqualOrLessThan4 = finiteNaturalSeriesLengthEqualOrLessThan(4);
    const ascendingNaturalTuple3 = ascendingNaturalTuple(3);

    const n = 20;
    const functions = {
        natural,
        integer,
        rational,
        naturalTuple2,
        naturalTuple3,
        naturalAndFinite3,
        finiteNaturalSeriesLengthEqualOrLessThan4,
        ascendingNaturalTuple3,
        naturalGraph,
        graphStructure,
        naturalBinaryTree,
        binaryTreeStructure,
        finiteNaturalSeries,
        naturalTree,
        treeStructure
    };

    for(const [name, f] of Object.entries(functions)) {
        console.log(`====${name}====`);
        console.log(getFirstN<any>(n, f));
    }
}

function finding() {
    console.log("*****================Finding================*****");
    console.log(findN(([a, b, c]) => (a === 6 && b === 2 && c === 3), naturalTuple(3)));
    console.log(findN(arr => (arr.length === 3 && arr[0] === 6 && arr[1] === 2 && arr[2] === 3), finiteNaturalSeries));
    console.log(findN(arr => (arr.length === 2 && arr[0] === 6 && arr[1] === 200), finiteNaturalSeriesLengthEqualOrLessThan(2)));
    console.log(findN(nodes => (
        nodes.length === 3
        && nodes[0].connections[0] === 1
        && nodes[0].connections[1] === 2
        && nodes[1].connections[0] === 2
        && nodes[0].value === 1
        && nodes[1].value === 2
    ), naturalGraph));
    console.log(findN(root => (
        root.value === 0
        && root.left !== null
        && root.right === null
        && root.left.value === 3
        && root.left.left === null
        && root.left.right !== null
        && root.left.right.value === 1
        && root.left.right.left === null
        && root.left.right.right === null
    ), naturalBinaryTree));
}


demo();
finding();
import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArray = this.sortArray(arr);
    const uniqueValuesArray = this.deleteDuplicates(sortedArray);
    const n = uniqueValuesArray.length;
    const root = this.sortedArrayToBST(uniqueValuesArray, 0, n - 1);
    return root;
  }

  sortArray(arr) {
    const sorted = arr.sort((a, b) => a - b);
    return sorted;
  }

  deleteDuplicates(arr) {
    const uniques = [...new Set(arr)];
    return uniques;
  }

  sortedArrayToBST(arr, start, end) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2, 10);
    const node = new Node(arr[mid]);
    node.left = this.sortedArrayToBST(arr, start, mid - 1);
    node.right = this.sortedArrayToBST(arr, mid + 1, end);
    return node;
  }
}

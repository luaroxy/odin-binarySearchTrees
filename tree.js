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

  insert(data, node = this.root) {
    if (node == null) {
      node = new Node(data);
      return node;
    }

    if (data < node.data) node.left = this.insert(data, node.left);
    else if (data > node.data) node.right = this.insert(data, node.right);
    return node;
  }

  delete(data, node = this.root) {
    if (node == null) return node;

    if (data < node.data) node.left = this.delete(data, node.left);
    else if (data > node.data) node.right = this.delete(data, node.right);
    else {
      // node with only one child or no child
      if (node.left == null) return node.right;
      if (node.right == null) return node.left;

      // node with two children
      node.data = this.minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  minValue(node) {
    let minv = node.data;
    while (node.left != null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  }
}

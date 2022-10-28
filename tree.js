import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
    this.levelOrderTransversed = [];
    this.preorderTransversed = [];
    this.inorderTransversed = [];
    this.postorderTransversed = [];
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

  find(data, node = this.root) {
    if (node.data === data) return node;

    if (data < node.data) return this.find(data, node.left);
    if (data > node.data) return this.find(data, node.right);
  }

  levelOrder(func = this.toArray) {
    if (this.root === null) return;
    const queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue[0];
      func(this.levelOrderTransversed, node.data);
      if (node.left != null) queue.push(node.left);
      if (node.right != null) queue.push(node.right);
      queue.shift();
    }
    return this.levelOrderTransversed;
  }

  inorder(func = this.toArray, node = this.root) {
    if (node === null) return;
    this.inorder(func, node.left);
    func(this.inorderTransversed, node.data);
    this.inorder(func, node.right);
    return this.inorderTransversed;
  }

  preorder(func = this.toArray, node = this.root) {
    if (node === null) return;
    func(this.preorderTransversed, node.data);
    this.preorder(func, node.left);
    this.preorder(func, node.right);
    return this.preorderTransversed;
  }

  postorder(func = this.toArray, node = this.root) {
    if (node === null) return;
    this.postorder(func, node.left);
    this.postorder(func, node.right);
    func(this.postorderTransversed, node.data);
    return this.postorderTransversed;
  }

  toArray(arr, value) {
    arr.push(value);
  }

  height(node) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(data, node = this.root) {
    if (node.data === data.data) return 0;
    if (data.data < node.data) return this.depth(data, node.left) + 1;
    if (data.data > node.data) return this.depth(data, node.right) + 1;
  }
}

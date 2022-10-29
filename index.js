import Tree from "./tree.js";

// Tests

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function createRandomArray(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.floor(Math.random() * 101);
  }
  return array;
}

function addNumbers(n) {
  const array = createRandomArray(n);
  for (let i = 0; i < n; i++) {
    tree.insert(array[i]);
  }
}

const tree = new Tree(createRandomArray(7)); // Create a binary search tree from an array of 7 random numbers.
prettyPrint(tree.root); // print tree
console.log(`Is Balanced? ${tree.isBalanced()}`); // Check if tree is balanced - result: true
console.log(`Lever Order Transversal: ${tree.levelOrder()}`); // Display array of breadth-first level order
console.log(`Preorder Transversal: ${tree.preorder()}`); // Display array of preorder depth-first order
console.log(`Postorder Transversal: ${tree.postorder()}`); // Display array of postorder depth-first order
console.log(`Inorder Transversal: ${tree.inorder()}`); // Display array of inorder depth-first order
addNumbers(101); // add 101 random numbers to tree
prettyPrint(tree.root); // print tree
console.log(`Is Balanced? ${tree.isBalanced()}`); // Check if tree is balanced - result: false
tree.rebalance(); // rebalance tree
prettyPrint(tree.root); // print tree
console.log(`Is Balanced? ${tree.isBalanced()}`); // Check if tree is balanced - result: false
console.log(`Lever Order Transversal: ${tree.levelOrder()}`); // Display array of breadth-first level order
console.log(`Preorder Transversal: ${tree.preorder()}`); // Display array of preorder depth-first order
console.log(`Postorder Transversal: ${tree.postorder()}`); // Display array of postorder depth-first order
console.log(`Inorder Transversal: ${tree.inorder()}`); // Display array of inorder depth-first order

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(dataArray) {
    this.root = this.buildTree(dataArray);
  }

  buildTree(dataArray) {
    const uniqueSortedArray = Array.from(new Set(dataArray)).sort(
      (a, b) => a - b
    );

    return this.buildTreeRecursive(uniqueSortedArray);
  }

  buildTreeRecursive(dataArray) {
    if (dataArray.length === 0) {
      return null;
    }

    const middleIndex = Math.floor(dataArray.length / 2);
    const leftSubtree = this.buildTreeRecursive(
      dataArray.slice(0, middleIndex)
    );
    const rightSubtree = this.buildTreeRecursive(
      dataArray.slice(middleIndex + 1)
    );

    return new Node(dataArray[middleIndex], leftSubtree, rightSubtree);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const successor = this.findMin(node.right);
        node.data = successor.data;
        node.right = this.deleteNode(node.right, successor.data);
      }
    }

    return node;
  }

  find(value) {
    return this.findNode(this.root, value);
  }

  findNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.findNode(node.left, value);
    } else {
      return this.findNode(node.right, value);
    }
  }

  levelOrder(callback = null) {
    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(callback ? callback(current) : current.data);

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    return result;
  }

  inOrder(callback = null) {
    const result = [];
    this.inOrderTraversal(this.root, callback, result);
    return result;
  }

  inOrderTraversal(node, callback, result) {
    if (node !== null) {
      this.inOrderTraversal(node.left, callback, result);
      result.push(callback ? callback(node) : node.data);
      this.inOrderTraversal(node.right, callback, result);
    }
  }

  preOrder(callback = null) {
    const result = [];
    this.preOrderTraversal(this.root, callback, result);
    return result;
  }

  preOrderTraversal(node, callback, result) {
    if (node !== null) {
      result.push(callback ? callback(node) : node.data);
      this.preOrderTraversal(node.left, callback, result);
      this.preOrderTraversal(node.right, callback, result);
    }
  }

  postOrder(callback = null) {
    const result = [];
    this.postOrderTraversal(this.root, callback, result);
    return result;
  }

  postOrderTraversal(node, callback, result) {
    if (node !== null) {
      this.postOrderTraversal(node.left, callback, result);
      this.postOrderTraversal(node.right, callback, result);
      result.push(callback ? callback(node) : node.data);
    }
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) {
      return 0;
    }

    return this.depth(node.parent) + 1;
  }

  isBalanced() {
    return this.checkBalance(this.root);
  }

  checkBalance(node) {
    if (node === null) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.checkBalance(node.left) &&
      this.checkBalance(node.right)
    ) {
      return true;
    }

    return false;
  }

  rebalance() {
    const values = this.inOrder();
    this.root = this.buildTreeRecursive(values);
  }
}

const getRandomNumbers = (count) => {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
};

const randomNumbers = getRandomNumbers(10);
const bst = new Tree(randomNumbers);

console.log("Initial Tree:");
bst.prettyPrint(bst.root);

console.log("\nIs Balanced:", bst.isBalanced());

console.log("\nLevel Order Traversal:", bst.levelOrder());
console.log("Pre Order Traversal:", bst.preOrder());
console.log("Post Order Traversal:", bst.postOrder());
console.log("In Order Traversal:", bst.inOrder());

console.log("\nAdding numbers > 100 to unbalance the tree:");
bst.insert(120);
bst.insert(110);
bst.insert(130);

console.log("\nIs Balanced:", bst.isBalanced());

console.log("\nRebalancing the tree:");
bst.rebalance();

console.log("\nIs Balanced:", bst.isBalanced());

console.log("\nLevel Order Traversal:", bst.levelOrder());
console.log("Pre Order Traversal:", bst.preOrder());
console.log("Post Order Traversal:", bst.postOrder());
console.log("In Order Traversal:", bst.inOrder());

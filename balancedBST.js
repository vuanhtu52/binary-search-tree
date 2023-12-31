const Node = (value = null) => {
    let _value = value;
    let _leftChild = null;
    let _rightChild = null;

    const setValue = val => {
        _value = val;
    };

    const getValue = () => {
        return _value;
    };

    const setLeftChild = node => {
        _leftChild = node;
    };

    const getLeftChild = () => {
        return _leftChild;
    };

    const setRightChild = node => {
        _rightChild = node;
    };

    const getRightChild = () => {
        return _rightChild;
    };

    return {
        setValue,
        getValue,
        setLeftChild,
        getLeftChild,
        setRightChild,
        getRightChild,
    };
};

const Tree = arr => {
    let _root = null;
    let _sorted = false;

    const getRoot = () => {
        return _root;
    }

    const buildTree = array => {

        if (!_sorted) {
            // Remove duplicates
            array = [...new Set(array)];
            array = [...array];

            // Sort array
            array.sort();

            _sorted = true;
        }

        if (array.length === 0) {
            return null;
        }

        let start = 0;
        let end = array.length - 1;
        let mid = parseInt((start + end) / 2);

        let root = Node(array[mid]);
        root.setLeftChild(buildTree(array.slice(start, mid)));
        root.setRightChild(buildTree(array.slice(mid + 1, end + 1)));

        return root;
    };
    _root = buildTree(arr);

    const insertNode = value => {
        let currentNode = _root;
        while (true) {
            if (value === currentNode.getValue()) {
                console.log("Value already exists.");
                break;
            }
            if (value < currentNode.getValue()) {
                if (currentNode.getLeftChild() === null) {
                    const node = Node(value);
                    currentNode.setLeftChild(node);
                    break;
                }
                currentNode = currentNode.getLeftChild();
            } else {
                if (currentNode.getRightChild() === null) {
                    const node = Node(value);
                    currentNode.setRightChild(node);
                    break;
                }
                currentNode = currentNode.getRightChild();
            }
        }
    };

    const deleteNode = value => {
        let previousNode = null;
        let currentNode = _root;

        while (true) {
            // If the value does not exist in any node
            if (currentNode.getLeftChild() === null && currentNode.getRightChild() === null && currentNode.getValue() !== value) {
                console.log("Value does not exist in the tree.");
                break;
            }

            // When we have found the value at currentNode
            if (currentNode.getValue() === value) {
                // If currentNode is a leaf
                if (currentNode.getLeftChild() === null && currentNode.getRightChild() === null) {
                    if (previousNode.getLeftChild() === currentNode) {
                        previousNode.setLeftChild(null);
                    } else if (previousNode.getRightChild() === currentNode) {
                        previousNode.setRightChild(null);
                    }
                }

                // If currentNode has one child
                if (currentNode.getLeftChild() === null || currentNode.getRightChild() === null) {
                    let nextNode = currentNode.getLeftChild() || currentNode.getRightChild();
                    if (previousNode.getLeftChild() === currentNode) {
                        previousNode.setLeftChild(nextNode);
                    } else if (previousNode.getRightChild() === currentNode) {
                        previousNode.setRightChild(nextNode);
                    }
                    currentNode.setLeftChild(null);
                    currentNode.setRightChild(null);
                }

                // If currentNode has two children
                if (currentNode.getLeftChild() && currentNode.getRightChild()) {
                    // Find the inorder successor of currentNode
                    let successorParent = currentNode;
                    let successorNode = currentNode.getRightChild();
                    while (successorNode.getLeftChild()) {
                        successorParent = successorNode;
                        successorNode = successorNode.getLeftChild();
                    }

                    // Copy value of successorNode to currentNode
                    currentNode.setValue(successorNode.getValue());

                    // Remove successorNode, which either has a right child or no child
                    if (successorNode.getRightChild()) {
                        if (successorParent.getLeftChild() === successorNode) {
                            successorParent.setLeftChild(successorNode.getRightChild());
                        } else if (successorParent.getRightChild() === successorNode) {
                            successorParent.setRightChild(successorNode.getRightChild());
                        }
                        successorNode.setRightChild(null);
                    } else {
                        if (successorParent.getLeftChild() === successorNode) {
                            successorParent.setLeftChild(null);
                        } else if (successorParent.getRightChild() === successorNode) {
                            successorParent.setRightChild(null);
                        }
                    }
                }

                // Stop the loop
                break;
            }

            // Traverse to the next node
            previousNode = currentNode;
            if (value < currentNode.getValue()) {
                currentNode = currentNode.getLeftChild();
            } else if (value > currentNode.getValue()) {
                currentNode = currentNode.getRightChild();
            }
        }
    };

    const find = value => {
        let currentNode = _root;
        if (currentNode.getValue() === value) {
            return currentNode;
        }

        while (currentNode.getValue() !== value) {
            // Return null if we have arrived at a leaf node
            if (currentNode.getLeftChild() === null && currentNode.getRightChild() === null) {
                console.log("Value does not exist in the tree.");
                return null;
            }

            // Traverse to the next node
            if (value < currentNode.getValue()) {
                currentNode = currentNode.getLeftChild();
            } else if (value > currentNode.getValue()) {
                currentNode = currentNode.getRightChild();
            }

            // Check if the next node matches the value
            if (currentNode.getValue() === value) {
                return currentNode;
            }
        }
    };

    const levelOrderIter = cb => {
        let queue = [_root];
        let array = [];
        while (queue.length > 0) {
            // Enqueue the children of the first element in the queue
            if (queue[0].getLeftChild()) {
                queue.push(queue[0].getLeftChild());
            }
            if (queue[0].getRightChild()) {
                queue.push(queue[0].getRightChild())
            }

            // Call the callback function with the first element in the queue
            if (cb) {
                cb(queue[0]);
            }
            array.push(queue[0].getValue());

            // Dequeue the first element in the queue
            queue.shift();
        }

        return array;
    };

    const levelOrderRecursive = (queue, array, cb) => {
        if (queue.length === 0) {
            return array;
        }

        // Enqueue the children of the first element in the queue
        if (queue[0].getLeftChild()) {
            queue.push(queue[0].getLeftChild());
        }
        if (queue[0].getRightChild()) {
            queue.push(queue[0].getRightChild())
        }

        // Call the callback function with the first element in the queue
        if (cb) {
            cb(queue[0]);
        }
        array.push(queue[0].getValue());

        // Dequeue the first element in the queue
        queue.shift();

        return levelOrderRecursive(queue, array, cb);
    };

    const inorder = (root, array, cb) => {
        // Exit condition
        if (root === null) {
            return array;
        }

        // Recursively traverse to the left node
        array = inorder(root.getLeftChild(), array, cb);

        // Visit the node and pass it to the callback function
        if (cb) {
            cb(root);
        }

        // Add the node's value to the array to return later
        array.push(root.getValue());

        // Recursively traverse to the right node
        array = inorder(root.getRightChild(), array, cb);

        return array;
    };

    const preorder = (root, array, cb) => {
        // Exit condition
        if (root === null) {
            return array;
        }

        // Visit the node and pass it to the callback function
        if (cb) {
            cb(root);
        }

        // Add the node's value to the array to return later
        array.push(root.getValue());

        // Recursively traverse to the left node
        array = preorder(root.getLeftChild(), array, cb);

        // Recursively traverse to the right node
        array = preorder(root.getRightChild(), array, cb);

        return array;
    };

    const postorder = (root, array, cb) => {
        // Exit condition
        if (root === null) {
            return array;
        }

        // Recursively traverse to the left node
        array = postorder(root.getLeftChild(), array, cb);

        // Recursively traverse to the right node
        array = postorder(root.getRightChild(), array, cb);

        // Visit the node and pass it to the callback function
        if (cb) {
            cb(root);
        }

        // Add the node's value to the array to return later
        array.push(root.getValue());

        return array;
    };

    const height = node => {
        // Exit condition
        if (node === null) {
            return -1;
        }

        // Calculate the left height
        const leftHeight = height(node.getLeftChild());
        // Calculate the right height
        const rightHeight = height(node.getRightChild());

        return Math.max(leftHeight, rightHeight) + 1;
    };

    const depth = (root, node) => {
        // If the node does not exist in the tree
        if (root === null) {
            console.log("The node does not exist in the binary tree.")
            return null;
        }

        if (node.getValue() === root.getValue()) {
            return 0;
        }

        if (node.getValue() < root.getValue()) {
            let currentDepth = depth(root.getLeftChild(), node);
            if (currentDepth === null) {
                return null;
            } else {
                return currentDepth + 1;
            }
        } else if (node.getValue() > root.getValue()) {
            let currentDepth = depth(root.getRightChild(), node);
            if (currentDepth === null) {
                return null;
            } else {
                return currentDepth + 1;
            }
        }
    };

    const isBalanced = (root, isRootBalanced, height) => {
        // Exit condition
        if (root === null) {
            return [root, true, -1];
        }

        // Check if the left/right subtree is balanced  and get the height
        const [leftChild, isLeftBalanced, leftHeight] = isBalanced(root.getLeftChild(), null, null);
        const [rightChild, isRightBalanced, rightHeight] = isBalanced(root.getRightChild(), null, null);

        if (Math.abs(leftHeight - rightHeight) <= 1) {
            isRootBalanced = true;
        } else {
            isRootBalanced = false;
        }

        isRootBalanced = isRootBalanced && isLeftBalanced && isRightBalanced;

        height = Math.max(leftHeight, rightHeight) + 1;

        return [root, isRootBalanced, height];
    };

    const rebalance = () => {
        // Perform in-order traversal which returns a sorted array
        const sortedArray = inorder(_root, []);
        _root = buildTree(sortedArray);
    };

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.getRightChild() !== null) {
            prettyPrint(node.getRightChild(), `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getValue()}`);
        if (node.getLeftChild() !== null) {
            prettyPrint(node.getLeftChild(), `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    return {
        getRoot,
        buildTree,
        insertNode,
        deleteNode,
        find,
        levelOrderIter,
        levelOrderRecursive,
        inorder,
        preorder,
        postorder,
        height,
        depth,
        isBalanced,
        rebalance,
        prettyPrint,
    };
};



// // const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
// const tree = Tree([1, 2, 4, 9]);
// // const tree = Tree([]);
// tree.insertNode(10);
// tree.prettyPrint(tree.getRoot());

// // console.log(tree.isBalanced());

// console.log(tree.isBalanced(tree.getRoot(), null, null)[1]);

// tree.rebalance();
// tree.prettyPrint(tree.getRoot());

// Simple driver script

// Create a binary tree with random numbers < 100
const getRandomUniqueIntegers = (n, min, max) => {
    if (n > max - min + 1) {
        throw new Error("Cannot generate unique integers. Range is not large enough.");
    }

    const result = [];

    while (result.length < n) {
        const randomInt = Math.floor(Math.random() * (max - min + 1) + min);

        if (!result.includes(randomInt)) {
            result.push(randomInt);
        }
    }

    return result;
};

const array = getRandomUniqueIntegers(50, 0, 100);
const tree = Tree(array);
tree.prettyPrint(tree.getRoot());

// Check if the tree is balanced
console.log("Is it balanced? ", tree.isBalanced(tree.getRoot(), null, null)[1]);

// Check the order of different traversal methods
console.log("Level order traversal: ", tree.levelOrderRecursive([tree.getRoot()], [], null));
console.log("Pre-order traversal: ", tree.preorder(tree.getRoot(), [], null));
console.log("Post-order traversal: ", tree.postorder(tree.getRoot(), [], null));
console.log("In-order traversal: ", tree.inorder(tree.getRoot(), [], null));

// Unbalance the tree by a adding values > 100
tree.insertNode(101);
tree.insertNode(102);
tree.insertNode(103);

// Check if the tree is balanced
console.log("Is it balanced? ", tree.isBalanced(tree.getRoot(), null, null)[1]);

// Rebalance the tree
tree.rebalance();

// Check if the tree is balanced
console.log("Is it balanced? ", tree.isBalanced(tree.getRoot(), null, null)[1]);

// Check the order of different traversal methods
console.log("Level order traversal: ", tree.levelOrderRecursive([tree.getRoot()], [], null));
console.log("Pre-order traversal: ", tree.preorder(tree.getRoot(), [], null));
console.log("Post-order traversal: ", tree.postorder(tree.getRoot(), [], null));
console.log("In-order traversal: ", tree.inorder(tree.getRoot(), [], null));


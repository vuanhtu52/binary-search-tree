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
            if  (value === currentNode.getValue()) {
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

    const levelOrderIter  = cb => {
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
        prettyPrint,
    };
};



const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
tree.prettyPrint(tree.getRoot());
// const node = tree.find(7);
// console.log(node);
// console.log(node.getValue());

// tree.levelOrderIter(node => console.log(node.getValue()));

// const val = tree.levelOrderIter();
// console.log(val);

tree.levelOrderRecursive([tree.getRoot()], [], node => console.log(node.getValue()));

// const val = tree.levelOrderRecursive([tree.getRoot()], []);
// console.log("val: ", val);

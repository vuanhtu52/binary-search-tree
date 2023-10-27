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

    const insert = value => {
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
        insert,
        prettyPrint,
    };
};



const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 11]);
tree.insert(9);
tree.insert(10);
tree.prettyPrint(tree.getRoot());
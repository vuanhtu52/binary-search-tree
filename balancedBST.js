const Node = (value = null, leftChild = null, rightChild = null) => {
    let _value = value;
    let _leftChild = leftChild;
    let _rightChild = rightChild;

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

    return {

    };
};
/**
 * Created by lei.sun on 2017/8/13.
 */
// 节点
function Node(data, left, right) {
    this.data = data;
    this.count = 1;
    this.left = left;
    this.right = right;
    this.show = show;
    this.getmin = getmin;
    this.getmax = getmax;
    this.find = find;
}

function show() {
    return this.data;
}

// 二叉树
function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.preOrder = preOrder;
    this.postOrder = postOrder;
    this.getmin = getmin;
    this.getmax = getmax;
    this.find = find;
    this.remove = remove;
    this.removeNode = removeNode;
    this.getSmallest = getSmallest;
}

function insert(data) {
    var n = new Node(data, null, null);
    if (this.root == null) {
        this.root = n;
    } else {
        var current = this.root;
        var parent;
        while (true) {
            parent = current;
            if (data < current.data) {
                current = current.left;
                if (current == null) {
                    parent.left = n;
                    break;
                }
            } else {
                current = current.right;
                if (current == null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
}

// 中序遍历
function inOrder(node) {
    if (!(node == null)) {
        inOrder(node.left);
        console.log(node.show() + " ");
        inOrder(node.right);
    }
}

// 先序遍历
function preOrder(node) {
    if (!(node == null)) {
        console.log(node.show() + " ");
        preOrder(node.left);
        preOrder(node.right);
    }
}

// 后序遍历
function postOrder(node) {
    if (!(node == null)) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show() + " ");
    }
}

function getmin() {
    var current = this.root;
    while (!(current.left == null)) {
        current = current.left;
    }
    return current.data;
}

function getmax() {
    var current = this.root;
    while (!(current.right == null)) {
        current = current.right;
    }
    return current.data;
}

function find(data) {
    var current = this.root;
    while (current.data != data) {
        if (data < current.data) {
            current = current.left;
        } else {
            current = current.right;
        }
        if (current == null) {
            return null;
        }
    }
    return current;
}

function getSmallest(node) {
    if (node.left == null) {
        return node;
    } else {
        return getSmallest(node.left);
    }
}

function remove(data) {
    root = removeNode(this.root, data);
}

function removeNode(node, data) {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        // node has no children
        if (node.left == null && node.right == null) {
            return null;
        }
        // node has no left child
        if (node.left == null) {
            return node.right;
        }
        // node has no right child
        if (node.right == null) {
            return node.left;
        }
        // node has two children
        // 要继续把右侧子树中的最小节点移除，毕竟它已经被移至要移除的节点的位置了
        var tempNode = getSmallest(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    } else {
        node.right = removeNode(node.right, data);
        return node;
    }
}

function prArray(arr) {
    console.log(arr[0].toString + ' ');
    for (var i = 1; i < arr.length; ++i) {
        console.log(arr[i].toString() + ' ');
        if ( i % 10 == 0) {
            console.log("\n");
        }
    }
}

// 测试
var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
console.log("Inorder traversal: ");
inOrder(nums.root);
console.log("\n");
console.log("Preorder traversal: ");
preOrder(nums.root);
console.log("\n");
console.log("Postorder traversal: ");
postOrder(nums.root);
console.log("\n");
var min = nums.getmin();
console.log("The minimum value of the BST is: " + min);
var max = nums.getmax();
console.log("The maximum value of the BST is: " + max);
inOrder(nums.root);
console.log("\n");
// console.log("Enter a value to search for: ");
// var value = parseInt(readline());
// var found = nums.find(value);
// if (found != null) {
//    console.log("Found " + value + " in the BST.");
// } else {
//    console.log(value + " was not found in the BST.");
// }
// inOrder(nums.root);
// console.log("\n");
// var num = parseInt(readline());
// nums.remove(num);
// inOrder(nums.root);

// 一些概念
// 树的高度取决于所有节点深度的最大值。
// 二叉搜索树（BST）是二叉树的一种，但是它只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大（或者等于）的值。
// 访问树的所有节点有三种方式：中序、先序和后序。
// 中序遍历的一种应用就是对树进行排序操作。
// 先序遍历的一种应用是打印一个结构化的文档。
// 后序遍历的一种应用是计算一个目录和它的子目录中所有文件所占空间的大小。
// 难点：移除一个节点

// AVL树是最先发明的自平衡二叉查找树。在AVL树中任何节点的两个子树的高度最大差别为1，所以它也被称为高度平衡树。


// 红黑树是一种特化的AVL树（平衡二叉树）。都是在进行插入和删除操作时通过特定操作保持二叉查找树的平衡，从而获得较高的查找性能。

/**
 * Created by lei.sun on 2017/8/13.
 */
// 散列表
function HashTable() {
    this.table = new Array(137);
    this.simpleHash = simpleHash;
    this.betterHash = betterHash;
    this.showDistro = showDistro;
    this.put = put;
    this.get = get;
}

// put for linear probing
function put(key, data) {
    var pos = this.betterHash(key);
    if (this.table[pos] == undefined) {
        this.table[pos] = key;
        this.values[pos] = data;
    } else {
        while (this.table[pos] != undefined) {
            pos++;
        }
        this.table[pos] = key;
        this.values[pos] = data;
    }
}

// put for separate chaining
function put(key, data) {
    var pos = this.betterHash(key);
    var index = 0;
    if (this.table[pos][index] == undefined) {
        this.table[pos][index] = data;
    } else {
        while (this.table[pos][index] != undefined) {
            ++index;
        }
        this.table[pos][index] = data;
    }
}

// 给定一个key参数，我们就能根据组成key的每个字符的ASCII码值的和得到一个数字
function simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        total += data.charCodeAt(i);
    }
    console.log("Hash value: " + data + " -> " + total);
    return total % this.table.length;
}

function betterHash(string) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
        total += H * total + string.charCodeAt(i);
    }
    total = total % this.table.length;
    if (total < 0) {
        total += this.table.length-1;
    }
    return parseInt(total);
}

function showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; ++i) {
        if (this.table[i] != undefined) {
            console.log(i + ": " + this.table[i]);
        }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genStuData(arr) {
    for (var i = 0; i < arr.length; ++i) {
        var num = "";
        for (var j = 1; j <= 9; ++j) {
            num += Math.floor(Math.random() * 10);
        }
        num += getRandomInt(50,100);
        arr[i] = num;
    }
}

function buildChains(arr) {
    for (var i = 0; i < arr.length; ++i) {
        arr[i] = new Array();
    }
}

function inHash(key, arr) {
    var hash = simpleHash(key, arr);
    var n = 0;
    if (key == arr[hash][n]) {
        return true;
    } else {
        while (arr[hash][n] != undefined) {
            if (arr[hash][n] == key) {
                return true;
            }
            ++n;
        }
    }
    return false;
}

// get for separate chaining
function get(key) {
    var index = 0;
    var hash = this.betterHash(key);
    if (this.table[pos][index] = key) {
        return this.table[pos][index+1];
    } else {
        while (this.table[pos][index] != key) {
            index += 2;
        }
        return this.table[pos][index+1];
    }
    return undefined;
}

// get for linear probing
function get(key) {
    var hash = -1;
    hash = this.betterHash(key);
    if (hash > -1) {
        for (var i = hash; this.table[hash] != undefined; i++) {
            if (this.table[hash] == key) {
                return this.values[hash];
            }
        }
    }
    return undefined;
}

function get(key) {
    return this.table[this.betterHash(key)];
}

// 测试
var someNames = ["David", "Jennifer", "Donnie", "Raymond",
    "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hTable = new HashTable();
for (var i = 0; i < someNames.length; ++i) {
    hTable.put(someNames[i]);
}
hTable.showDistro();

// 概念
// 散列算法的作用是尽可能快地在数据结构中找到一个值
// 散列函数的作用是给定一个键值，然后返回值在表中的地址

// 实例
// 解决碰撞的两种方法：
// 开链法
// 将验证要加入新元素的位置是否已经被占据
this.put = function(key, value){
    var position = loseloseHashCode(key);
    if (table[position] == undefined) { //{1}
        // 如果这个位置是第一次被加入元素，我们会在这个位置上初始化一个LinkedList类的实例
        table[position] = new LinkedList();
    }
    // 使用第5章中实现的append方法向LinkedList实例中添加一个ValuePair实例（键和值）（行{2}）
    table[position].append(new ValuePair(key, value)); //{2}
};
this.get = function(key) {
    var position = loseloseHashCode(key);
    if (table[position] !== undefined){ //{3}
        //遍历链表来寻找键/值
        var current = table[position].getHead(); //{4}
        while(current.next){ //{5}
            if (current.element.key === key){ //{6}
                return current.element.value; //{7}
            }
            current = current.next; //{8}
        }
        //检查元素在链表第一个或最后一个节点的情况
        if (current.element.key === key){ //{9}
            return current.element.value;
        }
    }
    return undefined; //{10}
};

// 线性探测法
// 如果索引为index的位置已经被占据了，就尝试index+1的位置
this.put = function(key, value){
    var position = loseloseHashCode(key); // {1}
    if (table[position] == undefined) { // {2}
        table[position] = new ValuePair(key, value); // {3}
    } else {
        var index = ++position; // {4}
        while (table[index] != undefined){ // {5}
            index++; // {6}
        }
        table[index] = new ValuePair(key, value); // {7}
    }
};
this.get = function(key) {
    var position = loseloseHashCode(key);
    if (table[position] !== undefined){ //{8}
        if (table[position].key === key) { //{9}
            return table[position].value; //{10}
        } else {
            var index = ++position;
            while (table[index] === undefined || table[index].key !== key){ //{11}
                index++;
            }
            if (table[index].key === key) { //{12}
                return table[index].value; //{13}
            }
        }
    }
    return undefined; //{14}
};

// 处理冲突有几种方法：分离链接、线性探查和双散列法（第二版）
// 双散列法
var djb2HashCode = function (key) {
    // 初始化一个hash变量并赋值为一个质数（行{1}——大多数实现都使用5381）
    var hash = 5381; //{1}
    // 然后迭代参数key（行{2}），将hash与33相乘（用来当作一个魔力数），并和当前迭代到的字符的ASCII码值相加（行{3}）
    for (var i = 0; i < key.length; i++) { //{2}
        hash = hash * 33 + key.charCodeAt(i); //{3}
    }
    // 最后，将使用相加的和与另一个随机质数相除的余数
    return hash % 1013; //{4}
};
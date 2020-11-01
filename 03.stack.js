/**
 * Created by lei.sun on 2017/8/13.
 */
// 栈
function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push; // 入栈
    this.pop = pop; // 出栈
    this.peek = peek;
    this.clear = clear;
    this.length = length;
}

function push(element) {
    this.dataStore[this.top++] = element;
}

function peek() {
    return this.dataStore[this.top - 1];
}

function pop() {
    return this.dataStore[--this.top];
}

function clear() {
    this.top = 0;
}

function length() {
    return this.top;
}

// 测试
var s = new Stack();
s.push("Cynthia");
s.push("Raymond");
s.push("Barbara");
console.log("length:" + s.length());
console.log(s.peek());
var poped = s.pop();
console.log("The poped element is: " + poped);
console.log(s.peek());
s.clear();
console.log("length:" + s.length());

// 实例
// 括号闭合
function parenthesesChecker(symbols){
    let stack = new Stack(),
        balanced = true,
        index = 0,
        symbol, top,
        opens = "([{",
        closers = ")]}";

    while (index < symbols.length && balanced){
        symbol = symbols.charAt(index);
        if (opens.indexOf(symbol) >= 0){
            stack.push(symbol);
            console.log(`open symbol - stacking ${symbol}`);
        } else {
            console.log(`close symbol ${symbol}`);
            if (stack.isEmpty()){
                balanced = false;
                console.log('Stack is empty, no more symbols to pop and compare');
            } else {
                top = stack.pop();
                //if (!matches(top, symbol)){
                if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
                    balanced = false;
                    console.log(`poping symbol ${top} - is not a match compared to ${symbol}`);
                } else {
                    console.log(`poping symbol ${top} - is is a match compared to ${symbol}`);
                }
            }
        }
        index++;
    }
    if (balanced && stack.isEmpty()){
        return true;
    }
    return false;
}

// 进制转换
function baseConverter(decNumber, base){

    var remStack = new Stack(),
        rem,
        baseString = '',
        digits = '0123456789ABCDEF';

    while (decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }

    return baseString;
}

// 回文判断
// 递归演示
// 汉诺塔
function towerOfHanoi(n, from, to, helper){
    if (n > 0){
        towerOfHanoi(n-1, from, helper, to);
        to.push(from.pop());
        console.log('-----');
        console.log('Source: ' + from.toString());
        console.log('Dest: ' + to.toString());
        console.log('Helper: ' + helper.toString());
        towerOfHanoi(n-1, helper, to, from);
    }
}

// 堆和栈不一样
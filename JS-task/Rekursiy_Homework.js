// Задача 1

// function getArr(x, y, arr = []){
// if(x === y-1){
//   return [];
// }
//   x++;
//   arr.push(x);
//   getArr(x, y, arr);
//   return arr
// }
// console.log(getArr(10, 18))


// Задача 2

// function fibonacci(n, arr = [0, 1], accum = 0, i = -1){
//   i++;
//
//   if(typeof(n) != 'number'){
//     return 'Введенные данные не являются числом больше 0!'
//   }
//   if (n === 0){
//     return 'Введите число больше 0.';
//   }
//   if (n === 1){
//     return '0';
//   }
//   if (n === 2){
//     return '0, 1';
//   }
//   if (i === n -2){
//     return arr[i] + arr[i - 1];
//   }
//
//   arr.push(arr[i] + arr[i + 1]);
//   fibonacci(n, arr, accum, i);
//   return arr.join(', ');
// }
// console.log(fibonacci(12))


// Задача 3

// function deleteSameNumbers(arr) {
//     for (let i = 0; i < arr.length - 1; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             if (arr[j] === arr[i]) {
//                 arr.splice(j, 1);
//                 j--;
//             }
//         }
//     }
//     return arr
// }
//
// console.log(deleteSameNumbers([1, 11, 2, 5, 3, 1, 24, 24, 24,24, 24, 24, 4, 5, 24]));


// Задача 4

// function sumNumMoreThanNine(num, i = - 1){
//     if(typeof(num) === 'number'){
//         num = ('' + num).split('').map(Number);
//     }
//
//     i++;
//     if (i === num.length - 1){
//         return num[i];
//     }
//     let sum = num[i] + sumNumMoreThanNine(num, i);
//
//     if (sum > 9){
//         sum = sumNumMoreThanNine(sum, i = -1);
//     }
//     return sum;
// }
//
// console.log(sumNumMoreThanNine(12345))


// Задача 5

// function newString(str, i = -1, firstWord = ''){
//     let arr = str.split('_');
//
//     i++;
//
//     if (i === arr.length - 1){
//         return '';
//     }
//     if(i === 0){
//         firstWord = arr[0]
//     }
//
//     firstWord += arr[i+1][0].toUpperCase() + arr[i+1].slice(1) + newString(str, i);
//     return firstWord
// }
// console.log(newString('var_text_hello_monday'))


// Задача 6

//	Дана строка, например, '123456'. Сделайте из нее '214365'.
// function changeNum(num, i = -2, str = '', arr = []) {
//     if (typeof (num) != 'string') {
//         return 'Введите числа в виде строки';
//     }
//
//     arr = num.split('');
//
//     // Первое условеи на случай если введенная строка будет четной
//     if (i > arr.length - 4 && arr.length % 2 === 0) {
//         return '';
//     }
//     // Это второе услове на случай если введенная строка будет не четная
//     if ((i > arr.length - 4 && arr.length % 2 !== 0)) {
//         return arr[arr.length - 1];
//     }
//
//     i += 2;
//     return str += arr[i + 1] + arr[i] + changeNum(num, i, str, arr);
// }
//
// console.log(changeNum('214365'));



// Задача 7

function getSimilarElements(arr1, arr2, newArr = [], i = -1, j = 0) {
    if (i === arr1.length - 1) {
        return [];
    }

    i++;
    arr2.find(elem=>{
        if(elem === arr1[i] && j < 1){
            j++;
            if (j === 1) {
                newArr.push(elem);
            }
        }
    })

    getSimilarElements(arr1, arr2, newArr, i, j = 0)
    return newArr = [...new Set(newArr)];
}

console.log(getSimilarElements([1, 2, 3, 'p','a',4, 5, 's', 7, 4], [2, 3, 's', 5, 6, 'r', 4, 4, 4, 8, 9, 0]))
// console.log(getSimilarElements([1, 2, 3], [ 2, 3, 4, 5]))
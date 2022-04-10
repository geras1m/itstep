// Task 1

// let user = {
//     name: "John",
//     years: 30
// };
// ({name,years: age, isAdmin = false } = user);
// console.log(name, age, isAdmin);



// Task 2

function getSumNumbers(...num){
    let sum = 0;
    for (const numElem of num) {
        sum += numElem;
    }
    return sum;
}

console.log(getSumNumbers(1,2,3,4,5,6,7))

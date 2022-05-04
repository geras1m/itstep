// Task 1

function Car (make, speed){
    this.make = make;
    this.speed = speed;
}
Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`Ускорение на 10 км/ч, теперь скорость ${this.speed} км/ч`);
}
Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`Немного притормозили, теперь скорость ${this.speed} км/ч`);
}

let carBmw = new Car('BMW', 120);
console.log(carBmw);
carBmw.accelerate();
carBmw.brake();

let carMercedes = new Car('Мерседес', 95);
console.log(carMercedes);
carMercedes.accelerate();
carMercedes.brake();


// Task 2


class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate(){
        this.speed += 10;
        console.log(`Ускорение на 10 км/ч, теперь скорость ${this.speed} км/ч`);
    }
    brake(){
        this.speed -= 5;
        console.log(`Немного притормозили, теперь скорость ${this.speed} км/ч`);
    }
    get speedUs(){
        return `Текущая скорость ${this.speed} км/ч = ${this.speed / 1.6} миль/ч`;
    }
    set speedUS(speed){
        this.speed = speed * 1.6;
    }
}

console.log('-------class-------')
let carFord = new CarCl('Форд', 120);
console.log(carFord);
carFord.accelerate();
carFord.brake();
console.log(carFord.speedUs);
carFord.speedUS = 60;

console.log(carFord);
carFord.accelerate();
carFord.brake();
console.log(carFord.speedUs);
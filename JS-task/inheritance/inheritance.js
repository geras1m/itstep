// Task 1

/*
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



const Ev = function (make, speed, charge){
    Car.call(this, make, speed);
    this.charge = charge;
}

Ev.prototype = Object.create(Car.prototype);
Ev.prototype.constructor = Car;

Ev.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
}
Ev.prototype.accelerate = function (){
    this.speed += 20;
    this.charge -= 1;
    console.log(`${this.make} едет со скоростью ${this.speed} км/ч, заряд составляет ${this.charge}%`);
}

const tesla = new Ev('Tesla', 120, 23);
tesla.chargeBattery(50);
tesla.accelerate();
*/


// Task-2


class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate(){
        this.speed += 10;
        console.log(`Ускорение на 10 км/ч, теперь скорость ${this.speed} км/ч`);
        return this;
    }
    brake(){
        this.speed -= 5;
        console.log(`Немного притормозили, теперь скорость ${this.speed} км/ч`);
        return this;
    }
    get speedUs(){
        return `Текущая скорость ${this.speed} км/ч = ${this.speed / 1.6} миль/ч`;
    }
    set speedUS(speed){
        this.speed = speed * 1.6;
    }
}

class EVCL extends CarCl{
    #charge
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery (chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
    accelerate (){
        this.speed += 20;
        this.#charge -= 1;
        console.log(`${this.make} едет со скоростью ${this.speed} км/ч, заряд составляет ${this.#charge}%`);
        return this;
    }
    brake() {
        super.brake();
        this.#charge -= 1;
        console.log(`И заряд батареи равен ${this.#charge} %`);
        return this;
    }
}

let rivian = new EVCL('Rivian',120, 23);

rivian.chargeBattery(50)
rivian.accelerate();
console.log(rivian);

rivian.chargeBattery(70).accelerate().brake().chargeBattery(30).brake();
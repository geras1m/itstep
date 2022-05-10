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


// Task-2

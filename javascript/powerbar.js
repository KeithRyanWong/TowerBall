class PowerBar {
  constructor() {
    this.direction = 1;

    this.interval = setInterval(() => {
      this.setPower();
    }, 10);
  }
  
  setPower(){
    let power = document.getElementById('power');
    let currentPower = parseInt(power.value);
    if ( currentPower >= 100 ) {
      this.direction = -1;
    } else if (currentPower <= 1) {
      this.direction = 1;
    }

    currentPower += this.direction;

    power.value = currentPower;
  }
}

export default PowerBar;
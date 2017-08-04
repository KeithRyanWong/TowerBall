class PowerBar {
  constructor() {
    this.direction = 1;

    setInterval(() => {
      this.setPower();
    }, 5);
  }
  
  setPower(){
    let power = document.getElementById('power');
    let currentPower = parseInt(power.value);
    if ( currentPower >= 100 ) {
      this.direction = -1;
    } else if (currentPower <= 0) {
      this.direction = 1;
    }

    currentPower += this.direction;

    power.value = currentPower;
  }
}

export default PowerBar;
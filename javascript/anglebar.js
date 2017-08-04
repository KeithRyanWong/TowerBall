class AngleBar {
  constructor() {
    this.direction = 1;
  }
  
  setPower(){
    let angle = document.getElementById('angle');
    let currentAngle = parseInt(angle.value);
    if ( currentAngle >= 100 ) {
      this.direction = -1;
    } else if (currentAngle <= 0) {
      this.direction = 1;
    }

    currentAngle += this.direction;

    angle.value = currentAngle;
  }
}

export default AngleBar;
class Shoot {
  constructor(x,y, angle) {
    this.pos = createVector(x,y)
    this.vel = p5.Vector.fromAngle(angle)
    this.vel.mult(8)
  }
  draw(){
    fill(47, 255, 10)
    noStroke()
    ellipse(this.pos.x, this.pos.y, 3)
  }
  isOffScreen(){
    return(
       this.pos.x > width ||
       this.pos.x < 0 ||
       this.pos.y > height ||
       this.pos.y < 0)
  }
  interact(e){
      return !(this.pos.x < e.pos.x ||
        this.pos.x > e.pos.x + e.w ||
        this.pos.y < e.pos.y ||
        this.pos.y > e.pos.y + e.w)
    }
  update(){

    this.draw()
    this.pos.add(this.vel)
  }
}

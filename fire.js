class Fire {
  constructor(x,y,angle) {
    this.pos = createVector(x,y)
    this.vel = createVector()
    this.acc = createVector()
    this.ttl = 255
    this.r = random(8,12)
    this.red = floor(random(86,176))
    this.angle = angle
  }
  draw(){
    noStroke()
    fill(247, this.red, 22, this.ttl)
    ellipse(this.pos.x, this.pos.y, this.r)
  }
  applyForce(force){
    this.vel.add(force)
  }
  force(){
    let f = p5.Vector.fromAngle(random(this.angle-PI/3, this.angle+PI/3))
    f.mult(-0.5)
    this.vel.add(f)
  }
  isDead(){
    return(this.ttl <= 0)
  }
  update(){
    this.draw()
    this.force()

    this.ttl -=5
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
  }
}

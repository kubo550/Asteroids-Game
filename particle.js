class Particle {
  constructor(pos,w) {
    this.pos = createVector(pos.x, pos.y)
    this.vel = p5.Vector.random2D()
    this.vel.mult(random(0.2, 0.5))
    this.acc = p5.Vector.random2D()
    this.w = random(w-10, w+10)
    this.ttl = 40
    this.blue = random(255)
  }
  draw(){
    push()
    noStroke()
    ellipseMode(CORNER)
    fill(255- this.ttl*2 ,120,this.blue, this.ttl*2)
    ellipse(this.pos.x, this.pos.y, this.w)
    pop()
  }
  applyGravity(){
    let gr = createVector(0,0.1)
    this.acc.add()
  }
  dead(){
    return(this.ttl < 0)
  }
  update(){
    this.draw()
    this.applyGravity()
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.mult(0)
    this.ttl --
  }
}


class Player {
  constructor() {
    this.pos = createVector(width/2,height- 30)
    this.vel = createVector()
    this.acc = createVector()
    this.lives = 3
    this.r = 20
    this.angle = -PI/2
    this.maxBullets = 50
    this.numOfBullets = 50
    this.fires = []
    this.shoots = []
    this.reloading = false
    this.wystrzelone = 0
    this.trafione = 0
  }
  draw(){
    stroke(250)
    fill(40)
    push()
    // translate(width - this.pos.x, height - this.pos.y)
    translate(this.pos.x, this.pos.y)
    rotate(this.angle + PI/2)
    beginShape()
    vertex(0,-this.r)
    vertex(this.r*2/3,this.r*2/3)
    vertex(-this.r*2/3,this.r*2/3)
    endShape(CLOSE)
    pop()
  }

  edges(){

    if (this.pos.x > width + this.r ) {
      this.pos.x = -this.r
    }else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r
    }else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r
    }
  }
  move(){
    if (contloler.up) {
      moved = true
      var force = p5.Vector.fromAngle(this.angle)
      force.mult(0.2)
      this.vel.add(force)
      this.fires.push(new Fire(this.pos.x, this.pos.y, this.angle))
    }
    if (contloler.left) {
      this.angle -= 0.1;
    }
    if (contloler.right) {
      this.angle += 0.1;
    }
  }
  shoot(){
    if (contloler.space && this.numOfBullets > 0 && !this.reloading) {
      this.shoots.push(new Shoot(this.pos.x, this.pos.y, this.angle))
      this.wystrzelone ++
      this.numOfBullets --
      if (this.numOfBullets == 0) {
        this.reload()
      }
    }
    for (let [i,s] of this.shoots.entries()) {
      s.update()
      for (let e  of enemies) {
        if (s.interact(e)) {
          this.shoots.splice(i,1)
          e.hp -=0.05
          this.trafione ++
        }
      }
      if (s.isOffScreen()) {
        this.shoots.splice(i,1)
      }
    }
  }
  boost(){
    for (let [i,f] of this.fires.entries()) {
      f.update()
      f.applyForce(gravity)
      if (f.isDead()) {
        this.fires.splice(i,1)
      }
    }
  }
  applyForce(force){
    this.vel.add(force)
  }
  reload(){
    this.reloading = true
    while (this.numOfBullets < 49) {
      this.numOfBullets += 1
    }
    this.reloading = false
  }
  info(){
    push()
    fill(255)
    stroke(0)
    textSize(20)
    textAlign(CENTER)
    text(`Bullets: ${this.numOfBullets} / ${this.maxBullets}`, width - 80, height- 50)
    noStroke()
    fill(120)
    rectMode(CENTER)
    rect(width - 80, height- 30, 130,20)
    fill(250)
    // rectMode(CORNER)
    let percent = this.numOfBullets / this.maxBullets
    let mappedWidth = map(percent, 0, 1, 0, 130)
    rect(width - 80, height- 30, mappedWidth,20)
    // text(`HP: 100 / 100  `, width - 80, height- 30)
    let acc = floor(this.trafione/this.wystrzelone * 100)
    if (acc) {
      // console.log(`accuracy: ${acc}%`)
      // console.log(enemies.length);
      text(`Accuracy: ${acc}%`, 80, height - 50)
    }else {
      text(`Accuracy:  0%`, 80, height - 50)
    }
    pop()
  }

  update(){
    this.info()

    this.move()
    this.shoot()
    this.boost()
    this.draw()
    player.edges()
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.mult(0.98)
    this.acc.mult(0)
  }
}


class Enemy {
  constructor(w,pos,vel) {
    this.pos = pos || createVector(random(20, width-20), -20)
    this.vel = vel || createVector(0, random(0.1,0.4))
    this.alive = true
    this.w = w || floor(random(40,50))
    this.hp = this.w/50
  }
  draw(){
    push()
    let from = color(255,0,0)
    let to = color(0,255,0)
    let col = lerpColor( from, to, this.hp)
    stroke(255)
    fill(31)
    image(enemyImg,this.pos.x, this.pos.y, this.w+2, this.w+2)
    // rect(this.pos.x, this.pos.y, this.w, this.w )
    fill(col)
    strokeWeight(1)
    rect(this.pos.x, this.pos.y +this.w + 8, this.w, this.w/6 )
    pop()
  }
  break(){
    let arr = []
    // let newp = this.pos.copy()
    // let newp1 = newp.add(10,0)
    // arr[0] = new Enemy(this.w-5, createVector(this.pos.x+10, this.pos.y), this.vel)
    arr[0] = new Enemy(this.w*2/3, createVector(this.pos.x - this.w/2, this.pos.y), this.vel)
    arr[1] = new Enemy(this.w*2/3, createVector(this.pos.x + this.w/2, this.pos.y), this.vel)
    // arr[1] = new Enemy(this.w/2, this.pos.add(this.w/2,0), this.vel.add(0,0.5))
    return arr
  }
  isDead(){
    return( this.hp <= 0)
  }
  isOffScreen(){
    return(this.pos.y > height + this.w )
  }

  update(){
    this.pos.add(this.vel)
    this.draw()

  }
}

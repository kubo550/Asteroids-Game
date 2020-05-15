class Wybuch {
  constructor(pos,w) {
    this.pos = pos
    this.w = w
    this.particles = []
    this.live = true
    for (var i = 0; i < 10; i++) {
      this.particles[i] = new Particle(this.pos, this.w)
    }
  }
  update(){
    for (let [i,p] of this.particles.entries()) {
      p.update()
      if (p.dead()) {
        this.particles.splice(i,1)
      }
      if (this.particles.length == 0) {
        this.live = false
      }
    }
  }
}

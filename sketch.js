let player, gravity, fires, stars, moved, enemies, enemyImg, e, wybuchy
const contloler = {
  up: false,
  left: false,
  right: false,
  space: false
}

function setup() {
  enemyImg = loadImage('eimg.png')
  createCanvas(windowWidth, windowHeight)
  player = new Player()
  p = createVector(width / 2 - 20, 0)
  enemies = [new Enemy(40, p)]
  fires = []
  stars = []
  wybuchy = []
  stars1()
  gravity = createVector()
}

function draw() {
  background(40)
  strokeWeight(2)
  stroke(255)

  if (random() < 0.005) {
    enemies.push(new Enemy())
  }

  for (var i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i]
    e.update()

    if (e.isDead() && e.w > 25) {
      let news = e.break()
      enemies.splice(i, 1)
      enemies = enemies.concat(news)
      let w = new Wybuch(e.pos, e.w)
      wybuchy.push(w)
      break
    } else if (e.isDead()) {
      let w = new Wybuch(e.pos, e.w)
      wybuchy.push(w)
      enemies.splice(i, 1)
    } else if (e.isOffScreen()) {
      enemies.splice(i, 1)
    }
  }
  for (let [i, w] of wybuchy.entries()) {
    w.update()
    if (!w.live) {
      wybuchy.splice(i, 1)
    }
  }
  for (let s of stars) {
    point(s.x, s.y)
  }
  player.update()
  player.applyForce(gravity)
  if (moved) {
    gravity = createVector(0, 0.008)
  }
}

function keyPressed() {
  switch (keyCode) {
    case 38:
      contloler.up = true;
      break;
    case 37:
      contloler.left = true;
      break;
    case 39:
      contloler.right = true;
      break;
    case 32:
      contloler.space = true;
      break;
    case 66:
      console.log(wybuchy);
      break;
  }
}
function keyReleased() {
  switch (keyCode) {
    case 38:
      contloler.up = false;
      break;
    case 37:
      contloler.left = false;
      break;
    case 39:
      contloler.right = false;
      break;
    case 32:
      contloler.space = false;
      break;
  }
}
function stars1() {
  for (var i = 0; i < 100; i++) {
    let data = {
      x: random(width),
      y: random(height)

    }
    stars.push(data)
  }
}


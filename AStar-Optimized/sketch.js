let n;
let nodes = []
let start = []
let end = []
let AI = []
let obstacles = []
let nd
let path = []
let isStarted
let garb;

let mx;
let my;
let me;
let base
let huh

let node2d
let nodesTemp;
let stack = []




function setup() {
  base = 100
  createCanvas(round((window.innerWidth) / base) * base - 100, round(window.innerHeight / base) * base - 100)
  background(56)
  start = [0, 0]
  huh = false;
  node2d = [0]
  nodesTemp = []
  s = round(random(0, 19))
  e = round(random(0, 19))
  end = [width - base, height - base]
  isStarted = false
  garb = []
  obstacles = []


  //console.log(path)
  for (var y = 0; y < height / base; y++) {

    for (var i = 0; i < width / base; i++) {
      n = new Node(i * base, y * base)

      nodes.push(n)
    }

  }
  //console.log(node2d)
  for (var i = 0; i < nodes.length; i++) {
    //nodes[i].show()
    nodes[i].update(obstacles)

    //nodes[i].caluclate_shit(start[0], start[1], end[0], end[1])

  }

  for (var i = 0; i < nodes.length; i++) {
    for (var j = 0; j < nodes.length; j++) {
      var d = dist(nodes[i].x + 50, nodes[i].y + 50, nodes[j].x + 50, nodes[j].y + 50)
      if (d < base + 10 && d > 0 && i != j) {
        nodes[j].adjacent.push(i)
      }
    }
  }
  me = nodes[0]

}

function mouseClicked() {
  if (!isStarted) {
    mx = round(mouseX / base) * base
    my = round(mouseY / base) * base
    fill(255, 255, 255)
    rect(mx, my, base, base)
    let cheese = true;
    for (var i = 0; i < obstacles.length; i++) {

      if (obstacles[i][0] == mx && obstacles[i][1] == my) {
        cheese = false
      }
    }
    if (cheese) {
      obstacles.push([mx, my])
    }
  }
}

function keyPressed() {

  if (keyCode === ENTER) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].show()
    }
    isStarted = true;
    AI = [start[0], start[1]]
    path = [AI]
  }


  if (keyCode === 32) {
    for (var i = 0; i < base; i++) {
      obstacles.push([round(random(0, (width - base) / base)) * base, round(random(0, (height - base) / base)) * base])
    }
    //isStarted = true;
  }
  if (keyCode == 69) {
    mx = round(mouseX / base) * base
    my = round(mouseY / base) * base

    end = [mx, my]
  }
  if (keyCode == 83) {
    mx = round(mouseX / base) * base
    my = round(mouseY / base) * base

    start = [mx, my]
  }

  if (keyCode == 16) {
    obstacles = []
    Maze()
  }

}

function mouseDragged() {
  if (!isStarted) {
    mx = round(mouseX / base) * base
    my = round(mouseY / base) * base
    fill(255, 255, 255)
    rect(mx, my, base, base)

    let cheese = true;
    for (var i = 0; i < obstacles.length; i++) {

      if (obstacles[i][0] == mx && obstacles[i][1] == my) {
        cheese = false
      }
    }
    if (cheese) {
      obstacles.push([mx, my])
    }
  }
}

function draw() {
  if (!isStarted) {
    background(56)


  }


  for (var i = 0; i < obstacles.length; i++) {
    fill(255, 255, 255)
    rect(obstacles[i][0], obstacles[i][1], base, base)
  }





  if (isStarted) {
    nd = dist(AI[0], AI[1], end[0], end[1])




    if (huh == false) {
      for (var i = 0; i < nodes.length; i++) {
        //nodes[i].show()
        nodes[i].update(obstacles)
        nodes[i].caluclate_shit(start[0], start[1], end[0], end[1])

      }
    }
    huh = true;
    //do_stuff()

    reCheck()
    //console.log(path.length)

    if (nd <= base) {
      me = nodes[garb[garb.length - 1]];
      //background(56)
      for (var i = 0; i < obstacles.length; i++) {
        fill(255, 255, 255)
        rect(obstacles[i][0], obstacles[i][1], base, base)
      }

      fill(255, 0, 0)
      rect(end[0], end[1], base, base)
      for (var i = garb.length - 1; i >= 0; i--) {

        fill(255, 255, 0)
        rect(me.x, me.y, base, base)
        me = nodes[me.myCheese]
      }
      noLoop()
    }
    //console.log(nd)


  } else {
    mx = round(mouseX / base) * base
    my = round(mouseY / base) * base
    fill(255, 255, 255)
    rect(mx, my, base, base)

    if (keyIsDown(BACKSPACE)) {
      mx = round(mouseX / base) * base
      my = round(mouseY / base) * base

      for (var i = 0; i < obstacles.length; i++) {
        fill(0, 0, 255)
        rect(mx, my, base, base)
        if (obstacles[i][0] == mx && obstacles[i][1] == my) {
          obstacles.splice(i, 1)
        }
      }
    }




  }

  fill(0, 255, 0)
  rect(start[0], start[1], base, base)

  fill(255, 0, 0)
  rect(end[0], end[1], base, base)

}

function reCheck() {
  let lowest_fcost = 100000000000;
  let best = 0;
  let path_best = 0
  for (var e = 0; e < path.length; e++) {
    fill(0, 255, 0)
    rect(path[e][0], path[e][1], base, base)

    fill(255, 0, 0)
    rect(end[0], end[1], base, base)


    //console.log(nd)

    var total_adjacent = 4
    for (var i = 0; i < nodes.length; i++) {
      //nodes[i].update(obstacles)

      var d = dist(path[e][0] + 50, path[e][1] + 50, nodes[i].realX, nodes[i].realY)
      if (d < base + 10 && d > 0) {
        total_adjacent--
        if (nodes[i].fcost < lowest_fcost) {
          lowest_fcost = nodes[i].fcost
          best = i
          //garb.push([nodes[i].x, nodes[i].y])
          AI = path[e]
          //path_best = e;


        }
      }
      if (total_adjacent <= 0) {
        break
      }
    }

  }

  var AI_index

  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].x == AI[0] && nodes[i].y == AI[1]) {
      AI_index = i
      break
    }
  }

  nodes[best].myCheese = AI_index
  garb.push(AI_index)

  AI = [nodes[best].x, nodes[best].y]


  nodes[best].can_cal = false
  nodes[best].fcost = 1000000000000000000000000

  path.push(AI)
  node2d.push(best)
  console.log(path.length)
  console.log(node2d.length)
  for (var i = 0; i < path.length; i++) {
    let can_bong = false;
    //console.log(nodes[best].adjacent.length)
    for (var j = 0; j < nodes[node2d[i]].adjacent.length; j++) {
      if (nodes[nodes[node2d[i]].adjacent[j]].can_cal == true) {
        fill(0, 0, 255)
        rect(nodes[nodes[node2d[i]].adjacent[j]].x, nodes[nodes[node2d[i]].adjacent[j]].y, base, base)
        can_bong = true

        //path.push(AI)
      }
    }
    if (can_bong == false) {
      path.splice(i, 1)
      node2d.splice(i, 1)
    }
  }




}
function getFromCoord(arr, x, y){
  for (var i=0;i<arr.length;i++){
    if (arr[i][0] == x && arr[i][1] == y){
      return i
    }
  }
}

function Maze(){
  W = width/base
  H = height/base
  let stack = []
  
  
  for (var x=0;x<W;x++){
    for (var y=0;y<H;y++){
      if (x%2==0 && y%2==0){
        rudn1 = x*base+base*2
        rudn2 = y*base+base*2
        //console.log(rudn2)
        thes = []
        if (round(random(0, 1)) == 0 && rudn1<width-base){
          
          maze.push([rudn1, y*base])
          maze.push([rudn1-base, y*base])
        }
        else{
          maze.push([x*base, rudn2])
          maze.push([x*base, rudn2-base])
        }
      }
      
      
    }
  }
  
  
  

}



class Cell{
  constructor(x, y){
    this.x = x
    this.y = y
    this.has_visited = false
    this.neigbors = []
  }
}








class Node {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.realX
    this.realY

    this.gcost
    this.hcost
    this.fcost
    this.can_cal = true
    this.myCheese
    this.adjacent = []

  }

  update(ob) {


    for (var i = 0; i < ob.length; i++) {

      if (dist(ob[i][0], ob[i][1], this.x, this.y) == 0) {
        this.can_cal = false
        this.fcost = 10000000000000000
      }
    }
    this.realX = this.x + 50
    this.realY = this.y + 50


  }
  show() {
    if (this.can_cal == false) {
      fill(255, 255, 255)
      strokeWeight(4);
      stroke(0, 0, 0);
      rect(this.x, this.y, base, base)
    }

  }

  caluclate_shit(sx, sy, ex, ey) {
    if (this.can_cal) {
      this.gcost = dist(sx, sy, this.x, this.y)
      this.hcost = dist(ex, ey, this.x, this.y)
      this.fcost = this.gcost + this.hcost
    }


  }

}

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
let huh

let node2d
let nodesTemp;


let base = 100
let maze = []


let cells = [];
let w;
let h;

let currCell;
let stack = [];

let done = false;


function Cell(x, y){
  this.x = x;
  this.y = y;
  this.isWall = true;
  
  this.getRandomNeighbour = function(){
    let neighbours = [];
    
    let top = cells[this.x][this.y-2]; //top
    let right = cells[this.x+2][this.y]; //right
    let bottom = cells[this.x][this.y+2]; //bottom
    let left = cells[this.x-2][this.y]; //left
    
    if(top && top.isWall){ //top
      neighbours.push(top);
    }
    if(right && right.isWall){ //right
      neighbours.push(right);
    }
    if(bottom && bottom.isWall){ //bottom
      neighbours.push(bottom);
    }
    if(left && left.isWall){ //left
      neighbours.push(left);
    }
    
    if(neighbours.length > 0){
      let randomIndex = Math.floor(Math.random()*neighbours.length);
      let randomNeighbour = neighbours[randomIndex];
      return randomNeighbour;
    }else{
      return null;
    }
  }
}



function setup() {
  base = 100
  createCanvas(round((window.innerWidth) / base) * base - 100, round(window.innerHeight / base) * base - 100)
  background(56)
  start = [base, base]
  huh = false;
  node2d = [0]
  nodesTemp = []
  s = round(random(0, 19))
  e = round(random(0, 19))
  end = [width - base*3, height - base*3]
  isStarted = false
  garb = []
  obstacles = []


  //console.log(path)
  var dsa = 0
  for (var y = 0; y < height / base; y++) {

    for (var i = 0; i < width / base; i++) {
      n = new Node(i * base, y * base)

      nodes[dsa] = n
      dsa++
    }

  }
  //console.log(node2d)
  for (var i = 0; i < nodes.length; i++) {
    //nodes[i].show()
    nodes[i].update(obstacles)

    //nodes[i].caluclate_shit(start[0], start[1], end[0], end[1])

  }
  var W = width/base
  console.log(W)
  for (var i = 0; i < nodes.length; i++) {
    if (i > 0){
      nodes[i].adjacent.push(i-1)
    }

    if (i < nodes.length-1){
      nodes[i].adjacent.push(i+1)
    }

    if (i > W){
      nodes[i].adjacent.push(i-W)
    }

    if (i < nodes.length-W){
      nodes[i].adjacent.push(i+W)
    }
  }
  me = nodes[0]



  w = Math.floor(width / base / 2) * 2 - 1;
  h = Math.floor(height / base / 2) * 2 - 1;
  
  // initialize cells
  for(let x=0; x<w; x++){
    cells[x] = [];
    for(let y=0; y<h; y++){
      cells[x][y] = new Cell(x, y);
    }
  }
  // fix invalid neighbour indexing problem
  cells[-1] = [];
  cells[-2] = [];
  cells[w] = [];
  cells[w+1] = [];
  
  // initialize starting cell
  currCell = cells[1][1];
  

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
  
  if (keyCode === 67){
    obstacles = []
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
    done = false
    while (!done){
    Maze()
  }
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
      background(56)
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
        rect(mx, my, base/2, base/2)
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

      var d = dist(path[e][0] + base/2, path[e][1] + base/2, nodes[i].realX, nodes[i].realY)
      if (d < base + base/10 && d > 0) {
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
  //console.log(path.length)
  //console.log(node2d.length)
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


function removeWalls(cell1, cell2){
  let x = (cell1.x + cell2.x) / 2;
  let y = (cell1.y + cell2.y) / 2;
  cells[x][y].isWall = false;
}

function iterate(){
  currCell.isWall = false;
  
  let next = currCell.getRandomNeighbour();
  
  if(next){
    stack.push(currCell);
    
    removeWalls(currCell, next); // remove walls between cells
    
    currCell = next;
  }else if(stack.length > 0){
    currCell = stack.pop();
  }else{
    console.log("DONE!");
    console.log("width = "+w+", height = "+h);
    getWallCoordinates();
    done = true;
  }
}

function getWallCoordinates(){
  let walls = [];
  for(let x=0; x<w; x++){
    for(let y=0; y<h; y++){
      let cell = cells[x][y];
      if(cell.isWall){
        walls.push([cell.x, cell.y]);
      }
    }
  }
  
  let str = "[";
  for(let i=0; i<walls.length; i++){
    str += "[";
    str += walls[i][0];
    str += ",";
    str += walls[i][1];
    str += "], ";
  }
  str = str.substring(0, str.length-2);
  str += "]";
  obstacles = []
  for (var i=0;i<walls.length;i++){
    obstacles.push([walls[i][0]*base, walls[i][1]*base])
  }
  
}


function Maze(){
  if(!done){
    for(let i=0; i<1000; i++){
      if(!done){
        iterate();
      }
    }
  }
  
  // draw cells
  for(let x=0; x<w; x++){
    for(let y=0; y<h; y++){
      let cell = cells[x][y];
      let drawX = cell.x * base;
      let drawY = cell.y * base;
      // draw cell
      if(cell == currCell && !done){
        fill(0, 255, 0);
      }else if(cell.isWall){
        fill(0);
      }else{
        fill(255);
      }
      noStroke();
      //rect(drawX, drawY, cellSize, cellSize);
    }
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

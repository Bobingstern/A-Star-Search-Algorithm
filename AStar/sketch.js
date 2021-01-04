
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


function setup(){
	createCanvas(2000, 2000)
	background(56)
	start = [0, 0]
	
	s = round(random(0, 19))
	e = round(random(0, 19))
	end = [1900, 1900]
	isStarted = false
	garb = []
	obstacles = []

	AI = [start[0], start[1]]
	path = [AI]
	//console.log(path)
	for (var y=0;y<20;y++){
		for (var i=0;i<20;i++){
			n = new Node(i*100, y*100)
			nodes.push(n)
		}
	}

	for (var i=0;i<nodes.length;i++){
			//nodes[i].show()
			nodes[i].update(obstacles)
			//nodes[i].caluclate_shit(start[0], start[1], end[0], end[1])
			
		}

	me = nodes[0]
}

function mouseClicked() {
	if (!isStarted){
	mx = round(mouseX/100)*100
	my = round(mouseY/100)*100
	fill(255, 255, 255)
	rect(mx, my, 100, 100)
	let cheese = true;
	for (var i=0;i<obstacles.length;i++){
  		
      	if (obstacles[i][0] == mx && obstacles[i][1] == my){
      			cheese = false
      			}
      		}
      if (cheese){
  		obstacles.push([mx, my])
  	}
  }
}	

function keyPressed() {
  if (keyCode === ENTER) {
    isStarted = true;
  }
  

  if (keyCode === 32) {
  	for (var i=0;i<100;i++){
  		obstacles.push([round(random(0, 29))*100, round(random(0, 29))*100])
  	}
    //isStarted = true;
  }
  
}


function mouseDragged() {
	if (!isStarted){
  	mx = round(mouseX/100)*100
	my = round(mouseY/100)*100
	fill(255, 255, 255)
	rect(mx, my, 100, 100)

  	let cheese = true;
	for (var i=0;i<obstacles.length;i++){
  		
      	if (obstacles[i][0] == mx && obstacles[i][1] == my){
      			cheese = false
      			}
      		}
      if (cheese){
  		obstacles.push([mx, my])
  	}
  }
}

function draw(){
	if (!isStarted){
		background(56)
		
	}


	for (var i=0;i<obstacles.length;i++){
			fill(255, 255, 255)
			rect(obstacles[i][0], obstacles[i][1], 100, 100)
	}





	if (isStarted){
		nd = dist(AI[0], AI[1], end[0], end[1])

		


		
		for (var i=0;i<nodes.length;i++){
			//nodes[i].show()
			nodes[i].update(obstacles)
			nodes[i].caluclate_shit(start[0], start[1], end[0], end[1])
			
		}
		//do_stuff()

		reCheck()
		//console.log(path.length)

		if (nd <= 100){
			me = nodes[garb[garb.length-1]];
			//background(56)
			for (var i=0;i<obstacles.length;i++){
			fill(255, 255, 255)
			rect(obstacles[i][0], obstacles[i][1], 100, 100)
	}

			fill(255, 0, 0)
			rect(end[0], end[1], 100, 100)
			for (var i=garb.length-1;i>=0;i--){

				fill(255, 255, 0)
				rect(me.x, me.y, 100, 100)
				me = nodes[me.myCheese]
			}
			noLoop()
		}
		//console.log(nd)
		

	}
	
	else{
	mx = round(mouseX/100)*100
	my = round(mouseY/100)*100
	fill(255, 255, 255)
	rect(mx, my, 100, 100)

	if (keyIsDown(BACKSPACE)){
		mx = round(mouseX/100)*100
	my = round(mouseY/100)*100

  	for (var i=0;i<obstacles.length;i++){
  		fill(0, 0, 255)
  		rect(mx, my, 100, 100)
      	if (obstacles[i][0] == mx && obstacles[i][1] == my){
      			obstacles.splice(i, 1)
      			}
      		}
	}

	

	
	}
	
}


function do_stuff(){
	//GET THE SURROUNDING NODES
	fill(0, 255, 0)
	rect(AI[0], AI[1], 100, 100)

	fill(255, 0, 0)
	rect(end[0], end[1], 100, 100)

	

	

	let lowest_fcost = 100000000000;
	let best = 0;
	
	console.log(nd)

	 
	for (var i=0;i<nodes.length;i++){
		nodes[i].update(obstacles)

		var d = dist(AI[0]+50, AI[1]+50, nodes[i].realX, nodes[i].realY)
		if (d < 200 && d > 0){
			if (nodes[i].fcost < lowest_fcost){
				lowest_fcost = nodes[i].fcost
				best = i
			}	
		}
	}


	AI = [nodes[best].x, nodes[best].y]


	nodes[best].can_cal = false
	nodes[best].fcost = 1000000000000000000000000
	path.push(AI)
	


	//Re check some shit



}


function reCheck(){
	let lowest_fcost = 100000000000;
	let best = 0;
	for (var e=0;e<path.length;e++){
		fill(0, 255, 0)
		rect(path[e][0], path[e][1], 100, 100)

		fill(255, 0, 0)
		rect(end[0], end[1], 100, 100)
		
		
		//console.log(nd)

		 
		for (var i=0;i<nodes.length;i++){
			//nodes[i].update(obstacles)

			var d = dist(path[e][0]+50, path[e][1]+50, nodes[i].realX, nodes[i].realY)
			if (d < 120 && d > 0){
				if (nodes[i].fcost < lowest_fcost){
					lowest_fcost = nodes[i].fcost
					best = i
					//garb.push([nodes[i].x, nodes[i].y])
					AI = path[e]
					
					
				}	
			}
		}
		
	}

	var AI_index

	for (var i=0;i<nodes.length;i++){
		if (nodes[i].x == AI[0] && nodes[i].y == AI[1]){
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
}


class Node{
	constructor(x, y){
		this.x = x
		this.y = y
		this.realX
		this.realY

		this.gcost
		this.hcost
		this.fcost
		this.can_cal = true
		this.myCheese

	}

	update(ob){


		for (var i=0;i<ob.length;i++){

		if (dist(ob[i][0], ob[i][1], this.x, this.y) == 0){
			this.can_cal = false
			this.fcost = 10000000000000000
		}
	}
		this.realX = this.x+50
		this.realY = this.y+50


	}
	show(){
		if (this.can_cal == false){
		fill(0, 0, 255)
		strokeWeight(4);
		stroke(0, 0, 255);
		rect(this.x, this.y, 100, 100)
		}
		
	}

	caluclate_shit(sx, sy, ex, ey){
		if (this.can_cal){
			this.gcost = dist(sx, sy, this.x, this.y)
			this.hcost = dist(ex, ey, this.x, this.y)
			this.fcost = this.gcost+this.hcost
		}


	}

}


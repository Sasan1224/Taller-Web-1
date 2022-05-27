

let butom;
let cajon;
let img;
let movebox = false;




function preload(){
  img = loadImage("../img/banner.png")
  
}

function setup() {
  var canvas = createCanvas(1900, 800);
  canvas.parent("canvasdiv");
  butom = new box();
cajon = []
for (let i = 0; i < 3; i++) {
  cajon.push (new ball(100+i*100,100+i*200))
  
}

}

function draw() {
  background(img);
  butom.display();
  butom.moveX()
cajon.forEach(e => {
  e.display()
  e.movex()
});

}

class box {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.diameter = 100;
    this.sound = 0;
    this.direc=0;
   this.movebox = false
  }

  display() {
    rectMode(CENTER)
    rect(this.x, this.y, this.diameter);
  }

  moveX(){

    switch (this.direc) {
      case 0:
        this.x+=10
        if(this.x>=width){
          this.direc=1
          const synth = new Tone.PolySynth(Tone.Synth).toDestination();


          const now = Tone.now()
          synth.triggerAttackRelease("C4", "8n", now)
        }
        break;
        case 1:
          this.x-=10
          if(this.x<=width-width){
            this.direc=0
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();


            const now = Tone.now()
            synth.triggerAttackRelease("F6", "8n", now)
         
          }
          break;
    
      default:
        break;
    }
  }
  

}
class ball {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = 50;
    this.sound = 0;
    this.direc=0;
    this.moveball = false
  }

  display() {
    rectMode(CENTER)
    circle(this.x, this.y, this.diameter);
  }

  movex(){

    switch (this.direc) {
      case 0:
        this.y+=10
        if(this.y>=height){
          this.direc=1
          const synth = new Tone.PolySynth(Tone.Synth).toDestination();


          const now = Tone.now()
          synth.triggerAttackRelease("C5", "8n", now)
        }
        break;
        case 1:
          this.y-=10
          if(this.y<=height-height){
            this.direc=0
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();


            const now = Tone.now()
            synth.triggerAttackRelease("F6", "8n", now)
         
          }
          break;
    
      default:
        break;
    }
  }
   drag() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.diameter / 2) {
     this.direc = 3;
     this.movex()
      this.x = mouseX
      this.y = mouseY
      this.moveball = true;
    }
  }

}


function move(samba) {
  if (dist(mouseX, mouseY, samba.x, samba.y) <= samba.diameter / 2) {
    samba.direc = 3;
    butom.moveX();
    samba.x = mouseX
    samba.y = mouseY
    movebox = true;
  }
}



function mouseDragged() {
  move(butom)
  cajon.forEach(e => {
    e.drag()
  });
}

function mouseReleased() {
  if (movebox){
    butom.direc = 0;
 butom.moveX();}
cajon.forEach(e =>{
  if (e.moveball){
  e.direc = 0;
  e.movex();
  }
});

movebox = false;
moveball = false;

}
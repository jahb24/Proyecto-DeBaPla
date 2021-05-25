import netP5.*;                                     
import oscP5.*;
import ketai.net.*;
import ketai.sensors.*;
OscP5 oscP5;
KetaiSensor sensor;
NetAddress remoteLocation;
String myIPAddress; 
String remoteAddress = "192.168.100.37";
float ready = 0.0;
float move = 0.0;
float jump = 0.0;
int x = 0;
int y = 0;
int w = 0;
int h = 0;
int xC = 0;
int yC = 0;
int radius = 200;
float d = 0.0;
int xT1 = 0;
int yT1 = 0;
int xT2 = 0;
int yT2 = 0;
int xT3 = 0;
int yT3 = 0;
int menu = 0;
PImage fondo;
PImage logo;
PImage skin1;
PImage skin2;
PImage skin3;
PImage skin4;
PImage skin5;
String typing = "";
String saved = "";
boolean keyboard = false;
float personaje;

void setup() {
  //size(800,600);
  background(0);
  textFont(createFont("SansSerif", 90));
  sensor = new KetaiSensor(this);
  orientation(LANDSCAPE);
  rectMode(CENTER);
  x = width/2;
  y = (height/2)-450;
  w = (width/4)-250;
  h = (height/5)-100;
  xC = (width/4)*3;
  yC = height/2;
  xT1 = (width/5)-200;
  yT1 = height/2;
  xT2 = (xT1)+400;
  yT2 = (height/2)-200;
  xT3 = (xT1)+400;
  yT3 = (height/2)+200;
  textAlign(CENTER);
  //textSize(60);
  ellipseMode(RADIUS);
  initNetworkConnection();
  fondo = loadImage("https://mobimg.b-cdn.net/pic/v2/gallery/real/fon-futbol-37483.jpg");
  logo = loadImage("https://www.wallquotes.com/sites/default/files/styles/uc_product_full/public/sprt0311-64.png?itok=4aw7Et9C");
  skin1 = loadImage("https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/messi.png?alt=media&token=eee9d320-259b-4c7b-8c03-68da35d9ff2f");
  skin2 = loadImage("https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/neymah.png?alt=media&token=5652567c-a705-48d6-accf-de14634309f5");
  skin3 = loadImage("https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/cr7.png?alt=media&token=3a865be6-d3f4-44a6-8b70-95c7beaa613c");
  skin4 = loadImage("https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/salah.png?alt=media&token=7980dc8b-925c-46a3-b692-6f5b90db93d0");
  skin5 = loadImage("https://firebasestorage.googleapis.com/v0/b/proyecto-debapla.appspot.com/o/zlatan.png?alt=media&token=54576627-0e27-432c-913e-e6e6017dcde9");
  //sensor.start();
}
void draw() {
  //background(0);
  
  //image(fondo, 0, 0, width, height);
  if(menu == 0){
    image(fondo, 0, 0, width, height);
    image(logo, width/2-((width/2)/2), height/2-228, width/2, height/3+100);
    //fill(255);
    //text("HEAD SOCCER", width/2, (height/2)-200);
    fill(0);
    text("Nombre: " + typing, width/2, height/2+300);
    fill(255);
    rect(width/2, height/2-300, width/5, height/6, 40);
    fill(0);
    text("Play", width/2, height/2-275);
  }
  if(menu == 1){
    image(fondo, 0, 0, width, height);
    image(logo, width/2-((width/2)/2), 80, width/2, height/3);
    fill(255);
    text("Choose a player", width/2, height/2-100);
    image(skin1, width/6-100, height/2, 200, 400);
    image(skin2, (width/6)*2-100, height/2, 200, 400);
    image(skin3, (width/6)*3-100, height/2, 200, 400);
    image(skin4, (width/6)*4-100, height/2, 200, 400);
    image(skin5, (width/6)*5-100, height/2, 200, 400);
  }
  if(menu == 2){
    background(0, 255, 0);
    textSize(60);
    if(ready == 0.0){
      fill(0);
      rect(x,y,w,h,30);
      fill(255);
      text("NOT READY",x,y+20);
    }else{
      fill(255);
      rect(x,y,w,h,30);
      fill(0);
      text("READY",x,y+20);
    }
    
    for(int i=0; i<touches.length; i++){
      if (touches[i].x > xT1 && touches[i].x < xT2 && touches[i].y > yT2 && touches[i].y < yT3)
        move = 1.0;
      else if(touches[i].x > (xT2+50) && touches[i].x < (xT1+850) && touches[i].y > yT2 && touches[i].y < yT3)
        move = 2.0;
      else 
        move = 0.0;
      
      d = dist(touches[i].x, touches[i].y, xC, yC);
      if(d < radius) jump = 1.0;
      else jump = 0.0;
    }
    if(touches.length == 0){ 
      jump = 0.0;
      move = 0.0;
    }
    fill(255);
    text("j:" + jump + " m:" + move + " r:" + ready, (width/4)*3, (height/2)-350);
    if(jump == 0.0) fill(0);
    else fill(255);
    ellipse(xC, yC, radius, radius);
    
    if(move == 0.0) fill(0);
    else if(move == 1.0) fill(255);
    else fill(0);
    triangle(xT1, yT1, xT2, yT2, xT3, yT3);
    if(move == 0.0) fill(0);
    else if(move == 1.0) fill(0);
    else fill(255);
    triangle(xT1+850, yT1, xT2+50, yT2, xT3+50, yT3);
    
    OscMessage myMessage = new OscMessage("movements");
    myMessage.add(move);
    myMessage.add(jump);
    myMessage.add(ready);
    myMessage.add(personaje);
    myMessage.add(saved);
    oscP5.send(myMessage, remoteLocation);
    }
}

void initNetworkConnection(){
  oscP5 = new OscP5(this, 12000);
  remoteLocation = new NetAddress(remoteAddress, 12001);
  myIPAddress = KetaiNet.getIP();
}

void keyPressed(){
  typing = typing+key;
}

void mousePressed() {
  if(menu == 0){
    if (mouseX > (width/2-((width/5)/2)) && mouseX < (width/2+((width/5)/2)) && mouseY > ((height/2-300)-((height/6)/2)) && mouseY < ((height/2-300)+((height/6)/2))) {
      saved = typing;
      typing = "";
      menu = 1;
    }
    else{
      if (!keyboard) {
        openKeyboard();
        keyboard = true;
      } else {
        closeKeyboard();
        keyboard = false;
      }
    }
  }
  if(menu == 1){
    if (mouseX > width/6-100 && mouseX < width/6+100 && mouseY > height/2 && mouseY < height/2+400){
      personaje = 1;
      menu = 2;
    }
    if (mouseX > (width/6)*2-100 && mouseX < (width/6)*2+100 && mouseY > height/2 && mouseY < height/2+400){
      personaje = 2;
      menu = 2;
    }
    if (mouseX > (width/6)*3-100 && mouseX < (width/6)*3+100 && mouseY > height/2 && mouseY < height/2+400){
      personaje = 3;
      menu = 2;
    }
    if (mouseX > (width/6)*4-100 && mouseX < (width/6)*4+100 && mouseY > height/2 && mouseY < height/2+400){
      personaje = 4;
      menu = 2;
    }
    if (mouseX > (width/6)*5-100 && mouseX < (width/6)*5+100 && mouseY > height/2 && mouseY < height/2+400){
      personaje = 5;
      menu = 2;
    }
    
  }
  if(menu == 2){
    if (mouseX > (x-(w/2)) && mouseX < (x+(w/2)) && mouseY > (y-(h/2)) && mouseY < (y+(h/2))) {
      if(ready == 0.0) ready = 1.0;
      else ready = 0.0;
    }
  }
}

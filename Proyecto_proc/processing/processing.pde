import P5ireBase.library.*;
import oscP5.*;
import netP5.*;
P5ireBase fire;
OscP5 oscP5;
NetAddress remoteLocation;
float Ready;
float move;
float jump;
float skin;
String remoteAddress = "192.168.100.2", ready, m, j, s;
String port;
String name;
import processing.serial.*;
Serial puerto;

void setup(){
  size(400, 400);
  textAlign(CENTER, CENTER);
  textSize(24);
  initNetworkConnection();
  fire = new P5ireBase(this, "https://proyecto-debapla-default-rtdb.firebaseio.com/");
  String portname = Serial.list()[0];//agarra el serial de com que se tenga en 0
  puerto = new Serial(this, portname, 9600);
  
}
void draw(){
  background(0, 255, 0);
  if(puerto.available() > 0){
    port = puerto.readStringUntil('%');
  }
  if(port!=null){
    fire.setValue("Temp", port);
  }
  fire.setValue("Jugador1/Nombre", name);
  s = Float.toString(skin);
  fire.setValue("Jugador1/Skin", s);
  if(Ready==1.0){
    ready="LISTO";
    fire.setValue("Jugador1/Ready", "1");
  }
  if(Ready==0.0){
    ready="NO LISTO";
    fire.setValue("Jugador1/Ready", "0");
  }
  text("Jugador listo: " + ready, width/2, height/2);
  m = Float.toString(move);
  fire.setValue("Jugador1/posMono", m);
  j = Float.toString(jump);
  fire.setValue("Jugador1/Salto", j);
  
}
void oscEvent(OscMessage theOscMessage) {
  if (theOscMessage.checkTypetag("ffffs"))                 
  {
    move =  theOscMessage.get(0).floatValue(); 
    jump =  theOscMessage.get(1).floatValue();
    Ready =  theOscMessage.get(2).floatValue();
    skin = theOscMessage.get(3).floatValue();
    name = theOscMessage.get(4).stringValue();
  }
}
void initNetworkConnection(){
    oscP5 = new OscP5(this, 12001);  
    remoteLocation = new NetAddress(remoteAddress, 12000);
}

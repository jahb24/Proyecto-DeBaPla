#include <TimerOne.h>
#include <Wire.h>
#include <MultiFuncShield.h>


//Y que pin analógico conectarmos el LDR
int valorLDR;
int pinLDR = A5;
float temp;
void setup() {
  Timer1.initialize();
  MFS.initialize(&Timer1);
  MFS.initLM35(SMOOTHING_MODERATE);
  Serial.begin(9600);
}

void loop() {
  int tempCentigrade = MFS.getLM35Data(); // get centigrade in 1/10 of degree.
  temp = (float)tempCentigrade/10;
  //MFS.write((float)tempCentigrade / 10, 1);  // display temp to 1 decimal place.
  //Serial.write(tempCentigrade);
  
  valorLDR = analogRead(pinLDR);
  MFS.write(valorLDR);
  delay(100);
  Serial.print(temp);
  Serial.print(valorLDR);
  Serial.print('%');
  //int arreglo[] = {tempCentigrade, valorLDR};
  //Serial.write(arreglo[0]);
  //Serial.write(arreglo[1]);
  //delay(100);
}

/********************************
  CS510P Mobile Health
  Spring 2021
  Michael Wilson & Xi Yu
  Project - Sleepy
*******************************/
// Include Starter Pack
#include <DHT.h>
#include <LiquidCrystal.h>

// Variable Starter Pack

// LCD Variables
LiquidCrystal lcd(7, 8, 9, 10, 11, 12) ;

// PIR Sensor Variables
const int pir_sensor = 6 ;
int pir_value = 0 ;

// Temperature and Humidity Sensor Variables
#define DHT_SENSOR 5
#define DHT_TYPE DHT11
DHT dht(DHT_SENSOR, DHT_TYPE) ;
float temperature = 0.0 ;
float humidity = 0.0 ;

// Light Sensor Variables
int light_value = 0 ;
const int light_sensor = A0 ;

// Sound Sensor Variables
int sound_value = 0 ;
const int sound_sensor = 4 ;
unsigned long sound_event = 0 ;

// Time Variables
String time_stamp = String("change me") ;
unsigned long interval = 1000 ;
unsigned long previousMillis = 0 ;

// Function Protoypes
String get_time(int h, int m, int s) ;

void setup()
{
  pinMode(pir_sensor, INPUT) ;
  pinMode(light_sensor, INPUT) ;
  pinMode(sound_sensor, INPUT) ;
  
  dht.begin() ;
  
  lcd.begin(16, 2) ;
  lcd.clear() ;

  Serial.begin(9600) ;
}

void loop()
{
  // Time Variables
  unsigned long currentMillis = millis() ; // milliseconds since the arduino started
  unsigned long s = currentMillis / 1000 ; // Seconds
  unsigned long m = s / 60 ; // Minutes
  unsigned long h = m / 60 ; // Hours

  // Update Time
  s %= 60 ;
  m %= 60 ;
  h %= 24 ;

  // Update pir_value
  pir_value = digitalRead(pir_sensor) ;

  // Update Temperature and Humidity
  temperature = dht.readTemperature() ;
  humidity = dht.readHumidity() ;

  // Update Light Sensor
  light_value = analogRead(light_sensor) ;

  // Update Sound Sensor
  if(digitalRead(sound_sensor) == 0){
    if (currentMillis - sound_event > 25)
      sound_value = 1 ;
          
    sound_event = currentMillis ;
  }
  
  // Get the Time
  time_stamp = get_time(h, m, s) ;

  // Print data to LCD
  lcd.setCursor(0, 0) ;
  lcd.print("temp: " + String(temperature)) ;
  lcd.setCursor(0, 1) ;
  lcd.print("humidity: " + String(humidity)) ;

  if (currentMillis - previousMillis >= interval)
  {
    previousMillis = currentMillis ;
    
  // Serial Print in CSV Format
  Serial.println(String(time_stamp + "," + pir_value + "," + light_value + "," + temperature + "," + humidity + "," + sound_value)) ;
  sound_value = 0 ;
  }
}

// Get Time takes the hours, minutes, and seconds and displays them in a readable format
String get_time(int h, int m, int s)
{
  // Variable Starter Pack
  String h_String = "00" ; // Hours
  String m_String = "00" ; // Minutes
  String s_String = "00" ; // Seconds

  // If the time value is single digit, put a zero in front
  if (h < 10)
    h_String = String("0" + String(h)) ;

  else
    h_String = String(h) ;

  if (m < 10)
    m_String = String("0" + String(m)) ;

  else
    m_String = String(m) ;

  if (s < 10)
    s_String = String("0" + String(s)) ;

  else
    s_String = String(s) ;

  // Return the Final String
  return String(h_String + ":" + m_String + ":" + s_String) ;
}

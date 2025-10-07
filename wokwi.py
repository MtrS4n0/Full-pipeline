import network
import time
import urequests
import dht
from machine import Pin

ssid='Wokwi-GUEST'
password = ''

THINGSPEAK_API_KEY = 'QWPPL6EL346ZZVNU'
THINGSPEAK_URL = 'https://api.thingspeak.com/update?api_key=QWPPL6EL346ZZVNU'

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)

print("Connecting to Wi-Fi...", end="")
while not wlan.isconnected():
    print(".", end="")
    time.sleep(0.5)

print("\nConnected!")
print("IP address:", wlan.ifconfig()[0])

sensor = dht.DHT22(Pin(15))

def send_to_thingspeak(temp, hum):
    if temp is None or hum is None:
        print("Nothing to send")
        return
    try:
        response = urequests.post(
            THINGSPEAK_URL,
            data = 'api_key={}&field1={}&field2={}'.format(THINGSPEAK_API_KEY,temp, hum),
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        )
        print("ThingSpeak response:", response.text)
        response.close()
    except Exception as e:
        print("Failed sending data:", e)

while True:
    try:
        sensor.measure()
        temperature = sensor.temperature()
        humidity = sensor.humidity()
        print("Temperature:", temperature, "°C")
        print("Humidity:", humidity, "%")
        send_to_thingspeak(temperature, humidity)
    except Exception as e:
        print("Error reading sensor or sending data:", e)

    time.sleep(5)

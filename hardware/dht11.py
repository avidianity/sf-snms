import RPi.GPIO as GPIO
import dht11
import json
import sys

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

pin = int(sys.argv[1])

instance = dht11.DHT11(pin=pin)

try:
    while True:
        result = instance.read()
        if result.is_valid():
            print(json.dumps({
                'temperature': result.temperature,
                'humidity': result.humidity
            }))
            GPIO.cleanup()
            break
except KeyboardInterrupt:
    GPIO.cleanup()

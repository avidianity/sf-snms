import RPi.GPIO as GPIO
import dht11
import json
import sys
import random

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

pin = int(sys.argv[1])

instance = dht11.DHT11(pin=pin)

try:
    result = instance.read()
    if result.is_valid():
        print(json.dumps({
            'temperature': result.temperature,
            'humidity': result.humidity,
            'valid': True
        }))
    else:
        print(json.dumps({
            'temperature': random.randint(34, 40),
            'humidity': random.randint(60, 95),
            'valid': False,
        }))
    GPIO.cleanup()
except KeyboardInterrupt:
    GPIO.cleanup()

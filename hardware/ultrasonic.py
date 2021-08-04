import RPi.GPIO as GPIO
from time import sleep, time
from sys import argv
from json import dumps

TRIG = int(argv[1])
ECHO = int(argv[2])

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(TRIG, GPIO.OUT)
GPIO.output(TRIG, GPIO.LOW)

GPIO.setmode(ECHO, GPIO.IN)

sleep(0.1)

data = {
    'distance': 0,
}

GPIO.output(TRIG, GPIO.HIGH)

sleep(0.00001)

GPIO.output(TRIG, GPIO.LOW)

while GPIO.input(ECHO) == GPIO.LOW:
    pass

start = time()

while GPIO.input(ECHO) == GPIO.HIGH:
    pass

stop = time()

data['distance'] = (stop - start) * 170

GPIO.cleanup()

print(dumps(data))

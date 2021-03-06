try:
    import RPi.GPIO as GPIO
except:
    import Mock.GPIO as GPIO
from time import sleep, time
from sys import argv
from json import dumps

TRIG = int(argv[1])
ECHO = int(argv[2])

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(TRIG, GPIO.OUT)
GPIO.output(TRIG, GPIO.LOW)

GPIO.setup(ECHO, GPIO.IN)

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

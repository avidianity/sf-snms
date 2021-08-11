import RPi.GPIO as GPIO
from sys import argv
from time import sleep

pin = int(argv[1])
mode = argv[2].lower()

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.OUT)

if mode == 'on':
    GPIO.output(pin, GPIO.HIGH)
elif mode == 'off':
    GPIO.output(pin, GPIO.LOW)

sleep(0.001)

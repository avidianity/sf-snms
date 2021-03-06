from serial import Serial
from sys import argv
from json import loads, dumps
import random
from time import sleep

try:
    port = argv[1]

    connection = Serial(port, 9600)

    sleep(2)

    data = (str(connection.readline())[1:]).replace('\\r\\n', '')
    data = data[1:]
    data = data[:-1]
    data = loads(data)

    print(dumps(data))

    connection.close()
except:
    print(dumps({
        'moisture': random.randint(60, 80),
        'nitrogen': random.randint(0, 255),
        'potassium': random.randint(0, 255),
        'phosphorus': random.randint(0, 255),
    }))

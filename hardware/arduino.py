from serial import Serial
from sys import argv
from json import loads, dumps

port = argv[1]

connection = Serial(port, 9600)

data = (str(connection.readline())[1:]).replace('\\r\\n', '')
data = data[1:]
data = data[:-1]
data = loads(data)

print(dumps(data))

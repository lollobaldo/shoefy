# this will eventually use GTK to display a graphical interface, but I'm developing on Windows and it's not behaving for me

import json
import cv2
from shoefyAPI import shoefy
import socket

ROBOT_IP = '127.0.0.1'
ROBOT_PORT=1337
BUFFER_SIZE=1024


# need to specify domain and API key
s = shoefy('api.shoefy.xereeto.co.uk','3924092384092')

def readQr(image):
    detector=cv2.QRCodeDetector()
    data,bbox,straight_qrcode = detector.detectAndDecode(image)
    if bbox is not None:
        return data

bookingData = s.getBooking(readQr(cv2.imread("sampleQR.png")))
# check for time and date goes here

print("Email: "+bookingData['email'])
paths=[]
for size in bookingData['shoeSizes']:
	sd=s.getAvailShoe(size);
	paths.append(sd['path']);
	print(s.takeShoe(sd['unit'],sd['row'],sd['column']));
	print(s.getShoe(sd['unit'],sd['row'],sd['column']));
	s.replaceShoe(sd['unit'],sd['row'],sd['column']);
	print(s.getShoe(sd['unit'],sd['row'],sd['column']));

print(paths)
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((ROBOT_IP, ROBOT_PORT))
for path in paths:
		s.send(bytes(path,encoding='utf8'))
		data=s.recv(BUFFER_SIZE)
		print(data)
s.close()
	
# then get the shoe size
# look up the shoe size, get an available shoe and mark it unavailable
# then send data to robot controller over tcp
# simples
# will sort functionality by idk like tomorrow

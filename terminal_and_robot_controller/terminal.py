# this will eventually use GTK to display a graphical interface, but I'm developing on Windows and it's not behaving for me

import json
import cv2
from shoefyAPI import shoefy

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
# then get the shoe size
# look up the shoe size, get an available shoe and mark it unavailable
# then send data to robot controller over tcp
# simples
# will sort functionality by idk like tomorrow

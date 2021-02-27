from controller import Robot
import math as Math
import tkinter as tk
from tkinter import simpledialog

class Movement():
    def __init__(self, wheels, speed):
        self.wheels = wheels
        self.speed = speed
    
    def control(self, key):
        self.stop()
        if key == 314:
            self.left()
        elif key == 316:
            self.right()
        elif key == 315:
            self.forward()
        elif key == 317:
            self.back()
        
    def left(self):
        self.wheels[0].setVelocity(self.speed)
        self.wheels[1].setVelocity(-self.speed)
        
    def right(self):
        self.wheels[0].setVelocity(-self.speed)
        self.wheels[1].setVelocity(self.speed)
    
    def forward(self):
        self.wheels[0].setVelocity(self.speed)
        self.wheels[1].setVelocity(self.speed)
        
    def back(self):
        self.wheels[0].setVelocity(-self.speed)
        self.wheels[1].setVelocity(-self.speed)
        
    def stop(self):
        self.wheels[0].setVelocity(0)
        self.wheels[1].setVelocity(0)
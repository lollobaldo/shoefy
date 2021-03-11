from controller import Robot
from controller import PositionSensor
import movement as mv
import math
from controller import Gyro
import sys

ir = []
wheels = []
TIME_STEP = 64
speed = 10

def initialize(robot):   
    irNames = ['irR', 'irM', 'irL']
    for i in range(len(irNames)):
        ir.append(robot.getDevice(irNames[i]))
        ir[i].enable(TIME_STEP)

    wheelsNames = ['wheelR', 'wheelL']
    for i in range(len(wheelsNames)):
        wheels.append(robot.getDevice(wheelsNames[i]))
        wheels[i].setPosition(float('inf'))
        wheels[i].setVelocity(0.0)

def forward():
    wheels[0].setVelocity(speed)
    wheels[1].setVelocity(speed)

def stop():
    wheels[0].setVelocity(0)
    wheels[1].setVelocity(0)

def left():
    wheels[0].setVelocity(speed)
    wheels[1].setVelocity(0)

def right():
    wheels[0].setVelocity(0)
    wheels[1].setVelocity(speed)
        
def run(robot, order):
    intersection = False
    count = 0
    if len(order) == 0:
        return
    while robot.step(TIME_STEP) != -1:
        ir0 = ir[0].getValue()
        ir1 = ir[1].getValue()
        ir2 = ir[2].getValue()
        turnR = 450 < ir0 and ir0 < 500
        turnL = 450 < ir2 and ir2 < 500

        if intersection:
            if order[count] == 'left':
                left()
            elif order[count] == 'right':
                right()
            elif order[count] == 'straight':
                forward()
            else:
                stop()
                break
            if not turnL and not turnR:
                intersection = False
                count += 1
        else:
            if turnL and turnR:
                intersection = True
            elif turnR:
                right()
            elif turnL:
                left()
            else:
                forward()

if __name__ == '__main__':
    robot = Robot()
    initialize(robot)
    #
    order = ['left', 'right', 'stop'] #instructions for every intersections
    #
    run(robot, order)

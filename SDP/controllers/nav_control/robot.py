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

def back():
    wheels[0].setVelocity(-speed)
    wheels[1].setVelocity(-speed)

def rotate():
    count = 0
    while robot.step(TIME_STEP) != -1:
        ir2 = ir[2].getValue()
        
        if count < 5:
            back()
            count += 1
        elif count == 5:
            wheels[0].setVelocity(speed/2)
            wheels[1].setVelocity(-speed/2)
            if ir2 < 820:
                count += 1
        elif count == 6:
            wheels[0].setVelocity(speed/2)
            wheels[1].setVelocity(-speed/2)
            if ir2 > 820:
                count += 1            
        else:
            stop()
            break 

def reverse(order):
    ans = []
    n = len(order)
    for i in range(n - 1):
        if order[n - i - 2] == 2:
            ans.append(2)
        else:
            ans.append((order[n-i-2] + 1) % 2)
    ans.append(3)
    return ans
        
def run(robot, order):
    tl = False
    tr = False
    intersection = False
    count = 0
    if len(order) == 0:
        return
    while robot.step(TIME_STEP) != -1:
        ir0 = ir[0].getValue()
        ir1 = ir[1].getValue()
        ir2 = ir[2].getValue()
        turnR = ir0 < 820
        turnL = ir2 < 820
        junction = ir1 < 620
        print('left:{}'.format(ir2)) 
        print('m:{}'.format(ir1))
        print('right:{}'.format(ir0))
        print(count)
        
        if intersection:
            if order[count] == 0:
                left()
            elif order[count] == 1:
                right()
            elif order[count] == 2:
                if turnL and turnR:
                    forward()
                elif turnL:
                    left()
                elif turnR:
                    right()
                else:
                    forward()
            else:
                stop()
                break
            if not turnL and not turnR:
                intersection = False
                count += 1
        elif junction:
            intersection = True
            tl = False
            tr = False
        elif tl:
            left()
            if not turnL:
                tl = False
        elif tr:
            right()
            if not turnR:
                tr = False
        else:
            if turnR:
                tr = True
            elif turnL:
                tl = True
            else:
                forward()

if __name__ == '__main__':
    robot = Robot()
    initialize(robot)
    speed=10
    #
    order = [1,2,2,2,0,3] #instructions for every intersections
    #
    run(robot, order)
    rotate()
    run(robot, reverse(order))
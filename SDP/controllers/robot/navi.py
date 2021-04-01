from controller import Robot
import movement as mv
import math
import sys

ir = []
ds = []
wheels = []
TIME_STEP = 64
speed = 10
ROBOT_IP='127.0.0.1'
ROBOT_PORT=1337
BUFFER_SIZE=20

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

    dsNames = ['dsR', 'dsL']
    for i in range(len(dsNames)):
        ds.append(robot.getDevice(dsNames[i]))
        ds[i].enable(TIME_STEP)
        

def forward():
    wheels[0].setVelocity(-speed)
    wheels[1].setVelocity(-speed)

def stop():
    wheels[0].setVelocity(0)
    wheels[1].setVelocity(0)

def left():
    wheels[0].setVelocity(-speed)
    wheels[1].setVelocity(0)

def right():
    wheels[0].setVelocity(0)
    wheels[1].setVelocity(-speed)

def back():
    wheels[0].setVelocity(speed)
    wheels[1].setVelocity(speed)

def rotate(robot):
    count = 0
    while robot.step(TIME_STEP) != -1:
        ir2 = ir[2].getValue()
        if count < 5:
            back()
            count += 1
        elif count == 5:
            wheels[0].setVelocity(-speed/2)
            wheels[1].setVelocity(speed/2)
            if ir2 < 830:
                count += 1
        elif count == 6:
            wheels[0].setVelocity(-speed/2)
            wheels[1].setVelocity(speed/2)
            if ir2 > 830:
                count += 1            
        else:
            stop()
            break 

def reverse(order, stop=False):
    ans = []
    n = len(order)
    for i in range(n - 1):
        if order[n - i - 2] == 2:
            ans.append(2)
        else:
            ans.append((order[n-i-2] + 1) % 2)
    if stop: ans.append(4)
    else: ans.append(3)
    return ans

def align(ds0, ds1):
    print(ds0, ds1)
    if ds0 <800 and ds0 < 800:
        stop()
        return True
    elif ds0 > ds1: 
        wheels[0].setVelocity(-speed/2)
        wheels[1].setVelocity(speed/2)
    elif ds1 > ds0:
        wheels[0].setVelocity(speed/2)
        wheels[1].setVelocity(-speed/2)
    else:
        forward()
    return False
        
def run(robot, order):
    tl = False
    tr = False
    intersection = False
    count = 0
    if len(order) == 0:
        return
    while robot.step(TIME_STEP) != -1:
        ds0 = ds[0].getValue()
        ds1 = ds[1].getValue()
        ir0 = ir[0].getValue()
        ir1 = ir[1].getValue()
        ir2 = ir[2].getValue()
        turnR = ir0 < 830
        turnL = ir2 < 830
        junction = ir1 < 620
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
            elif order[count] == 3:
                if align(ds0, ds1):
                    break
            else:
                stop()
                break
            if not turnL and not turnR and order[count] != 3:
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
        if not junction and (ds0 < 1000 or ds1 < 1000):
            stop()
'''
def getOrder():
	s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	s.bind((ROBOT_IP,ROBOT_PORT))
	s.listen(1)
	conn, addr = s.accept()
	order=[]
	recvd=False
	while not recvd:
  		data = conn.recv(BUFFER_SIZE)
  		if not data: break			
  	conn.send(data)  # echo
	recvd=True
	for letter in data.decode('utf-8'):
		if letter=='S': order.append(2)
		elif letter=='L': order.append(0)
		else: order.append(1)
		#accidentally added an extra S on the front will need to delete
	order.pop(0)
    conn.close
	return order'''

if __name__ == '__main__':
    robot = Robot()
    initialize(robot)
    order = [0,1,1,2,3] #instructions for every intersections
    run(robot, order)

    rotate(robot)
    run(robot, reverse(order, False))
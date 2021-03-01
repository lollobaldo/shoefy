from controller import Robot
from controller import PositionSensor
import movement as mv
import math
from controller import Gyro
import sys

def run_robot(robot):
    TIME_STEP = 64
    
    gyro = robot.getDevice('g1')
    gyro.enable(TIME_STEP)
    
    ds = []
    dsNames = ['dsR', 'dsL']
    for i in range(len(dsNames)):
        ds.append(robot.getDevice(dsNames[i]))
        ds[i].enable(TIME_STEP)
    
    #initiating sensors/motors
    ps = []
    psNames = ['psR', 'psL']
    for i in range(len(psNames)):
        ps.append(robot.getDevice(psNames[i]))
        ps[i].enable(TIME_STEP)
    
    wheels = []
    wheelsNames = ['wheelR', 'wheelL']
    for i in range(len(wheelsNames)):
        wheels.append(robot.getDevice(wheelsNames[i]))
        wheels[i].setPosition(float('inf'))
        wheels[i].setVelocity(0.0)

    kb = robot.getKeyboard()
    kb.enable(64)
    
    #helper function from movement.py
    m = mv.Movement(wheels, 10.0)
    
    #variable for calculating odometry
    radius = 0.057
    pos = [0,0,0]
    last_psV = [0,0]
    curr_psV = [0,0]
    diff = [0,0]
    v = 0
    w = 0
    wheel_dist = 0.414
    dt = 0.064
    showPos = False
    reached = False
    counter = 0
    base = [0, 0]
    target = [0, 0]
    for i in range(0, len(sys.argv)-1):
        target[i] = int(sys.argv[i+1])
    while robot.step(TIME_STEP) != -1:
        #calculating angular velocity and directional velocity
        for i in range(len(psNames)):
            curr_psV[i] = ps[i].getValue() * radius
            diff[i] = curr_psV[i] - last_psV[i]
            if abs(diff[i]) < 0.001:
                diff[i] = 0
                curr_psV[i] = last_psV[i]
        v = (diff[0] + diff[1]) / 2
        w = gyro.getValues()[1]
        
        #updating current position/coordinate
        pos[2] += w * dt
        pos[2] %= 2*math.pi
        if pos[2] > math.pi:
            pos[2] -= 2*math.pi
        pos[0] += v * math.cos(pos[2])
        pos[1] += v * math.sin(pos[2])
        
        #show current position by pressing the key 'S'
        key = kb.getKey()
        if key == 83:
            showPos = not showPos
        if showPos:
            print("position: {}".format(pos))
        
        #move to target  
        dist = distance([pos[0], pos[1]], target)
        if not reached:
            if dist > 1:
                if target[0] - pos[0] != 0:
                    angle = (target[1] - pos[1])/(target[0] - pos[0])
                    angle = math.atan(angle)
                    if angle > 0 and pos[0] > target[0]:
                        angle -= math.pi
                    elif angle < 0 and pos[0] < target[0]:
                        angle += math.pi
                else:
                    if target[1] > pos[1]:
                        angle = math.pi
                    else:
                        angle = -math.pi
                angle -= pos[2]
                print(angle)
                if angle > 0.1 and angle < math.pi:
                    m.left()
                elif angle < -0.1 and angle > -math.pi:
                    m.right()
                else:
                    m.forward()
            else:
                reached = True
        #reached destination, preparing to head back
        else:
        #exit if reached second destination 
        #second destination = base
            if counter == 1:
                m.stop()
                exit()
            counter += 1
            target = base
            reached = False
        
        for i in range(len(psNames)):
            last_psV[i] = curr_psV[i]

def distance(source, target):
    ans = (target[1] - source[1]) ** 2
    ans += (target[0] - source[0]) ** 2
    return math.sqrt(ans)

if __name__ == '__main__':
    robot = Robot()
    run_robot(robot)
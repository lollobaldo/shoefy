from controller import Robot
from controller import PositionSensor
import movement as mv
import math

def run_robot(robot):
    TIME_STEP = 64
    
    #initiating sensors/motors
    ps = []
    psNames = ['ps1', 'ps2']
    for i in range(len(psNames)):
        ps.append(robot.getDevice(psNames[i]))
        ps[i].enable(TIME_STEP)
    
    wheels = []
    wheelsNames = ['wheel1', 'wheel2']
    for i in range(len(wheelsNames)):
        wheels.append(robot.getDevice(wheelsNames[i]))
        wheels[i].setPosition(float('inf'))
        wheels[i].setVelocity(0.0)

    kb = robot.getKeyboard()
    kb.enable(64)
    
    #helper function from movement.py
    m = mv.Movement(wheels, 10.0)
    
    liftMotors = []
    liftMotorsNames = ['L1', 'L2', 'L3', 'L4']
    for i in range(len(liftMotorsNames )):
        liftMotors.append(robot.getDevice(liftMotorsNames[i]))
        liftMotors[i].setPosition(0)
    
    while robot.step(TIME_STEP) != -1:
        
        


def distance(source, target):
    ans = (target[1] - source[1]) ** 2
    ans += (target[0] - source[0]) ** 2
    return math.sqrt(ans)

if __name__ == '__main__':
    robot = Robot()
    run_robot(robot)
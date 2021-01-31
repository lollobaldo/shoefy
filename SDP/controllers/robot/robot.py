from controller import Robot
from controller import PositionSensor
import movement as mv

TIME_STEP = 64
robot = Robot()

ds = []
dsNames = ['dsR', 'dsL', 'dsSR', 'dsSL']
for i in range(len(dsNames)):
    ds.append(robot.getDevice(dsNames[i]))
    ds[i].enable(TIME_STEP)
    
wheels = []
wheelsNames = ['wheelLF', 'wheelLR', 'wheelRF', 'wheelRR']
for i in range(len(wheelsNames)):
    wheels.append(robot.getDevice(wheelsNames[i]))
    wheels[i].setPosition(float('inf'))
    wheels[i].setVelocity(0.0)

pos = []
posNames = ['posL','posR']
for i in range(len(posNames)):
    pos.append(robot.getDevice(posNames[i]))
    pos[i].enable(64)

while robot.step(TIME_STEP) != -1:
    m = mv.Movement(ds, wheels, pos)
    m.move(10.0)
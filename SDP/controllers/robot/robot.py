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

gps = robot.getDevice('gps') #not done
#gps.enable(64) #not done

kb = robot.getKeyboard()
kb.enable(64)

m = mv.Movement(ds, wheels, gps, 10.0, kb)

while robot.step(TIME_STEP) != -1:
    m.control()
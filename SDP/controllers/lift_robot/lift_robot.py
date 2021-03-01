"""lift_robot controller."""

# You may need to import some classes of the controller module. Ex:
#  from controller import Robot, Motor, DistanceSensor
from controller import Robot
import lift as lift
import arm as arm
import time

# create the Robot instance.
robot = Robot()

# get the time step of the current world.
timestep = int(robot.getBasicTimeStep())

armMotor = robot.getDevice('l5')
arm = arm.Arm(armMotor)

# arm.out()

grabConnector = robot.getDevice('connector')
# grab = grab.Grab(grabConnector )


liftMotors = []
liftMotorsNames = ['l1', 'l2', 'l3', 'l4']
for i in range(len(liftMotorsNames )):
    liftMotors.append(robot.getDevice(liftMotorsNames[i]))
    liftMotors[i].setPosition(0)
    
lift = lift.Lift(liftMotors)


level3 = 0.183
level3 = 0.18
lift.go(level3)

# while(not arm.isOut()):
    # pass

arm.out()

while robot.step(timestep) != -1:
    if(arm.isOut()):
        print('out')
        grabConnector.enablePresence(10)
        print(grabConnector.getPresence())
        grabConnector.lock()
        arm.inside()
        

# Enter here exit cleanup code.

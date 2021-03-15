# You may need to import some classes of the controller module. Ex:
#  from controller import Robot, Motor, DistanceSensor
from controller import Robot
from controller import Connector
from controller import Keyboard
import lift as lift
import arm as arm
import pulling_State as PullState
from pulling_connector import pulling_Device
import time
import navi as r

# create the Robot instance.
robot = Robot()
#use keyboard as input for display
kb = robot.getKeyboard()
kb.enable(10)


# get the time step of the current world.
timestep = 64

# set the arm for pulling
armMotor = robot.getDevice('l5')
arm = arm.Arm(armMotor)
arm.sensor.enable(timestep)
grabConnector = robot.getDevice('connector')
grabConnector.enablePresence(timestep)

# connector magnetic distance is 3.3m

# set motors for lifting
liftMotors = []
liftMotorsNames = ['l1', 'l2', 'l3', 'l4']
for i in range(len(liftMotorsNames)):
    liftMotors.append(robot.getDevice(liftMotorsNames[i]))
    liftMotors[i].setPosition(0)
lift = lift.Lift(liftMotors)





# create a finite state machine for pulling
pulling_device = pulling_Device()
arm.inside()


def pull_box(box_height):
    if pulling_device.state.id == "free_Arm":
        arm.out()
        lift.to_height(box_height)

        if arm.isOut(box_height) and box_height != 1:

            pulling_device.on_event('picking')
            print("ready to pick")
        else:
            print("not ready to pick")
    if pulling_device.state.id == "Picking":

        print(str(grabConnector.getPresence))
        if grabConnector.getPresence() == 1:
            grabConnector.lock()
            pulling_device.on_event("device_locked")
            print("This robot find a connector")
        else:
            print("finding box")
    # If the box is locked with the robot then place it on plane and get ready to move
    if pulling_device.state.id == "LockedState":
        arm.inside()
        pulling_device.on_event("to_movingMode")

    # Set the robot to default height for stable moving demands
    if pulling_device.state.id == "moving_mode":

        lift.to_height(1)
        if arm.isOut(box_height):
            pass
        # else:
        #    print("The box is stuck")


def drop_box(box_height):

    if pulling_device.state.id == "Reloading":

        box_height += 0.05
        if arm.isOut(box_height) and grabConnector.isLocked():
            arm.out()
            print('B is pressed for reloading box ')
            grabConnector.unlock()
            arm.inside()
        lift.to_height(1)
        pulling_device.on_event("box_returned")

if __name__ == '__main__':
    r.initialize(robot)
    run = True
    while run:
        order = r.getOrder()#[0,1,1,2,3]
        if len(order)==0:
            run = False
            break
        r.run(robot, order)

        pull_box(1.2)

        r.rotate(robot)
    
        r.run(robot, r.reverse(order))
        drop_box(1.2)
        r.rotate(robot)

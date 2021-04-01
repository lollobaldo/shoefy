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



# get the time step of the current world.
timestep = int(robot.getBasicTimeStep())
kb = robot.getKeyboard()
kb.enable(timestep)
# set the arm for pulling
armMotor = robot.getDevice('l5')
arm = arm.Arm(armMotor)
arm.sensor.enable(timestep)
grabConnector = robot.getDevice('connector')
grabConnector.enablePresence(10)

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
    begin_time = robot.getTime()

    if pulling_device.state.id == "free_Arm" :


        while robot.step(timestep) != -1:
            while (robot.getTime() - begin_time) < 300:
                break
            if not arm.isOut():
                #print("not ready to pick")
                arm.out()
                lift.to_height(box_height)
            else:
                pulling_device.on_event('picking')
                #print("ready to pick")
                break



    if pulling_device.state.id == "Picking":

        while robot.step(timestep) != -1:
            if grabConnector.getPresence() == 1:
                grabConnector.lock()
                pulling_device.on_event("device_locked")
                print("This robot find a connector")
                break
            #else:
                #print("finding box")

    # If the box is locked with the robot then place it on plane and get ready to move
    if pulling_device.state.id == "LockedState":

        while robot.step(timestep) != -1:
            arm.inside()
            if arm.isInside():
                pulling_device.on_event("to_movingMode")
                break
            print("box is stucked")

    # Set the robot to default height for stable moving demands
    if pulling_device.state.id == "moving_mode":

        lift.going_down(1)
        print("ready to go")


def drop_box(box_height):

    if pulling_device.state.id == "Reloading":

        box_height += 0.02
        lift.go(box_height)
        if  grabConnector.isLocked():
            arm.out()
            print("press p to display reloading box")
            if arm.isOut():
                grabConnector.unlock()
                arm.inside()
                lift.going_down(1)
                pulling_device.on_event("box_returned")
        else:
            print("The box is dropped on the floor")

def pickandreturn(order, destination_height, source_height):
    r.run(robot,order)
    pull_box(destination_height)
    r.rotate(robot)
    r.run(robot, r.reverse(order))
    #r.drop_box(source_height) haven't tested this

if __name__ == '__main__':
    r.initialize(robot)
    while True:
        order = [0,1,2,3]
        pickandreturn(order, 1.7, -1)
        #add server instruction for when to return empty box
        #pickandreturn(order, 1.7, counter_height)

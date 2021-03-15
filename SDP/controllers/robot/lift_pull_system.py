"""lift_robot controller."""

# You may need to import some classes of the controller module. Ex:
#  from controller import Robot, Motor, DistanceSensor
from controller import Robot
from controller import Connector
from controller import Keyboard
import lift as lift1
import arm as arm1
import pulling_State as PullState
from pulling_connector import pulling_Device
import time

robot = Robot()
# set the arm for pulling
armMotor = robot.getDevice('l5')
arm = arm1.Arm(armMotor)
grabConnector = robot.getDevice('connector')
grabConnector.enablePresence(timestep)
arm.sensor.enable(timestep)

def trigger_delivering(robot):
    # get the time step of the current world.
    timestep = int(robot.getBasicTimeStep())

    # enable keyboard
    kb = robot.getKeyboard()
    kb.enable(10)



    arm.inside()  # set its to default position
    # set lift motors
    liftMotors = []
    liftMotorsNames = ['l1', 'l2', 'l3', 'l4']
    for i in range(len(liftMotorsNames)):
        liftMotors.append(robot.getDevice(liftMotorsNames[i]))
        liftMotors[i].setPosition(0)
    lift = lift1.Lift(liftMotors)

    #   This is the height of the shelf.
    # level1 = not decided
    # level2 = not decided
    # level3 = not decided
    lift.to_height(1)

    # height_pos = liftMotors[0].getPositionSensor().getValue()
    # and pulling_device.state == "UnlockedState"


        if pulling_device.state.id == "Reloading":

            target_height = 1.7

            if arm.isOut(target_height) and grabConnector.isLocked():
                arm.out()

            if key == 66:
                print('B is pressed for reloading box ')
                grabConnector.unlock()
                arm.inside()
                target_height = 1
                pulling_device.on_event("box_returned")

        # print(arm.sensor.getValue())
        print(pulling_device.state.id)

    # Enter here exit cleanup code.


def pull_box(robot,target_height):
    if arm.isOut(target_height) and target_height != 1:
        arm.out()
        print("ready to pick")
    else:
        print("not ready to pick")
    if grabConnector.getPresence() == 1:
        grabConnector.lock()
        print("This robot find a connector")
    else:
        print("finding box")
    arm.inside()
    if robot.arm.isOut(target_height):
        target_height = 1
def drop_box(robot,target_height):
    grabConnector.unlock()

if __name__ == '__main__':

    trigger_delivering(robot)

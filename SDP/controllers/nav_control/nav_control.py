from controller import Robot
from controller import PositionSensor
from controller import Supervisor
import movement as mv
import math
import numpy as np


def get_coord(supervisor):
    ur10e = supervisor.getFromDef('SHOEFY')
    box = supervisor.getFromDef('DEST_BOX')

    # rot_ur10e = np.array(ur10e.getOrientation())
    # # reshape into a 3x3 rotation matrix
    # rot_ur10e.reshape(3, 3)
    # rot_ur10e = np.transpose(rot_ur10e)
    # pos_ur10e = np.array(ur10e.getPosition())
    #
    # # Box position relative to world.
    # box_pos_world = np.array(box.getPosition())
    # # Calculate the relative translation between the box and the robot.
    # box_pos_world = np.subtract(box_pos_world, pos_ur10e)
    # # Matrix multiplication with rotation matrix: box position relative to robot.
    # # box_pos_robot = np.dot(rot_ur10e, box_pos_world)
    # box_rot_robot = np.dot(rot_ur10e, np.array(box.getOrientation()).reshape(3, 3))

    return np.array(box.getPosition())


def run_robot(robot):
    TIME_STEP = 64

    # initiating sensors/motors
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

    # helper function from movement.py
    m = mv.Movement(wheels, 10.0)

    # variable for calculating odometry
    radius = 0.057
    pos = [0, 0, 0]
    last_psV = [0, 0]
    curr_psV = [0, 0]
    diff = [0, 0]
    v = 0
    w = 0
    wheel_dist = 0.414
    dt = 1
    showPos = False
    target = [1, 1]
    # tt = get_coord(supervisor)
    # print(tt[0])
    # print(tt[1])
    # target = [tt[0], tt[1]]

    while robot.step(TIME_STEP) != -1:

        # calculating angular velocity and directional velocity
        for i in range(len(psNames)):
            curr_psV[i] = ps[i].getValue() * radius
            diff[i] = curr_psV[i] - last_psV[i]
            if abs(diff[i]) < 0.001:
                diff[i] = 0
                curr_psV[i] = last_psV[i]
        v = (diff[0] + diff[1]) / 2
        w = (diff[0] - diff[1]) / wheel_dist

        # updating current position/coordinate
        pos[2] += w * dt
        vx = v * math.cos(pos[2])
        vy = v * math.sin(pos[2])
        pos[0] += vx * dt
        pos[1] += vy * dt

        # show current position by pressing the key 'S'
        key = kb.getKey()
        if key == 83:
            showPos = not showPos
        # m.contol(key)
        if showPos:
            print("position: {}".format(pos))

        # move to target
        dist = distance([pos[0], pos[1]], target)
        if dist > 1:
            angle = (target[1] - pos[1]) / (target[0] - pos[0])
            angle = math.atan(angle) - pos[2]
            if angle > 0.1:
                m.control(314)
            elif angle < -0.1:
                m.control(316)
            else:
                m.control(315)
        else:
            m.control(1234567890)
            print("reached!")

        for i in range(len(psNames)):
            last_psV[i] = curr_psV[i]


def distance(source, target):
    ans = (target[1] - source[1]) ** 2
    ans += (target[0] - source[0]) ** 2
    return math.sqrt(ans)


if __name__ == '__main__':
    # robot = Robot()
    supervisor = Supervisor()
    pos = get_coord(supervisor)
    print("Box coord")
    print(pos)
    # run_robot(robot)

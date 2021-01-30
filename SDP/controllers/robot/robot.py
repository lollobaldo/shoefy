from controller import Robot

TIME_STEP = 64
robot = Robot()
ds = []
dsNames = ['dsR', 'dsL']
for i in range(2):
    ds.append(robot.getDevice(dsNames[i]))
    ds[i].enable(TIME_STEP)
wheels = []
wheelsNames = ['wheelLF', 'wheelLR', 'wheelRF', 'wheelRR']
for i in range(4):
    wheels.append(robot.getDevice(wheelsNames[i]))
    wheels[i].setPosition(float('inf'))
    wheels[i].setVelocity(0.0)
avoidObstacleCounter = 0
while robot.step(TIME_STEP) != -1:
    leftSpeed = 10.0
    rightSpeed = 10.0
    for i in range(2):  
            if ds[i].getValue() < 1000:
                avoidObstacleCounter = 1
    if avoidObstacleCounter > 0:
        avoidObstacleCounter -= 1
        leftSpeed = 5.0
        rightSpeed = -5.0
    wheels[0].setVelocity(leftSpeed)
    wheels[1].setVelocity(leftSpeed)
    wheels[2].setVelocity(rightSpeed)
    wheels[3].setVelocity(rightSpeed)
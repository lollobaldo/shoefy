from controller import Robot

class Arm():
    def __init__(self, motor):
        self.motor = motor
        self.sensor = motor.getPositionSensor()

 
    def out(self):
        #print('pushing')
        self.motor.setPosition(0.7)

    def inside(self):
        #print('pulling')
        self.motor.setPosition(0)
 
    def isOut(self):
        pos = self.sensor.getValue()
        #print(pos)
        return abs(pos -0.55)<0.001
    def isInside(self):
        pos = self.sensor.getValue()
        #print(pos)
        return abs(pos)<0.001


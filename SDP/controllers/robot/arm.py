from controller import Robot

class Arm():
    def __init__(self, motor):
        self.motor = motor
        self.sensor = motor.getPositionSensor()

 
    def out(self):
        #print('pushing')
        self.motor.setPosition(0.55)

    def inside(self):
        #print('pulling')
        self.motor.setPosition(0)
 
    def isOut(self,target_height):
        pos = self.sensor.getValue()
        #print(pos)
        return abs(pos -((target_height-1)/4))<0.001


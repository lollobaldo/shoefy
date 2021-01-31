from controller import Robot

class Movement():
    def __init__(self, ds, wheels, pos):
        self.ds = ds
        self.wheels = wheels
        self.pos = pos
        self.xcoord = 0
        self.ycoord = 0
        
    def move(self, speed):
        leftSpeed = speed
        rightSpeed = speed
        obstacle = [0,0]
        for i in range(2):  
            if self.ds[i].getValue() < 1000:
                obstacle[i] = 1      
        if obstacle[0] == 1 and obstacle[1] == 1:
            obstacle = [0,0]
            for i in range(2):  
                if self.ds[i+2].getValue() < 1000:
                    obstacle[i] = 1
            if obstacle == [0,0]:
                obstacle[0] = 1
        if obstacle[0] == 1:
            leftSpeed = -speed/2
            rightSpeed = speed/2
        elif obstacle[1] == 1:
            leftSpeed = speed/2
            rightSpeed = -speed/2
        self.wheels[0].setVelocity(leftSpeed)
        self.wheels[1].setVelocity(leftSpeed)
        self.wheels[2].setVelocity(rightSpeed)
        self.wheels[3].setVelocity(rightSpeed)
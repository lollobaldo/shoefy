from controller import Robot
import math as Math

class Movement():
    def __init__(self, ds, wheels, gps, speed, kb):
        self.ds = ds
        self.wheels = wheels
        self.gps = gps #not done
        self.speed = speed
        self.kb = kb
        self.coord = [] #not done
        self.auto = False
        
    def distance(self, dest): #not done
        self.coord = self.gps.getValues()
        ans = (dest[0] - self.coord[0])**2 + (dest[1] - self.coord[2])**2
        return Math.sqrt(ans)
        
    def angle(self, dest): #not done
        self.coord = self.gps.getValues()
        if dest[0] - self.coord[0] == 0:
            return 0
        ans = (dest[1] - self.coord[2])/(dest[0]-self.coord[0])
        ans = Math.degrees(Math.atan(ans))
        return ans
    
    def move(self):
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
            self.left()
            return
        elif obstacle[1] == 1:
            self.right()
            return
        self.forward()
    
    def control(self):
        if self.auto:
            self.move()
        else:
            self.stop()
        key = self.kb.getKey()
        if key == 314:
            self.left()
        elif key == 316:
            self.right()
        elif key == 315:
            self.forward()
        elif key == 317:
            self.auto = not self.auto
        
    def left(self):
        self.wheels[0].setVelocity(-self.speed/2)
        self.wheels[1].setVelocity(-self.speed/2)
        self.wheels[2].setVelocity(self.speed/2)
        self.wheels[3].setVelocity(self.speed/2)
        
    def right(self):
        self.wheels[0].setVelocity(self.speed/2)
        self.wheels[1].setVelocity(self.speed/2)
        self.wheels[2].setVelocity(-self.speed/2)
        self.wheels[3].setVelocity(-self.speed/2)
    
    def forward(self):
        self.wheels[0].setVelocity(self.speed)
        self.wheels[1].setVelocity(self.speed)
        self.wheels[2].setVelocity(self.speed)
        self.wheels[3].setVelocity(self.speed)
        
    def stop(self):
        self.wheels[0].setVelocity(0)
        self.wheels[1].setVelocity(0)
        self.wheels[2].setVelocity(0)
        self.wheels[3].setVelocity(0)
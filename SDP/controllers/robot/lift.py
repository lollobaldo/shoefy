from controller import Robot

class Lift():
    def __init__(self, motors):
        self.motors = motors
    
    def control(self, key):
        self.stop()
        if key == 314:
            self.up()
        elif key == 316:
            self.down()
        
    def up(self, level):
        for lm in self.motors:
            lm.setPosition(0.2)

    def down(self):
        for lm in self.motors:
            lm.setPosition(0)
 
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
        print('raising')
        for lm in self.motors:
            lm.setPosition(0.22)

    def down(self):
        print('lowering')
        for lm in self.motors:
            lm.setPosition(0)
            
    def go(self, lvl):
        for lm in self.motors:
            lm.setPosition(lvl)
 
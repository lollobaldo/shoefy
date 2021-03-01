# shoefy
SDP-2021

nav_control.py:
top argument of controllerArgs = z coordinate
bottom argument = x coordinate
x coordinate for the robot = -x for webots world.
webots world has a weird coordinate system where vertical/height is y axis,
x < 0 = right, x > 0 = left
z > 0 = up, z < 0 = bottom

requirement for nav_control.py:
jule-shoefy.wbt

changes of jule-shoefy.wbt:
added 2 distance sensors: dsL,dsR
rename wheel1,wheel2 -> wheelR, wheelL
rename ps1,ps2 -> psR, psL
radius of wheels attached with motor: 0.1 from 0.31
added a gyroscope: gyro

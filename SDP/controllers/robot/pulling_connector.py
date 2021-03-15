
from pulling_State import free_Arm
class pulling_Device(object):
    """
    A simple state machine that mimics the functionality of a device from a
    high level.
    """

    def __init__(self):
        """ Initialize the components. """

        # Start with a default state.
        self.state = free_Arm()

    def on_event(self, event):
        """
        This is the bread and butter of the state machine. Incoming events are
        delegated to the given states which then handle the event. The result is
        then assigned as the new state.
        """

        # The next state will be the result of the on_event function.
        self.state = self.state.on_event(event)

    def get_boxHeight(self, height):
        """
        only start of picking or dropping will trigger them.
        """
        self.state = self.state.get_boxHeight(height)
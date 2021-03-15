from state import State


# Start of our states


class free_Arm(State):
    """
    The state which indicates that there are no limitations to the arm it is also default state.
    """

    def on_event(self, event):
        if event == 'device_locked':
            return LockedState()

        if event == 'picking':
            return Picking()

        return self

    def get_boxHeight(self, height):
        """
        Will be triggered only when server give a height
        """

        return self


class Picking(State):
    """
    The state which indicates that the arm is picking the box from shelf
    """

    def on_event(self, event):
        if event == 'device_locked':
            return LockedState()

        return self

    def get_boxHeight(self, height):
        """
        Will be triggered only when server give a height
        """

        return self


class LockedState(State):
    """
    The state which indicates that there are a box locked with the arm.
    """

    def on_event(self, event):
        if event == 'to_movingMode':
            return moving_mode()

        return self

    def get_boxHeight(self, height):
        """
        Will be triggered only when server give a height
        """

        return self


class moving_mode(State):
    """
    The state which indicates that the robot need lift down for moving
    """

    def on_event(self, event):
        if event == 'return_box':
            return Reloading()

        return self

    def get_boxHeight(self, height):
        """
        Will be triggered only when server give a height
        """

        return Reloading()



class Reloading(State):
    """
    The state which indicates that the robot drop the box to the
    """

    def on_event(self, event):
        if event == 'box_returned':
            return free_Arm()
        return self

    def get_boxHeight(self, height):
        """
        Will be triggered only when server give a height
        """

        return self
# End of our states.

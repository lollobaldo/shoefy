from . import session
class shoefy(object):
    def __init__(self,domain,key):
        self.url = 'https://'+domain
        self.key = key

    def getBooking(self,id):
      response = session.get(self.url+'/booking/'+id)
      return response.json()
    

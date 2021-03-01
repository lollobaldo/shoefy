from . import session
class shoefy(object):
    def __init__(self,domain,key):
        self.url = 'https://'+domain
        self.key = key

    def getBooking(self,id):
        response = session.get(self.url+'/booking/'+id)
        return response.json()
   
    def getShoes(self,size):
        response = session.get(self.url+'/shoes/'+str(size))
        return response.json()

    def takeShoe(self,row,column):
        response = requests.patch(self.url+'/shoe/'+str(row)+'/'+str(column),data="{ currentlyPresent: false }"
        return response

    def returnShoe(self,row,column):
        response = requests.patch(self.url+'/shoe/'+str(row)+'/'+str(column),dat
a="{ currentlyPresent: true }"
        return response


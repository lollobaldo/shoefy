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
		
		def getShoe(self,unit,row,column):
				response = session.get(self.url+'/shoe/'+str(unit)+'/'+str(row)+'/'+str(column))
				return response.json()

		def takeShoe(self,unit,row,column):
				response = session.patch(self.url+'/shoe/'+str(unit)+'/'+str(row)+'/'+str(column)+'/take')
				return response

		def replaceShoe(self,unit,row,column):
				response = session.patch(self.url+'/shoe/'+str(unit)+'/'+str(row)+'/'+str(column)+'/replace')
				return response
		
		def getAvailShoe(self,size):
				response = session.get(self.url+'/shoe/'+str(size)+'/available')
				return response.json()


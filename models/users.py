import pymongo
from config import users_collection

class User:
    def __inti__(self, name, email, picture, admin=False):
        self.name = name
        self.email = email
        self.picture = picture
        self.admin = admin
        
    def insert_user(self):
        try:
            users_collection.insert_one(self.__dict__)
            return {"message":f"successfully creted user with name {self.name}"}
        except pymongo.errors.PymongoError as e:
            raise ValueError ( f"error { str(e) }" )
        
    @classmethod
    def get_logged_in_user(user_id)
import time
import string
import random
from locust import HttpUser, task, between

class LoadTest(HttpUser):
    wait_time = between(1, 5) # between 1-5 seconds of wait

    def random_name(self):
       return ''.join(random.choice(string.ascii_letters) for _ in range(5))

    @task
    def create_user(self):
        email_name = self.random_name()
        self.client.post('/user/', json={'email': email_name+"@gmail.com", "name": "random"})

    @task
    def get_users(self):
        self.client.get('/user/')

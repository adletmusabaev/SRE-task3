from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 3)  # паузы между запросами

    @task
    def get_items(self):
        self.client.get("/items")

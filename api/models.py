from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
import django.utils


# Create your models here.
class User(AbstractUser):
    start_date = models.DateTimeField(null=True, blank=True)
    smoke_free_days = models.IntegerField(default=0)
    last_logged_date = models.DateField(null=True, blank=True)

    @property
    def calculate_smoke_free_days(self):
        if self.start_date:
            today = datetime.date.today()
            return (today - self.start_date.date()).days
        return 0

    def log_day(self):
        today = datetime.date.today()
        if self.last_logged_date == today:
            return False
        else:
            self.smoke_free_days = self.calculate_smoke_free_days
            self.last_logged_date = today
            self.save()
            return True

    @property
    def can_log_today(self):
        today = datetime.date.today()
        return self.last_logged_date != today

    def reset_smoke_free_days(self):
        self.smoke_free_days = 0
        self.last_logged_date = None
        self.start_date = None
        self.save()

    def __str__(self):
        return f"{self.username}, {self.start_date}, {self.smoke_free_days}"
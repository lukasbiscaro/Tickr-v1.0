from django.db import models

class Local(models.Model):
    local_image = models.ImageField(upload_to="event_images", default="no_image.jpg")
    local_name = models.CharField(max_length=150, default="")
    local_date = models.CharField(max_length=100, default="")
    local_time_start = models.TimeField(default="")
    local_time_ends = models.TimeField(default="")
    local_location = models.CharField(max_length=300, default="")
    local_description = models.CharField(max_length=1000, default="")

    def __str__(selƒ):
        return f"ID: {selƒ.id} | Local Name: {selƒ.local_name}"

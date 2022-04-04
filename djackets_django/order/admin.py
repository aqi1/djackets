from django.contrib import admin

from .models import Order, OrderItem

class OrderAdmin(admin.ModelAdmin):
  list_display = ('first_name', 'last_name', 'paid_amount', 'created_at')

admin.site.register(Order, OrderAdmin)
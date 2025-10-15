from rest_framework import serializers
from .models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    can_log_today = serializers.ReadOnlyField()
    smoke_free_days = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'username', 'start_date', 'smoke_free_days', 'can_log_today']
        read_only_fields = ['id', 'username', 'smoke_free_days', 'can_log_today']
        extra_kwargs = {
            'smoke_free_days': {'read_only': True},
            'can_log_today': {'read_only': True}
        }
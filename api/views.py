from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from .serializers import UserRegisterSerializer, UserProfileSerializer


class UserViewSet(viewsets.GenericViewSet,
                  mixins.CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def get_permissions(self):
        """
        Assign permissions based on action.
        """
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        """
        Return appropriate serializer class based on action
        """
        if self.action == 'profile':
            return UserProfileSerializer
        return UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        """
        Register a new user - overridden to use create_user method
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(**serializer.validated_data)

        return Response({
            'user': UserProfileSerializer(user, context=self.get_serializer_context()).data,
            'message': 'User created successfully'
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get', 'patch'])
    def profile(self, request):
        """
        Get or update current user's profile
        """
        user = request.user

        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)

        elif request.method == 'PATCH':
            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def log_day(self, request):
        """
        Log a smoke-free day for current user
        """
        user = request.user
        if user.log_day():
            return Response({
                'message': 'Day logged successfully!',
                'smoke_free_days': user.smoke_free_days
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'You have already logged today.'
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def reset(self, request):
        """
        Reset smoke-free days counter for current user
        """
        user = request.user
        user.reset_smoke_free_days()
        return Response({
            'message': 'Smoke-free days reset to zero. Start date updated.',
            'smoke_free_days': user.smoke_free_days,
            'start_date': user.start_date
        }, status=status.HTTP_200_OK)
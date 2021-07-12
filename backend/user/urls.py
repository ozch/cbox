from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name="user-login"),
    path('orders/', OrderView.as_view(), name="order"),
    path('feedback/', FeedBackView.as_view(), name="feedback"),
    path('messages/', MessagesView.as_view(), name="messages"),
    path('users/', UserView.as_view(), name="user"),
    path('me/', MeView.as_view(), name="me"),
    path('signup/', SignUpView.as_view(), name="sign-up"),
    path('logout/', LogoutView.as_view(), name="user-logout")

]

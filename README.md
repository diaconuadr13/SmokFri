# SmokFri - Smoke-Free Tracker

A full-stack application to help users track their smoke-free journey with daily logging and progress tracking.

## Features

✨ **User Authentication** - Secure JWT-based registration and login
📊 **Progress Tracking** - Track your smoke-free days since quitting
✅ **Daily Logging** - Log each smoke-free day (once per day)
🔄 **Reset Functionality** - Start over if needed
🎨 **Beautiful UI** - Modern, responsive design with gradient backgrounds
💪 **Motivational Messages** - Get encouraging messages based on your progress

## Tech Stack

### Backend
- Django 5.2.7
- Django REST Framework
- Simple JWT for authentication
- SQLite database

### Frontend
- React 19.2.0
- TypeScript
- Axios for API calls
- Modern CSS with gradients and animations

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the project root directory:
```cmd
cd C:\Users\diaco\Desktop\home\smokfri
```

2. Install Python dependencies (if not already installed):
```cmd
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers python-dotenv
```

3. Run migrations:
```cmd
python manage.py migrate
```

4. Start the Django development server:
```cmd
python manage.py runserver
```

The backend will run at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```cmd
cd smokfri_frontend
```

2. Install dependencies (if not already installed):
```cmd
npm install
```

3. Start the React development server:
```cmd
npm start
```

The frontend will run at `http://localhost:3000` and automatically open in your browser.

## Usage

### 1. Register a New Account
- Click "Register" on the login page
- Enter a username and password
- Click "Register" to create your account

### 2. Login
- Enter your username and password
- Click "Login" to access your dashboard

### 3. Start Tracking
- Once logged in, you'll see your dashboard with your smoke-free days counter
- The counter starts at 0 until you set a start date or log your first day
- Click "Log Today" to log each smoke-free day
- You can only log once per day

### 4. Monitor Progress
- View your total smoke-free days in the large counter
- See your start date
- Get motivational messages based on your progress:
  - Day 1-6: Great start!
  - Day 7-29: One week milestone!
  - Day 30-89: One month achievement!
  - Day 90+: Champion status!

### 5. Reset Progress
- Click "Reset Progress" if you need to start over
- This will reset your counter to 0 and clear your start date

## API Endpoints

### Authentication
- `POST /api/token/` - Login and get JWT tokens
- `POST /api/token/refresh/` - Refresh access token
- `POST /api/user/` - Register new user

### User Profile
- `GET /api/user/profile/` - Get current user's profile
- `PATCH /api/user/profile/` - Update profile (e.g., start_date)

### Actions
- `POST /api/user/log_day/` - Log a smoke-free day
- `POST /api/user/reset/` - Reset progress

## Project Structure

```
smokfri/
├── api/                        # Django app
│   ├── models.py              # User model with tracking logic
│   ├── views.py               # API viewsets
│   ├── serializers.py         # DRF serializers
│   └── urls.py                # API routes
├── smokfri/                   # Django project settings
│   ├── settings.py
│   └── urls.py
└── smokfri_frontend/          # React frontend
    ├── src/
    │   ├── api/               # API integration
    │   │   ├── axios.ts       # Axios instance with interceptors
    │   │   ├── auth.ts        # Authentication API calls
    │   │   └── user.ts        # User/profile API calls
    │   ├── components/        # React components
    │   │   ├── Login.tsx      # Login page
    │   │   ├── Register.tsx   # Registration page
    │   │   ├── Dashboard.tsx  # Main dashboard
    │   │   ├── Login.css      # Auth styling
    │   │   └── Dashboard.css  # Dashboard styling
    │   ├── App.tsx            # Main app component
    │   └── App.css            # Global styles
    └── package.json
```

## Features Explained

### Automatic Token Refresh
The frontend automatically refreshes JWT tokens when they expire, providing a seamless user experience.

### Daily Logging Logic
- Users can only log once per day
- The system tracks the last logged date
- The smoke-free days counter updates based on the start date

### Responsive Design
The application works great on desktop, tablet, and mobile devices.

## Troubleshooting

### CORS Issues
Make sure CORS is enabled in Django settings (already configured in this project).

### Port Conflicts
- Backend runs on port 8000
- Frontend runs on port 3000
- If these ports are in use, stop other services or change the ports

### Authentication Errors
- Clear localStorage in browser DevTools if having token issues
- Make sure the backend is running before starting the frontend

## Future Enhancements

Potential features to add:
- [ ] Health benefits timeline based on days smoke-free
- [ ] Statistics and charts
- [ ] Social features (share progress)
- [ ] Achievement badges
- [ ] Email notifications and reminders
- [ ] Password reset functionality
- [ ] Profile picture upload

## License

This project is for educational purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Made with ❤️ to help people quit smoking


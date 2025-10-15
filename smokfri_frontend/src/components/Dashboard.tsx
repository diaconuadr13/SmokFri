import React, { useState, useEffect } from 'react';
import { getProfile, logDay, resetProgress, UserProfile, setStartDate } from '../api/user';
import { logout } from '../api/auth';
import './Dashboard.css';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSetStartDate = async () => {
    if (!selectedDate) {
      setError('Please select a date');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      await setStartDate(selectedDate);
      setMessage('Start date set successfully!');
      setShowDatePicker(false);
      await fetchProfile();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError('Failed to set start date');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogDay = async () => {
    if (!profile) return;

    // If no start date is set, prompt user to set it
    if (!profile.start_date) {
      setError('Please set your start date first');
      setShowDatePicker(true);
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const response = await logDay();
      setMessage(response.message);
      await fetchProfile();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to log day');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset your progress? This will set your smoke-free days to 0.')) {
      return;
    }

    try {
      await resetProgress();
      setMessage('Progress reset successfully!');
      await fetchProfile();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setError('Failed to reset progress');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-container">
        <div className="error-message">Failed to load profile</div>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🚭 SmokFri</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="welcome-section">
        <h2>Welcome, {profile.username}!</h2>
      </div>

      <div className="stats-card">
        <div className="days-counter">
          <div className="days-number">{profile.smoke_free_days}</div>
          <div className="days-label">Smoke-Free Days</div>
        </div>

        <div className="start-date-section">
          <div className="start-date">
            <span className="label">Start Date:</span>
            <span className="value">{formatDate(profile.start_date)}</span>
          </div>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="change-date-button"
          >
            {profile.start_date ? '📅 Change Date' : '📅 Set Start Date'}
          </button>
        </div>

        {showDatePicker && (
          <div className="date-picker-section">
            <label htmlFor="start-date">Choose your quit date:</label>
            <input
              type="date"
              id="start-date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              max={getTodayDate()}
              className="date-input"
            />
            <div className="date-picker-buttons">
              <button onClick={handleSetStartDate} className="save-date-button">
                Save Date
              </button>
              <button onClick={() => setShowDatePicker(false)} className="cancel-date-button">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="actions-section">
        <button
          onClick={handleLogDay}
          className="primary-button"
          disabled={!profile.can_log_today}
        >
          {profile.can_log_today ? '✓ Log Today' : '✓ Already Logged Today'}
        </button>

        <button onClick={handleReset} className="secondary-button">
          Reset Progress
        </button>
      </div>

      <div className="motivational-section">
        {profile.smoke_free_days === 0 && (
          <p className="motivation-text">
            🌟 Start your smoke-free journey today! {!profile.start_date && 'Set your start date and click "Log Today" to begin.'}
          </p>
        )}
        {profile.smoke_free_days >= 1 && profile.smoke_free_days < 7 && (
          <p className="motivation-text">
            💪 Great start! Keep going strong!
          </p>
        )}
        {profile.smoke_free_days >= 7 && profile.smoke_free_days < 30 && (
          <p className="motivation-text">
            🎉 One week down! You're doing amazing!
          </p>
        )}
        {profile.smoke_free_days >= 30 && profile.smoke_free_days < 90 && (
          <p className="motivation-text">
            🏆 A full month! Your body is healing!
          </p>
        )}
        {profile.smoke_free_days >= 90 && (
          <p className="motivation-text">
            👑 90+ days! You're a true champion!
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


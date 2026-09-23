import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SecurityPosturePage from './pages/SecurityPosturePage';
import PasswordSecurityPage from './pages/PasswordSecurityPage';
import PhishingPage from './pages/PhishingPage';
import WebsiteSecurityPage from './pages/WebsiteSecurityPage';
import IncidentLabPage from './pages/IncidentLabPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import LearningPage from './pages/LearningPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/security-posture"
        element={
          <ProtectedRoute>
            <SecurityPosturePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/password-security"
        element={
          <ProtectedRoute>
            <PasswordSecurityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/phishing"
        element={
          <ProtectedRoute>
            <PhishingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/website-security"
        element={
          <ProtectedRoute>
            <WebsiteSecurityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/incident-lab"
        element={
          <ProtectedRoute>
            <IncidentLabPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning"
        element={
          <ProtectedRoute>
            <LearningPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

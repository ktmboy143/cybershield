export const navItems = [
  'Platform',
  'Features',
  'Security',
  'Learning',
  'About'
];

export const features = [
  {
    title: 'Security Posture',
    description: 'Assess risk signals across identity, devices, credentials, and user habits.',
    accent: 'cyan'
  },
  {
    title: 'Password Health',
    description: 'Review local password strength signals and receive safe recommendations.',
    accent: 'violet'
  },
  {
    title: 'Phishing Awareness',
    description: 'Analyze suspicious messaging patterns in a safe educational workflow.',
    accent: 'emerald'
  },
  {
    title: 'Website Security',
    description: 'Review HTTPS and header posture for authorized domains and systems.',
    accent: 'blue'
  },
  {
    title: 'Incident Investigation',
    description: 'Investigate simulated audit events and understand attack progression.',
    accent: 'amber'
  },
  {
    title: 'Security Analytics',
    description: 'Track progress with clear metrics, trend lines, and reports.',
    accent: 'rose'
  }
];

export const dashboardMetrics = [
  { label: 'Security Score', value: '82', trend: '+6.4%', change: 'vs last month' },
  { label: 'Threat Indicators', value: '24', trend: '-12%', change: 'reduced' },
  { label: 'Completed Checks', value: '18', trend: '+3', change: 'this week' },
  { label: 'Recommendations', value: '7', trend: '2 urgent', change: 'next review' }
];

export const activityTimeline = [
  { time: '09:42', title: 'Password security check completed', status: 'success' },
  { time: '10:15', title: 'Phishing awareness exercise completed', status: 'info' },
  { time: '11:04', title: 'Website configuration checked', status: 'warning' },
  { time: '12:31', title: 'Security recommendation reviewed', status: 'success' }
];

export const securityBreakdown = [
  { name: 'Password Hygiene', score: 18, total: 20 },
  { name: 'MFA Awareness', score: 17, total: 20 },
  { name: 'Phishing Awareness', score: 16, total: 20 },
  { name: 'Web Security', score: 15, total: 20 },
  { name: 'Security Practices', score: 16, total: 20 }
];

export const incidentScenarios = [
  {
    id: 'suspicious-login',
    title: 'Suspicious login activity',
    status: 'Investigating',
    severity: 'High',
    description: 'Multiple failed attempts followed by a successful login from an unusual location.'
  },
  {
    id: 'phishing',
    title: 'Phishing incident',
    status: 'Resolved',
    severity: 'Medium',
    description: 'A fake invoice request used urgency language to prompt credential entry.'
  },
  {
    id: 'file-activity',
    title: 'Unusual file activity',
    status: 'Open',
    severity: 'High',
    description: 'A sudden rise in file access events during off-hours triggered an alert.'
  }
];

export const analyticsData = [
  { name: 'Jan', score: 68 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 74 },
  { name: 'Apr', score: 81 },
  { name: 'May', score: 76 },
  { name: 'Jun', score: 82 }
];

export const reportRows = [
  { date: '2026-09-21', type: 'Quarterly posture', score: '82', status: 'Complete' },
  { date: '2026-09-14', type: 'Phishing review', score: '89', status: 'Complete' },
  { date: '2026-09-05', type: 'Password health', score: '76', status: 'Needs review' }
];

export const lessons = [
  { title: 'Password Security', difficulty: 'Beginner', time: '12 min', description: 'Learn unique password principles and safe habits.' },
  { title: 'Phishing Basics', difficulty: 'Intermediate', time: '15 min', description: 'Recognize urgency, impersonation, and suspicious asks.' },
  { title: 'MFA Essentials', difficulty: 'Beginner', time: '10 min', description: 'Understand how MFA blocks many account takeover attempts.' },
  { title: 'Web Security', difficulty: 'Intermediate', time: '18 min', description: 'Review HTTPS, headers, and safe browsing patterns.' }
];

export const quizQuestions = [
  {
    question: 'What should you do when an unexpected email asks for your password?',
    options: ['Reply immediately', 'Click the link without checking', 'Verify the sender and contact the company through a trusted channel', 'Forward it to everyone'],
    correct: 2,
    explanation: 'Always verify the request through a trusted channel rather than responding to the message directly.'
  },
  {
    question: 'Which is the safest habit for passwords?',
    options: ['Reuse one strong password everywhere', 'Use a unique password for each account', 'Write them on sticky notes', 'Share them with your team'],
    correct: 1,
    explanation: 'Unique passwords reduce blast radius if any one account is exposed.'
  }
];

export const defaultUser = {
  name: 'Ava Thompson',
  email: 'ava@cybershield.local',
  role: 'User'
};

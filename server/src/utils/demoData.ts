export const fallbackUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@cybershield.local',
    passwordHash: '$2a$10$7IfNw5y0J.g6E9T2U9jP2O8VarkFhQ2P4bCUdcGDoC81dV5j4rD1G',
    role: 'admin' as const
  },
  {
    id: '2',
    name: 'Ava Thompson',
    email: 'user@cybershield.local',
    passwordHash: '$2a$10$7IfNw5y0J.g6E9T2U9jP2O8VarkFhQ2P4bCUdcGDoC81dV5j4rD1G',
    role: 'user' as const
  }
];

export const fallbackDashboard = {
  score: 82,
  metrics: [
    { label: 'Security Score', value: '82', trend: '+6.4%' },
    { label: 'Threat Indicators', value: '24', trend: '-12%' },
    { label: 'Completed Checks', value: '18', trend: '+3' },
    { label: 'Recommendations', value: '7', trend: '2 urgent' }
  ],
  activity: [
    { time: '09:42', title: 'Password security check completed', status: 'success' },
    { time: '10:15', title: 'Phishing awareness exercise completed', status: 'info' },
    { time: '11:04', title: 'Website configuration checked', status: 'warning' }
  ]
};

export const fallbackPosture = {
  score: 82,
  categories: [
    { name: 'Identity', score: 92, status: 'Healthy', note: 'Strong account hygiene and verification controls in place.' },
    { name: 'Passwords', score: 80, status: 'Good', note: 'Password quality is above average, but reuse risk still exists.' },
    { name: 'MFA', score: 88, status: 'Protected', note: 'Multi-factor protections are enabled and reviewed often.' },
    { name: 'Email Security', score: 71, status: 'Watch', note: 'Phishing simulation suggests email verification should be reinforced.' },
    { name: 'Web Security', score: 75, status: 'Moderate', note: 'HTTPS and header posture is generally solid with a few warnings.' },
    { name: 'Device Hygiene', score: 84, status: 'Healthy', note: 'Endpoint practices are well maintained with a few improvement opportunities.' }
  ]
};

export const fallbackReports = [
  { _id: 'report-1', title: 'Quarterly posture', type: 'quarterly', score: 82, status: 'Complete', summary: 'Overall posture remains strong.' },
  { _id: 'report-2', title: 'Phishing review', type: 'phishing', score: 89, status: 'Complete', summary: 'Campaign detection improved by 12%.' },
  { _id: 'report-3', title: 'Password health', type: 'password', score: 76, status: 'Needs review', summary: 'One shared password pattern still requires remediation.' }
];

export const fallbackIncidents = [
  {
    _id: 'incident-1',
    title: 'Suspicious login activity',
    type: 'login',
    severity: 'high',
    status: 'Investigating',
    description: 'Multiple failed attempts followed by a successful login from an unusual location.',
    evidence: ['Failed attempts in 30 seconds', 'New location fingerprint', 'Device trust mismatch'],
    notes: [{ author: 'SOC', message: 'Follow-up with user for device verification.' }]
  },
  {
    _id: 'incident-2',
    title: 'Phishing incident',
    type: 'phishing',
    severity: 'medium',
    status: 'Resolved',
    description: 'A fake invoice request used urgency language to prompt credential entry.',
    evidence: ['Urgency language flagged', 'Sender spoofing', 'MFA prompt followed'],
    notes: [{ author: 'Analyst', message: 'User reported the message and reset their password.' }]
  }
];

export const fallbackAnalytics = {
  scoreHistory: [
    { name: 'Jan', score: 68 },
    { name: 'Feb', score: 72 },
    { name: 'Mar', score: 74 },
    { name: 'Apr', score: 81 },
    { name: 'May', score: 76 },
    { name: 'Jun', score: 82 }
  ],
  securityFocus: [
    { name: 'Password', value: 30, color: '#67e8f9' },
    { name: 'MFA', value: 25, color: '#8b5cf6' },
    { name: 'Phishing', value: 22, color: '#34d399' },
    { name: 'Web', value: 23, color: '#fbbf24' }
  ]
};

export const fallbackLearning = [
  { _id: 'lesson-1', title: 'Password Security', difficulty: 'Beginner', durationMinutes: 12, description: 'Learn unique password principles and safe habits.', category: 'Password' },
  { _id: 'lesson-2', title: 'Phishing Basics', difficulty: 'Intermediate', durationMinutes: 15, description: 'Recognize urgency, impersonation, and suspicious asks.', category: 'Phishing' },
  { _id: 'lesson-3', title: 'MFA Essentials', difficulty: 'Beginner', durationMinutes: 10, description: 'Understand how MFA blocks many account takeover attempts.', category: 'Identity' }
];

export const fallbackAdminUsers = [
  { _id: 'user-1', name: 'Admin User', email: 'admin@cybershield.local', role: 'admin', status: 'active' },
  { _id: 'user-2', name: 'Ava Thompson', email: 'user@cybershield.local', role: 'user', status: 'active' }
];

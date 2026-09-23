export type LessonQuiz = {
  question: string;
  options: string[];
  answer: number;
};

export type LessonContent = {
  introduction: string;
  explanation: string;
  importantPoints: string[];
  examples: string[];
  safetyTips: string[];
  quiz: LessonQuiz[];
};

const commonQuiz = (question: string, options: string[], answer: number): LessonQuiz[] => [{ question, options, answer }];

export const learningContentByTitle: Record<string, LessonContent> = {
  'Phishing Basics': {
    introduction: 'Phishing is a social engineering trick that uses messages or websites to steal information.',
    explanation: 'Attackers often pretend to be a trusted person or company. They create urgency so you click before checking who really sent the message.',
    importantPoints: ['Unexpected urgency is a warning sign.', 'Check the sender and destination before clicking.', 'Legitimate support staff will not ask for your password.'],
    examples: ['“Your account is locked. Verify within 10 minutes.”', 'A fake delivery notice asks you to pay a small fee.'],
    safetyTips: ['Open the official app or type the known website yourself.', 'Report suspicious messages and delete them.', 'Use MFA so a stolen password is not enough.'],
    quiz: commonQuiz('What is the safest response to an unexpected password request?', ['Reply with the password', 'Click the link quickly', 'Verify through a trusted channel', 'Forward it to colleagues'], 2)
  },
  'Password Security': {
    introduction: 'Strong password habits reduce the damage caused by account breaches.',
    explanation: 'Use a unique, long passphrase for every important account. A password manager can create and remember random passwords safely.',
    importantPoints: ['Length matters more than clever substitutions.', 'Never reuse passwords across services.', 'Turn on MFA wherever it is available.'],
    examples: ['A reused password from a shopping site can unlock email if the same password is used there.', 'A password manager can generate a different random password for each site.'],
    safetyTips: ['Use a password manager.', 'Change a password immediately after a breach notification.', 'Never share passwords through chat or email.'],
    quiz: commonQuiz('Which habit best limits the impact of one breached account?', ['Reusing one strong password', 'Using unique passwords', 'Writing passwords publicly', 'Disabling MFA'], 1)
  },
  'MFA Essentials': {
    introduction: 'Multi-factor authentication adds another proof of identity beyond a password.',
    explanation: 'MFA combines something you know, have, or are. Even if a password is stolen, the attacker still needs the additional factor.',
    importantPoints: ['Authenticator apps and security keys are strong options.', 'Never approve an MFA prompt you did not start.', 'Backup codes must be stored securely.'],
    examples: ['A login prompt arrives while you are not signing in; deny it and change your password.', 'A security key can block a fake website from using your login.'],
    safetyTips: ['Prefer phishing-resistant security keys when available.', 'Review logged-in devices regularly.', 'Report repeated unexpected MFA prompts.'],
    quiz: commonQuiz('What should you do with an unexpected MFA prompt?', ['Approve it', 'Ignore it forever', 'Deny it and investigate', 'Share the code'], 2)
  },
  'Web Security': {
    introduction: 'Safe browsing means checking where a link leads and how a site protects your connection.',
    explanation: 'HTTPS encrypts traffic in transit, but it does not prove a site is trustworthy. Domain names, browser warnings, and site behavior still matter.',
    importantPoints: ['Check the complete domain name.', 'HTTPS is necessary but not sufficient.', 'Do not bypass browser certificate warnings.'],
    examples: ['secure.example.com is different from secure-example.com.', 'A site can use HTTPS and still be a scam.'],
    safetyTips: ['Use bookmarks for sensitive services.', 'Keep browsers and extensions updated.', 'Avoid entering sensitive data on unexpected links.'],
    quiz: commonQuiz('What does HTTPS primarily protect?', ['Whether a business is honest', 'Data in transit between browser and site', 'Whether a link is phishing', 'Your password manager database'], 1)
  },
  'Social Engineering': {
    introduction: 'Social engineering manipulates people instead of exploiting software.',
    explanation: 'Attackers use authority, fear, helpfulness, or familiarity to make a target reveal information or take an unsafe action.',
    importantPoints: ['Authority and urgency can be manufactured.', 'Verify unusual requests independently.', 'It is safe to pause and ask for a second opinion.'],
    examples: ['Someone claiming to be a manager asks for a gift-card purchase.', 'A caller asks you to bypass a normal approval process.'],
    safetyTips: ['Use known contact details to verify requests.', 'Follow approval procedures even under pressure.', 'Report suspicious behavior without blame.'],
    quiz: commonQuiz('Which tactic is common in social engineering?', ['Independent verification', 'Manufactured urgency', 'Routine updates', 'Strong encryption'], 1)
  },
  'Malware & Ransomware': {
    introduction: 'Malware is harmful software; ransomware locks data and demands payment.',
    explanation: 'Malware can arrive through attachments, downloads, compromised sites, or vulnerable software. Backups and updates reduce the impact.',
    importantPoints: ['Do not open unexpected attachments.', 'Updates close known security gaps.', 'Offline or isolated backups help recovery.'],
    examples: ['A fake invoice attachment launches a malicious script.', 'Ransomware encrypts shared files after one device is compromised.'],
    safetyTips: ['Keep reliable backups and test restoration.', 'Use least privilege.', 'Contact security staff immediately when files behave strangely.'],
    quiz: commonQuiz('Which measure helps recover from ransomware?', ['Ignoring updates', 'Tested isolated backups', 'Sharing admin accounts', 'Disabling alerts'], 1)
  },
  'Data Privacy': {
    introduction: 'Data privacy means collecting, sharing, and storing personal information responsibly.',
    explanation: 'Every piece of personal data creates risk. Good privacy habits limit access and keep information only as long as needed.',
    importantPoints: ['Share the minimum necessary information.', 'Check app permissions and privacy settings.', 'Treat sensitive data as valuable even when it seems harmless.'],
    examples: ['A quiz app asks for contacts it does not need.', 'A public screenshot accidentally includes an email address.'],
    safetyTips: ['Review permissions regularly.', 'Use private sharing channels for sensitive documents.', 'Delete old data safely.'],
    quiz: commonQuiz('What is data minimization?', ['Collecting everything', 'Collecting only what is needed', 'Publishing data publicly', 'Using the same data forever'], 1)
  },
  'Device Security': {
    introduction: 'Secure devices protect accounts, files, and the networks they connect to.',
    explanation: 'Screen locks, updates, encryption, and safe software sources make it harder for someone to access a lost or compromised device.',
    importantPoints: ['Use a strong screen lock.', 'Install updates from trusted sources.', 'Do not use unknown USB devices.'],
    examples: ['A lost unlocked laptop exposes every active session.', 'An untrusted browser extension can read sensitive pages.'],
    safetyTips: ['Enable device encryption and find-my-device tools.', 'Remove unused apps and extensions.', 'Use separate accounts without administrator rights for daily work.'],
    quiz: commonQuiz('What should you do before installing an app?', ['Use any download link', 'Verify the source and permissions', 'Disable security tools', 'Share your account'], 1)
  }
};

export function getLearningContent(title: string) {
  return learningContentByTitle[title] || learningContentByTitle['Web Security'];
}

export type IncidentLabOption = {
  label: string;
  explanation: string;
};

export type IncidentLabQuestion = {
  id: string;
  prompt: string;
  kind: 'investigation' | 'decision';
  options: IncidentLabOption[];
  correctIndex: number;
};

export type IncidentLabScenario = {
  id: string;
  title: string;
  type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  incident: string;
  evidence: Array<{ id: string; label: string; detail: string; clue: string }>;
  questions: IncidentLabQuestion[];
};

export const incidentLabScenarios: IncidentLabScenario[] = [
  {
    id: 'phishing-investigation',
    title: 'Invoice Impersonation',
    type: 'Phishing investigation',
    difficulty: 'Beginner',
    summary: 'A finance user received an urgent invoice message from a lookalike sender.',
    incident: 'The sender claims to be a supplier and asks the user to sign in to review an overdue invoice. The message arrived shortly after a public holiday and uses a deadline to discourage verification.',
    evidence: [
      { id: 'sender', label: 'Sender details', detail: 'The display name is “Northwind Billing”, but the address is billing@northwind-payments.example rather than the approved supplier domain.', clue: 'The display name and real address do not match.' },
      { id: 'link', label: 'Destination link', detail: 'The visible link leads to login.northwind-payments.example/verify. The approved supplier portal is portal.northwind.example.', clue: 'The destination is a lookalike domain.' },
      { id: 'request', label: 'Requested action', detail: 'The message asks for a password and MFA code to release the invoice.', clue: 'Legitimate support should never request credentials or MFA codes.' }
    ],
    questions: [
      { id: 'phishing-classification', prompt: 'How should this message be classified?', kind: 'investigation', options: [{ label: 'Routine supplier notice', explanation: 'The urgency and credential request are inconsistent with a routine notice.' }, { label: 'Likely phishing', explanation: 'The lookalike sender, domain, and credential request are strong phishing indicators.' }, { label: 'System maintenance', explanation: 'Nothing in the evidence describes planned maintenance.' }], correctIndex: 1 },
      { id: 'phishing-action', prompt: 'What is the safest immediate action?', kind: 'decision', options: [{ label: 'Use the link and test the login', explanation: 'Testing a suspicious login can expose credentials.' }, { label: 'Reply and ask the sender to confirm', explanation: 'Replying keeps the attacker in control of the conversation.' }, { label: 'Report it, avoid the link, and verify through a known channel', explanation: 'Independent verification and reporting contain the risk safely.' }], correctIndex: 2 }
    ]
  },
  {
    id: 'suspicious-login',
    title: 'Midnight Sign-in',
    type: 'Suspicious login investigation',
    difficulty: 'Intermediate',
    summary: 'An account login succeeded from a new region after repeated failures.',
    incident: 'The security team is reviewing an account with a successful login from a new device. The user is currently online from their normal office and did not expect a sign-in alert.',
    evidence: [
      { id: 'failures', label: 'Authentication events', detail: 'Nine failed password attempts occurred over two minutes before a successful login.', clue: 'The burst suggests password guessing or credential reuse.' },
      { id: 'location', label: 'Location and device', detail: 'The successful session came from a new browser fingerprint in another region.', clue: 'The session does not match the user’s known context.' },
      { id: 'mfa', label: 'MFA record', detail: 'An MFA approval was recorded, but the user says they did not approve a prompt.', clue: 'An unrequested approval may indicate prompt abuse.' }
    ],
    questions: [
      { id: 'login-triage', prompt: 'What is the strongest initial conclusion?', kind: 'investigation', options: [{ label: 'Likely account takeover', explanation: 'Failed attempts, a new device, and an unapproved MFA event together indicate compromise risk.' }, { label: 'Normal travel activity', explanation: 'The user is present at the normal office and denies the sign-in.' }, { label: 'A harmless browser update', explanation: 'A browser update does not explain the authentication burst or MFA record.' }], correctIndex: 0 },
      { id: 'login-containment', prompt: 'Which defensive action should happen first?', kind: 'decision', options: [{ label: 'Ignore the alert until tomorrow', explanation: 'Delay gives an unauthorized session more time.' }, { label: 'Revoke sessions, reset credentials, and investigate the device', explanation: 'Revoking access and rotating credentials contains the active risk.' }, { label: 'Ask the user to approve another prompt', explanation: 'Additional prompts can worsen prompt fatigue abuse.' }], correctIndex: 1 }
    ]
  },
  {
    id: 'malware-alert',
    title: 'Unexpected Script Alert',
    type: 'Malware alert investigation',
    difficulty: 'Intermediate',
    summary: 'An endpoint alert reports a suspicious script launched from a downloaded archive.',
    incident: 'A workstation opened an archive attached to an unexpected message. Endpoint protection blocked a script, but the user reports that a command window appeared briefly.',
    evidence: [
      { id: 'archive', label: 'File origin', detail: 'The archive was downloaded from an unknown sender and named “Q4-report.zip”.', clue: 'Unexpected archives are a common malware delivery method.' },
      { id: 'process', label: 'Process chain', detail: 'A document spawned a script interpreter from the user’s downloads folder.', clue: 'Office documents rarely need to launch script interpreters.' },
      { id: 'alert', label: 'Endpoint alert', detail: 'The security agent blocked the script and isolated the file, but a scan is still pending.', clue: 'Containment is active but the device still needs investigation.' }
    ],
    questions: [
      { id: 'malware-evidence', prompt: 'Which evidence most strongly supports malicious execution?', kind: 'investigation', options: [{ label: 'The quarterly filename', explanation: 'A filename alone is not proof of malicious activity.' }, { label: 'A document spawning a script interpreter', explanation: 'That process chain is abnormal and supports the alert.' }, { label: 'The user working from home', explanation: 'Location does not establish whether code is malicious.' }], correctIndex: 1 },
      { id: 'malware-response', prompt: 'What is the safest response?', kind: 'decision', options: [{ label: 'Reconnect the device to test it', explanation: 'Reconnect can allow persistence or spread.' }, { label: 'Delete the alert and continue working', explanation: 'Deleting evidence prevents proper investigation.' }, { label: 'Keep the device isolated and escalate for analysis', explanation: 'Isolation preserves containment while the security team investigates.' }], correctIndex: 2 }
    ]
  },
  {
    id: 'data-privacy-incident',
    title: 'Shared Report Exposure',
    type: 'Data privacy incident',
    difficulty: 'Advanced',
    summary: 'A team report containing personal information was shared with the wrong audience.',
    incident: 'A project owner discovers that a cloud document link containing customer contact details was set to “anyone with the link” for several hours.',
    evidence: [
      { id: 'scope', label: 'Sharing scope', detail: 'The document was accessible without an organization account during the exposure window.', clue: 'Public-link access broadens the possible audience.' },
      { id: 'data', label: 'Data classification', detail: 'The report contains names, email addresses, and support case references.', clue: 'The data is personal and requires controlled access.' },
      { id: 'audit', label: 'Audit record', detail: 'The provider recorded two external views, but cannot identify whether the file was downloaded.', clue: 'The impact is uncertain and must be assessed conservatively.' }
    ],
    questions: [
      { id: 'privacy-impact', prompt: 'How should the exposure be handled initially?', kind: 'investigation', options: [{ label: 'Assume no impact because only two views were recorded', explanation: 'Recorded views do not prove that no copy was made.' }, { label: 'Contain access and preserve audit evidence for assessment', explanation: 'Restricting access and preserving evidence supports a reliable impact assessment.' }, { label: 'Delete the document immediately without recording details', explanation: 'Deletion can destroy evidence needed for response and notification decisions.' }], correctIndex: 1 },
      { id: 'privacy-action', prompt: 'What is the best defensive decision?', kind: 'decision', options: [{ label: 'Restrict the link, notify the privacy owner, and follow the incident process', explanation: 'This contains the exposure and activates the correct review path.' }, { label: 'Post the link internally to ask who viewed it', explanation: 'Wider sharing increases exposure.' }, { label: 'Ignore it because the data is not a password', explanation: 'Personal information can still cause harm and has handling requirements.' }], correctIndex: 0 }
    ]
  },
  {
    id: 'social-engineering',
    title: 'The Urgent Executive Request',
    type: 'Social engineering scenario',
    difficulty: 'Beginner',
    summary: 'A caller claiming to be an executive asks an employee to bypass approval steps.',
    incident: 'An employee receives a call from someone who knows the executive’s name and asks for a same-day purchase of gift cards. The caller insists that normal approval is impossible because the executive is in a meeting.',
    evidence: [
      { id: 'authority', label: 'Authority claim', detail: 'The caller uses a senior leader’s name but will not confirm through the company directory.', clue: 'Familiar names can be used to create false trust.' },
      { id: 'urgency', label: 'Pressure tactic', detail: 'The caller sets a short deadline and discourages consulting colleagues.', clue: 'Urgency and isolation are common manipulation tactics.' },
      { id: 'process', label: 'Approval process', detail: 'The purchase request bypasses the organization’s documented approval workflow.', clue: 'A request to bypass controls is a major warning sign.' }
    ],
    questions: [
      { id: 'social-signals', prompt: 'Which combination is most concerning?', kind: 'investigation', options: [{ label: 'A known name and a normal purchase', explanation: 'The request is not normal because it bypasses controls.' }, { label: 'Authority, urgency, and a request to bypass process', explanation: 'These are classic social engineering signals.' }, { label: 'A polite tone and a business topic', explanation: 'Tone and topic do not establish legitimacy.' }], correctIndex: 1 },
      { id: 'social-response', prompt: 'What should the employee do?', kind: 'decision', options: [{ label: 'Complete the request quickly', explanation: 'Speed is exactly the pressure tactic being used.' }, { label: 'Verify independently and follow the normal approval process', explanation: 'Independent verification defeats impersonation while preserving controls.' }, { label: 'Share the request publicly for advice', explanation: 'Public sharing may expose internal information.' }], correctIndex: 1 }
    ]
  }
];

export function getIncidentLabScenario(id: string) {
  return incidentLabScenarios.find((scenario) => scenario.id === id);
}

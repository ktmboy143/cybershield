import type { Request, Response } from 'express';

const MAX_MESSAGE_LENGTH = 5000;
const MAX_URL_LENGTH = 2048;

const phishingRules = [
  { title: 'Urgency language', description: 'The message uses pressure or a deadline to encourage immediate action.', pattern: /\b(urgent|immediately|act now|final notice|suspended|locked|expire|within \d+ hours?)\b/i },
  { title: 'Credential request', description: 'The message asks for a password, verification code, payment, or other sensitive information.', pattern: /\b(password|passcode|verification code|login|credit card|bank account|payment)\b/i },
  { title: 'Suspicious link', description: 'The message contains a link that should be verified before opening.', pattern: /\b(?:https?:\/\/|www\.)\S+/i }
];

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export function analyzePhishingMessage(req: Request, res: Response) {
  const message = normalizeText(req.body?.message);

  if (!message) {
    return res.status(400).json({ message: 'A message is required.' });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ message: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` });
  }

  const indicators = phishingRules.filter((rule) => rule.pattern.test(message)).map(({ title, description }) => ({ title, description }));
  const score = Math.min(100, indicators.length * 30 + (message.length > 180 ? 10 : 0));
  const riskLevel = score >= 60 ? 'High' : score >= 30 ? 'Medium' : 'Low';

  return res.json({
    score,
    riskLevel,
    indicators,
    recommendation: indicators.length
      ? 'Verify the sender through a trusted channel and do not submit credentials or payment details from the message.'
      : 'No common indicators were detected. Continue to verify unexpected requests before acting.'
  });
}

export function analyzeWebsite(req: Request, res: Response) {
  const input = normalizeText(req.body?.url);

  if (!input) {
    return res.status(400).json({ message: 'A website URL is required.' });
  }
  if (input.length > MAX_URL_LENGTH) {
    return res.status(400).json({ message: `URL must be ${MAX_URL_LENGTH} characters or fewer.` });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(input);
  } catch {
    return res.status(400).json({ message: 'Enter a valid URL, including https:// or http://.' });
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return res.status(400).json({ message: 'Only HTTP and HTTPS URLs can be reviewed.' });
  }

  const checks = [
    {
      name: 'HTTPS',
      status: parsedUrl.protocol === 'https:' ? 'PASS' : 'WARNING',
      detail: parsedUrl.protocol === 'https:' ? 'The URL uses encrypted HTTPS transport.' : 'The URL uses HTTP and should be upgraded to HTTPS.'
    },
    { name: 'HSTS', status: 'NOT_CHECKED', detail: 'Response headers are not fetched; verify Strict-Transport-Security on an authorized system.' },
    { name: 'Content Security Policy', status: 'NOT_CHECKED', detail: 'Response headers are not fetched; verify Content-Security-Policy on an authorized system.' },
    { name: 'X-Content-Type-Options', status: 'NOT_CHECKED', detail: 'Response headers are not fetched; verify X-Content-Type-Options on an authorized system.' },
    { name: 'Referrer-Policy', status: 'NOT_CHECKED', detail: 'Response headers are not fetched; verify Referrer-Policy on an authorized system.' }
  ];

  return res.json({
    url: parsedUrl.toString(),
    hostname: parsedUrl.hostname,
    checks,
    note: 'This is a safe URL and configuration review. The service does not fetch or scan the target website.'
  });
}

export interface DynamicItem {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

const DYNAMIC_MOCK_TITLES = [
  'Task Completed Successfully',
  'Server Cache Flushed',
  'New Device Registered',
  'API Rate Limit Warning',
  'Database Backed Up',
  'Payment Method Expiring',
  'New Message Received',
];

const DYNAMIC_MOCK_EMOJIS = ['🚀', '⚡', '💻', '⚠️', '💾', '💳', '💬'];

const DYNAMIC_MOCK_DESCS = [
  'Process ended with code 0 in 143ms.',
  'Cleared 2,400 keys across all cache stores.',
  'A Mac device authenticated from London, UK.',
  'You have reached 80% of your hourly request allowance.',
  'Snapshot size: 1.2 GB stored in US-East S3.',
  'Update billing settings to avoid disruption.',
  'John sent: "See you at the sync tomorrow!"',
];

export const generateRandomItem = (): DynamicItem => {
  const index = Math.floor(Math.random() * DYNAMIC_MOCK_TITLES.length);
  return {
    id: Math.random().toString(36).substring(7),
    title: DYNAMIC_MOCK_TITLES[index],
    emoji: DYNAMIC_MOCK_EMOJIS[index],
    description: DYNAMIC_MOCK_DESCS[index],
  };
};

export const validateVerificationCode = (code: string): boolean => {
  return /^\d{4}$/.test(code.trim());
};

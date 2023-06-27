import crypto from 'crypto';

export const generateRandomUUID = () => {
  const uuidBytes = crypto.randomBytes(12);
  const uuid = uuidBytes.toString('hex').toUpperCase();
  return uuid;
};

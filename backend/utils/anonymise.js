const crypto = require('crypto');

/**
 * Remove PII from user/student objects
 * @param {Object} userObj 
 */
const stripPII = (userObj) => {
  const { uid, name, email, ...safeFields } = userObj;
  return safeFields;
};

/**
 * Generate a deterministic hash of the UID
 * @param {string} uid 
 */
const generatePseudoId = (uid) => {
  return crypto
    .createHash('sha256')
    .update(uid)
    .digest('hex')
    .substring(0, 12);
};

module.exports = { stripPII, generatePseudoId };

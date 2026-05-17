/**
 * MindFlow Burnout Scoring Engine
 * Calculates burnout risk score 0-100 from check-in data.
 * Runs entirely client-side — no API dependency for demo.
 */

const WEIGHTS = {
  mood: 0.30,
  sleep: 0.25,
  workload: 0.25,
  stress: 0.20,
};

/**
 * @param {Object} checkin
 * @param {number} checkin.mood       1-10 (10 = best)        -> Maps to backend 'moodScore'
 * @param {number} checkin.sleep      hours (0-12)            -> Maps to backend 'sleepHours'
 * @param {number} checkin.workload   1-10 (10 = overwhelming) -> Maps to backend 'workloadRating'
 * @param {number} checkin.stress     1-10 (10 = extreme)      -> Maps to backend 'stressLevel'
 * @returns {{ score: number, level: string, color: string, advice: string[] }}
 *
 * NOTE ON SCHEMA UNIFICATION:
 * Frontend local check-in inputs use short names (mood, sleep, workload, stress) to compute real-time
 * gauge outputs on the UI check-in screen. When submitting, CheckIn.jsx maps these properties to the
 * persistent backend variables:
 * - mood     -> moodScore
 * - sleep    -> sleepHours
 * - workload -> workloadRating
 * - stress   -> stressLevel
 * This matches the schema calculated by the backend Scoring engine (scoring.js).
 */
export function calculateBurnoutScore({ mood = 5, sleep = 7, workload = 5, stress = 5 }) {
  // Normalise each dimension to 0-100 risk contribution
  const moodRisk     = ((10 - mood) / 9) * 100;
  const sleepRisk    = Math.max(0, ((8 - sleep) / 8) * 100);
  const workloadRisk = ((workload - 1) / 9) * 100;
  const stressRisk   = ((stress - 1) / 9) * 100;

  const raw =
    moodRisk     * WEIGHTS.mood     +
    sleepRisk    * WEIGHTS.sleep    +
    workloadRisk * WEIGHTS.workload +
    stressRisk   * WEIGHTS.stress;

  const score = Math.round(Math.min(100, Math.max(0, raw)));

  let level, color, advice;

  if (score <= 30) {
    level = 'Thriving';
    color = '#34d399'; // green
    advice = [
      'Keep up the excellent sleep routine.',
      'Your mood trend is positive — share positivity.',
      'Consider a light mindfulness session today.',
    ];
  } else if (score <= 55) {
    level = 'Balanced';
    color = '#38bdf8'; // calm blue
    advice = [
      'Schedule short breaks between study blocks.',
      'Hydrate and step outside for 10 minutes.',
      'Your workload is manageable — stay consistent.',
    ];
  } else if (score <= 75) {
    level = 'At Risk';
    color = '#fbbf24'; // amber
    advice = [
      'Prioritise 7-8 hours of sleep tonight.',
      'Break large tasks into 25-minute sprints.',
      'Consider talking to a peer or counselor.',
    ];
  } else {
    level = 'Critical';
    color = '#f87171'; // red
    advice = [
      'Please reach out to a counselor today.',
      'Block all non-essential tasks for 24 hours.',
      'Practice 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.',
    ];
  }

  return { score, level, color, advice };
}

/** Generate mock burnout history for the past 14 days */
export function generateMockHistory(baseScore = 55) {
  return Array.from({ length: 14 }, (_, i) => {
    const offset = Math.sin(i * 0.8) * 15 + (Math.random() - 0.5) * 10;
    const score = Math.round(Math.min(100, Math.max(5, baseScore + offset)));
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return { date: date.toISOString().split('T')[0], score };
  });
}

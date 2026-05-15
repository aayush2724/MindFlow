# MindFlow Backend

AI-driven student mental health platform backend.

## Local Setup

1. **Clone and Install**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**:
   - Copy `.env.example` to `.env`.
   - Fill in your Firebase and AI API credentials.

3. **Firebase Setup**:
   - Go to [Firebase Console](https://console.firebase.google.com/).
   - Project Settings > Service Accounts.
   - Generate a new private key and paste the fields into `.env`.

4. **Run the Server**:
   ```bash
   npm run dev
   ```

## API Modules

- **/users**: Profile and onboarding.
- **/checkins**: Daily mood and wellness tracking.
- **/burnout**: Real-time burnout risk analysis.
- **/alerts**: Critical intervention system (Counselor access).
- **/calendar**: Google Calendar sync & recovery break generation.
- **/analytics**: Institutional health trends (Anonymised).
- **/insights**: AI-powered personalized recommendations.

## Development & Mocking

If you don't have access to the Gemini or Google Calendar APIs, you can set `MOCK_MODE=true` in your `.env` to return simulated data (Note: Implementation of mock mode is pending in current controllers).

## Deployment

### Docker
```bash
docker build -t mindflow-backend .
docker run -p 5000:5000 mindflow-backend
```

### Render / Railway
This repository includes `render.yaml` for automatic deployment. Connect your GitHub repo to Render and it will auto-detect the configuration.

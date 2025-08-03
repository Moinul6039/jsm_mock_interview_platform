# PrepWise - AI-Powered Mock Interview Platform

An AI-powered platform for preparing for mock interviews with instant feedback and scoring.

## Features

- 🔐 **Authentication**: Firebase Auth with email/password
- 🎯 **Interview Types**: Frontend, Backend, Full Stack interviews
- 🤖 **AI Feedback**: Instant scoring and detailed feedback
- 📊 **Progress Tracking**: View your interview history and scores
- 🎨 **Modern UI**: Beautiful dark theme with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, CSS-in-JS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **UI Components**: Radix UI, Lucide React
- **Forms**: React Hook Form, Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jsm_mock_interview_platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**

   Create a Firebase project and get your configuration:
   
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your Firebase config

4. **Configure Firebase**

   **Option A: Service Account File (Recommended for Production)**
   
   Download your Firebase service account key:
   - Go to Project Settings > Service Accounts
   - Generate new private key
   - Save as `prepwise-b924a-firebase-adminsdk-fbsvc-6501c7b8a5.json` in the root directory

   **Option B: Environment Variables (Development)**
   
   Create a `.env.local` file:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY_ID=your-private-key-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=your-client-id
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxx%40your-project.iam.gserviceaccount.com
   ```

5. **Update Firebase Client Config**

   Update `firebase/client.ts` with your Firebase config:
   ```typescript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
jsm_mock_interview_platform/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (root)/            # Main app routes
│   ├── interview/         # Interview pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── firebase/             # Firebase configuration
├── lib/                  # Utilities and actions
├── constants/            # Constants and types
└── public/              # Static assets
```

## Recent Fixes

The following issues have been resolved:

1. **Missing Type Definitions**: Added `InterviewCardProps`, `TechIconProps`, and `Feedback` interfaces
2. **Missing Functions**: Created `getFeedbackByInterviewId` and other general actions
3. **Missing Routes**: Added interview pages (`/interview`, `/interview/[id]`, `/interview/[id]/feedback`)
4. **Firebase Admin**: Improved error handling for missing service account file
5. **Component Props**: Fixed InterviewCard component to use correct props

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env.local` file for development:

```env
# Firebase Admin SDK (for development)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxx%40your-project.iam.gserviceaccount.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

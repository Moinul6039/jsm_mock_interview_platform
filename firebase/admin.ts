import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { join } from "path";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    try {
      // Try to read the service account file
      const serviceAccountPath = join(process.cwd(), 'prepwise-b924a-firebase-adminsdk-fbsvc-6501c7b8a5.json');
      
      if (process.env.NODE_ENV === 'development') {
        // In development, try to use environment variables if service account file doesn't exist
        const serviceAccount = {
          type: "service_account",
          project_id: process.env.FIREBASE_PROJECT_ID || "prepwise-b924a",
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
          universe_domain: "googleapis.com"
        };
        
        initializeApp({
          credential: cert(serviceAccount as any),
        });
      } else {
        // In production, require the service account file
        const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
        
        initializeApp({
          credential: cert(serviceAccount),
        });
      }
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error);
      // In development, create a mock implementation
      if (process.env.NODE_ENV === 'development') {
        console.warn("Using mock Firebase Admin SDK for development");
        initializeApp({
          credential: cert({
            projectId: "prepwise-b924a",
            clientEmail: "mock@example.com",
            privateKey: "-----BEGIN PRIVATE KEY-----\nMOCK_KEY\n-----END PRIVATE KEY-----\n"
          }),
        });
      } else {
        throw error;
      }
    }
  }

  return {
    auth: getAuth(),
    db: getFirestore()
  };
}

export const { auth, db } = initFirebaseAdmin();

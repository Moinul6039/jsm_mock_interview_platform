"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { User, SignUpParams, SignInParams } from "@/constants";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    console.log("Signing up user:", { uid, name, email });
    
    // check if user exists in db
    const userRecord = await db.collection("users").doc(uid).get();
    console.log("User already exists in DB:", userRecord.exists);
    
    if (userRecord.exists)
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };

    // save user to db
    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
      // profileURL,
      // resumeURL,
    });
    
    console.log("User saved to database successfully");

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Handle Firebase specific errors
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    console.log("Signing in user with email:", email);
    
    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    console.log("Token verified, UID:", decodedToken.uid);
    
    // Get user from database
    const userRecord = await db.collection("users").doc(decodedToken.uid).get();
    console.log("User record exists:", userRecord.exists);
    
    if (!userRecord.exists) {
      console.log("User not found in database, creating user record");
      
      // Create user record if it doesn't exist (for users who signed up but record wasn't saved)
      try {
        await db.collection("users").doc(decodedToken.uid).set({
          email: decodedToken.email || email,
          name: decodedToken.name || "User",
          createdAt: new Date().toISOString(),
        });
        console.log("User record created successfully");
      } catch (createError) {
        console.error("Error creating user record:", createError);
        return {
          success: false,
          message: "Failed to create user record. Please try again.",
        };
      }
    }

    await setSessionCookie(idToken);
    console.log("Session cookie set successfully");
    
    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error: unknown) {
    console.error("Error signing in:", error);
    
    // More specific error handling
    if (error && typeof error === 'object' && 'code' in error) {
      const errorCode = (error as { code: string }).code;
      console.error("Firebase error code:", errorCode);
      
      if (errorCode === 'auth/id-token-expired') {
        return {
          success: false,
          message: "Session expired. Please sign in again.",
        };
      }
      
      if (errorCode === 'auth/id-token-revoked') {
        return {
          success: false,
          message: "Session revoked. Please sign in again.",
        };
      }
    }

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
  
  return {
    success: true,
    message: "Signed out successfully.",
  };
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

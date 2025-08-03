"use server";

import { db } from "@/firebase/admin";
import { Feedback } from "@/constants";

export async function getFeedbackByInterviewId({
  interviewId,
  userId,
}: {
  interviewId: string;
  userId: string;
}): Promise<Feedback | null> {
  try {
    const feedbackDoc = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (feedbackDoc.empty) {
      return null;
    }

    const feedbackData = feedbackDoc.docs[0].data();
    return {
      id: feedbackDoc.docs[0].id,
      ...feedbackData,
    } as Feedback;
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
}

export async function createInterview({
  userId,
  role,
  type,
  techstack,
  level,
}: {
  userId: string;
  role: string;
  type: string;
  techstack: string[];
  level: string;
}) {
  try {
    const interviewData = {
      userId,
      role,
      type,
      techstack,
      level,
      questions: [],
      finalized: false,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("interviews").add(interviewData);
    
    return {
      success: true,
      interviewId: docRef.id,
      message: "Interview created successfully",
    };
  } catch (error) {
    console.error("Error creating interview:", error);
    return {
      success: false,
      message: "Failed to create interview",
    };
  }
}

export async function saveFeedback(feedback: Omit<Feedback, "id" | "createdAt">) {
  try {
    const feedbackData = {
      ...feedback,
      createdAt: new Date().toISOString(),
    };

    await db.collection("feedback").add(feedbackData);
    
    return {
      success: true,
      message: "Feedback saved successfully",
    };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return {
      success: false,
      message: "Failed to save feedback",
    };
  }
} 
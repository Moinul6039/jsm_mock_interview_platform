import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FeedbackPageProps {
  params: {
    id: string
  }
}

const FeedbackPage = ({ params }: FeedbackPageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = params

  // Mock feedback data
  const mockFeedback = {
    totalScore: 85,
    categoryScores: [
      {
        name: "Communication Skills",
        score: 90,
        comment: "Excellent communication skills. Clear and concise responses."
      },
      {
        name: "Technical Knowledge",
        score: 85,
        comment: "Strong technical foundation with good understanding of concepts."
      },
      {
        name: "Problem Solving",
        score: 80,
        comment: "Good problem-solving approach with room for improvement."
      },
      {
        name: "Cultural Fit",
        score: 88,
        comment: "Great cultural alignment and team collaboration skills."
      },
      {
        name: "Confidence and Clarity",
        score: 82,
        comment: "Confident presentation with clear articulation."
      }
    ],
    strengths: [
      "Strong technical knowledge",
      "Clear communication",
      "Good problem-solving approach",
      "Professional demeanor"
    ],
    areasForImprovement: [
      "Could provide more specific examples",
      "Consider edge cases more thoroughly",
      "Practice more complex scenarios"
    ],
    finalAssessment: "Overall strong performance with excellent technical skills and communication. Shows good potential for the role with some areas for continued growth."
  }

  return (
    <div className="root-layout">
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="btn-secondary" asChild>
            <Link href="/interview">← Back to Interviews</Link>
          </Button>
          <h2>Interview Feedback</h2>
        </div>
        
        <div className="card-border w-full">
          <div className="card p-8">
            <div className="flex flex-col gap-8">
              {/* Score Overview */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-100">
                    {mockFeedback.totalScore}/100
                  </div>
                  <div className="text-light-100">Total Score</div>
                </div>
                <div className="flex-1">
                  <div className="progress">
                    <div 
                      className="bg-success-100 h-full rounded-full"
                      style={{ width: `${mockFeedback.totalScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Category Scores */}
              <div className="space-y-4">
                <h3>Category Breakdown</h3>
                {mockFeedback.categoryScores.map((category, index) => (
                  <div key={index} className="bg-dark-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{category.name}</span>
                      <span className="text-primary-100 font-bold">{category.score}/100</span>
                    </div>
                    <div className="progress mb-2">
                      <div 
                        className="bg-primary-200 h-full rounded-full"
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                    <p className="text-light-100 text-sm">{category.comment}</p>
                  </div>
                ))}
              </div>

              {/* Strengths */}
              <div>
                <h3 className="mb-4">Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {mockFeedback.strengths.map((strength, index) => (
                    <span key={index} className="bg-success-100/20 text-success-100 px-3 py-1 rounded-full text-sm">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div>
                <h3 className="mb-4">Areas for Improvement</h3>
                <div className="flex flex-wrap gap-2">
                  {mockFeedback.areasForImprovement.map((area, index) => (
                    <span key={index} className="bg-destructive-100/20 text-destructive-100 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Final Assessment */}
              <div className="bg-dark-200 rounded-lg p-4">
                <h3 className="mb-2">Final Assessment</h3>
                <p className="text-light-100">{mockFeedback.finalAssessment}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="btn-primary">
                  Retake Interview
                </Button>
                <Button variant="outline" className="btn-secondary">
                  Download Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FeedbackPage 
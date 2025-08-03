import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface InterviewPageProps {
  params: {
    id: string
  }
}

const InterviewPage = ({ params }: InterviewPageProps) => {
  const { id } = params

  // Mock interview data based on ID
  const getInterviewData = (id: string) => {
    const interviews = {
      frontend: {
        title: 'Frontend Developer Interview',
        description: 'React, TypeScript, Next.js, Tailwind CSS',
        questions: [
          'What is React and why would you use it?',
          'Explain the difference between props and state',
          'What is JSX?',
          'How do you handle component lifecycle in React?',
          'What are hooks and how do you use them?'
        ]
      },
      backend: {
        title: 'Backend Developer Interview',
        description: 'Node.js, Express, MongoDB, REST APIs',
        questions: [
          'What is Node.js and what are its advantages?',
          'Explain the event loop in Node.js',
          'How do you handle authentication in Express?',
          'What is middleware and how do you use it?',
          'How do you structure a REST API?'
        ]
      },
      fullstack: {
        title: 'Full Stack Developer Interview',
        description: 'Complete web development stack',
        questions: [
          'How do you handle state management in a full-stack app?',
          'Explain the client-server architecture',
          'How do you handle CORS?',
          'What is the difference between SQL and NoSQL?',
          'How do you deploy a full-stack application?'
        ]
      }
    }
    return interviews[id as keyof typeof interviews] || interviews.frontend
  }

  const interviewData = getInterviewData(id)

  return (
    <div className="root-layout">
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="btn-secondary">
            ← Back to Interviews
          </Button>
          <h2>{interviewData.title}</h2>
        </div>
        
        <div className="card-border w-full">
          <div className="card p-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/robot.png"
                  alt="AI Interviewer"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-primary-100">AI Interviewer</h3>
                  <p className="text-light-100">Ready to start your interview</p>
                </div>
              </div>
              
              <div className="bg-dark-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Interview Questions</h4>
                <div className="space-y-3">
                  {interviewData.questions.map((question, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="bg-primary-200 text-dark-100 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-light-100">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button className="btn-primary">
                  Start Interview
                </Button>
                <Button variant="outline" className="btn-secondary">
                  Practice Mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default InterviewPage 
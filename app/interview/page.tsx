import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const InterviewPage = () => {
  const interviewTypes = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      description: 'React, TypeScript, Next.js, Tailwind CSS',
      techstack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      level: 'Junior',
      type: 'Technical'
    },
    {
      id: 'backend',
      title: 'Backend Developer',
      description: 'Node.js, Express, MongoDB, REST APIs',
      techstack: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
      level: 'Senior',
      type: 'Technical'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Developer',
      description: 'Complete web development stack',
      techstack: ['React', 'Node.js', 'Express', 'MongoDB'],
      level: 'Mid-level',
      type: 'Mixed'
    }
  ]

  return (
    <div className="root-layout">
      <section className="flex flex-col gap-6">
        <h2>Choose Your Interview Type</h2>
        <div className="interviews-section">
          {interviewTypes.map((interview) => (
            <div key={interview.id} className="card-border w-[360px] max-sm:w-full min-h-96">
              <div className="card-interview">
                <div>
                  <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                    <p className="badge-text">{interview.type}</p>
                  </div>
                  
                  <Image
                    src="/tech.svg"
                    alt="tech-icon"
                    width={90}
                    height={90}
                    className="rounded-full object-fit size-[90px]"
                  />
                  
                  <h3 className="mt-5 capitalize">{interview.title}</h3>
                  
                  <p className="mt-3 text-light-100">{interview.description}</p>
                  
                  <div className="flex flex-row gap-2 mt-5">
                    {interview.techstack.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-dark-300 rounded-full px-3 py-1 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-row justify-between">
                  <span className="text-light-100">{interview.level}</span>
                  <Button className="btn-primary">
                    <Link href={`/interview/${interview.id}`}>
                      Start Interview
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default InterviewPage 
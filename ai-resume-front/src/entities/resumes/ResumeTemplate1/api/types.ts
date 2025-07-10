type ProfessionalExperience = {
    name: string
    role: string
    description: string
    startWork: string
    endWork: string
    achievements: string[]
    responsibilities: string[]
}

type EducationBlock = {
  name: string
  faculty: string
  speciality: string
  endYear: string
  level: 'bachelor' | 'master' | 'doctor' | 'specialist'
}

type ResumeData = {
  name: string
  // surname: string
  role: string
  experience: string
  education: string
  location: string
  email: string
  phoneNumber: string
  summary: string
  skills: string[]
  professionalPath: ProfessionalExperience[]
  educationDetails: EducationBlock[]
};

export type {
    ResumeData,
    ProfessionalExperience,
    EducationBlock,
}
export type ID = string

export type Resume = {
    id: ID
    title: string
    description: string

    city: string
    country: string

    firstName: string
    lastName: string

    phone: string
    email: string

    htmlContent: string
}

export type ResumeShort = {
    id: ID
    title: string
    preview: string | null
    updatedAt: string
    hasHtmlContent: boolean
}
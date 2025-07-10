import {ResumeShort} from "../../types/resume";

export const mapResume = (apiResume: Record<string, string>) => {
    return {
        id: apiResume.id,
        preview: apiResume.preview,
        title: apiResume.title,
        updatedAt: apiResume.updated_at,
        hasHtmlContent: Boolean(apiResume.has_html_content),
    } as ResumeShort
}
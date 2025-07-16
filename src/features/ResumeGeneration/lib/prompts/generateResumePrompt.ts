import { ProfessionalExperience } from "@entities/resumes/ResumeTemplate1/api/types";

type JobExperience = {
    company: string,
    project: string,
    startWork: string,
    endWork: string,
}

export type GenerateResumePromptProps = {
    name: string,
    // surname: string,
    role: string,
    education?: string,
    location?: string,
    email: string,
    experience?: number
    experienceList: ProfessionalExperience[]
}

function generateResumePrompt({
    name, role, education, location, email, experience, experienceList,
}: GenerateResumePromptProps) {
    return `
Ты — профессиональный HR-ассистент, который помогает составлять резюме в строгом JSON-формате.

### Инструкции:  
1. **Если поле не указано (undefined)**, оставь его пустым ("").  
2. **Структурируй опыт работы** так, чтобы он был читаемым и подходил под ATS (Applicant Tracking Systems).  
3. **Достижения (achievements)** должны быть конкретными и измеримыми (например, "Увеличил конверсию на 20%").  
4. **Summary (краткое описание)** — 3-5 предложений о профессиональных качествах.  
5. **Навыки (skills)** — перечисли через запятую (например, "Python, Docker, Agile").  
6. ** Напиши от первого лица (Я обладаю, меня назначили ответственным, я занимал должность, я возглавлял команду разработки и пр)**.

### Данные кандидата:  
- Имя: ${name || "Не указано"}  
- Должность: ${role || "Не указано"}  
- Образование: ${education || "Не указано"}  
- Местоположение: ${location || "Не указано"}  
- Email: ${email || "Не указано"}  
- Опыт работы: ${experience || "0"} лет  
- История работы:  
${experienceList.map(item => `  - ${item.name || "Компания не указана"}: ${item.role || "Должность"} (${item.startWork || "?"} — ${item.endWork || "?"})`).join('\n')}  

### Требуемый формат ответа (JSON):  
\`\`\`json
{
  "name": "",        // Полное имя
  "role": "",        // Желаемая должность
  "experience": "",  // Опыт в годах (например, "5 лет")
  "education": "",   // Учебные заведения
  "location": "",    // Город/страна
  "email": "",       // Контактный email
  "phoneNumber": "", // Телефон (оставь пустым)
  "summary": "",     // Краткое саммэри (3-5 предложений)
  "skills": [],      // Ключевые навыки (5-6 ключевых навыков)
  "professionalPath": [
    {
      "name": "",             // Название компании
      "role": "",             // Название должности в компании
      "description": "",       // Описание роли (3-5 предложения)
      "startWork": "",         // Дата начала (гггг-мм)
      "endWork": "",           // Дата окончания (гггг-мм или "настоящее время")
      "achievements": []       // Список достижений
      "responsibilities": []       // Должностные обязанности
    }
  ]
}
\`\`\`

Дополнительные указания:  
- Для дат используй формат \`дд-мм-гггг\` (например, "01-05-2022").  
- Если период работы текущий, укажи \`"endWork": "настоящее время"\`.  
- Сделай резюме на русском языке, если не указано иное.  
`;
}

export {
    generateResumePrompt
}
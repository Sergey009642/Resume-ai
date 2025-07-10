import OpenAI from "openai";
import { generateResumePrompt, GenerateResumePromptProps } from "../prompts/generateResumePrompt";
import { useState } from "react";
import { notification } from "antd";

function useResumeGeneration() {
  const [api, contextHolder] = notification.useNotification();
  const [resumeGenerateLoading, setGenerateResumeLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Только для фронтенда (небезопасно!)
  });

  async function getAIResponse(prompt: string) {
    setGenerateResumeLoading(true);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });

      setGenerateResumeLoading(false);
      return response.choices[0]?.message?.content;
    } catch (error) {
      console.log(error, 'error');
      api.error({
        message: "Произошла ошибка генерации Резюме",
        description: (error as { message: string }).message
      })
      console.error("Ошибка OpenAI:", error);
      setGenerateResumeLoading(false);
      return null;
    }
  }


  return {
    contextHolder,
    resumeGenerateLoading,
    generateResume: (value: GenerateResumePromptProps) => getAIResponse(generateResumePrompt(value))
  }
}

export {
  useResumeGeneration
}
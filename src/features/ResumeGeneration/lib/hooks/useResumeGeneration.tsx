import { useState } from "react";
import { notification } from "antd";
import { generateResumePrompt, GenerateResumePromptProps } from "../prompts/generateResumePrompt";

function useResumeGeneration() {
  const [api, contextHolder] = notification.useNotification();
  const [resumeGenerateLoading, setGenerateResumeLoading] = useState(false);

  async function getAIResponse(prompt: string) {
    setGenerateResumeLoading(true);
    try {
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setGenerateResumeLoading(false);
      return data.result;
    } catch (error) {
      setGenerateResumeLoading(false);
      console.error("API Error:", error);
      api.error({
        message: "Error generating resume",
        description: (error as { message: string }).message || "Unknown error",
      });
      return null;
    }
  }

  return {
    contextHolder,
    resumeGenerateLoading,
    generateResume: (value: GenerateResumePromptProps) => getAIResponse(generateResumePrompt(value)),
  };
}

export { useResumeGeneration };

function extractJsonFromMarkdown(markdownText: string): any | null {
  try {
    // Удаляем все до ```json и после ```, затем парсим JSON
    const jsonMatch = markdownText.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) throw new Error("JSON не найден в тексте");

    const jsonString = jsonMatch[1].trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Ошибка при извлечении JSON:", error);
    return null;
  }
}

export {
    extractJsonFromMarkdown
};
"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateRecipeByMood(mood: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Ты - шеф-повар и психолог. Создай рецепт блюда, которое идеально подходит для настроения: "${mood}".
      
      Верни ответ в формате JSON:
      {
        "name": "Название блюда",
        "description": "Описание того, почему это блюдо подходит для данного настроения",
        "ingredients": ["список", "ингредиентов"],
        "instructions": ["пошаговые", "инструкции"],
        "cookTime": "время приготовления",
        "servings": количество_порций,
        "difficulty": "Легко/Средне/Сложно",
        "moodExplanation": "Объяснение связи блюда с настроением"
      }
      
      Учитывай психологию еды и то, как разные вкусы и текстуры влияют на эмоции.`,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating recipe:", error)
    return null
  }
}

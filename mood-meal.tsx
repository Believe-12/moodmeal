"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Clock, Users, ChefHat } from "lucide-react"

interface Mood {
  id: string
  name: string
  emoji: string
  color: string
  description: string
}

interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string[]
  instructions: string[]
  cookTime: string
  servings: number
  difficulty: "Легко" | "Средне" | "Сложно"
  mood: string
  image: string
}

const moods: Mood[] = [
  {
    id: "happy",
    name: "Весёлый",
    emoji: "😄",
    color: "bg-yellow-400",
    description: "Яркие и красочные блюда",
  },
  {
    id: "tired",
    name: "Уставший",
    emoji: "😴",
    color: "bg-blue-400",
    description: "Простые питательные блюда",
  },
  {
    id: "angry",
    name: "Злой",
    emoji: "😠",
    color: "bg-red-400",
    description: "Острые и пряные блюда",
  },
  {
    id: "sad",
    name: "Грустный",
    emoji: "😢",
    color: "bg-purple-400",
    description: "Утешающие блюда для души",
  },
  {
    id: "excited",
    name: "Заряженный",
    emoji: "🤩",
    color: "bg-pink-400",
    description: "Экзотические блюда",
  },
  {
    id: "calm",
    name: "Спокойный",
    emoji: "😌",
    color: "bg-green-400",
    description: "Лёгкие здоровые блюда",
  },
  {
    id: "romantic",
    name: "Романтичный",
    emoji: "😍",
    color: "bg-rose-400",
    description: "Изысканные блюда для двоих",
  },
  {
    id: "adventurous",
    name: "Авантюрный",
    emoji: "🤠",
    color: "bg-orange-400",
    description: "Необычные эксперименты",
  },
  {
    id: "nostalgic",
    name: "Ностальгичный",
    emoji: "🥺",
    color: "bg-amber-400",
    description: "Блюда из детства",
  },
  {
    id: "energetic",
    name: "Энергичный",
    emoji: "⚡",
    color: "bg-lime-400",
    description: "Заряжающие энергией блюда",
  },
  {
    id: "cozy",
    name: "Уютный",
    emoji: "🏠",
    color: "bg-teal-400",
    description: "Домашние согревающие блюда",
  },
  {
    id: "creative",
    name: "Творческий",
    emoji: "🎨",
    color: "bg-indigo-400",
    description: "Креативные и необычные блюда",
  },
]

const predefinedRecipes: Recipe[] = [
  {
    id: "1",
    name: "Радужный салат",
    description: "Яркий салат с разноцветными овощами и фруктами",
    ingredients: ["Помидоры черри", "Морковь", "Огурцы", "Болгарский перец", "Кукуруза", "Авокадо"],
    instructions: ["Нарежьте все овощи", "Смешайте в большой миске", "Заправьте оливковым маслом"],
    cookTime: "15 мин",
    servings: 2,
    difficulty: "Легко",
    mood: "happy",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Куриный суп",
    description: "Питательный суп для восстановления сил",
    ingredients: ["Куриная грудка", "Картофель", "Морковь", "Лук", "Лапша", "Зелень"],
    instructions: ["Отварите курицу", "Добавьте овощи", "Варите 30 минут", "Добавьте лапшу"],
    cookTime: "45 мин",
    servings: 4,
    difficulty: "Легко",
    mood: "tired",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Острая паста Арабьята",
    description: "Пряная паста с острым томатным соусом",
    ingredients: ["Паста пенне", "Томаты", "Чеснок", "Острый перец", "Оливковое масло", "Базилик"],
    instructions: ["Обжарьте чеснок и перец", "Добавьте томаты", "Смешайте с пастой", "Подавайте горячим"],
    cookTime: "25 мин",
    servings: 2,
    difficulty: "Средне",
    mood: "angry",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function MoodMeal() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null)
  const [customMood, setCustomMood] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)

  const generateRecipes = async (mood: Mood | string) => {
    setIsGenerating(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (typeof mood === "object") {
      // Show predefined recipes for selected mood
      const moodRecipes = predefinedRecipes.filter((recipe) => recipe.mood === mood.id)
      setRecipes(moodRecipes)
    } else {
      // For custom mood, generate mock recipes
      const mockRecipes: Recipe[] = [
        {
          id: Date.now().toString(),
          name: "Персонализированное блюдо",
          description: `Специальное блюдо, подобранное для настроения: ${mood}`,
          ingredients: ["Основной ингредиент", "Специи по вкусу", "Свежие травы", "Секретный компонент"],
          instructions: ["Подготовьте ингредиенты", "Готовьте с любовью", "Наслаждайтесь результатом"],
          cookTime: "30 мин",
          servings: 2,
          difficulty: "Средне",
          mood: "custom",
          image: "/placeholder.svg?height=200&width=300",
        },
      ]
      setRecipes(mockRecipes)
    }

    setIsGenerating(false)
  }

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood)
    setShowCustomInput(false)
    generateRecipes(mood)
  }

  const handleCustomMoodSubmit = () => {
    if (customMood.trim()) {
      setSelectedMood(null)
      generateRecipes(customMood)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="text-4xl">🍽️</div>
            <h1 className="text-4xl font-bold text-gray-800">MoodMeal</h1>
            <div className="text-4xl">✨</div>
          </div>
          <p className="text-center text-gray-500 mt-2 text-lg">Генератор еды по настроению</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Mood Selection */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Какое у вас настроение?</h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Выберите своё текущее настроение, и мы подберём идеальные блюда специально для вас
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {moods.map((mood) => (
              <Card
                key={mood.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 hover:shadow-xl ${
                  selectedMood?.id === mood.id
                    ? "ring-4 ring-blue-200 shadow-xl border-blue-300"
                    : "border-gray-100 hover:border-gray-200"
                }`}
                onClick={() => handleMoodSelect(mood)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">{mood.emoji}</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{mood.name}</h3>
                  <p className="text-sm text-gray-500">{mood.description}</p>
                  <div className={`w-full h-1 ${mood.color} rounded-full mt-3`}></div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-8 py-3"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Описать своё настроение
            </Button>

            {showCustomInput && (
              <div className="w-full max-w-md space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Textarea
                  placeholder="Опишите своё настроение подробнее..."
                  value={customMood}
                  onChange={(e) => setCustomMood(e.target.value)}
                  className="resize-none border-gray-200 focus:border-blue-400 focus:ring-blue-200"
                  rows={3}
                />
                <Button
                  onClick={handleCustomMoodSubmit}
                  disabled={!customMood.trim()}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Найти блюда
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <div className="text-center py-16">
            <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
            <p className="text-xl font-semibold text-gray-800 mb-2">Подбираем идеальные блюда...</p>
            <p className="text-gray-500">Анализируем ваше настроение</p>
          </div>
        )}

        {/* Recipes Display */}
        {recipes.length > 0 && !isGenerating && (
          <div className="space-y-8">
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Рецепты для настроения {selectedMood?.emoji}</h3>
              <p className="text-gray-600 text-lg">
                {selectedMood ? selectedMood.description : `Блюда для настроения: "${customMood}"`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-white text-gray-700 shadow-md">
                      {recipe.difficulty}
                    </Badge>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-xl">
                      <span className="text-gray-800">{recipe.name}</span>
                      <ChefHat className="w-6 h-6 text-blue-500" />
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">{recipe.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} порций</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800">Ингредиенты:</h4>
                      <ul className="space-y-2">
                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-600">{ingredient}</span>
                          </li>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <li className="text-gray-400 text-sm ml-5">
                            и ещё {recipe.ingredients.length - 3} ингредиента...
                          </li>
                        )}
                      </ul>
                    </div>

                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg">
                      Посмотреть рецепт полностью
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setRecipes([])
                  setSelectedMood(null)
                  setCustomMood("")
                  setShowCustomInput(false)
                }}
                className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-8 py-3"
              >
                Выбрать другое настроение
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {recipes.length === 0 && !isGenerating && !selectedMood && !showCustomInput && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🤔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Выберите своё настроение</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Мы подберём идеальные блюда, которые точно поднимут вам настроение!
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-500">Сделано с ❤️ для тех, кто любит готовить по настроению</p>
        </div>
      </footer>
    </div>
  )
}

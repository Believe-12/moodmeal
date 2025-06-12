"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Star, Heart, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  isNew?: boolean
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Шоколадный торт",
    description: "Нежный шоколадный бисквит с кремом из бельгийского шоколада",
    price: 2500,
    image: "/placeholder.svg?height=200&width=200",
    category: "Торты",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 2,
    name: "Ванильные кексы",
    description: "Воздушные кексы с ванильным кремом и ягодами",
    price: 450,
    image: "/placeholder.svg?height=200&width=200",
    category: "Кексы",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Яблочный пирог",
    description: "Домашний пирог с сочными яблоками и корицей",
    price: 800,
    image: "/placeholder.svg?height=200&width=200",
    category: "Пироги",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Красный бархат",
    description: "Классический торт Red Velvet с кремчизом",
    price: 2800,
    image: "/placeholder.svg?height=200&width=200",
    category: "Торты",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Лимонные маффины",
    description: "Свежие маффины с лимонной цедрой и глазурью",
    price: 350,
    image: "/placeholder.svg?height=200&width=200",
    category: "Кексы",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Вишневый пирог",
    description: "Слоеный пирог с сочной вишней и хрустящей корочкой",
    price: 900,
    image: "/placeholder.svg?height=200&width=200",
    category: "Пироги",
    rating: 4.7,
    isNew: true,
  },
]

const categories = ["Все", "Торты", "Кексы", "Пироги"]

export default function BakeryShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prevCart.filter((item) => item.id !== productId)
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧁</span>
              </div>
              <h1 className="text-2xl font-bold text-orange-800">Сладкий Рай</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Поиск выпечки..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Button variant="outline" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Корзина
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500">{getTotalItems()}</Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-amber-400 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Свежая выпечка каждый день!</h2>
          <p className="text-xl mb-8">Торты, кексы, пироги и многое другое из натуральных ингредиентов</p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
            Посмотреть каталог
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Новинка</Badge>}
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>

              <CardFooter className="flex items-center justify-between">
                <div className="text-2xl font-bold text-orange-600">{product.price.toLocaleString()} ₽</div>

                <div className="flex items-center space-x-2">
                  {cart.find((item) => item.id === product.id) ? (
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => removeFromCart(product.id)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold">{cart.find((item) => item.id === product.id)?.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => addToCart(product)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => addToCart(product)} className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="w-4 h-4 mr-2" />В корзину
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">Ваша корзина</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-orange-600">{getTotalPrice().toLocaleString()} ₽</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                Оформить заказ
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-orange-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Сладкий Рай</h3>
              <p className="text-orange-200">Лучшая выпечка в городе из натуральных ингредиентов</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <p className="text-orange-200">Телефон: +7 (999) 123-45-67</p>
              <p className="text-orange-200">Email: info@sweetparadise.ru</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Режим работы</h3>
              <p className="text-orange-200">Пн-Вс: 8:00 - 22:00</p>
              <p className="text-orange-200">Доставка: 9:00 - 21:00</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

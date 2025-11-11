"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { mockBlogPosts } from "@/lib/data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["all", "news", "tips", "market_update", "sustainability", "technology"]

  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      news: "bg-blue-100 text-blue-800",
      tips: "bg-green-100 text-green-800",
      market_update: "bg-yellow-100 text-yellow-800",
      sustainability: "bg-emerald-100 text-emerald-800",
      technology: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getCategoryLabel = (category: string) => {
    return category.replace("_", " ").charAt(0).toUpperCase() + category.replace("_", " ").slice(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-emerald-600 hover:text-emerald-700">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold text-emerald-900 mb-4">Agriculture News & Tips</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover the latest insights, market updates, and best practices for successful farming in Kenya
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-semibold text-gray-700 self-center">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-white text-emerald-600 border-2 border-emerald-200 hover:border-emerald-400"
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <p className="text-gray-600 mb-8">
          Showing <span className="font-bold text-emerald-700">{filteredPosts.length}</span> article
          {filteredPosts.length !== 1 ? "s" : ""}
        </p>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 flex flex-col"
              >
                {/* Blog Image */}
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = `/placeholder.svg?height=192&width=400&query=agriculture`
                    }}
                  />
                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                  {/* Category Badge */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}
                  >
                    {getCategoryLabel(post.category)}
                  </div>
                </div>

                {/* Blog Content */}
                <CardHeader className="pb-3 flex-grow">
                  <h3 className="font-bold text-lg text-emerald-900 hover:text-emerald-700 line-clamp-2">
                    {post.title}
                  </h3>
                </CardHeader>

                <CardContent className="space-y-3 flex flex-col flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-3 flex-grow">{post.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                    <div className="flex items-center gap-2">
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📖 {post.readTime} min</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/blog/${post.id}`} className="w-full">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2">Read Article</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No articles found matching your search.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

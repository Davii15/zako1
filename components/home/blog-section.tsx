"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockBlogPosts } from "@/lib/data"
import Link from "next/link"

export function BlogSection() {
  const featuredPosts = mockBlogPosts.slice(0, 3)

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

  return (
    <section className="py-16 bg-gradient-to-br from-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-900 mb-3">Agriculture News & Tips</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, market insights, and sustainable farming practices in Kenya
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow border-0">
              {/* Blog Image */}
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = `/placeholder.svg?height=192&width=400&query=agriculture`
                  }}
                />
                {/* Category Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}
                >
                  {post.category.replace("_", " ").toUpperCase()}
                </div>
              </div>

              {/* Blog Content */}
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg text-emerald-900 line-clamp-2 hover:text-emerald-700">{post.title}</h3>
              </CardHeader>

              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                  <div className="flex items-center gap-2">
                    <span>By {post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📖 {post.readTime} min read</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link href={`/blog/${post.id}`}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2">Read More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link href="/blog">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

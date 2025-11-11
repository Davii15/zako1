"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { mockBlogPosts } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { notFound } from "next/navigation"

export default function BlogPostPage() {
  const params = useParams()
  const postId = params.id as string

  const post = mockBlogPosts.find((p) => p.id === postId)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = mockBlogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2)

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 mb-4">
              ← Back to All Articles
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg h-96 bg-gradient-to-br from-emerald-400 to-teal-600">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=384&width=800&query=agriculture`
              }}
            />
          </div>

          {/* Article Header */}
          <div className="mb-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(post.category)}`}
              >
                {getCategoryLabel(post.category)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-emerald-900 mb-4">{post.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">By</span>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📖</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-700 italic border-l-4 border-emerald-500 pl-4">{post.excerpt}</p>
          </div>

          {/* Article Content */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                <p className="mb-6">{post.excerpt}</p>
                <p className="mb-6">
                  {post.content ||
                    `This is a comprehensive article about ${post.title.toLowerCase()}. 
                  The content provides detailed insights and practical information for farmers in Kenya. 
                  Whether you're just starting out or have years of experience, this guide covers important 
                  aspects of ${getCategoryLabel(post.category).toLowerCase()} that will help improve your farming operations.`}
                </p>
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">Key Takeaways</h3>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Learn best practices specific to Kenyan agricultural conditions</li>
                  <li>Discover proven techniques used by successful farmers</li>
                  <li>Understand market opportunities and sustainable practices</li>
                  <li>Implement innovative solutions for better yields</li>
                </ul>
                <p>
                  For more information and updates, stay tuned to our Agriculture News & Tips section. Connect with
                  other farmers and share your experiences in the FarmLease community.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-lg transition-all border-0 cursor-pointer"
                  >
                    <Link href={`/blog/${relatedPost.id}`}>
                      <div className="h-40 bg-gradient-to-br from-emerald-400 to-teal-600 overflow-hidden">
                        <img
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.currentTarget.src = `/placeholder.svg?height=160&width=400&query=agriculture`
                          }}
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg text-emerald-900 line-clamp-2 mb-2 hover:text-emerald-700">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                          <span>{relatedPost.author}</span>
                          <span>📖 {relatedPost.readTime} min</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-emerald-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Farm?</h3>
            <p className="mb-6 text-emerald-100">
              Discover thousands of agricultural listings across Kenya. Connect with landowners and explore
              opportunities that match your farming goals.
            </p>
            <Link href="/listings">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-bold">
                Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  url: string
}

interface VideoGalleryProps {
  videos: Video[]
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🎥</span>
          Video Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedVideo(video)}
            >
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="bg-emerald-600 rounded-full p-4 group-hover:bg-emerald-700 transition-colors">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-3 text-sm font-medium">
                {video.title}
              </p>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video bg-black rounded-t-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{selectedVideo.title}</h3>
                <Button onClick={() => setSelectedVideo(null)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

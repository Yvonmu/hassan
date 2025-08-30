/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, ExternalLink, Twitter, Linkedin } from "lucide-react"

export default function SocialFeeds() {
  const [isVisible, setIsVisible] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const socialPosts = [
    {
      id: 1,
      platform: "Twitter",
      author: "Hassan Adan Hassan",
      handle: "@hassan_diplomatic",
      avatar: "/professional-avatar-african-man.png",
      time: "2 hours ago",
      content:
        "Honored to represent Djibouti at the African Union Summit. Productive discussions on regional cooperation and sustainable development. #AU2024 #Diplomacy",
      likes: 245,
      comments: 18,
      shares: 32,
      verified: true,
    },
    {
      id: 2,
      platform: "LinkedIn",
      author: "Hassan Adan Hassan",
      handle: "Diplomatic Officer",
      avatar: "/professional-avatar-african-man.png",
      time: "1 day ago",
      content:
        "Successful completion of bilateral trade negotiations. Excited to announce new partnerships that will benefit both nations and strengthen economic ties in the Horn of Africa.",
      likes: 189,
      comments: 24,
      shares: 15,
      verified: true,
    },
  ]

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
      } else {
        newLiked.add(postId)
      }
      return newLiked
    })
  }

  const handleComment = (postId: number) => {
    // Simulate comment functionality
    alert(`Opening comments for post ${postId}`)
  }

  const handleShare = (postId: number) => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: "Hassan Adan Hassan - Diplomatic Post",
        text: "Check out this diplomatic update",
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleViewProfile = (platform: string) => {
    const urls = {
      Twitter: "https://twitter.com/hassan_diplomatic",
      LinkedIn: "https://linkedin.com/in/hassan-adan-hassan",
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">Live Social Feeds</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay connected with real-time updates on diplomatic activities, international relations, and cultural
            exchanges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {socialPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                      <AvatarFallback>HA</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">{post.author}</h4>
                        {post.verified && (
                          <Badge variant="secondary" className="text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{post.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {post.platform === "Twitter" ? (
                      <Twitter className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Linkedin className="h-5 w-5 text-blue-600" />
                    )}
                    <span className="text-sm text-muted-foreground">{post.time}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors duration-200 ${
                        likedPosts.has(post.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                      }`}
                    >
                      <Heart
                        className={`h-5 w-5 transition-all duration-200 ${
                          likedPosts.has(post.id) ? "fill-current scale-110" : ""
                        }`}
                      />
                      <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => handleComment(post.id)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>

                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>

                  <Button
                    onClick={() => handleViewProfile(post.platform)}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Follow Section */}
        <div className={`text-center mt-16 ${isVisible ? "animate-fade-in-up animate-delay-400" : "opacity-0"}`}>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Follow for Updates</h3>
              <p className="text-muted-foreground mb-6">
                Stay connected with Hassan Adan Hassan&apos;s diplomatic activities and insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleViewProfile("Twitter")}
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105"
                >
                  <Twitter className="h-5 w-5 mr-2" />
                  Follow on Twitter
                </Button>
                <Button
                  onClick={() => handleViewProfile("LinkedIn")}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="h-5 w-5 mr-2" />
                  Connect on LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

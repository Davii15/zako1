"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Check, X, Star, MapPin } from "lucide-react"
import type { Notification } from "@/lib/types"

interface NotificationsPanelProps {
  notifications?: Notification[]
  onMarkAsRead?: (id: string) => void
  onMarkAllAsRead?: () => void
  onDismiss?: (id: string) => void
}

export function NotificationsPanel({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
}: NotificationsPanelProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter((notification) => filter === "all" || !notification.read)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "new_listing":
        return <MapPin className="h-4 w-4 text-blue-500" />
      case "price_change":
        return <Bell className="h-4 w-4 text-orange-500" />
      case "listing_approved":
        return <Check className="h-4 w-4 text-green-500" />
      case "review_added":
        return <Star className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setFilter(filter === "all" ? "unread" : "all")}>
              {filter === "all" ? "Unread" : "All"}
            </Button>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
                Mark All Read
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-1">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors ${
                    !notification.read ? "bg-blue-50/50 border-l-2 border-l-blue-500" : ""
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => onMarkAsRead?.(notification.id)}>
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => onDismiss?.(notification.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

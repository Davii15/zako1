export type ActivityType =
  | "listing_approved"
  | "listing_rejected"
  | "listing_created"
  | "user_created"
  | "user_verified"
  | "user_suspended"
  | "settings_updated"
  | "listing_deleted"
  | "listing_featured"

export interface ActivityLog {
  id: string
  type: ActivityType
  title: string
  description: string
  adminId: string
  adminName: string
  targetId?: string
  targetName?: string
  createdAt: Date
  metadata?: Record<string, any>
}

// Mock activity logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    type: "listing_approved",
    title: "Listing Approved",
    description: "Coffee Plantation - Kiambu approved for public display",
    adminId: "admin1",
    adminName: "Admin Officer",
    targetId: "1",
    targetName: "Coffee Plantation - Kiambu",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "user_verified",
    title: "User Verified",
    description: "Mary Landowner verified as legitimate seller",
    adminId: "admin1",
    adminName: "Admin Officer",
    targetId: "3",
    targetName: "Mary Landowner",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "listing_rejected",
    title: "Listing Rejected",
    description: "John Deere Tractor rejected - incomplete information",
    adminId: "admin2",
    adminName: "Admin Manager",
    targetId: "3",
    targetName: "John Deere Tractor",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "4",
    type: "listing_featured",
    title: "Listing Featured",
    description: "Tea Plantation - Kericho marked as featured",
    adminId: "admin1",
    adminName: "Admin Officer",
    targetId: "4",
    targetName: "Tea Plantation - Kericho",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "5",
    type: "settings_updated",
    title: "Settings Updated",
    description: "Platform settings updated - auto-approve disabled",
    adminId: "admin2",
    adminName: "Admin Manager",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    type: "listing_approved",
    title: "Listing Approved",
    description: "Maize Farm - Trans Nzoia approved",
    adminId: "admin1",
    adminName: "Admin Officer",
    targetId: "9",
    targetName: "Maize Farm - Trans Nzoia",
    createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
  },
  {
    id: "7",
    type: "user_verified",
    title: "User Verified",
    description: "Peter Wekesa verified as legitimate seller",
    adminId: "admin2",
    adminName: "Admin Manager",
    targetId: "8",
    targetName: "Peter Wekesa",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
]

export function getActivityIcon(type: ActivityType): string {
  const icons: Record<ActivityType, string> = {
    listing_approved: "✓",
    listing_rejected: "✕",
    listing_created: "+",
    user_created: "👤",
    user_verified: "✓",
    user_suspended: "⚠",
    settings_updated: "⚙",
    listing_deleted: "D",
    listing_featured: "★",
  }
  return icons[type]
}

export function getActivityColor(type: ActivityType): string {
  const colors: Record<ActivityType, string> = {
    listing_approved: "bg-green-100 text-green-800",
    listing_rejected: "bg-red-100 text-red-800",
    listing_created: "bg-blue-100 text-blue-800",
    user_created: "bg-purple-100 text-purple-800",
    user_verified: "bg-green-100 text-green-800",
    user_suspended: "bg-yellow-100 text-yellow-800",
    settings_updated: "bg-gray-100 text-gray-800",
    listing_deleted: "bg-red-100 text-red-800",
    listing_featured: "bg-yellow-100 text-yellow-800",
  }
  return colors[type]
}

export function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  const minutes = Math.floor(diff / (1000 * 60))

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

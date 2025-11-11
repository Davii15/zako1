// MongoDB Schemas - TypeScript interfaces matching MongoDB documents

import type { User, Listing, Review, SavedSearch, Notification, ActivityLog } from "@/lib/types"

// User Document Schema
export interface UserDocument extends User {
  _id?: string
  passwordHash?: string
  createdAt: Date
  updatedAt: Date
}

// Listing Document Schema
export interface ListingDocument extends Listing {
  _id?: string
  userId?: string
  pendingApproval?: boolean
  rejectionReason?: string
  createdAt: Date
  updatedAt: Date
}

// Review Document Schema
export interface ReviewDocument extends Review {
  _id?: string
  createdAt: Date
  updatedAt: Date
}

// SavedSearch Document Schema
export interface SavedSearchDocument extends SavedSearch {
  _id?: string
  createdAt: Date
  updatedAt: Date
}

// Notification Document Schema
export interface NotificationDocument extends Notification {
  _id?: string
  createdAt: Date
  updatedAt: Date
}

// Activity Log Document Schema
export interface ActivityLogDocument extends ActivityLog {
  _id?: string
  createdAt: Date
  updatedAt: Date
}

// Database Indexes Configuration
export const mongoIndexes = {
  users: [{ key: { email: 1 }, unique: true }, { key: { createdAt: -1 } }, { key: { verified: 1 } }],
  listings: [
    { key: { status: 1 } },
    { key: { county: 1 } },
    { key: { cropType: 1 } },
    { key: { ownerId: 1 } },
    { key: { createdAt: -1 } },
    { key: { type: 1 } },
  ],
  reviews: [{ key: { listingId: 1 } }, { key: { userId: 1 } }, { key: { createdAt: -1 } }],
  activityLogs: [{ key: { type: 1 } }, { key: { adminId: 1 } }, { key: { createdAt: -1 } }],
  notifications: [{ key: { userId: 1, read: 1 } }, { key: { createdAt: -1 } }],
}

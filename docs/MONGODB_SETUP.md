# MongoDB Integration Setup Guide

## Overview
This project includes a complete MongoDB integration blueprint that's ready to be activated whenever you're ready to connect to a real database. Currently, the app uses mock data stored in memory.

## To Activate MongoDB:

### 1. Install Dependencies
\`\`\`bash
npm install mongodb
\`\`\`

### 2. Set Environment Variables
Create a `.env.local` file:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=farmlease
\`\`\`

### 3. Uncomment MongoDB Code
In `lib/mongodb/db.ts`, uncomment the MongoDB connection code and comment out the mock implementation.

### 4. Update Repository Methods
In the repository files (`lib/mongodb/repositories/`), uncomment the MongoDB implementations and comment out the mock implementations.

### 5. Import Repositories in API Routes
Create API routes in `app/api/` that use the repositories:

\`\`\`typescript
// app/api/users/[id]/route.ts
import { UserRepository } from '@/lib/mongodb/repositories/user-repo'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const user = await UserRepository.getById(params.id)
  return Response.json(user)
}
\`\`\`

## Database Collections

### Users
- Stores user accounts with authentication
- Indexes: email (unique), createdAt, verified

### Listings
- Agricultural listings (land, plantations, machinery, warehouses)
- Indexes: status, county, cropType, ownerId, createdAt

### Reviews
- User reviews and ratings for listings
- Indexes: listingId, userId, createdAt

### Activity Logs
- Admin actions and system events
- Indexes: type, adminId, createdAt

### Saved Searches
- User's saved search filters and preferences
- Indexes: userId, createdAt

### Notifications
- Real-time alerts for users
- Indexes: userId + read, createdAt

## Benefits of This Approach

1. **No Breaking Changes**: Switching from mock to real database requires only uncommenting code
2. **Type Safety**: Full TypeScript support with interfaces matching MongoDB documents
3. **Scalability**: Ready to handle production loads with proper indexing
4. **Flexibility**: Easy to add new collections or modify existing ones

## Future Enhancements

- Add data validation middleware
- Implement transaction support for complex operations
- Add data aggregation pipelines for analytics
- Set up automated backups
- Configure read replicas for high availability

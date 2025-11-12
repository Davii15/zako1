import { ListingRepository } from "@/lib/mongodb/repositories/listing-repo"

export async function GET() {
  try {
    const listings = await ListingRepository.getAll()
    return Response.json({ success: true, data: listings })
  } catch (error) {
    console.error("Error fetching listings:", error)
    return Response.json({ success: false, error: "Failed to fetch listings" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = await ListingRepository.create(body)
    return Response.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    console.error("Error creating listing:", error)
    return Response.json({ success: false, error: "Failed to create listing" }, { status: 500 })
  }
}

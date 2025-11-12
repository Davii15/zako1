import { ListingRepository } from "@/lib/mongodb/repositories/listing-repo"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const listing = await ListingRepository.getById(id)
    if (!listing) {
      return Response.json({ success: false, error: "Listing not found" }, { status: 404 })
    }
    return Response.json({ success: true, data: listing })
  } catch (error) {
    console.error("Error fetching listing:", error)
    return Response.json({ success: false, error: "Failed to fetch listing" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    const body = await req.json()
    const result = await ListingRepository.update(id, body)
    return Response.json({ success: true, data: result })
  } catch (error) {
    console.error("Error updating listing:", error)
    return Response.json({ success: false, error: "Failed to update listing" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params
    await ListingRepository.delete(id)
    return Response.json({ success: true, message: "Listing deleted" })
  } catch (error) {
    console.error("Error deleting listing:", error)
    return Response.json({ success: false, error: "Failed to delete listing" }, { status: 500 })
  }
}

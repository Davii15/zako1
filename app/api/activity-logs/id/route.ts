import { ActivityLogRepository } from "@/lib/mongodb/repositories/activity-logs-repo"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const log = await ActivityLogRepository.getById(params.id)
    if (!log) return Response.json({ error: "Activity log not found" }, { status: 404 })
    return Response.json(log)
  } catch (error) {
    return Response.json({ error: "Failed to fetch activity log" }, { status: 500 })
  }
}

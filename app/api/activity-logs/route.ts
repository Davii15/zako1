import { ActivityLogRepository } from "@/lib/mongodb/repositories/activity-logs-repo"

export async function GET() {
  try {
    const logs = await ActivityLogRepository.getAll()
    return Response.json(logs)
  } catch (error) {
    return Response.json({ error: "Failed to fetch activity logs" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const log = await ActivityLogRepository.create(body)
    return Response.json(log, { status: 201 })
  } catch (error) {
    return Response.json({ error: "Failed to create activity log" }, { status: 500 })
  }
}

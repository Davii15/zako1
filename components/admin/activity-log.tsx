"use client"

import { useState, useMemo } from "react"
import {
  mockActivityLogs,
  getActivityColor,
  getActivityIcon,
  formatTimeAgo,
  type ActivityType,
} from "@/lib/activity-log"

export function ActivityLog() {
  const [filterType, setFilterType] = useState<ActivityType | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLogs = useMemo(() => {
    return mockActivityLogs.filter((log) => {
      const matchesType = filterType === "all" || log.type === filterType
      const matchesSearch =
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.adminName.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesType && matchesSearch
    })
  }, [filterType, searchTerm])

  const activityTypes: Array<{ value: ActivityType | "all"; label: string }> = [
    { value: "all", label: "All Activities" },
    { value: "listing_approved", label: "Approved" },
    { value: "listing_rejected", label: "Rejected" },
    { value: "listing_featured", label: "Featured" },
    { value: "user_verified", label: "Verified Users" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as ActivityType | "all")}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          {activityTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Admin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold ${getActivityColor(log.type)}`}
                      >
                        {getActivityIcon(log.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{log.title}</div>
                      <div className="text-sm text-gray-600">{log.description}</div>
                      {log.targetName && <div className="text-xs text-gray-500 mt-1">Target: {log.targetName}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{log.adminName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatTimeAgo(log.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No activities found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        Showing {filteredLogs.length} of {mockActivityLogs.length} activities
      </div>
    </div>
  )
}

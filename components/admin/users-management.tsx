"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { User } from "@/lib/types"
import { Trash2, Shield, UserIcon, Search, Filter, Mail, Phone, MapPin, Clock } from "lucide-react"

// Mock users data (in real app, this would come from API)
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@farmland.co.ke",
    name: "Admin User",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "farmer@example.com",
    name: "John Farmer",
    role: "farmer",
    county: "Kiambu",
    phone: "+254712345678",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    email: "owner@example.com",
    name: "Mary Landowner",
    role: "owner",
    county: "Nakuru",
    phone: "+254723456789",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    email: "farmer2@example.com",
    name: "Peter Mwangi",
    role: "farmer",
    county: "Meru",
    phone: "+254734567890",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "5",
    email: "owner2@example.com",
    name: "Grace Wanjiku",
    role: "owner",
    county: "Kericho",
    phone: "+254745678901",
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "6",
    email: "farmer3@example.com",
    name: "Samuel Kipchoge",
    role: "farmer",
    county: "Nandi",
    phone: "+254756789012",
    createdAt: new Date("2024-01-28"),
  },
  {
    id: "7",
    email: "owner3@example.com",
    name: "Rose Chebet",
    role: "owner",
    county: "Bomet",
    phone: "+254767890123",
    createdAt: new Date("2024-02-02"),
  },
]

export function UsersManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "owner" | "farmer">("all")

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
    setSelectedUser(null)
    setShowDeleteDialog(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "owner":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "farmer":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <UserIcon className="h-4 w-4" />
    }
  }

  const adminCount = users.filter((u) => u.role === "admin").length
  const ownerCount = users.filter((u) => u.role === "owner").length
  const farmerCount = users.filter((u) => u.role === "farmer").length

  // Enhanced filtering and search functionality
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone?.includes(searchTerm) ?? false)

    const matchesRole = filterRole === "all" || user.role === filterRole

    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-900">{users.length}</div>
            <p className="text-sm text-blue-700 font-medium mt-1">Total Users</p>
            <div className="text-xs text-blue-600 mt-2">Active members</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-purple-900">{adminCount}</div>
            <p className="text-sm text-purple-700 font-medium mt-1">Administrators</p>
            <div className="text-xs text-purple-600 mt-2">Platform managers</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-900">{farmerCount}</div>
            <p className="text-sm text-green-700 font-medium mt-1">Farmers</p>
            <div className="text-xs text-green-600 mt-2">Buyers & lessees</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-emerald-900">{ownerCount}</div>
            <p className="text-sm text-emerald-700 font-medium mt-1">Landowners</p>
            <div className="text-xs text-emerald-600 mt-2">Property lessors</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Filters and Search */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Users
              </label>
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-300 bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Role
              </label>
              <Select value={filterRole} onValueChange={(value: any) => setFilterRole(value)}>
                <SelectTrigger className="border-slate-300 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="owner">Landowners</SelectItem>
                  <SelectItem value="farmer">Farmers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-slate-600 font-medium">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800">
          <CardTitle className="text-white">Manage Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-100 border-b-2 border-slate-200">
                <TableRow>
                  <TableHead className="text-slate-900 font-bold">Name</TableHead>
                  <TableHead className="text-slate-900 font-bold">Email</TableHead>
                  <TableHead className="text-slate-900 font-bold">Role</TableHead>
                  <TableHead className="text-slate-900 font-bold">Location</TableHead>
                  <TableHead className="text-slate-900 font-bold">Contact</TableHead>
                  <TableHead className="text-slate-900 font-bold">Joined</TableHead>
                  <TableHead className="text-slate-900 font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50 transition-colors border-b border-slate-200">
                      <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
                      <TableCell className="text-slate-600 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getRoleColor(user.role)} border`}>
                          <span className="flex items-center gap-1">
                            {getRoleIcon(user.role)}
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 flex items-center gap-1">
                        {user.county ? (
                          <>
                            <MapPin className="h-4 w-4 text-emerald-600" />
                            {user.county}
                          </>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600 flex items-center gap-1">
                        {user.phone ? (
                          <>
                            <Phone className="h-4 w-4 text-blue-600" />
                            {user.phone}
                          </>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-slate-400" />
                          {user.createdAt.toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.role !== "admin" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user)
                              setShowDeleteDialog(true)
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                      No users found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete User Account</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The user account will be permanently removed from the platform.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4 px-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="font-semibold text-slate-900">{selectedUser.name}</p>
              <p className="text-sm text-slate-600">{selectedUser.email}</p>
              <Badge className={`${getRoleColor(selectedUser.role)} border mt-2`}>{selectedUser.role}</Badge>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedUser && deleteUser(selectedUser.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

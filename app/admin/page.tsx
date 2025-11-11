"use client"
import { useState } from "react"
import { AdminGuard } from "@/components/admin/admin-guard"
import { ListingsManagement } from "@/components/admin/listings-management"
import { UsersManagement } from "@/components/admin/users-management"
import { ActivityLog } from "@/components/admin/activity-log"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, BarChart3, Settings, Activity } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("listings")

  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage listings, users, and platform settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Listings
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <ListingsManagement />
          </TabsContent>

          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLog />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Page Views</span>
                      <span className="font-semibold">12,543</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Listing Views</span>
                      <span className="font-semibold">8,921</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WhatsApp Contacts</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Registrations</span>
                      <span className="font-semibold">156</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Counties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Kiambu</span>
                      <span className="font-semibold">45 listings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nakuru</span>
                      <span className="font-semibold">38 listings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kericho</span>
                      <span className="font-semibold">32 listings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meru</span>
                      <span className="font-semibold">28 listings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-approve listings</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically approve new listings without review
                        </p>
                      </div>
                      <Button variant="outline">Disabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Featured listing limit</p>
                        <p className="text-sm text-muted-foreground">Maximum number of featured listings per user</p>
                      </div>
                      <Button variant="outline">3 listings</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email notifications</p>
                        <p className="text-sm text-muted-foreground">Send email notifications for new listings</p>
                      </div>
                      <Button variant="outline">Enabled</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminGuard>
  )
}

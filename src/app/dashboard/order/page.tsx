import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const orders = [
  {
    id: "#1234",
    date: "March 15, 2020",
    status: "Processing",
    total: "$78.00 for 1 item",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "#2366",
    date: "June 20, 2020",
    status: "Completed",
    total: "$81.00 for 1 item",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "#3421",
    date: "August 12, 2020",
    status: "Shipped",
    total: "$156.00 for 2 items",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "#4567",
    date: "September 5, 2020",
    status: "Cancelled",
    total: "$92.00 for 1 item",
    statusColor: "bg-red-100 text-red-800",
  },
]

export default function OrderPage() {
  return (
    <>
        {/* Dashboard content */}
        <div className="p-4 lg:p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop table */}
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Order</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={order.id} className={`border-b border-border ${index % 2 === 0 ? "bg-muted/30" : ""}`}>
                          <td className="py-4 px-4 font-medium text-foreground">{order.id}</td>
                          <td className="py-4 px-4 text-muted-foreground">{order.date}</td>
                          <td className="py-4 px-4">
                            <Badge className={order.statusColor}>{order.status}</Badge>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{order.total}</td>
                          <td className="py-4 px-4">
                            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                              <Eye className="mr-2 h-3 w-3" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge className={order.statusColor}>{order.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground">{order.total}</p>
                      <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Eye className="mr-2 h-3 w-3" />
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    </>
  )
}

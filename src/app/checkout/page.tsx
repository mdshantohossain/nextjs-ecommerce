"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Truck } from "lucide-react"
import CartDetail from "@/components/page/checkout/CartDetail"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

const orderItems: OrderItem[] = [
  {
    id: "1",
    name: "Blue Dress For Woman",
    quantity: 2,
    price: 45.0,
    total: 90.0,
  },
  {
    id: "2",
    name: "Lether Gray Tuxedo",
    quantity: 1,
    price: 55.0,
    total: 55.0,
  },
  {
    id: "3",
    name: "woman full sliv dress",
    quantity: 3,
    price: 68.0,
    total: 204.0,
  },
]

export default function CheckoutPage() {
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    address: "",
    phone: "",
    email: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const shippingCost = 0 // Free shipping
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0

  const handleInputChange = (field: string, value: string) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }))
  }


  const handlePlaceOrder = async () => {
    // Validate required fields
    const requiredFields = ["firstName", "address", "phone", "email"]
    const missingFields = requiredFields.filter((field) => !billingDetails[field as keyof typeof billingDetails])

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`)
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Order placed successfully!")
      // Here you would typically redirect to a success page or reset the form
    } catch (error) {
      alert(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Billing Details & Payment */}
          <div className="space-y-8">
            {/* Billing Details */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name *"
                    value={billingDetails.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Address *"
                    value={billingDetails.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Phone *"
                    type="tel"
                    value={billingDetails.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    placeholder="Email address *"
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center space-x-2 cursor-pointer">
                    <Truck className="w-4 h-4" />
                    <span>Cash On Delivery</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex items-center space-x-2 cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    <span>Online Payment</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Coupon Section */}
            {/* <ApplyCupon /> */}

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold"
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>

          {/* Right Column - Order Summary */}
          <CartDetail />
          
        </div>
      </div>
    </div>
  )
}

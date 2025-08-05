"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, Tag } from "lucide-react"
import CheckoutBreadcrumb from "@/components/breadcrumb"

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
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const shippingCost = 0 // Free shipping
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const finalTotal = subtotal + shippingCost - discountAmount

  const handleInputChange = (field: string, value: string) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }))
  }

  const applyCoupon = () => {
    const validCoupons = {
      SAVE10: 10,
      SAVE20: 20,
      WELCOME15: 15,
      FIRST25: 25,
    }

    const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
      setCouponCode("")
    } else {
      alert("Invalid coupon code")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
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
        {/* Breadcrumb Navigation */}
        <CheckoutBreadcrumb currentStep="checkout" className="mb-8" />

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
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Apply Coupon
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={applyCoupon} variant="outline">
                  Apply
                </Button>
              </div>
              {appliedCoupon && (
                <div className="mt-3 flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded border">
                  <span className="text-sm text-green-700 dark:text-green-400">
                    Coupon "{appliedCoupon.code}" applied ({appliedCoupon.discount}% off)
                  </span>
                  <Button variant="ghost" size="sm" onClick={removeCoupon} className="text-red-500">
                    Remove
                  </Button>
                </div>
              )}
            </div>

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
          <div className="bg-card border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-6">Your Orders</h2>

            {/* Order Items */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 pb-2 border-b font-medium">
                <span>Product</span>
                <span className="text-right">Total</span>
              </div>

              {orderItems.map((item) => (
                <div key={item.id} className="grid grid-cols-2 gap-4 py-2">
                  <div>
                    <span className="text-sm">{item.name}</span>
                    <span className="text-muted-foreground"> x {item.quantity}</span>
                  </div>
                  <div className="text-right font-medium">${item.total.toFixed(2)}</div>
                </div>
              ))}

              <Separator />

              {/* Subtotal */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <span className="font-medium">SubTotal</span>
                <span className="text-right font-medium">${subtotal.toFixed(2)}</span>
              </div>

              {/* Discount */}
              {appliedCoupon && (
                <div className="grid grid-cols-2 gap-4 py-2 text-green-600">
                  <span>Discount ({appliedCoupon.discount}%)</span>
                  <span className="text-right">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Shipping */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <span>Shipping</span>
                <span className="text-right">
                  {shippingCost === 0 ? "Free Shipping" : `$${60}`}
                </span>
              </div>

              <Separator />

              {/* Total */}
              <div className="grid grid-cols-2 gap-4 py-2">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-right text-lg font-semibold">${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

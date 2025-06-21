"use client"

import { useState } from "react"
import { Minus, Plus, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const initialCartItems: CartItem[] = [
  {
    id: "product1",
    name: "Blue Dress For Woman",
    price: 45.0,
    quantity: 2,
    image: "https://picsum.photos/id/637/200/300",
  },
  {
    id: "product2",
    name: "Lether Gray Tuxedo",
    price: 55.0,
    quantity: 1,
    image: "https://picsum.photos/id/638/200/300",
  },
  {
    id: "product3",
    name: "Woman Full Sliv Dress",
    price: 68.0,
    quantity: 3,
    image: "https://picsum.photos/id/639/200/300",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const total = subtotal - discountAmount

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item
  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  // Apply coupon
  const applyCoupon = () => {
    const validCoupons = {
      SAVE10: 10,
      SAVE20: 20,
      WELCOME15: 15,
    }

    const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
      setCouponCode("")
    } else {
      alert("Invalid coupon code")
    }
  }

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started!</p>
            <Button>Continue Shopping</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="bg-card border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 border-b font-semibold">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-1 text-center">Remove</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                {/* Product */}
                <div className="col-span-5 flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {item.id}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                </div>

                {/* Quantity */}
                <div className="col-span-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-16 text-center"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-2 text-center">
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                {/* Remove */}
                <div className="col-span-1 text-center">
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-card border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded border flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">ID: {item.id}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Price: </span>
                      <span className="font-semibold">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Actions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coupon Section */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Apply Coupon</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter Coupon Code.."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={applyCoupon} className="bg-red-500 hover:bg-red-600 text-white">
                Apply Coupon
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

          {/* Cart Summary */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedCoupon.discount}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Button className="w-full">Proceed to Checkout</Button>
              <Button variant="outline" className="w-full">
                Update Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

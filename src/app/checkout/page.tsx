"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck, X } from "lucide-react";
import CartDetail from "@/components/page/checkout/CartDetail";
import CheckoutAuthModal from "@/components/modals/checkout-modal/modal";
import { useAppSelector } from "@/features/hooks";
import { Textarea } from "@/components/ui/textarea";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export default function CheckoutPage() {
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // handle press login
  const handleLogin = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // handle input changes
  const handleInputChange = (field: string, value: string) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    const requiredFields = ["firstName", "address", "phone", "email"];
    const missingFields = requiredFields.filter(
      (f) => !billingDetails[f as keyof typeof billingDetails]
    );
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Order placed successfully!");
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
      {/* 🔹 Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-lg shadow-3xl w-full max-w-md p-6 relative animate-fadeIn">
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 cursor-pointer hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <CheckoutAuthModal />
          </div>
        </div>
      )}

      {/* 🔹 Checkout Page */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Billing Details */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

              {isAuthenticated ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firstName" className="mb-2">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      readOnly={true}
                      value={user?.name}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="Phone"
                      readOnly={!user?.phone}
                      value={user?.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      placeholder="Email"
                      readOnly={true}
                      value={user?.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="mb-2">
                      Delivery Address *
                    </Label>
                    <Textarea
                      id="address"
                      placeholder="Address"
                      value={billingDetails.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row gap-1">
                  <span className="text-gray-600">
                    Please log in to place an order.
                  </span>
                  <span
                    className="text-red-500 font-bold cursor-pointer hover:underline"
                    onClick={handleLogin}
                  >
                    Login
                  </span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Payment</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label
                    htmlFor="cash"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Cash On Delivery</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="online" id="online" />
                  <Label
                    htmlFor="online"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Online Payment</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Place Order */}
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
    </div>
  );
}

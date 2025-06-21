import Link from "next/link"
import { MapPin, Mail, Phone, Truck, RotateCcw, Headphones } from "lucide-react"

export default function Footer() {
  const usefulLinks = [
    { title: "About Us", href: "/about" },
    { title: "FAQ", href: "/faq" },
    { title: "Location", href: "/location" },
    { title: "Affiliates", href: "/affiliates" },
    { title: "Contact", href: "/contact" },
  ]

  const accountLinks = [
    { title: "My Account", href: "/account" },
    { title: "Discount", href: "/discount" },
    { title: "Returns", href: "/returns" },
    { title: "Orders History", href: "/orders" },
    { title: "Order Tracking", href: "/tracking" },
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", color: "bg-blue-600 hover:bg-blue-700" },
    { name: "Twitter", href: "#", color: "bg-sky-500 hover:bg-sky-600" },
    { name: "Google+", href: "#", color: "bg-red-500 hover:bg-red-600" },
    { name: "YouTube", href: "#", color: "bg-red-600 hover:bg-red-700" },
    { name: "Instagram", href: "#", color: "bg-purple-600 hover:bg-purple-700" },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-pink-500 rounded-md flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                  <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-foreground">Shopwise</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              If you are going to use of Lorem Ipsum need to be sure there isn't anything hidden of text
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">123 Street, Old Trafford, NewYork, USA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Link href="mailto:info@sitename.com" className="text-sm text-muted-foreground hover:text-foreground">
                  info@sitename.com
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <Link href="tel:+457789789665" className="text-sm text-muted-foreground hover:text-foreground">
                  + 457 789 789 65
                </Link>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Useful Links</h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">My Account</h4>
            <ul className="space-y-3">
              {accountLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Download App</h4>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mb-6">
              <Link href="#" className="inline-block">
                <img
                  src="/placeholder.svg?height=40&width=135"
                  alt="Get it on Google Play"
                  className="h-10 w-auto bg-black rounded"
                />
              </Link>
              <Link href="#" className="inline-block">
                <img
                  src="/placeholder.svg?height=40&width=135"
                  alt="Download on the App Store"
                  className="h-10 w-auto bg-black rounded"
                />
              </Link>
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-4">Social</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`w-8 h-8 rounded flex items-center justify-center text-white text-sm font-medium transition-colors ${social.color}`}
                >
                  {social.name.charAt(0)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">Free Delivery</h5>
                <p className="text-sm text-muted-foreground">
                  Phasellus blandit massa enim elit of passage varius nunc.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">30 Day Returns Guarantee</h5>
                <p className="text-sm text-muted-foreground">
                  Phasellus blandit massa enim elit of passage varius nunc.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Headphones className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-1">27/4 Online Support</h5>
                <p className="text-sm text-muted-foreground">
                  Phasellus blandit massa enim elit of passage varius nunc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All Rights Reserved by Bestwebcreator</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

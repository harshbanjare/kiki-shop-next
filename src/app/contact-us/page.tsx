import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Kiki Beauty',
  description: 'Contact information for Kiki Beauty',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us using any of the contact methods below.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <p className="text-sm text-gray-500 mb-8 text-right">
            Last updated on 05-12-2024 20:52:23
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Company Details</h2>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Legal Entity Name</p>
                  <p className="font-medium text-gray-900">AMBIKA MULTIVENTURES PRIVATE LIMITED</p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Office Location</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Registered & Operational Address</p>
                    <p className="font-medium text-gray-900">
                      70, Zone-2, M.P. Nagar,<br />
                      Bhopal, Madhya Pradesh,<br />
                      PIN: 462011
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <a 
                      href="tel:+917610665533" 
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91 7610665533
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <a 
                      href="mailto:hello@kikibeauty.in" 
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      hello@kikibeauty.in
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h2>
                <p className="text-gray-600">
                  Monday - Saturday<br />
                  10:00 AM - 7:00 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

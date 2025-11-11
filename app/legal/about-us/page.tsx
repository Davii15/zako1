export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900 mb-4">About FarmLease Kenya</h1>
            <p className="text-lg text-gray-700">Connecting farmers with opportunities, one lease at a time.</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-emerald-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-3">Our Mission</h2>
            <p className="text-gray-700">
              To democratize access to agricultural resources in Kenya by providing a transparent, secure, and
              user-friendly marketplace where farmers can lease quality farmland, plantations, machinery, and storage
              facilities. We empower agricultural entrepreneurs to grow their businesses without the burden of
              capital-intensive investments.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-emerald-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-3">Our Vision</h2>
            <p className="text-gray-700">
              To be Kenya's most trusted agricultural leasing platform, transforming the agricultural sector by making
              quality resources accessible to every farmer, regardless of their financial capacity. We envision a
              thriving agricultural ecosystem where innovation and opportunity flourish.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-emerald-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-3">Why Choose Us?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
                <span>
                  <strong>Verified Listings:</strong> All listings are carefully reviewed to ensure quality and
                  authenticity.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
                <span>
                  <strong>Secure Platform:</strong> Your data and transactions are protected with advanced security
                  measures.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
                <span>
                  <strong>Wide Coverage:</strong> Access listings across all 47 Kenyan counties.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
                <span>
                  <strong>Direct Communication:</strong> Connect directly with owners via WhatsApp, SMS, or email.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold text-lg">✓</span>
                <span>
                  <strong>Expert Support:</strong> Our team is here to assist you 24/7.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-emerald-200 shadow-sm">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-3">Contact Us</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong className="text-emerald-900">Email:</strong>
                <br />
                support@farmleasekenya.com
              </p>
              <p>
                <strong className="text-emerald-900">Phone:</strong>
                <br />
                +254 712 345 678
              </p>
              <p>
                <strong className="text-emerald-900">Office Location:</strong>
                <br />
                Nairobi, Kenya
              </p>
              <p>
                <strong className="text-emerald-900">Hours:</strong>
                <br />
                Monday - Friday: 8:00 AM - 6:00 PM EAT
                <br />
                Saturday: 9:00 AM - 5:00 PM EAT
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-semibold mb-3">PRODUCT OF CTECH SOLUTIONS</h2>
            <p className="mb-2">®™ ALL RIGHTS RESERVED 2025</p>
            <p className="text-emerald-100">
              Developed and maintained with excellence by CTECH Solutions - Your Technology Partner for Agricultural
              Innovation.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

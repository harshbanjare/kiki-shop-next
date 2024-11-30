export default function ReturnsAndExchange() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Returns & Exchange Policy
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Authenticity Guarantee */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Authenticity Guarantee
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At kikibeauty.in, we ONLY stock authentic products. All our items
              are genuine and are sourced directly from the manufacturer or from
              their authorized distributors. Prior to shipping, we do several
              levels of rigorous quality checks, hence eliminating any chances
              of counterfeit products.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              If you have any concerns about the authenticity of any of the
              items you have purchased from us or are considering purchasing,
              please contact us directly by emailing us at{" "}
              <a
                href="mailto:hello@kikibeauty.in"
                className="text-black hover:underline"
              >
                hello@kikibeauty.in
              </a>{" "}
              and we shall be happy to address your concerns.
            </p>
          </section>

          {/* Returns Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Returns Policy for Full-Size Products
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Kikibeauty.in follows a transparent 'No Questions Asked' returns
              policy for all full-size products bought from our online store.
              You can return the unused products you have ordered within 14 days
              of the date of receipt.
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Important Notes:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Used products cannot be returned</li>
                <li>Products should not have been tried or used</li>
                <li>The packaging should not have been tampered in any way</li>
                <li>
                  Products purchased under clearance cannot be returned or
                  replaced
                </li>
              </ul>
            </div>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
            <p className="text-gray-700 leading-relaxed">
              To initiate a return, please email us at{" "}
              <a
                href="mailto:hello@kikibeauty.in"
                className="text-black hover:underline"
              >
                hello@kikibeauty.in
              </a>{" "}
              and we will walk you through the process till completion.
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Reverse Pickup Instructions:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  The reverse product request will be assigned within 24-48
                  hours
                </li>
                <li>The product will be picked in another 2-5 working days</li>
                <li>
                  After pickup, the delivery executive will hand over the
                  invoice
                </li>
                <li>
                  A picture of this invoice needs to be shared with us at
                  hello@kikibeauty.in
                </li>
              </ul>
            </div>
          </section>

          {/* Refunds Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Refunds Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Refunds are processed within 15 days from the date of receiving
              returned goods.
            </p>
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Prepaid Orders:
                </h3>
                <p className="text-gray-700">
                  For orders paid through Credit Card, Debit Card, or Net
                  Banking, the amount will be refunded to the original payment
                  method within 3-5 working days.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cash-on-Delivery Orders:
                </h3>
                <p className="text-gray-700">
                  A refund will be processed either through a cheque or bank
                  transfer within 3-5 working days. Bank details need to be
                  provided over email.
                </p>
              </div>
              <p className="text-gray-500 italic">
                Note: Cash-on-Delivery charges and Shipping Charges (if
                applicable) are not refundable.
              </p>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              An order can be canceled only while it is in 'Pending' state. Once
              we start processing, it cannot be canceled.
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Cancellation Process:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  Send an email to hello@kikibeauty.in with reasons for
                  cancellation
                </li>
                <li>Cancellation takes 1-2 business days to process</li>
                <li>
                  You will be notified by email once the cancellation is
                  complete
                </li>
              </ul>
            </div>
          </section>

          {/* Additional Notes */}
          <section className="border-t pt-8">
            <p className="text-gray-500 italic">
              Important: Any single product in a kit/set cannot be replaced or
              returned.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

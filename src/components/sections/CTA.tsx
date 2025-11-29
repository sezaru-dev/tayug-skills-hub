export default function CTASection() {
  return (
    <section className="py-24 bg-blue-700 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-xl mb-8">Sign up as a Customer or Service Provider today.</p>
      <div className="space-x-4">
        <a href="/auth/signup" className="bg-white text-primary px-6 py-3 rounded font-medium hover:bg-gray-100">
          Sign Up
        </a>
        <a href="/listings" className="border border-white px-6 py-3 rounded font-medium hover:bg-white hover:text-primary">
          Browse Listings
        </a>
      </div>
    </section>
  );
}

export default function CTASection() {
  return (
  <section className="py-24 bg-gray-100 px-4">
    <div className="max-w-3xl mx-auto text-center">

      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
        Ready to get started?
      </h2>

      <p className="text-base sm:text-lg text-muted-foreground mb-10 leading-relaxed">
        Join Tayug Skills Hub as a service provider or discover local talent in your area.
      </p>

      <div className="flex flex-row gap-3 justify-center">

        <a href="/auth/signup" className="px-6 py-3 max-w-max rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
          Sign up
        </a>

        <a href="/browse-providers" className="px-6 py-3 max-w-max rounded-md border border-border bg-white text-foreground text-sm font-medium hover:bg-gray-50 transition-colors">
          Browse
        </a>

      </div>

    </div>
  </section>
  );
}


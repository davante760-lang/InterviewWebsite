export default function LandingFooter() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading font-semibold text-[14px] text-text-primary">
          Interview Coach
        </span>

        <div className="flex items-center gap-6 text-[12px] text-text-tertiary">
          <a href="#" className="hover:text-text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-text-secondary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-text-secondary transition-colors">Contact</a>
        </div>
      </div>
      <div className="max-w-[720px] mx-auto mt-4">
        <p className="text-[11px] text-text-tertiary text-center sm:text-left">
          Interview Coach — Real-Time Sales Interview Performance
        </p>
      </div>
    </footer>
  )
}

import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="rounded-b-2xl border-t border-white/5 bg-slate-950 py-8 sm:rounded-b-3xl sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-rose-500">
              <Heart className="h-3.5 w-3.5 fill-white text-white" />
            </div>
            <span className="text-sm font-bold text-slate-400">DreamDuo</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300 sm:text-sm"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300 sm:text-sm"
            >
              Terms
            </Link>
            <Link
              href="mailto:hello@dreamduo.app"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300 sm:text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-slate-600 sm:text-sm">
            &copy; {new Date().getFullYear()} DreamDuo Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

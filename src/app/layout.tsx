import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Human DesAIn - AI-Powered Human Design Analysis",
  description: "AI-powered Human Design analysis and insights. Discover your true self with advanced artificial intelligence.",
  keywords: "Human DesAIn, AI Human Design, Bodygraph, Chart Analysis, AI Coach, Artificial Intelligence",
  authors: [{ name: "Human DesAIn Team" }],
  openGraph: {
    title: "Human DesAIn",
    description: "Revolutionary AI-powered Human Design platform",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Human DesAIn",
    description: "Discover your true self with AI-powered HD analysis",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="smooth-scroll">
      <body className="antialiased min-h-screen bg-background">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-lg">Human DesAIn</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Preise
            </a>
            <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Über uns
            </a>
            <a href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Anmelden
            </a>
            <a href="/auth/signup" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Kostenlos starten
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Produkt</h3>
            <ul className="space-y-2">
              <li><a href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Preise</a></li>
              <li><a href="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Unternehmen</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Über uns</a></li>
              <li><a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Karriere</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hilfe</a></li>
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kontakt</a></li>
              <li><a href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Datenschutz</a></li>
              <li><a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AGB</a></li>
              <li><a href="/imprint" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Impressum</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 Human DesAIn. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ in Germany • DSGVO konform
          </p>
        </div>
      </div>
    </footer>
  )
}
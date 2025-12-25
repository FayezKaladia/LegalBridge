import { Link } from 'react-router-dom';
import { Scale, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Scale className="h-6 w-6 text-primary" />
              <span className="font-serif text-lg font-bold">LegalBridge</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Building access to justice while training the next generation of legal professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/submit-case" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Submit a Case
                </Link>
              </li>
              <li>
                <Link to="/contributors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Find Help
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Contributors */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Contributors</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Join as Intern
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Join as Paralegal
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pro Bono Lawyers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Important</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Legal Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/ethics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Ethics Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LegalBridge. Access to justice for all.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive" /> for India
          </p>
        </div>
      </div>
    </footer>
  );
}

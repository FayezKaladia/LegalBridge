import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { CASE_CATEGORIES } from '@/types/legal';
import { 
  Scale, 
  Users, 
  Shield, 
  ArrowRight, 
  GraduationCap,
  FileText,
  Handshake,
  ChevronRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: 'Structured Case Intake',
      description: 'Guided questions convert your situation into an organized case summary.',
    },
    {
      icon: Users,
      title: 'Verified Contributors',
      description: 'Connect with law interns, paralegals, and pro-bono lawyers.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your identity stays hidden until you choose to connect.',
    },
    {
      icon: Handshake,
      title: 'Ethical Boundaries',
      description: 'Clear guidelines ensure responsible legal assistance.',
    },
  ];

  const howItWorks = [
    { step: 1, title: 'Select Case Type', description: 'Choose your legal issue category' },
    { step: 2, title: 'Describe Your Case', description: 'Answer guided questions about your situation' },
    { step: 3, title: 'Find Help', description: 'Browse matched contributors' },
    { step: 4, title: 'Connect Safely', description: 'Both parties agree to ethics terms' },
  ];

  const stats = [
    { value: '10K+', label: 'Cases Prepared' },
    { value: '500+', label: 'Contributors' },
    { value: '28', label: 'States Covered' },
    { value: '95%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyek0zNiAxNHYySDI0di0yaDF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                <Scale className="h-4 w-4" />
                <span className="text-sm font-medium">Access to Justice for All</span>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Legal Guidance Without
                <span className="text-accent"> Barriers</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-balance">
                Connect with law interns, paralegals, and pro-bono lawyers for case preparation, 
                document drafting, and procedural guidance — all ethically supervised.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/submit-case">
                    Get Legal Help
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/how-it-works">
                    <GraduationCap className="h-5 w-5" />
                    Become a Contributor
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-primary-foreground/60 flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                This is not legal representation. Read our{' '}
                <Link to="/disclaimer" className="underline hover:text-primary-foreground">
                  disclaimer
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Disclaimer Banner */}
        <section className="container -mt-12 relative z-10">
          <DisclaimerBanner className="shadow-lg" />
        </section>

        {/* Stats Section */}
        <section className="py-16 border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                How LegalBridge Helps You
              </h2>
              <p className="text-muted-foreground text-lg">
                A structured, ethical approach to legal assistance that respects professional boundaries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Simple 4-Step Process
              </h2>
              <p className="text-muted-foreground text-lg">
                From case submission to connection, we've streamlined the entire journey.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {howItWorks.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="bg-card rounded-xl p-6 border border-border h-full">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Categories Preview */}
        <section className="py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Legal Categories We Cover
              </h2>
              <p className="text-muted-foreground text-lg">
                From consumer disputes to cyber crimes, find help for your specific situation.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CASE_CATEGORIES.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  to={`/submit-case?category=${category.id}`}
                  className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <span className="text-2xl mb-3 block">{category.icon}</span>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/submit-case">
                  View All Categories
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What We Don't Do Section */}
        <section className="py-20 bg-destructive/5">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Clear Boundaries
                </h2>
                <p className="text-muted-foreground text-lg">
                  LegalBridge is committed to ethical legal assistance within professional boundaries.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border border-success/30">
                  <h3 className="font-semibold text-success flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-5 w-5" />
                    What We Do
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      Case preparation and documentation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      Procedural guidance and explanations
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      Document drafting assistance
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      Connect you with verified contributors
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-destructive/30">
                  <h3 className="font-semibold text-destructive flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5" />
                    What We Don't Do
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      Court representation
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      Legal verdicts or guarantees
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      Payment processing between parties
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      Freelancing or bidding marketplace
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Whether you need help or want to contribute, LegalBridge is here to bridge the gap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/submit-case">
                    Submit Your Case
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="xl" asChild>
                  <Link to="/contributors">
                    Browse Contributors
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

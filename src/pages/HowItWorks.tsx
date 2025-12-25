import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Search, 
  Users, 
  Shield, 
  MessageCircle, 
  CheckCircle2,
  ArrowRight,
  Scale,
  GraduationCap,
  Briefcase,
  AlertTriangle,
  BookOpen,
  Award
} from 'lucide-react';

const HowItWorks = () => {
  const seekerSteps = [
    {
      step: 1,
      icon: FileText,
      title: 'Select Your Case Type',
      description: 'Choose from categories like rent disputes, consumer issues, cyber crime, and more. Select a subcategory and indicate urgency.',
    },
    {
      step: 2,
      icon: Search,
      title: 'Describe Your Situation',
      description: 'Answer guided questions about what happened, when it started, and what outcome you\'re seeking. Upload any supporting documents.',
    },
    {
      step: 3,
      icon: Users,
      title: 'Find a Contributor',
      description: 'Browse matched law interns, paralegals, or pro-bono lawyers. View their expertise and availability before connecting.',
    },
    {
      step: 4,
      icon: Shield,
      title: 'Accept Ethics Terms',
      description: 'Both you and the contributor must agree to platform ethics and acknowledge this is not legal representation.',
    },
    {
      step: 5,
      icon: MessageCircle,
      title: 'Collaborate Safely',
      description: 'Work together on case preparation, document drafting, and procedural guidance. Your identity remains protected.',
    },
    {
      step: 6,
      icon: CheckCircle2,
      title: 'Get Prepared',
      description: 'Receive a prepared case summary. Complex cases can be escalated to professional lawyers if needed.',
    },
  ];

  const contributorBenefits = [
    {
      icon: GraduationCap,
      role: 'Law Interns',
      benefits: [
        'Gain real-world case experience',
        'Build your portfolio ethically',
        'Learn from complex scenarios',
        'Earn verified contribution certificates',
      ],
    },
    {
      icon: Briefcase,
      role: 'Paralegals',
      benefits: [
        'Help underserved communities',
        'Expand your expertise areas',
        'Work on diverse case types',
        'Collaborate with legal professionals',
      ],
    },
    {
      icon: Scale,
      role: 'Pro Bono Lawyers',
      benefits: [
        'Receive prepared case summaries',
        'Supervise complex cases',
        'Mentor the next generation',
        'Fulfill pro bono commitments easily',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
                How LegalBridge Works
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                A structured, ethical approach to connecting those who need legal help 
                with those who can provide guidance — all within professional boundaries.
              </p>
              <DisclaimerBanner />
            </div>
          </div>
        </section>

        {/* For Case Seekers */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-4">
                For Case Seekers
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Follow these steps to get legal guidance for your situation
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-1/2" />

                {seekerSteps.map((item, index) => (
                  <div
                    key={item.step}
                    className={`relative flex items-start gap-6 mb-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary transform -translate-x-1/2 mt-6 z-10" />

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Step {item.step}</span>
                              <h3 className="font-semibold text-foreground">{item.title}</h3>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button variant="default" size="lg" asChild>
                <Link to="/submit-case">
                  Submit Your Case
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Contributors */}
        <section className="py-16 md:py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-4">
                For Contributors
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Join our network and make a real difference while building your legal career
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {contributorBenefits.map((item) => (
                <Card key={item.role} className="h-full">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-4">{item.role}</h3>
                    <ul className="space-y-2">
                      {item.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/join">
                  <GraduationCap className="h-4 w-4" />
                  Become a Contributor
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Ethics & Safety */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-2xl md:text-4xl font-bold text-foreground mb-4">
                  Ethics & Safety First
                </h2>
                <p className="text-muted-foreground text-lg">
                  LegalBridge maintains strict ethical guidelines to protect everyone
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-foreground">Privacy Protection</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Personal identity details are hidden</li>
                      <li>• Only anonymized case summaries are shared</li>
                      <li>• No phone numbers or addresses visible</li>
                      <li>• Full consent logging</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-foreground">Clear Boundaries</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• No court representation</li>
                      <li>• No legal verdicts or guarantees</li>
                      <li>• No money exchange on platform</li>
                      <li>• No freelancing or bidding</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertTriangle className="h-6 w-6 text-warning" />
                      <h3 className="font-semibold text-foreground">Escalation Protocol</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Medium complexity → Supervisor suggested</li>
                      <li>• High complexity → Lawyer-only escalation</li>
                      <li>• Clear guidance when professional help needed</li>
                      <li>• Referral to legal aid services</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold text-foreground">Verified Contributors</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Identity verification required</li>
                      <li>• Declaration of credentials</li>
                      <li>• Ethics acceptance mandatory</li>
                      <li>• Regular platform guidelines review</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-hero text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Join thousands of Indians who have found legal guidance through LegalBridge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/submit-case">
                    Submit a Case
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

export default HowItWorks;

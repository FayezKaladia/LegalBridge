import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { ContributorCard } from '@/components/ContributorCard';
import { ConsentModal } from '@/components/ConsentModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Contributor, ContributorRole, INDIAN_STATES } from '@/types/legal';
import { Search, Filter, Users, GraduationCap, Briefcase, Scale } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for contributors
const MOCK_CONTRIBUTORS: Contributor[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'intern',
    experienceYears: 1,
    interests: ['Consumer Protection', 'Cyber Crime', 'RTI'],
    city: 'Mumbai',
    state: 'Maharashtra',
    availability: 'available',
    canAssistWith: ['drafting', 'guidance'],
    bio: 'Final year law student from NLU Mumbai. Passionate about consumer rights and digital privacy law.',
    casesHandled: 12,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Rahul Verma',
    role: 'paralegal',
    experienceYears: 3,
    interests: ['Property Disputes', 'Family Law', 'Documentation'],
    city: 'Delhi',
    state: 'Delhi',
    availability: 'available',
    canAssistWith: ['drafting', 'guidance'],
    bio: 'Experienced paralegal specializing in property documentation and family law matters.',
    casesHandled: 45,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Adv. Meera Krishnan',
    role: 'lawyer',
    experienceYears: 8,
    interests: ['Employment Law', 'Labor Disputes', 'Contract Law'],
    city: 'Bangalore',
    state: 'Karnataka',
    availability: 'limited',
    canAssistWith: ['drafting', 'guidance', 'supervision'],
    bio: 'Pro bono advocate with 8+ years experience in employment and labor law. Available for case supervision.',
    casesHandled: 120,
    rating: 4.95,
  },
  {
    id: '4',
    name: 'Amit Patel',
    role: 'intern',
    experienceYears: 0,
    interests: ['Criminal Law', 'FIR Assistance', 'Police Matters'],
    city: 'Ahmedabad',
    state: 'Gujarat',
    availability: 'available',
    canAssistWith: ['drafting', 'guidance'],
    bio: 'LLB graduate interested in criminal law procedures and police-related legal matters.',
    casesHandled: 5,
    rating: 4.5,
  },
  {
    id: '5',
    name: 'Sunita Reddy',
    role: 'paralegal',
    experienceYears: 5,
    interests: ['Government Services', 'Pension', 'Documentation'],
    city: 'Hyderabad',
    state: 'Telangana',
    availability: 'available',
    canAssistWith: ['drafting', 'guidance'],
    bio: 'Specialized in government service matters, pension claims, and official documentation.',
    casesHandled: 78,
    rating: 4.85,
  },
  {
    id: '6',
    name: 'Adv. Vikram Singh',
    role: 'lawyer',
    experienceYears: 12,
    interests: ['Property Law', 'Land Disputes', 'Real Estate'],
    city: 'Jaipur',
    state: 'Rajasthan',
    availability: 'available',
    canAssistWith: ['drafting', 'guidance', 'supervision'],
    bio: 'Senior advocate specializing in property and land disputes. Offers pro bono supervision for complex cases.',
    casesHandled: 200,
    rating: 4.92,
  },
];

const Contributors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<ContributorRole | 'all'>('all');
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

  const filteredContributors = MOCK_CONTRIBUTORS.filter((contributor) => {
    const matchesSearch =
      searchQuery === '' ||
      contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributor.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesState = selectedState === 'all' || selectedState === '' || contributor.state === selectedState;
    const matchesRole = selectedRole === 'all' || contributor.role === selectedRole;
    return matchesSearch && matchesState && matchesRole;
  });

  const contributorsByRole = {
    intern: filteredContributors.filter((c) => c.role === 'intern'),
    paralegal: filteredContributors.filter((c) => c.role === 'paralegal'),
    lawyer: filteredContributors.filter((c) => c.role === 'lawyer'),
  };

  const handleConnect = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setShowConsentModal(true);
  };

  const handleConsentAccept = () => {
    setShowConsentModal(false);
    toast.success(`Connection request sent to ${selectedContributor?.name}!`, {
      description: 'They will be notified and can accept your request.',
    });
    setSelectedContributor(null);
  };

  const roleIcons = {
    intern: GraduationCap,
    paralegal: Briefcase,
    lawyer: Scale,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              Find Contributors
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with verified law interns, paralegals, and pro-bono lawyers
            </p>
          </div>

          <DisclaimerBanner className="mb-8" />

          {/* Filters */}
          <div className="bg-card border border-border rounded-xl p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="sr-only">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name or expertise..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <Label htmlFor="state-filter" className="sr-only">State</Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger id="state-filter">
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              {filteredContributors.length} contributors found
            </span>
          </div>

          {/* Contributor Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all" className="gap-2">
                <Users className="h-4 w-4" />
                All ({filteredContributors.length})
              </TabsTrigger>
              <TabsTrigger value="intern" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                Law Interns ({contributorsByRole.intern.length})
              </TabsTrigger>
              <TabsTrigger value="paralegal" className="gap-2">
                <Briefcase className="h-4 w-4" />
                Paralegals ({contributorsByRole.paralegal.length})
              </TabsTrigger>
              <TabsTrigger value="lawyer" className="gap-2">
                <Scale className="h-4 w-4" />
                Pro Bono Lawyers ({contributorsByRole.lawyer.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredContributors.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No contributors found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredContributors.map((contributor) => (
                    <ContributorCard
                      key={contributor.id}
                      contributor={contributor}
                      onConnect={handleConnect}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {(['intern', 'paralegal', 'lawyer'] as ContributorRole[]).map((role) => (
              <TabsContent key={role} value={role} className="space-y-4">
                {contributorsByRole[role].length === 0 ? (
                  <div className="text-center py-12">
                    {(() => {
                      const Icon = roleIcons[role];
                      return <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />;
                    })()}
                    <h3 className="font-semibold text-foreground mb-2">
                      No {role === 'intern' ? 'law interns' : role === 'paralegal' ? 'paralegals' : 'lawyers'} found
                    </h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {contributorsByRole[role].map((contributor) => (
                      <ContributorCard
                        key={contributor.id}
                        contributor={contributor}
                        onConnect={handleConnect}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {/* Escalation Notice */}
          <div className="mt-12 bg-info/10 border border-info/30 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">Need More Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If your case is complex or requires professional legal intervention, we recommend 
              connecting with a Pro Bono Lawyer or seeking formal legal aid.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">NALSA Legal Aid</Badge>
              <Badge variant="outline">State Legal Services Authority</Badge>
              <Badge variant="outline">District Legal Services</Badge>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ConsentModal
        isOpen={showConsentModal}
        onClose={() => {
          setShowConsentModal(false);
          setSelectedContributor(null);
        }}
        onAccept={handleConsentAccept}
        userType="seeker"
      />
    </div>
  );
};

export default Contributors;

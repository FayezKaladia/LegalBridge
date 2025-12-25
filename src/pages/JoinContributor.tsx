import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ContributorType = 'lawyer' | 'paralegal' | 'intern' | 'student';

const JoinContributor = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    contributorType: '' as ContributorType | '',
    specialization: '',
    experience: '',
    education: '',
    barLicense: '',
    languages: [] as string[],
    bio: '',
    availability: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const contributorTypes = [
    { value: 'lawyer', label: 'Lawyer', description: 'Licensed attorney' },
    { value: 'paralegal', label: 'Paralegal', description: 'Legal assistant with training' },
    { value: 'intern', label: 'Law Student/Intern', description: 'Law student or legal intern' },
    { value: 'student', label: 'Pre-Law Student', description: 'Undergraduate student interested in law' }
  ];

  const specializations = [
    'Criminal Law',
    'Civil Law',
    'Family Law',
    'Corporate Law',
    'Constitutional Law',
    'Environmental Law',
    'Human Rights Law',
    'Intellectual Property',
    'Tax Law',
    'Immigration Law',
    'Other'
  ];

  const languages = [
    'English',
    'Hindi',
    'Bengali',
    'Telugu',
    'Marathi',
    'Tamil',
    'Urdu',
    'Gujarati',
    'Kannada',
    'Odia',
    'Punjabi',
    'Malayalam',
    'Assamese',
    'Maithili',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.contributorType) newErrors.contributorType = 'Please select your role';
    if (!formData.specialization) newErrors.specialization = 'Please select your specialization';
    if (!formData.experience) newErrors.experience = 'Experience level is required';
    if (!formData.education.trim()) newErrors.education = 'Education details are required';
    if (formData.contributorType === 'lawyer' && !formData.barLicense.trim()) {
      newErrors.barLicense = 'Bar license number is required for lawyers';
    }
    if (!formData.bio.trim()) newErrors.bio = 'Please provide a brief bio';
    if (!formData.availability) newErrors.availability = 'Please select your availability';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const newLanguages = checked
      ? [...formData.languages, language]
      : formData.languages.filter(lang => lang !== language);
    handleInputChange('languages', newLanguages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      toast.success('Application submitted successfully!', {
        description: 'We\'ll review your application and get back to you within 2-3 business days.',
      });

      navigate('/');
    } catch (error) {
      toast.error('Submission failed', {
        description: 'Please try again or contact support if the problem persists.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              Join as a Contributor
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help others navigate the legal system. Share your expertise and make a difference
              in people's lives by providing guidance on legal matters.
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Contributor Application
              </CardTitle>
              <CardDescription>
                Please provide your details below. All information will be kept confidential.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={cn(errors.firstName && "border-destructive")}
                        disabled={isLoading}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={cn(errors.lastName && "border-destructive")}
                        disabled={isLoading}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={cn("pl-10", errors.email && "border-destructive")}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={cn("pl-10", errors.phone && "border-destructive")}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={cn("pl-10", errors.city && "border-destructive")}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.city && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        placeholder="Your state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={cn(errors.state && "border-destructive")}
                        disabled={isLoading}
                      />
                      {errors.state && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Information
                  </h3>

                  <div className="space-y-2">
                    <Label>Role Type *</Label>
                    <Select
                      value={formData.contributorType}
                      onValueChange={(value) => handleInputChange('contributorType', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger className={cn(errors.contributorType && "border-destructive")}>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {contributorTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-muted-foreground">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.contributorType && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.contributorType}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Legal Specialization *</Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => handleInputChange('specialization', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className={cn(errors.specialization && "border-destructive")}>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.specialization && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.specialization}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Experience Level *</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleInputChange('experience', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className={cn(errors.experience && "border-destructive")}>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.experience && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.experience}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education & Qualifications *</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="education"
                        placeholder="e.g., LLB from Delhi University, Bar Council certification, etc."
                        value={formData.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        className={cn("pl-10 min-h-[80px]", errors.education && "border-destructive")}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.education && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.education}
                      </p>
                    )}
                  </div>

                  {formData.contributorType === 'lawyer' && (
                    <div className="space-y-2">
                      <Label htmlFor="barLicense">Bar License Number *</Label>
                      <div className="relative">
                        <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="barLicense"
                          placeholder="State Bar Council enrollment number"
                          value={formData.barLicense}
                          onChange={(e) => handleInputChange('barLicense', e.target.value)}
                          className={cn("pl-10", errors.barLicense && "border-destructive")}
                          disabled={isLoading}
                        />
                      </div>
                      {errors.barLicense && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.barLicense}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Languages Spoken</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lang-${language}`}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={(checked) =>
                              handleLanguageChange(language, checked as boolean)
                            }
                            disabled={isLoading}
                          />
                          <Label
                            htmlFor={`lang-${language}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your experience, motivation to help others, and any specific areas you'd like to focus on..."
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className={cn("min-h-[100px]", errors.bio && "border-destructive")}
                      disabled={isLoading}
                    />
                    {errors.bio && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.bio}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Availability *</Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(value) => handleInputChange('availability', value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger className={cn(errors.availability && "border-destructive")}>
                        <SelectValue placeholder="How much time can you dedicate?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                        <SelectItem value="part-time">Part-time (20-30 hours/week)</SelectItem>
                        <SelectItem value="occasional">Occasional (5-10 hours/week)</SelectItem>
                        <SelectItem value="flexible">Flexible (as needed)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.availability && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.availability}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) =>
                        handleInputChange('termsAccepted', checked as boolean)
                      }
                      disabled={isLoading}
                      className={cn(errors.termsAccepted && "border-destructive")}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions *
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        I agree to provide accurate information and understand that my contributions
                        will be reviewed for quality and appropriateness. I commit to maintaining
                        confidentiality and providing helpful, ethical guidance.
                      </p>
                      {errors.termsAccepted && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.termsAccepted}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Submitting Application...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Alert */}
          <Alert className="mt-6 border-info/50 bg-info/5">
            <CheckCircle2 className="h-4 w-4 text-info" />
            <AlertDescription className="text-sm">
              <strong>What happens next?</strong> We'll review your application within 2-3 business days.
              If approved, you'll receive an email with next steps to start contributing to cases.
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JoinContributor;

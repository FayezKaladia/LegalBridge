import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { CaseCategoryCard } from '@/components/CaseCategoryCard';
import { ConsentModal } from '@/components/ConsentModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CASE_CATEGORIES, INDIAN_STATES, CaseCategory, CaseData, UrgencyLevel } from '@/types/legal';
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Clock,
  Upload,
  CheckCircle2,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Step = 1 | 2 | 3 | 4;

const SubmitCase = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [showConsentModal, setShowConsentModal] = useState(false);

  // Form state
  const [selectedCategory, setSelectedCategory] = useState<CaseCategory | null>(
    initialCategory ? CASE_CATEGORIES.find(c => c.id === initialCategory) || null : null
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('normal');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Step 2 form state
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progress = (currentStep / 4) * 100;

  const canProceedStep1 = selectedCategory && selectedSubcategory && city && state;
  const canProceedStep2 = description.length >= 50 && timeline && desiredOutcome;

  const handleCategorySelect = (category: CaseCategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      setShowConsentModal(true);
    } else if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handleConsentAccept = () => {
    setShowConsentModal(false);
    setCurrentStep(4);
    toast.success('Case submitted successfully!', {
      description: 'You can now browse contributors to find help.',
    });
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleFindContributors = () => {
    navigate('/contributors');
  };

  const determineComplexity = () => {
    // Simple complexity determination logic
    if (urgency === 'urgent' || description.length > 500) return 'high';
    if (description.length > 200) return 'medium';
    return 'low';
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        toast.error(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return;
      }

      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`File "${file.name}" is not a supported format. Only PDF and images are allowed.`);
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) uploaded successfully.`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.success('File removed successfully.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                {currentStep === 4 ? 'Case Submitted' : 'Submit Your Case'}
              </h1>
              <Badge variant="secondary" className="text-sm">
                Step {currentStep} of 4
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className={cn(currentStep >= 1 && "text-primary font-medium")}>Select Type</span>
              <span className={cn(currentStep >= 2 && "text-primary font-medium")}>Case Details</span>
              <span className={cn(currentStep >= 3 && "text-primary font-medium")}>Review</span>
              <span className={cn(currentStep >= 4 && "text-primary font-medium")}>Submitted</span>
            </div>
          </div>

          <DisclaimerBanner className="mb-8" />

          {/* Step 1: Category Selection */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>What type of legal issue do you have?</CardTitle>
                  <CardDescription>
                    Select the category that best describes your situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {CASE_CATEGORIES.map((category) => (
                      <CaseCategoryCard
                        key={category.id}
                        category={category}
                        isSelected={selectedCategory?.id === category.id}
                        onSelect={handleCategorySelect}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedCategory && (
                <Card className="animate-slide-up">
                  <CardHeader>
                    <CardTitle>Select Subcategory</CardTitle>
                    <CardDescription>
                      Choose a more specific issue type for {selectedCategory.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedSubcategory(sub)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            selectedSubcategory === sub
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          )}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Case Urgency & Location</CardTitle>
                  <CardDescription>
                    Help us match you with contributors in your area
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Urgency Level</Label>
                    <RadioGroup
                      value={urgency}
                      onValueChange={(v) => setUrgency(v as UrgencyLevel)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="normal" />
                        <Label htmlFor="normal" className="cursor-pointer flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          Normal
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent" className="cursor-pointer flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-warning" />
                          Urgent
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_STATES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Case Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Tell Us About Your Case</CardTitle>
                  <CardDescription>
                    Provide details so contributors can understand your situation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      What happened? <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your situation in detail. Include relevant facts, dates, and people involved. Minimum 50 characters."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[150px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      {description.length}/50 minimum characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">
                      When did this start? <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 3 months ago, January 2024, etc."
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outcome">
                      What outcome are you hoping for? <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="outcome"
                      placeholder="Describe what resolution you're looking for"
                      value={desiredOutcome}
                      onChange={(e) => setDesiredOutcome(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documents">Supporting Documents (Optional)</Label>
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={handleFileInputClick}
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop files here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, Images (max 10MB each)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files)}
                      />
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Uploaded Files:</Label>
                        <div className="space-y-1">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-secondary/50 rounded-lg p-2">
                              <div className="flex items-center gap-2">
                                <Upload className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-6 w-6 p-0 hover:bg-destructive/20"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Case</CardTitle>
                  <CardDescription>
                    Please verify the information before submitting
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-muted-foreground text-xs">Category</Label>
                      <p className="font-medium">{selectedCategory?.name}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Subcategory</Label>
                      <p className="font-medium">{selectedSubcategory}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Location</Label>
                      <p className="font-medium">{city}, {state}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Urgency</Label>
                      <Badge variant={urgency === 'urgent' ? 'destructive' : 'secondary'}>
                        {urgency === 'urgent' ? 'Urgent' : 'Normal'}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Complexity Assessment</Label>
                      <Badge variant="outline" className="capitalize">
                        {determineComplexity()}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-xs">Timeline</Label>
                      <p className="font-medium">{timeline}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-xs">Description</Label>
                    <p className="mt-1 text-sm bg-secondary/50 p-4 rounded-lg">
                      {description}
                    </p>
                  </div>

                  <div>
                    <Label className="text-muted-foreground text-xs">Desired Outcome</Label>
                    <p className="mt-1 text-sm bg-secondary/50 p-4 rounded-lg">
                      {desiredOutcome}
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div>
                      <Label className="text-muted-foreground text-xs">Supporting Documents</Label>
                      <div className="mt-1 space-y-1">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 bg-secondary/50 p-2 rounded-lg">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-info/10 border border-info/30 rounded-lg p-4 text-sm">
                    <p className="font-medium text-foreground mb-2">What happens next?</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Your personal details will remain hidden</li>
                      <li>• Only the case summary will be visible to contributors</li>
                      <li>• You'll be asked to accept ethics & consent terms</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <Card className="text-center py-8">
                <CardContent>
                  <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Case Submitted Successfully!
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your case has been submitted. You can now browse contributors who can help 
                    with your {selectedCategory?.name.toLowerCase()} case.
                  </p>

                  <div className="bg-secondary/50 rounded-lg p-4 max-w-sm mx-auto mb-6 text-left">
                    <p className="text-xs text-muted-foreground mb-2">Case Reference</p>
                    <p className="font-mono font-medium text-foreground">
                      LB-{Date.now().toString(36).toUpperCase()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="default" size="lg" onClick={handleFindContributors}>
                      Find Contributors
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => navigate('/')}>
                      Back to Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !canProceedStep1) ||
                  (currentStep === 2 && !canProceedStep2)
                }
              >
                {currentStep === 3 ? 'Submit Case' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <ConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onAccept={handleConsentAccept}
        userType="seeker"
      />
    </div>
  );
};

export default SubmitCase;

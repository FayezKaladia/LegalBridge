import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, AlertTriangle, Scale } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  userType: 'seeker' | 'contributor';
}

export function ConsentModal({ isOpen, onClose, onAccept, userType }: ConsentModalProps) {
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);

  const allConsented = consent1 && consent2 && consent3;

  const handleAccept = () => {
    if (allConsented) {
      onAccept();
    }
  };

  const seekerPoints = [
    {
      id: 'seeker-1',
      label: 'I understand this is NOT legal representation',
      description: 'LegalBridge connects you with volunteers for guidance and case preparation only.',
    },
    {
      id: 'seeker-2',
      label: 'I will not share false information',
      description: 'All information provided must be truthful to the best of my knowledge.',
    },
    {
      id: 'seeker-3',
      label: 'I consent to sharing anonymized case details',
      description: 'My personal identity will remain hidden; only case-relevant information will be shared.',
    },
  ];

  const contributorPoints = [
    {
      id: 'contributor-1',
      label: 'I will NOT provide legal advice for court matters',
      description: 'I understand that court representation and legal verdicts are outside the scope of this platform.',
    },
    {
      id: 'contributor-2',
      label: 'I will maintain confidentiality',
      description: 'All case details and user information shared will remain confidential.',
    },
    {
      id: 'contributor-3',
      label: 'I will escalate complex cases responsibly',
      description: 'If a case requires professional legal intervention, I will recommend proper escalation.',
    },
  ];

  const points = userType === 'seeker' ? seekerPoints : contributorPoints;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="font-serif text-xl">
                Ethics & Consent Agreement
              </DialogTitle>
              <DialogDescription>
                Please review and accept the following terms
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            <strong>Important:</strong> This platform facilitates legal guidance and case preparation. 
            It does not replace professional legal representation.
          </p>
        </div>

        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="consent-1" 
              checked={consent1} 
              onCheckedChange={(checked) => setConsent1(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="consent-1" className="font-medium cursor-pointer">
                {points[0].label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {points[0].description}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="consent-2" 
              checked={consent2} 
              onCheckedChange={(checked) => setConsent2(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="consent-2" className="font-medium cursor-pointer">
                {points[1].label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {points[1].description}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="consent-3" 
              checked={consent3} 
              onCheckedChange={(checked) => setConsent3(checked as boolean)}
            />
            <div className="space-y-1">
              <Label htmlFor="consent-3" className="font-medium cursor-pointer">
                {points[2].label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {points[2].description}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={onClose} className="sm:flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleAccept} 
            disabled={!allConsented}
            className="sm:flex-1"
          >
            <Shield className="h-4 w-4" />
            I Agree & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Contributor, ContributorRole } from '@/types/legal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Star, FileText, MessageCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContributorCardProps {
  contributor: Contributor;
  onConnect: (contributor: Contributor) => void;
}

const roleLabels: Record<ContributorRole, { label: string; color: string }> = {
  intern: { label: 'Law Intern', color: 'bg-info/10 text-info border-info/30' },
  paralegal: { label: 'Paralegal', color: 'bg-success/10 text-success border-success/30' },
  lawyer: { label: 'Pro Bono Lawyer', color: 'bg-accent/10 text-accent border-accent/30' },
};

const availabilityLabels = {
  available: { label: 'Available', color: 'text-success' },
  limited: { label: 'Limited', color: 'text-warning' },
  unavailable: { label: 'Unavailable', color: 'text-muted-foreground' },
};

export function ContributorCard({ contributor, onConnect }: ContributorCardProps) {
  const roleInfo = roleLabels[contributor.role];
  const availInfo = availabilityLabels[contributor.availability];

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar placeholder */}
          <div className="relative shrink-0">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-xl font-serif font-bold text-primary">
                {contributor.name.charAt(0)}
              </span>
            </div>
            <div 
              className={cn(
                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card",
                contributor.availability === 'available' && "bg-success",
                contributor.availability === 'limited' && "bg-warning",
                contributor.availability === 'unavailable' && "bg-muted"
              )}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-foreground truncate">
                {contributor.name}
              </h3>
              {contributor.rating && (
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-muted-foreground">{contributor.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
            
            <Badge variant="outline" className={cn("mb-2", roleInfo.color)}>
              {roleInfo.label}
            </Badge>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {contributor.city}, {contributor.state}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {contributor.experienceYears} yrs exp
              </span>
              <span className={cn("flex items-center gap-1", availInfo.color)}>
                <span className="h-2 w-2 rounded-full bg-current" />
                {availInfo.label}
              </span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {contributor.bio}
            </p>

            {/* Interests */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {contributor.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {contributor.interests.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{contributor.interests.length - 3}
                </Badge>
              )}
            </div>

            {/* Can assist with */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Shield className="h-3.5 w-3.5" />
              <span>Can assist with:</span>
              {contributor.canAssistWith.map((item, i) => (
                <span key={item} className="capitalize">
                  {item}{i < contributor.canAssistWith.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="default" 
                size="sm"
                onClick={() => onConnect(contributor)}
                disabled={contributor.availability === 'unavailable'}
                className="flex-1"
              >
                <MessageCircle className="h-4 w-4" />
                Request to Connect
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

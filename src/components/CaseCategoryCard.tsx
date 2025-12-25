import { CaseCategory } from '@/types/legal';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface CaseCategoryCardProps {
  category: CaseCategory;
  isSelected: boolean;
  onSelect: (category: CaseCategory) => void;
}

export function CaseCategoryCard({ category, isSelected, onSelect }: CaseCategoryCardProps) {
  return (
    <button
      onClick={() => onSelect(category)}
      className={cn(
        "group relative w-full p-5 rounded-xl text-left transition-all duration-300",
        "border-2 hover:shadow-lg",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl" role="img" aria-label={category.name}>
          {category.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-foreground mb-1 transition-colors",
            isSelected && "text-primary"
          )}>
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description}
          </p>
        </div>
        <ChevronRight 
          className={cn(
            "h-5 w-5 text-muted-foreground transition-all",
            "group-hover:translate-x-1 group-hover:text-primary",
            isSelected && "text-primary"
          )} 
        />
      </div>
      
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse-soft" />
        </div>
      )}
    </button>
  );
}

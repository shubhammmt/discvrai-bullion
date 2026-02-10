import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Briefcase, IndianRupee, Award } from 'lucide-react';
import type { CourseProgram } from '@/data/aptechCourseData';

interface AptechCourseCardProps {
  course: CourseProgram;
}

const AptechCourseCard = ({ course }: AptechCourseCardProps) => {
  const brandColor = course.brand === 'MAAC' ? 'from-blue-600 to-indigo-700' : course.brand === 'Arena Animation' ? 'from-orange-500 to-red-500' : 'from-teal-500 to-cyan-600';

  return (
    <Card className="overflow-hidden border-border/60 shadow-md hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className={`bg-gradient-to-r ${brandColor} px-4 py-2.5`}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">{course.name}</h4>
          <Badge className="bg-white/20 text-white border-0 text-[10px]">{course.brand}</Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
          <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />{course.priceRange}</span>
          <span className="flex items-center gap-1"><Award className="h-3 w-3" />{course.placementRate} placement</span>
        </div>

        {/* Career Outcomes */}
        <div>
          <p className="text-xs font-medium text-foreground mb-1 flex items-center gap-1"><Briefcase className="h-3 w-3" /> Career Outcomes</p>
          <div className="flex flex-wrap gap-1">
            {course.careerOutcomes.map(c => (
              <Badge key={c} variant="secondary" className="text-[10px] font-normal">{c}</Badge>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1">
          {course.tools.map(t => (
            <span key={t} className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">{t}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AptechCourseCard;

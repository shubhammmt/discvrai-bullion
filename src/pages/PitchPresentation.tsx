import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { VisionSlide } from '@/components/pitch/VisionSlide';
import { ProblemSlide } from '@/components/pitch/ProblemSlide';
import { SolutionSlide } from '@/components/pitch/SolutionSlide';
import { ValuePropositionSlide } from '@/components/pitch/ValuePropositionSlide';
import { TeamSlide } from '@/components/pitch/TeamSlide';
import { TractionSlide } from '@/components/pitch/TractionSlide';
import { MarketSizeSlide } from '@/components/pitch/MarketSizeSlide';
import { BusinessModelSlide } from '@/components/pitch/BusinessModelSlide';
import { InvestmentHighlightsSlide } from '@/components/pitch/InvestmentHighlightsSlide';
import { PlatformVisionSlide } from '@/components/pitch/PlatformVisionSlide';

const PitchPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Vision",
      component: VisionSlide,
      props: {
        slide: {
          title: "Democratizing Financial Discovery",
          subtitle: "AI-powered platform for every Indian investor",
          icon: ArrowRight,
          vision: "From 'What should I invest in?' to the perfect financial product in seconds.",
          metrics: [
            { metric: "50M+", value: "Potential Investors" },
            { metric: "₹24,000 Cr", value: "Addressable Market" }
          ]
        }
      }
    },
    {
      id: 2,
      title: "Problem",
      component: ProblemSlide,
      props: {
        slide: {
          title: "The Problem",
          problems: [
            "Choice Paralysis: 50,000+ financial products",
            "Information Overload: Biased and complex data",
            "Lack of Personalization: Generic advice for everyone",
            "Execution Barriers: Discovery to investment is fragmented"
          ]
        }
      }
    },
    {
      id: 3,
      title: "Solution",
      component: SolutionSlide,
      props: {
        slide: {
          title: "Our Solution",
          solutions: [
            "AI-Powered Discovery: Personalized recommendations",
            "Simplified Insights: Transparent and unbiased data",
            "Seamless Execution: Integrated investment platform",
          ],
          image: "/images/solution-diagram.png"
        }
      }
    },
    {
      id: 4,
      title: "Value Proposition",
      component: ValuePropositionSlide,
      props: {
        slide: {
          title: "Value Proposition",
          valueProps: [
            { title: "Personalized", description: "AI learns your financial DNA", icon: ArrowRight },
            { title: "Simplified", description: "Complex data made easy", icon: ArrowRight },
            { title: "Actionable", description: "Discovery to execution in one place", icon: ArrowRight }
          ]
        }
      }
    },
    {
      id: 5,
      title: "Team",
      component: TeamSlide,
      props: {
        slide: {
          title: "Our Team",
          members: [
            { name: "Aditya Sharma", role: "CEO", experience: "Ex-Goldman Sachs, IIT Delhi" },
            { name: "Priya Patel", role: "CTO", experience: "Ex-Google AI, Stanford" },
            { name: "Rahul Verma", role: "CPO", experience: "Ex-Flipkart, IIM Bangalore" }
          ]
        }
      }
    },
    {
      id: 6,
      title: "Traction",
      component: TractionSlide,
      props: {
        slide: {
          title: "Traction",
          metrics: [
            { label: "Users", value: "100,000+" },
            { label: "AI Matches", value: "5 Million+" },
            { label: "Conversion Rate", value: "15%" }
          ],
          charts: [
            { label: "User Growth", data: [10, 20, 30, 40, 50] },
            { label: "Revenue", data: [5, 10, 15, 20, 25] }
          ]
        }
      }
    },
    {
      id: 7,
      title: "Market Size",
      component: MarketSizeSlide,
      props: {
        slide: {
          title: "Market Opportunity",
          marketSize: "₹24,000 Cr",
          growthRate: "15% annually",
          keyTrends: [
            "Rising disposable incomes",
            "Increased internet penetration",
            "Growing financial literacy"
          ]
        }
      }
    },
    {
      id: 8,
      title: "Business Model",
      component: BusinessModelSlide,
      props: {
        slide: {
          title: "Business Model",
          models: [
            { type: "Subscription", description: "Premium AI features", revenue: "₹500/year" },
            { type: "Transaction Fees", description: "Commission on investments", revenue: "0.5%" },
          ]
        }
      }
    },
    {
      id: 9,
      title: "Investment Highlights",
      component: InvestmentHighlightsSlide,
      props: {
        slide: {
          title: "Investment Highlights",
          highlights: [
            "AI-powered financial discovery",
            "Strong team with domain expertise",
            "Proven traction and market validation",
            "Large and growing market opportunity"
          ],
          ask: "₹5 Cr Seed Round"
        }
      }
    },
    {
      id: 10,
      title: "Platform Vision",
      component: PlatformVisionSlide,
      props: {}
    },
  ];

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, slides.length - 1));
  };

  const CurrentSlideComponent = slides[currentSlide].component;
  const currentSlideProps = slides[currentSlide].props;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {slides[currentSlide].title}
        </h1>
        <div className="mb-8">
          <CurrentSlideComponent {...currentSlideProps} />
        </div>
        <div className="flex justify-between">
          <Button onClick={goToPreviousSlide} disabled={currentSlide === 0}>
            <ArrowLeft size={16} className="mr-2" />
            Previous
          </Button>
          <Button onClick={goToNextSlide} disabled={currentSlide === slides.length - 1}>
            Next
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PitchPresentation;

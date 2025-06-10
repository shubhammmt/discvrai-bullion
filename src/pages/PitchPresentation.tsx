
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Target, Users, TrendingUp, Lightbulb, Eye } from 'lucide-react';
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
          icon: Eye,
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
          title: "The Financial Complexity Crisis",
          icon: Target,
          stats: [
            {
              number: "83%",
              label: "Without Guidance",
              description: "Indians make financial decisions without professional guidance"
            },
            {
              number: "40+",
              label: "Hours Research",
              description: "Average time spent researching before decisions"
            },
            {
              number: "3,000+",
              label: "Products",
              description: "Financial products available, creating choice paralysis"
            }
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
          title: "AI-Powered Discovery → One-Click Execution",
          icon: Lightbulb,
          features: [
            {
              title: "Comprehensive Discovery",
              description: "All financial products on one platform"
            },
            {
              title: "AI-Powered Recommendations",
              description: "Based on income, goals, and risk profile"
            },
            {
              title: "Transparent Comparison",
              description: "Real-time pricing, fees, and performance data"
            },
            {
              title: "One-Click Execution",
              description: "Seamless purchase across all product categories"
            },
            {
              title: "Ongoing Optimisation",
              description: "Continuous portfolio monitoring and rebalancing"
            }
          ]
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
            { title: "Personalized", description: "AI learns your financial DNA", icon: Target },
            { title: "Simplified", description: "Complex data made easy", icon: Lightbulb },
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
          icon: Users,
          founder: {
            name: "Shubham Srivastava, CEO & Co-Founder",
            experience: "Scale Expert, AI/ML Pioneer, Leadership",
            points: [
              "Scale Expert: Built platforms serving 100M+ users at Hindustan Times and build 150+ member team in Makemytrip and HindustanTimes",
              "AI/ML Pioneer: Implemented machine learning at scale across MakeMyTrip and Hindustan Times platforms, now building AI-powered search with Discvr",
              "Leadership: IIT Dhanbad graduate who scaled MakeMyTrip's hotels division and drove 20% cost reduction at EurekaForbes"
            ]
          },
          keyStrengths: [
            "Deep domain expertise in financial services and technology",
            "Proven track record of scaling platforms to 100M+ users",
            "Strong technical background in AI/ML implementation",
            "Experience building and managing large engineering teams"
          ],
          plannedHires: [
            "Senior Frontend Engineer with fintech experience",
            "Data Scientist specializing in recommendation systems",
            "Product Manager with financial services background",
            "Compliance and Legal specialist for regulatory requirements"
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
            { label: "User Growth", data: [10000, 25000, 45000, 70000, 100000] }
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
          title: "Market Opportunity - $300 Billion Digital Financial Services",
          marketSize: "₹24,000 Cr",
          growthRate: "15% annually",
          keyTrends: [
            "Rising disposable incomes across urban and semi-urban India",
            "Increased internet penetration and smartphone adoption",
            "Growing financial literacy and investment awareness",
            "Shift towards digital-first financial services"
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
          title: "Revenue Model",
          subtitle: "Transaction-Based, High-Margin Focus",
          icon: TrendingUp,
          whatWeDo: [
            { title: "Mutual Fund Distribution", description: "Trail Commission: 0.1-1% annually" },
            { title: "Credit Products", description: "Commission: 1-3% of loan amount" },
            { title: "Insurance Distribution", description: "Commission: 5-25% of first-year premium" }
          ],
          whatWeDont: [
            { title: "Direct Lending", description: "We don't lend money or take credit risk" },
            { title: "Portfolio Management", description: "We don't manage client funds directly" },
            { title: "Advisory Services", description: "We provide AI recommendations, not human advice" }
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
            "AI-powered financial discovery with proven 15% conversion rate",
            "Strong team with domain expertise and 100M+ user platform experience",
            "Proven traction with 100,000+ users and 5M+ AI matches",
            "Large and growing market opportunity worth ₹24,000 Cr"
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

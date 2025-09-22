import { useState } from "react";
import { ArrowRight, Trophy, Users, Clock, Target, Brain, Lightbulb, Award, Calendar, MapPin, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SXCAIContest() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const categories = [
    {
      title: "🏆 Best Overall AI Strategy",
      description: "Comprehensive business transformation plan combining multiple AI technologies",
      details: "Develop a holistic 3-year AI implementation strategy for a traditional business. Include technology roadmap, change management, ROI projections, and risk mitigation."
    },
    {
      title: "🚀 Most Innovative AI Application",
      description: "Creative problem-solving using emerging AI technologies",
      details: "Present a novel AI solution addressing an industry-specific challenge. Focus on breakthrough applications of LLMs, computer vision, or multimodal AI."
    },
    {
      title: "🌱 AI for Social Impact",
      description: "Leveraging AI for sustainable development and social good",
      details: "Design an AI solution that addresses UN SDGs. Consider ethical implications, accessibility, and scalable impact measurement."
    },
    {
      title: "👥 People's Choice Award",
      description: "Strategy with highest peer evaluation and collaboration score",
      details: "Judged by fellow participants based on presentation quality, feasibility, and potential for real-world implementation."
    },
    {
      title: "⭐ Rising Star Award",
      description: "Outstanding strategy from first or second-year students",
      details: "Recognizing exceptional strategic thinking and AI understanding from early-stage students. Special mentorship opportunities included."
    }
  ];

  const timeline = [
    { date: "15 Dec 2024", event: "Registration Opens", status: "upcoming" },
    { date: "5 Jan 2025", event: "Strategy Submission Deadline", status: "upcoming" },
    { date: "10-12 Jan 2025", event: "Peer Review Period", status: "upcoming" },
    { date: "18 Jan 2025", event: "Final Presentations & Awards", status: "upcoming" }
  ];

  const judges = [
    { name: "Industry AI Leaders", role: "From BCG, McKinsey & Tech Giants" },
    { name: "Academic Experts", role: "IIT/IIM Faculty & Research Heads" },
    { name: "Startup Founders", role: "AI-first Company Leaders" },
    { name: "SXC Alumni", role: "Corporate Strategy Veterans" }
  ];

  const prizes = [
    { category: "Best Overall AI Strategy", amount: "₹5,000", description: "Comprehensive Strategy + Industry Mentorship" },
    { category: "Most Innovative Application", amount: "₹5,000", description: "Creative AI Implementation" },
    { category: "AI for Social Impact", amount: "₹5,000", description: "Sustainable Development Focus" },
    { category: "People's Choice Award", amount: "₹5,000", description: "Highest Peer Evaluation" },
    { category: "Rising Star Award", amount: "₹5,000", description: "Best Early-Year Strategy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <div className="mb-8">
            <img 
              src="/api/placeholder/80/80" 
              alt="SXC Logo" 
              className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-white/20"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              SXC AI Transformation
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Strategy Challenge 2025
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              St. Xavier's College invites brilliant minds to reimagine business strategy in the AI era. 
              Design transformative solutions that will shape the future of industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">300+</div>
              <div className="text-blue-100">Expected Participants</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">₹25,000</div>
              <div className="text-blue-100">Total Prize Pool</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Target className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-blue-100">Award Categories</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 text-lg shadow-xl">
              Register Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 text-lg">
              Download Brief <Brain className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-white text-center">
            <div className="flex items-center justify-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <span>Deadline: 5 Jan 2025</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span>SXC Mumbai Campus</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-400" />
              <span>4-Week Competition</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Globe className="h-5 w-5 text-cyan-400" />
              <span>Open to All Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Competition Categories
          </h2>
          <div className="grid gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                <CardContent className="p-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                      <p className="text-gray-300">{category.description}</p>
                    </div>
                    {expandedCategory === index ? 
                      <ChevronUp className="h-5 w-5 text-white" /> : 
                      <ChevronDown className="h-5 w-5 text-white" />
                    }
                  </div>
                  {expandedCategory === index && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-gray-200 leading-relaxed">{category.details}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Competition Timeline
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0"></div>
                <div className="flex-1 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{item.event}</span>
                    <span className="text-blue-200">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Prizes & Recognition
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prizes.map((prize, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                  <h3 className="font-bold text-white mb-2">{prize.category}</h3>
                  <div className="text-2xl font-bold text-yellow-400 mb-2">{prize.amount}</div>
                  <p className="text-gray-300 text-sm">{prize.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Judges Panel */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-white">
            Distinguished Judges Panel
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {judges.map((judge, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="font-semibold text-white mb-2">{judge.name}</h3>
                <p className="text-gray-300 text-sm">{judge.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Participate?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Lightbulb className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-semibold text-white mb-4">Practical Experience</h3>
              <p className="text-gray-300">Work on real business challenges and develop solutions that matter in today's AI-driven economy.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-semibold text-white mb-4">Industry Networking</h3>
              <p className="text-gray-300">Connect with leading AI professionals, startup founders, and potential mentors from top consulting firms.</p>
            </div>
            <div className="text-center">
              <Trophy className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold text-white mb-4">Career Acceleration</h3>
              <p className="text-gray-300">Gain recognition, build your portfolio, and open doors to internships and job opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform the Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join SXC's most prestigious AI strategy competition and showcase your vision for business transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-12 py-4 text-lg shadow-xl">
              Register Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg">
              Contact Organizers
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center text-gray-300">
          <p className="mb-2">© 2024 St. Xavier's College - AI Transformation Challenge</p>
          <p className="text-sm">For queries: aixaviers@sxc.edu | +91-98765-43210</p>
        </div>
      </footer>
    </div>
  );
}
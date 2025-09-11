import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, AlertTriangle, BookOpen } from 'lucide-react';

const SecurityCompliance = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Security & Compliance
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted & Secure Platform</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We prioritize your security and maintain transparent compliance standards
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Educational Platform Notice */}
          <Card className="border-amber-200/50 bg-amber-50/10">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-100/50 rounded-xl">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Educational Platform</h3>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• We are an educational platform focused on research and analysis</p>
                <p>• No buy/sell advice is provided on our platform</p>
                <p>• All content is for informational purposes only</p>
                <p>• Users must do their own due diligence before investing</p>
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Status */}
          <Card className="border-blue-200/50 bg-blue-50/10">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100/50 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Regulatory Status</h3>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• We are not SEBI registered investment advisors</p>
                <p>• We do not provide investment advisory services</p>
                <p>• Platform focuses on research aggregation and community insights</p>
                <p>• Always consult certified financial advisors for investment decisions</p>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Security */}
          <Card className="border-green-200/50 bg-green-50/10">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100/50 rounded-xl">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Enterprise Security</h3>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Enterprise-grade security infrastructure</p>
                <p>• Best-in-class encryption algorithms</p>
                <p>• Regular security audits and compliance checks</p>
                <p>• Industry-standard data protection protocols</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
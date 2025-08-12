import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 p-0 hover:bg-transparent"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Terms and Conditions</h1>
                <p className="text-muted-foreground text-sm">
                  Last updated: {new Date().toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                <p className="text-foreground leading-relaxed">
                  By accessing and using our platform, creating an account, or using any of our services, you explicitly agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. User Authentication and Account Creation</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>2.1 Authentication Methods:</strong> We provide secure user authentication through Gmail login and OTP-based verification systems.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>2.2 Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>2.3 Terms Acceptance:</strong> By completing the login process, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. Portfolio Management and Data Upload</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>3.1 Upload Methods:</strong> Our platform supports multiple portfolio data upload methods including:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Excel file uploads</li>
                    <li>Manual data entry</li>
                    <li>PDF statement processing</li>
                    <li>Gmail connector integration for automatic portfolio synchronization</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>3.2 Data Accuracy:</strong> You are responsible for ensuring the accuracy of all portfolio data you provide. We are not liable for any decisions made based on inaccurate data.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>3.3 Data Ownership:</strong> You retain ownership of your portfolio data. We act as a processor of your data in accordance with applicable data protection laws.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Portfolio Analysis and Investment Insights</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>4.1 Analysis Scope:</strong> Our platform currently provides analysis for:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Mutual funds</li>
                    <li>Stocks (Indian markets)</li>
                    <li>Future expansion planned for: Cryptocurrency, US Stocks, Bonds, Fixed Deposits, and other financial instruments</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>4.2 Analysis Methodology:</strong> Our portfolio analysis is based on predetermined static rules and algorithms. These analyses are subject to market conditions and may not reflect real-time market dynamics.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>4.3 Limitations:</strong> Our analysis tools are designed to provide general insights and may not account for all personal financial circumstances or market variables.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Educational Purpose and Investment Disclaimer</h2>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800 space-y-3">
                  <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">IMPORTANT DISCLAIMER</h3>
                  <div className="space-y-3">
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>5.1 Not Licensed Investment Advisors:</strong> We are NOT licensed investment advisors, financial planners, or registered investment advisors under SEBI or any other regulatory authority.
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>5.2 Educational Purposes Only:</strong> ALL information, analysis, recommendations, and insights provided on our platform are for EDUCATIONAL PURPOSES ONLY and should not be considered as investment advice.
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>5.3 No Financial Advice:</strong> Nothing on this platform should be construed as a recommendation to buy, sell, or hold any financial instrument.
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>5.4 Consultation Requirement:</strong> You should consult with qualified, licensed financial advisors before making any investment decisions.
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>5.5 Investment Risks:</strong> All investments carry inherent risks, including the potential loss of principal. Past performance is not indicative of future results.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. Data Protection and Privacy Compliance</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>6.1 DPDP Act 2023 Compliance:</strong> We are committed to full compliance with the Digital Personal Data Protection Act, 2023, and all applicable Indian data protection regulations.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.2 IT Act Compliance:</strong> Our platform adheres to the Information Technology Act, 2000, and all subsequent amendments and rules.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.3 Data Processing:</strong> We process your personal data only for legitimate purposes as outlined in our Privacy Policy and with your explicit consent.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.4 Data Rights:</strong> You have the right to access, correct, delete, and port your personal data as per applicable laws.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.5 Cross-Border Data Transfer:</strong> If applicable, any cross-border data transfers will be conducted in compliance with Indian data protection laws.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. Data Security and Storage</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>7.1 Enterprise-Grade Security:</strong> We implement enterprise-grade security measures to protect your data, including:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>End-to-end encryption for data transmission</li>
                    <li>Encrypted data storage</li>
                    <li>Multi-factor authentication systems</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Secure backup and disaster recovery procedures</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>7.2 Data Retention:</strong> We retain your data only as long as necessary for the purposes outlined in these terms or as required by law.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>7.3 Security Incidents:</strong> In the event of a security breach, we will notify affected users and relevant authorities as required by applicable laws.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. User Obligations and Prohibited Activities</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>8.1 Lawful Use:</strong> You agree to use our platform only for lawful purposes and in accordance with these terms.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>8.2 Prohibited Activities:</strong> You shall not:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Upload malicious content or viruses</li>
                    <li>Misrepresent your identity or provide false information</li>
                    <li>Use the platform for any illegal or fraudulent activities</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>9.1 Service Availability:</strong> While we strive for high availability, we do not guarantee uninterrupted service and are not liable for temporary outages or maintenance periods.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>9.2 Financial Losses:</strong> We are not liable for any financial losses resulting from investment decisions made based on information provided on our platform.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>9.3 Third-Party Services:</strong> We are not responsible for the performance or availability of third-party services integrated with our platform.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">10. Modifications to Terms</h2>
                <p className="text-foreground leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. Users will be notified of significant changes via email or platform notifications. Continued use of the platform after such modifications constitutes acceptance of the updated terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">11. Governing Law and Jurisdiction</h2>
                <p className="text-foreground leading-relaxed">
                  These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms or the use of our platform shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">12. Contact Information</h2>
                <p className="text-foreground leading-relaxed">
                  For any questions regarding these Terms and Conditions or our services, please contact us at:
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-foreground">Email: legal@yourcompany.com</p>
                  <p className="text-foreground">Address: [Your Company Address]</p>
                  <p className="text-foreground">Phone: [Your Contact Number]</p>
                </div>
              </section>

              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-muted-foreground text-center">
                  By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
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
                <h1 className="text-3xl font-bold text-foreground mb-4">Privacy Policy</h1>
                <p className="text-muted-foreground text-sm">
                  Last updated: {new Date().toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                <p className="text-foreground leading-relaxed">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our financial analysis platform. We are committed to protecting your privacy and ensuring compliance with the Digital Personal Data Protection Act, 2023, and other applicable Indian data protection laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>2.1 Personal Information:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Name and email address (via Gmail authentication)</li>
                    <li>Phone number (for OTP-based verification)</li>
                    <li>Profile information you voluntarily provide</li>
                    <li>Communication preferences</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>2.2 Financial Information:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Portfolio data (mutual funds, stocks, investments)</li>
                    <li>Financial statements and transaction history</li>
                    <li>Investment preferences and goals</li>
                    <li>Risk assessment responses</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>2.3 Technical Information:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and interaction data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>3.1 Primary Purposes:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Provide portfolio analysis and educational insights</li>
                    <li>Authenticate and secure your account</li>
                    <li>Process and analyze your financial data</li>
                    <li>Deliver personalized educational content</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>3.2 Secondary Purposes:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Improve our services and user experience</li>
                    <li>Send important updates and notifications</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Detect and prevent fraudulent activities</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Legal Basis for Processing</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>4.1 Consent:</strong> We process your personal data based on your explicit consent, which you can withdraw at any time.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>4.2 Legitimate Interests:</strong> We may process data for legitimate business interests, such as improving our services, provided it doesn't override your privacy rights.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>4.3 Legal Compliance:</strong> We process data to comply with applicable laws and regulations, including KYC and AML requirements.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Data Sharing and Disclosure</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>5.1 Third-Party Services:</strong> We may share data with trusted service providers who assist in:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Cloud storage and computing services</li>
                    <li>Authentication and security services</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Customer support tools</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>5.2 Legal Requirements:</strong> We may disclose information when required by law, court order, or government authorities.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>5.3 Business Transfers:</strong> In case of merger, acquisition, or sale of assets, your information may be transferred with appropriate safeguards.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>6.1 Security Measures:</strong> We implement enterprise-grade security including:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>AES-256 encryption for data at rest</li>
                    <li>TLS encryption for data in transit</li>
                    <li>Multi-factor authentication</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Access controls and privilege management</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.2 Data Centers:</strong> Your data is stored in secure, ISO 27001 certified data centers with 24/7 monitoring.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.3 Incident Response:</strong> We have procedures to detect, respond to, and notify about security incidents as per DPDP Act requirements.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. Your Privacy Rights</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    Under the DPDP Act 2023 and other applicable laws, you have the following rights:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li><strong>Right to Access:</strong> Request information about your personal data we hold</li>
                    <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
                    <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Right to Data Portability:</strong> Request transfer of your data in a structured format</li>
                    <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                    <li><strong>Right to Grievance Redressal:</strong> File complaints with our grievance officer</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. Data Retention</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>8.1 Retention Period:</strong> We retain your personal data only as long as necessary for the purposes outlined in this policy or as required by law.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>8.2 Deletion:</strong> When retention is no longer necessary, we securely delete or anonymize your data.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>8.3 Legal Requirements:</strong> Some data may be retained longer to comply with legal, regulatory, or audit requirements.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">9. Cross-Border Data Transfer</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>9.1 Transfer Restrictions:</strong> We primarily store and process data within India in compliance with DPDP Act requirements.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>9.2 International Transfers:</strong> If international transfers are necessary, we ensure appropriate safeguards and obtain required approvals.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">10. Cookies and Tracking</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>10.1 Cookie Usage:</strong> We use cookies and similar technologies for:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Authentication and session management</li>
                    <li>User preferences and settings</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Security and fraud prevention</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>10.2 Cookie Control:</strong> You can manage cookie preferences through your browser settings.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">11. Children's Privacy</h2>
                <p className="text-foreground leading-relaxed">
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we discover that we have collected information from a child, we will delete it immediately.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">12. Updates to Privacy Policy</h2>
                <p className="text-foreground leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify users of significant changes via email or platform notifications. Your continued use constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">13. Contact Information</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>Data Protection Officer:</strong>
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-foreground">Email: privacy@yourcompany.com</p>
                    <p className="text-foreground">Address: [Your Company Address]</p>
                    <p className="text-foreground">Phone: [Your Contact Number]</p>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    <strong>Grievance Officer:</strong>
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-foreground">Email: grievance@yourcompany.com</p>
                    <p className="text-foreground">Response Time: Within 72 hours</p>
                  </div>
                </div>
              </section>

              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-muted-foreground text-center">
                  By using our platform, you acknowledge that you have read, understood, and consent to the practices described in this Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DataDeletionPolicy = () => {
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
                <h1 className="text-3xl font-bold text-foreground mb-4">Data Deletion Policy</h1>
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
                  This Data Deletion Policy explains how you can request deletion of your personal data from our platform and how we handle such requests in compliance with the Digital Personal Data Protection Act, 2023, and other applicable Indian data protection laws.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. Your Right to Data Deletion</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    Under the DPDP Act 2023, you have the right to request erasure of your personal data in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>You withdraw your consent for data processing</li>
                    <li>Your personal data is no longer necessary for the original purpose</li>
                    <li>Your personal data has been unlawfully processed</li>
                    <li>Erasure is required for compliance with legal obligations</li>
                    <li>You object to processing and there are no overriding legitimate grounds</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. Types of Data We Delete</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>3.1 Personal Information:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Name, email address, and phone number</li>
                    <li>Authentication credentials and session data</li>
                    <li>Profile information and preferences</li>
                    <li>Communication history and preferences</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>3.2 Financial Data:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Portfolio information (mutual funds, stocks, investments)</li>
                    <li>Financial statements and transaction data</li>
                    <li>Investment goals and risk assessment responses</li>
                    <li>Analysis results and recommendations</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>3.3 Technical Data:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Device information and browser data</li>
                    <li>Usage analytics and interaction logs</li>
                    <li>Cookies and tracking information</li>
                    <li>System-generated metadata</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. How to Request Data Deletion</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>4.1 Account-Based Deletion:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Log into your account and navigate to Account Settings</li>
                    <li>Select "Delete Account" or "Data Deletion Request"</li>
                    <li>Follow the guided process to confirm your request</li>
                    <li>Verify your identity through OTP or email confirmation</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>4.2 Email Request:</strong>
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-foreground">Email: datadeletion@yourcompany.com</p>
                    <p className="text-foreground">Subject: Data Deletion Request - [Your Account Email]</p>
                    <p className="text-foreground">Include: Your full name, registered email, and reason for deletion</p>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    <strong>4.3 Written Request:</strong>
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-foreground">Address: [Your Company Address]</p>
                    <p className="text-foreground">Attention: Data Protection Officer</p>
                    <p className="text-foreground">Include: Signed request with identity verification</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Verification Process</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>5.1 Identity Verification:</strong> To protect your privacy, we must verify your identity before processing deletion requests through:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>OTP sent to your registered phone number</li>
                    <li>Email confirmation from your registered email address</li>
                    <li>Security questions or authentication challenges</li>
                    <li>Government-issued ID verification (for written requests)</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>5.2 Request Validation:</strong> We validate requests to ensure they are legitimate and not fraudulent.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. Deletion Timeline</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>6.1 Acknowledgment:</strong> We acknowledge receipt of your deletion request within 72 hours.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.2 Processing Time:</strong> Most deletion requests are processed within 30 days of verification.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.3 Complex Requests:</strong> Complex requests may take up to 90 days, and we will keep you informed of progress.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>6.4 Confirmation:</strong> You will receive confirmation once deletion is complete.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. Scope of Deletion</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>7.1 Complete Deletion:</strong> We delete data from all our systems including:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Production databases and storage systems</li>
                    <li>Backup and archive systems</li>
                    <li>Analytics and logging systems</li>
                    <li>Third-party service providers</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>7.2 Anonymization:</strong> In some cases, we may anonymize data instead of deletion if required for legitimate purposes.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>7.3 Technical Limitations:</strong> Some data may persist in system logs or backups for up to 90 days for technical reasons.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. Data We Cannot Delete</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>8.1 Legal Requirements:</strong> We may retain certain data when required by law, including:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Financial transaction records (as per RBI guidelines)</li>
                    <li>Tax and audit-related information</li>
                    <li>Legal dispute or investigation materials</li>
                    <li>Regulatory compliance records</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>8.2 Legitimate Interests:</strong> Data may be retained for:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Fraud prevention and security purposes</li>
                    <li>Ongoing legal proceedings</li>
                    <li>Debt collection and financial obligations</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">9. Consequences of Data Deletion</h2>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800 space-y-3">
                  <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">Important Notice</h3>
                  <div className="space-y-3">
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>Account Termination:</strong> Requesting complete data deletion will permanently close your account and cannot be reversed.
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>Service Loss:</strong> You will lose access to all platform features, analysis, and historical data.
                    </p>
                    <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                      <strong>Re-registration:</strong> If you wish to use our services again, you will need to create a new account from scratch.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">10. Partial Deletion Options</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>10.1 Selective Deletion:</strong> You may request deletion of specific data categories:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-foreground">
                    <li>Portfolio data only</li>
                    <li>Communication history</li>
                    <li>Analysis results</li>
                    <li>Usage analytics</li>
                  </ul>
                  <p className="text-foreground leading-relaxed">
                    <strong>10.2 Account Deactivation:</strong> Alternative to deletion - temporarily deactivate your account while preserving data.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">11. Third-Party Data</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>11.1 Service Providers:</strong> We will instruct third-party service providers to delete your data from their systems.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>11.2 External Platforms:</strong> Data shared with external platforms (app stores, social media) may require separate deletion requests.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>11.3 Verification:</strong> We obtain confirmation from third parties regarding data deletion.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">12. Complaints and Appeals</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    <strong>12.1 Grievance Process:</strong> If unsatisfied with our response, contact our Grievance Officer:
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-foreground">Email: grievance@yourcompany.com</p>
                    <p className="text-foreground">Phone: [Your Contact Number]</p>
                    <p className="text-foreground">Response Time: Within 72 hours</p>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    <strong>12.2 Regulatory Complaints:</strong> You may also file complaints with the Data Protection Board of India.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">13. Policy Updates</h2>
                <p className="text-foreground leading-relaxed">
                  We may update this Data Deletion Policy to reflect changes in our practices or legal requirements. Users will be notified of significant changes via email or platform notifications.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">14. Contact Information</h2>
                <div className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    For data deletion requests or questions about this policy:
                  </p>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-foreground"><strong>Data Deletion Team:</strong></p>
                    <p className="text-foreground">Email: datadeletion@yourcompany.com</p>
                    <p className="text-foreground">Address: [Your Company Address]</p>
                    <p className="text-foreground">Phone: [Your Contact Number]</p>
                    <p className="text-foreground">Working Hours: 9:00 AM - 6:00 PM (IST)</p>
                  </div>
                </div>
              </section>

              <div className="border-t pt-8 mt-8">
                <p className="text-sm text-muted-foreground text-center">
                  This Data Deletion Policy ensures your right to data erasure while maintaining our legal and operational obligations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataDeletionPolicy;
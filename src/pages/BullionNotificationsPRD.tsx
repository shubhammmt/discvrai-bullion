import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BullionNotificationsPRD = () => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    const canvas = await html2canvas(contentRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 900,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20;

    while (heightLeft > 0) {
      position = -(pdfHeight - 20) + 10 + (imgHeight - heightLeft - pdfHeight + 20);
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, -(imgHeight - heightLeft) + 10, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    pdf.save("Bullion-Notifications-PRD.pdf");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Toolbar */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between print:hidden">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleDownloadPDF} className="bg-amber-500 hover:bg-amber-600 text-black">
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </Button>
      </div>

      {/* PDF Content */}
      <div ref={contentRef} className="max-w-[850px] mx-auto px-8 py-10 bg-white text-black text-[13px] leading-relaxed">
        {/* Title */}
        <div className="mb-8 border-b-2 border-amber-500 pb-4">
          <h1 className="text-2xl font-bold text-black">Product Requirements Document</h1>
          <h2 className="text-lg font-semibold text-amber-600 mt-1">Bullion Alerts & Bookmarks Page</h2>
          <div className="flex gap-6 mt-2 text-xs text-gray-500">
            <span><strong>Route:</strong> /bullion/notifications</span>
            <span><strong>Date:</strong> February 2026</span>
            <span><strong>Author:</strong> DiscvrAI</span>
          </div>
        </div>

        {/* Section 1 */}
        <Section title="1. Page Layout & Header">
          <Table headers={["Feature", "Details"]} rows={[
            ["Sticky Header", "Fixed top with backdrop blur, back button navigates to /bullion"],
            ["Page Icon", "Amber gradient rounded icon with Bell icon"],
            ["Title", "\"Alerts & Bookmarks\""],
            ["Profile Button", "User icon (top-right)"],
          ]} />
        </Section>

        {/* Section 2 */}
        <Section title="2. Subscription CTA Banner">
          <Table headers={["Feature", "Details"]} rows={[
            ["Placement", "Top of page, above tabs"],
            ["Heading", "\"Stay Updated with Price Alerts\""],
            ["Subtext", "\"Get instant notifications for price movements and auspicious days\""],
            ["Telegram Button", "Opens https://t.me/discvrai_bullion in new tab"],
            ["WhatsApp Button", "Opens WhatsApp subscribe link in new tab"],
            ["Styling", "Gradient card (amber-to-slate), amber border"],
          ]} />
        </Section>

        {/* Section 3 */}
        <Section title="3. Tab Structure">
          <p className="mb-2">Three tabs in a full-width grid: <strong>Alerts</strong> | <strong>Bookmarks</strong> | <strong>Calendar</strong></p>
          <p>Default tab: <code className="bg-gray-100 px-1 rounded text-xs">alerts</code></p>
        </Section>

        {/* Section 4 */}
        <Section title="4. TAB 1: Alerts">
          <SubSection title="4.1 Price Alerts (CRUD)">
            <Table headers={["Feature", "Details"]} rows={[
              ["Create Alert Button", "Amber CTA \"Create Alert\" with Plus icon, opens CreatePriceAlertDialog"],
              ["Empty State", "Bell icon, \"No Price Alerts Yet\" message, CTA to create first alert"],
              ["Alert Cards", "Grid layout (1/2/3 columns responsive)"],
            ]} />
            <p className="font-semibold mt-3 mb-1">Each Price Alert Card displays:</p>
            <Table headers={["Field", "Details"]} rows={[
              ["Metal Icon", "Gold (Coins, amber) or Silver (Medal, slate)"],
              ["Condition Badge", "\"↑ Above\" or \"↓ Below\""],
              ["Current Price", "Hardcoded (Gold: ₹7,245/gm, Silver: ₹89/gm)"],
              ["Target Price", "User-set target in ₹/gm"],
              ["Progress Bar", "Visual indicator of how close current price is to target"],
              ["Channel Badges", "Push, TG (Telegram), WA (WhatsApp)"],
              ["Edit Button", "Opens CreatePriceAlertDialog in edit mode"],
              ["Delete Button", "Removes alert from state, shows toast"],
            ]} />
          </SubSection>

          <SubSection title="4.2 CreatePriceAlertDialog">
            <Table headers={["Feature", "Details"]} rows={[
              ["Metal Toggle", "Gold (amber) / Silver (slate) toggle buttons"],
              ["Current Price Display", "Shows reference price in center card"],
              ["Condition Toggle", "\"↑ Above\" (green) / \"↓ Below\" (red)"],
              ["Target Price Input", "Number input, centered, large font"],
              ["Quick-Set Shortcuts", "-10%, -5%, +5%, +10% from current price"],
              ["Auto-Condition", "+% sets \"above\", -% sets \"below\""],
              ["Notification Channels", "Push (default on), Telegram, WhatsApp"],
              ["Validation", "Rejects empty or ≤0 price values"],
              ["Toast Feedback", "Success toast on create/update"],
            ]} />
          </SubSection>

          <SubSection title="4.3 Recent Notifications (Read-only feed)">
            <Table headers={["Type", "Example"]} rows={[
              ["price_drop", "\"Gold dropped 2.3% today - Good buying opportunity\""],
              ["sip_due", "\"Your monthly Gold SIP is due tomorrow\""],
              ["festival", "\"Dhanteras is in 15 days - Plan your purchase\""],
              ["target_reached", "\"Silver reached your target price of ₹85/gm\""],
            ]} />
            <p className="mt-2">Each notification card has: Metal icon, Priority badge (High/Medium/Low), Timestamp, Message, Dismiss button, View button.</p>
          </SubSection>

          <SubSection title="4.4 Offers For You (Inline Cards)">
            <p className="mb-2">Two fully-specified offer cards rendered inline at the bottom of the Alerts tab. Replaces the simple redirect card.</p>
            <p><strong>Card A:</strong> Welcome Offer — amber theme, ₹10 free gold on first ₹500+ purchase. See Section 7.1.</p>
            <p><strong>Card B:</strong> Refer &amp; Earn — blue theme, ₹100 bonus gold after 10 successful referrals. Includes inline progress bar. See Section 7.2.</p>
          </SubSection>
        </Section>

        {/* Section 5 */}
        <Section title="5. TAB 2: Bookmarks">
          <Table headers={["Feature", "Details"]} rows={[
            ["Section Title", "\"Bookmarked Articles\""],
            ["Browse Button", "\"Browse Premium\" → /bullion/premium"],
            ["Empty State", "Bookmark icon, \"No Bookmarks Yet\", CTA to browse premium"],
          ]} />
          <p className="font-semibold mt-3 mb-1">Each Bookmarked Article Card:</p>
          <Table headers={["Field", "Details"]} rows={[
            ["Image", "Thumbnail with hover zoom (scale 1.05)"],
            ["Delete Button", "Overlay trash icon, removes bookmark, shows toast"],
            ["Category Badge", "Gold (amber), Silver (slate), LAMF (blue), Personal (emerald)"],
            ["Read Time", "Clock icon + minutes"],
            ["Title", "2-line clamp, amber hover color"],
            ["Tags", "Outline badges (e.g., \"Gold\", \"Beginner\")"],
            ["Read Now CTA", "Amber button → /bullion/premium"],
          ]} />
          <p className="font-semibold mt-3 mb-1">Mock Articles (4):</p>
          <ol className="list-decimal pl-5 space-y-0.5">
            <li>Understanding Digital Gold: A Complete Beginner's Guide — 8 min</li>
            <li>Silver Investment: Why It's Called 'Poor Man's Gold' — 6 min</li>
            <li>Gold SIP vs Lump Sum: Which Strategy Works Best? — 9 min</li>
            <li>Tax Planning with Gold Investments: A Complete Guide — 12 min</li>
          </ol>
        </Section>

        {/* Section 6 */}
        <Section title="6. TAB 3: Calendar">
          <SubSection title="6.1 Upcoming Events">
            <Table headers={["Date", "Event", "Type", "Metal"]} rows={[
              ["Feb 12", "Monthly Gold SIP", "sip", "Gold"],
              ["Feb 14", "Valentine's Day - Gift Gold", "personal", "—"],
              ["Mar 14", "Hindu New Year", "festival", "—"],
              ["Mar 28", "Birthday Reminder", "personal", "—"],
              ["Apr 20", "Akshaya Tritiya", "festival", "Gold"],
              ["Oct 29", "Dhanteras 2026", "festival", "Gold"],
            ]} />
          </SubSection>

          <SubSection title="6.2 Auspicious Days 2026">
            <Table headers={["Day", "Date", "Badge"]} rows={[
              ["Akshaya Tritiya", "April 20, 2026", "Most Auspicious"],
              ["Dhanteras", "October 29, 2026", "Festival"],
              ["Hindu New Year", "March 14, 2026", "Festival"],
            ]} />
            <p className="font-semibold mt-3 mb-1">Personal Dates (Editable):</p>
            <Table headers={["Day", "Date", "Action"]} rows={[
              ["Your Birthday", "March 28, 2026", "Edit Date → /bullion/profile"],
              ["Anniversary", "Not set", "Add Date → /bullion/profile"],
            ]} />
          </SubSection>
        </Section>

        {/* Section 7: Offers For You */}
        <Section title="7. Offers For You (Alerts Tab — Bottom)">
          <p className="mb-3 text-gray-600">Replaces the simple redirect card. Two inline offer cards are rendered with full business logic specs.</p>

          <SubSection title="7.1 Welcome Offer — First Purchase">
            <Table headers={["Attribute", "Detail"]} rows={[
              ["Trigger", "First-time gold purchase on the platform"],
              ["Condition", "Minimum transaction value of ₹500"],
              ["Reward", "₹10 worth of Free Gold credited to the user's Bullion wallet"],
              ["UX", "\"Welcome Reward Applied\" banner shown on checkout page when condition is met"],
              ["Card Theme", "Amber border + amber-50 background"],
              ["Icon", "Gift (amber)"],
              ["Badge", "\"First Purchase\""],
              ["Checklist Items", "Min ₹500 · Auto-credited ₹10 gold · Checkout banner confirmation"],
              ["CTA", "\"Claim Now\" → navigates to /bullion + toast confirming offer activation"],
            ]} />
          </SubSection>

          <SubSection title="7.2 Refer & Earn — Milestone Program">
            <Table headers={["Attribute", "Detail"]} rows={[
              ["Target Users", "Existing users (Referrer)"],
              ["Milestone", "10 Successful Referrals"],
              ["Definition of Successful Referral", "Referee must complete first transaction of ₹500+"],
              ["Reward", "₹100 Bonus Gold credited after 10th successful referral"],
              ["Card Theme", "Blue border + blue-50 background"],
              ["Icon", "Users (blue)"],
              ["Badge", "\"Milestone Program\""],
              ["Checklist Items", "₹500+ referee condition · Reward after 10th referral"],
              ["CTA 1", "\"Copy Referral Link\" → copies link to clipboard + success toast"],
              ["CTA 2", "\"View in Profile\" → navigates to /bullion/profile"],
            ]} />
            <p className="font-semibold mt-3 mb-1">7.2.1 Referral Progress Bar (inline on card):</p>
            <Table headers={["Element", "Detail"]} rows={[
              ["Label", "\"Referral Progress\" + \"X / 10 Completed\" counter"],
              ["Progress Fill", "Proportional to completed referrals (e.g., 4/10 = 40%)"],
              ["Milestone Strip", "10 individual pill segments, filled for completed referrals"],
              ["Sub-label", "\"X more referrals to unlock reward\""],
              ["Current Mock State", "4 / 10 referrals completed (to be wired to user profile API)"],
              ["Also visible at", "/bullion/profile via \"View in Profile\" CTA"],
            ]} />
          </SubSection>

          <SubSection title="7.3 Implementation Notes">
            <Table headers={["Aspect", "Detail"]} rows={[
              ["Icons used", "Gift, Users, CheckCircle2, ArrowRight (lucide-react)"],
              ["Styling", "Semantic Tailwind tokens (amber/blue variants)"],
              ["Referral count", "Mock state (4/10) — to be wired to user profile API"],
              ["Welcome Offer eligibility", "To be wired to transaction history API"],
            ]} />
          </SubSection>
        </Section>

        {/* Section 8 */}
        <Section title="8. Technical Notes">
          <Table headers={["Aspect", "Detail"]} rows={[
            ["State Management", "Local useState (no persistence)"],
            ["Prices", "Hardcoded CURRENT_PRICES — not yet using useBullionPrices hook"],
            ["Data", "All mock/hardcoded — no API integration"],
            ["Responsive", "1→2→3 column grids (md/lg breakpoints)"],
            ["Navigation", "Deep-link support via ?tab=bookmarks query param"],
            ["Non-functional", "Dismiss/View on notifications, Add Event on calendar"],
          ]} />
        </Section>

        {/* Section 8 */}
        <Section title="8. Integration Points">
          <Table headers={["From", "To", "Trigger"]} rows={[
            ["/bullion/premium", "?tab=bookmarks", "Bookmark article toast action"],
            ["/bullion/premium/article/:slug", "?tab=bookmarks", "Bookmark article toast action"],
            ["Welcome Offer CTA", "/bullion", "\"Claim Now\" click + offer activation toast"],
            ["Refer & Earn CTA", "Clipboard", "\"Copy Referral Link\" click + success toast"],
            ["Refer & Earn CTA", "/bullion/profile", "\"View in Profile\" click"],
            ["Bookmarks tab", "/bullion/premium", "Browse Premium / Read Now"],
            ["Calendar tab", "/bullion/profile", "Edit Date / Add Date"],
            ["Toolbar (+)", "Alert dialog", "Create price alert shortcut"],
          ]} />
        </Section>

        {/* Section 9 Changelog */}
        <Section title="9. Changelog">
          <Table headers={["Version", "Date", "Change"]} rows={[
            ["v1.0", "February 2026", "Initial PRD — Alerts, Bookmarks, Calendar tabs"],
            ["v1.1", "March 2026", "Section 4.4 updated: Offers redirect card replaced with two inline offer cards (Welcome Offer + Refer & Earn)"],
            ["v1.1", "March 2026", "Section 7 added: Full business logic for Welcome Offer (₹10 free gold, ₹500+ first purchase) and Refer & Earn (₹100 bonus gold after 10 successful referrals with inline progress bar)"],
          ]} />
        </Section>

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-gray-300 text-xs text-gray-400 text-center">
          DiscvrAI — Bullion Notifications PRD — v1.1 March 2026 — Confidential
        </div>
      </div>
    </div>
  );
};

// Helper Components
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-base font-bold text-black border-b border-gray-200 pb-1 mb-3">{title}</h3>
    {children}
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
    {children}
  </div>
);

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <table className="w-full border-collapse text-xs mb-2">
    <thead>
      <tr>
        {headers.map((h, i) => (
          <th key={i} className="border border-gray-300 bg-gray-100 px-2 py-1.5 text-left font-semibold">{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <td key={j} className="border border-gray-300 px-2 py-1.5">{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default BullionNotificationsPRD;

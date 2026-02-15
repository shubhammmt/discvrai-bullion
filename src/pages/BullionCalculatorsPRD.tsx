import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BullionCalculatorsPRD = () => {
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
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, -(imgHeight - heightLeft) + 10, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    pdf.save("Bullion-Financial-Calculators-PRD.pdf");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between print:hidden">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleDownloadPDF} className="bg-amber-500 hover:bg-amber-600 text-black">
          <Download className="w-4 h-4 mr-2" /> Download PDF
        </Button>
      </div>

      <div ref={contentRef} className="max-w-[850px] mx-auto px-8 py-10 bg-white text-black text-[13px] leading-relaxed">
        {/* Title */}
        <div className="mb-8 border-b-2 border-amber-500 pb-4">
          <h1 className="text-2xl font-bold text-black">Product Requirements Document</h1>
          <h2 className="text-lg font-semibold text-amber-600 mt-1">Bullion Financial Calculators</h2>
          <div className="flex gap-6 mt-2 text-xs text-gray-500">
            <span><strong>Route:</strong> /bullion/calculators</span>
            <span><strong>Date:</strong> February 2026</span>
            <span><strong>Author:</strong> DiscvrAI</span>
          </div>
        </div>

        {/* Section 1 */}
        <Section title="1. Page Layout & Header">
          <Table headers={["Feature", "Details"]} rows={[
            ["Sticky Header", "Fixed top with backdrop blur, back button navigates to /bullion"],
            ["Page Icon", "Calculator icon in amber"],
            ["Title", "\"Financial Calculators\""],
            ["Subtitle", "\"Plan your investments smartly\""],
            ["Navigation", "BullionNavTabs (desktop) + BullionMobileMenu (mobile)"],
          ]} />
        </Section>

        {/* Section 2 */}
        <Section title="2. Tab Structure">
          <p className="mb-2">Three tabs in a grid layout:</p>
          <Table headers={["Tab", "Icon", "Label (Desktop)", "Label (Mobile)"]} rows={[
            ["making-charge", "Scale", "Making Charge", "Charge"],
            ["goal", "Target", "Goal Planner", "Goals"],
            ["compare", "TrendingUp", "SIP vs FD vs Gold", "Compare"],
          ]} />
          <p className="mt-2">Default tab: <code className="bg-gray-100 px-1 rounded text-xs">making-charge</code></p>
        </Section>

        {/* Section 3 */}
        <Section title="3. TAB 1: Making Charge Calculator">
          <SubSection title="3.1 Input Controls">
            <Table headers={["Metal", "Input", "Range", "Step", "Default"]} rows={[
              ["Gold", "Weight (grams)", "0–100", "1", "10"],
              ["Gold", "Making Charge %", "5–35%", "1", "15%"],
              ["Silver", "Weight (grams)", "0–1000", "10", "100"],
              ["Silver", "Making Charge %", "5–25%", "1", "12%"],
            ]} />
            <p className="mt-2">Current rates displayed from <code className="bg-gray-100 px-1 rounded text-xs">useBullionPrices()</code> hook (live API with 60s refresh, fallback: Gold ₹6,250/g, Silver ₹75/g).</p>
          </SubSection>

          <SubSection title="3.2 Calculation Logic">
            <Table headers={["Metric", "Formula"]} rows={[
              ["Metal Value", "Weight × Rate per gram"],
              ["Making Charges", "Metal Value × Making Charge %"],
              ["GST (Physical)", "(Metal Value + Making Charges) × 3%"],
              ["Total Physical", "Metal Value + Making Charges + GST"],
              ["Total Digital", "Metal Value × 1.03 (GST only, no making charge)"],
              ["Savings", "Total Physical − Total Digital"],
            ]} />
          </SubSection>

          <SubSection title="3.3 Price Breakdown Display">
            <Table headers={["Feature", "Details"]} rows={[
              ["Gold Breakdown", "Side-by-side: Physical Jewellery vs Digital Gold (shown when gold weight > 0)"],
              ["Silver Breakdown", "Side-by-side: Physical Jewellery vs Digital Silver (shown when silver weight > 0)"],
              ["Total Summary", "Grid showing Total Physical vs Total Digital price"],
              ["Savings Card", "Highlighted card showing total savings amount and percentage"],
            ]} />
          </SubSection>

          <SubSection title="3.4 Making Charges Reference Table">
            <Table headers={["Category", "Typical Range", "Color"]} rows={[
              ["Plain Gold", "8–12%", "Emerald"],
              ["Temple Jewellery", "12–16%", "Blue"],
              ["Kundan/Polki", "18–25%", "Amber"],
              ["Diamond Jewellery", "20–30%", "Purple"],
            ]} />
          </SubSection>
        </Section>

        {/* Section 4 */}
        <Section title="4. TAB 2: Goal-Based Gold Planner">
          <SubSection title="4.1 Mode Toggle">
            <Table headers={["Mode", "Description"]} rows={[
              ["₹ Target Amount", "User sets a rupee target (₹10,000–₹10,00,000, step ₹10,000)"],
              ["Gold/Silver Grams", "User sets target grams for Gold (0–500g, step 10) and Silver (0–5000g, step 100)"],
            ]} />
          </SubSection>

          <SubSection title="4.2 Time Horizon Inputs">
            <Table headers={["Input", "Range", "Step"]} rows={[
              ["Years", "0–10", "1"],
              ["Months", "0–11", "1"],
              ["Days", "0–30", "1"],
            ]} />
          </SubSection>

          <SubSection title="4.3 Calculation Logic">
            <Table headers={["Metric", "Formula"]} rows={[
              ["Gold Value (grams mode)", "Target Gold Grams × Gold Price/g"],
              ["Silver Value (grams mode)", "Target Silver Grams × Silver Price/g"],
              ["Total Target Value", "Gold Value + Silver Value (grams mode) or Target Amount (amount mode)"],
              ["Total Days", "(Years × 365) + (Months × 30) + Days"],
              ["Total Months", "Total Days / 30"],
              ["Monthly SIP Required", "ceil(Total Target Value / Total Months)"],
            ]} />
          </SubSection>

          <SubSection title="4.4 Goal Summary Display">
            <Table headers={["Feature", "Details"]} rows={[
              ["Amount Mode", "Shows target amount in emerald"],
              ["Grams Mode", "Shows Gold Value (amber) and Silver Value (slate) separately"],
              ["Total Target Value", "Highlighted primary card"],
              ["Monthly SIP", "Large emerald card with SIP amount and duration"],
              ["Start SIP CTA", "Full-width button: \"Start SIP @ ₹X/month\""],
            ]} />
          </SubSection>

          <SubSection title="4.5 Popular Goal Templates">
            <Table headers={["Goal", "Gold (grams)", "Duration", "Icon"]} rows={[
              ["Wedding", "50g", "3 years", "💍"],
              ["Child's Education", "100g", "10 years", "🎓"],
              ["Home Down Payment", "200g", "5 years", "🏠"],
              ["Retirement", "500g", "15 years", "🌴"],
            ]} />
            <p className="mt-2">Clicking a template pre-fills the goal inputs and shows estimated monthly SIP.</p>
          </SubSection>
        </Section>

        {/* Section 5 */}
        <Section title="5. TAB 3: SIP vs FD vs Digital Gold Comparison">
          <SubSection title="5.1 Input Controls">
            <Table headers={["Input", "Range", "Step", "Default"]} rows={[
              ["Monthly Investment", "₹1,000–₹1,00,000", "₹1,000", "₹5,000"],
              ["Investment Period", "1–20 years", "1 year", "5 years"],
            ]} />
          </SubSection>

          <SubSection title="5.2 Assumed Return Rates">
            <Table headers={["Instrument", "Annual Return", "Source"]} rows={[
              ["Fixed Deposit (FD)", "7.0%", "Bank average"],
              ["Digital Gold", "11.5%", "10-year historical average"],
              ["Equity SIP", "12.0%", "Expected market returns"],
            ]} />
          </SubSection>

          <SubSection title="5.3 Calculation Logic">
            <p className="mb-2">All three use the <strong>Future Value of Annuity</strong> formula:</p>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 font-mono text-xs mb-2">
              FV = PMT × ((1 + r)^n − 1) / r × (1 + r)
            </div>
            <p className="text-xs text-gray-600">Where PMT = monthly investment, r = monthly rate (annual/12/100), n = total months</p>
          </SubSection>

          <SubSection title="5.4 Comparison Cards">
            <Table headers={["Card", "Color Theme", "Badge"]} rows={[
              ["Fixed Deposit", "Blue", "—"],
              ["Digital Gold", "Amber", "\"Recommended\""],
              ["Equity SIP", "Purple", "—"],
            ]} />
            <p className="font-semibold mt-3 mb-1">Each card displays:</p>
            <Table headers={["Field", "Details"]} rows={[
              ["Icon & Title", "Instrument name with themed icon"],
              ["Return Rate", "Annual percentage"],
              ["Principal", "Total invested (monthly × months)"],
              ["Growth / Interest", "Returns earned"],
              ["Maturity Value", "Principal + Returns"],
              ["Pros/Cons", "Bullet points with CheckCircle (pro) or Info (con) icons"],
            ]} />
          </SubSection>

          <SubSection title="5.5 Detailed Comparison Table">
            <Table headers={["Row", "FD", "Digital Gold", "Equity SIP"]} rows={[
              ["Expected Returns", "7% p.a.", "11.5% p.a.", "12% p.a."],
              ["Risk Level", "Low", "Low-Medium", "Medium-High"],
              ["Inflation Protection", "No", "Yes", "Yes"],
              ["Liquidity", "Medium (penalty)", "High (48hr lock)", "High"],
              ["Tax Benefit", "None (fully taxable)", "LTCG 20% after 3yr", "LTCG 10% after 1yr"],
            ]} />
          </SubSection>

          <SubSection title="5.6 Gold Advantage Highlight">
            <p>A highlighted amber card explaining why Digital Gold offers a balanced approach: inflation protection, lower volatility than stocks, better returns than FDs, starting from ₹10.</p>
          </SubSection>
        </Section>

        {/* Section 6 */}
        <Section title="6. GoalBasedPlanner Component (Reusable)">
          <p className="mb-2">File: <code className="bg-gray-100 px-1 rounded text-xs">src/components/bullion/GoalBasedPlanner.tsx</code></p>
          <Table headers={["Feature", "Details"]} rows={[
            ["Variants", "\"default\" (full) and \"compact\" (embedded widget)"],
            ["Target Toggles", "Gold, Silver, Amount — each with independent Switch on/off"],
            ["Gold Range", "0–200g (compact) / 0–500g (default), step 10"],
            ["Silver Range", "0–2000g (compact) / 0–5000g (default), step 50/100"],
            ["Amount Range", "₹0–₹5,00,000 (compact) / ₹0–₹10,00,000 (default), step ₹5,000/₹10,000"],
            ["Time Inputs", "Years (0–10/20), Months (0–11), Days (0–30)"],
            ["Result", "Monthly SIP Required = ceil(Total Target Value / Total Months)"],
            ["Pricing", "Uses useBullionPrices() hook for live rates"],
          ]} />
        </Section>

        {/* Section 7 */}
        <Section title="7. Technical Notes">
          <Table headers={["Aspect", "Detail"]} rows={[
            ["State Management", "Local useState for all calculator inputs"],
            ["Prices", "Live via useBullionPrices hook (API: api.discvr.ai/v1/bullion/prices, 60s refresh)"],
            ["Fallback Prices", "Gold: ₹6,250/g, Silver: ₹75/g"],
            ["Animations", "Framer Motion fade+slide on tab change"],
            ["Responsive", "2-column grid on lg breakpoint, full-width on mobile"],
            ["File Size", "~1032 lines (single file, candidate for refactoring)"],
          ]} />
        </Section>

        {/* Section 8 */}
        <Section title="8. Integration Points">
          <Table headers={["From", "To", "Trigger"]} rows={[
            ["Header back button", "/bullion", "Click"],
            ["BullionNavTabs", "All /bullion/* routes", "Tab navigation"],
            ["Goal Planner CTA", "Start SIP flow", "\"Start SIP\" button (non-functional)"],
            ["Goal Templates", "Pre-fill calculator", "Click template card"],
            ["GoalBasedPlanner", "Embedded in other pages", "compact variant"],
          ]} />
        </Section>

        {/* Footer */}
        <div className="mt-10 pt-4 border-t border-gray-300 text-xs text-gray-400 text-center">
          DiscvrAI — Bullion Financial Calculators PRD — February 2026 — Confidential
        </div>
      </div>
    </div>
  );
};

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

export default BullionCalculatorsPRD;

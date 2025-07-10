import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Bell, 
  Heart,
  Share2,
  BarChart3,
  Calendar,
  Building2,
  Globe,
  Users,
  DollarSign,
  Target,
  Star,
  PieChart,
  Shield,
  Activity,
  FileText,
  Download,
  Eye
} from 'lucide-react';
import Header from '@/components/Header';

const DocumentsSection = () => (
  <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-600" />
        Documents
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-4 gap-6">
        {/* Announcements */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Announcements</h4>
          <div className="space-y-3">
            {[
              {
                title: "Announcement under Regulation 30 (LODR)-Credit Rating",
                date: "4 Jul",
                desc: "CARE reaffirms Reliance's credit ratings: CARE AAA Stable and CARE A1+ for NCDs and CP."
              },
              {
                title: "Media Release By Reliance Retail Ventures Limited",
                date: "3 Jul",
                desc: "Reliance Retail invests in UK-based FACEGYM to expand facial fitness studios in India via Tira stores."
              },
              {
                title: "Closure of Trading Window",
                date: "30 Jun",
                desc: "Trading window closure announcement for upcoming results."
              }
            ].map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <h5 className="text-sm font-medium text-blue-600 mb-1">{item.title}</h5>
                <p className="text-xs text-gray-600 mb-2">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.date}</span>
                  <Button variant="outline" size="sm" className="h-6 px-2">
                    <Eye size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annual Reports */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Annual Reports</h4>
          <div className="space-y-2">
            {['2024', '2023', '2022', '2021', '2020'].map((year) => (
              <div key={year} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-blue-600">Financial Year {year}</span>
                <Button variant="outline" size="sm" className="h-6 px-2">
                  <Download size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Ratings */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Credit Ratings</h4>
          <div className="space-y-2">
            {[
              { title: "Rating update", date: "4 Jul", agency: "CARE" },
              { title: "Rating update", date: "30 Jun", agency: "CRISIL" },
              { title: "Rating update", date: "30 Jan", agency: "ICRA" },
              { title: "Rating update", date: "23 Jan", agency: "CRISIL" }
            ].map((item, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded">
                <div className="text-sm text-blue-600">{item.title}</div>
                <div className="text-xs text-gray-500">{item.date} from {item.agency}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Concalls */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Conference Calls</h4>
          <div className="space-y-2">
            {[
              { date: "Apr 2025", type: "Quarterly Results" },
              { date: "Jan 2025", type: "Quarterly Results" },
              { date: "Oct 2024", type: "Quarterly Results" },
              { date: "Aug 2024", type: "Annual Results" }
            ].map((item, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded">
                <div className="text-sm font-medium">{item.date}</div>
                <div className="text-xs text-gray-600">{item.type}</div>
                <div className="flex gap-1 mt-1">
                  <Badge variant="outline" className="text-xs">Transcript</Badge>
                  <Badge variant="outline" className="text-xs">Notes</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ShareholdingPatternSection = () => (
  <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <PieChart className="w-5 h-5 text-purple-600" />
        Shareholding Pattern
      </CardTitle>
      <p className="text-sm text-muted-foreground">Numbers in percentages</p>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Jun 2022</TableHead>
              <TableHead>Sep 2022</TableHead>
              <TableHead>Dec 2022</TableHead>
              <TableHead>Mar 2023</TableHead>
              <TableHead>Jun 2023</TableHead>
              <TableHead>Sep 2023</TableHead>
              <TableHead>Dec 2023</TableHead>
              <TableHead>Mar 2024</TableHead>
              <TableHead>Jun 2024</TableHead>
              <TableHead>Sep 2024</TableHead>
              <TableHead>Dec 2024</TableHead>
              <TableHead>Mar 2025</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Promoters</TableCell>
              <TableCell>50.62%</TableCell>
              <TableCell>50.56%</TableCell>
              <TableCell>50.49%</TableCell>
              <TableCell>50.41%</TableCell>
              <TableCell>50.39%</TableCell>
              <TableCell>50.27%</TableCell>
              <TableCell>50.30%</TableCell>
              <TableCell>50.31%</TableCell>
              <TableCell>50.33%</TableCell>
              <TableCell>50.24%</TableCell>
              <TableCell>50.13%</TableCell>
              <TableCell>50.10%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">FIIs</TableCell>
              <TableCell>23.90%</TableCell>
              <TableCell>23.58%</TableCell>
              <TableCell>23.48%</TableCell>
              <TableCell>22.49%</TableCell>
              <TableCell>22.55%</TableCell>
              <TableCell>22.60%</TableCell>
              <TableCell>22.13%</TableCell>
              <TableCell>22.06%</TableCell>
              <TableCell>21.75%</TableCell>
              <TableCell>21.30%</TableCell>
              <TableCell>19.16%</TableCell>
              <TableCell>19.07%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">DIIs</TableCell>
              <TableCell>14.67%</TableCell>
              <TableCell>14.91%</TableCell>
              <TableCell>15.26%</TableCell>
              <TableCell>16.06%</TableCell>
              <TableCell>16.13%</TableCell>
              <TableCell>15.99%</TableCell>
              <TableCell>16.59%</TableCell>
              <TableCell>16.98%</TableCell>
              <TableCell>17.30%</TableCell>
              <TableCell>17.61%</TableCell>
              <TableCell>19.02%</TableCell>
              <TableCell>19.36%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Government</TableCell>
              <TableCell>0.17%</TableCell>
              <TableCell>0.16%</TableCell>
              <TableCell>0.16%</TableCell>
              <TableCell>0.16%</TableCell>
              <TableCell>0.17%</TableCell>
              <TableCell>0.17%</TableCell>
              <TableCell>0.18%</TableCell>
              <TableCell>0.19%</TableCell>
              <TableCell>0.19%</TableCell>
              <TableCell>0.19%</TableCell>
              <TableCell>0.18%</TableCell>
              <TableCell>0.17%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Public</TableCell>
              <TableCell>10.64%</TableCell>
              <TableCell>10.78%</TableCell>
              <TableCell>10.59%</TableCell>
              <TableCell>10.89%</TableCell>
              <TableCell>10.76%</TableCell>
              <TableCell>10.98%</TableCell>
              <TableCell>10.80%</TableCell>
              <TableCell>10.46%</TableCell>
              <TableCell>10.43%</TableCell>
              <TableCell>10.67%</TableCell>
              <TableCell>11.52%</TableCell>
              <TableCell>11.29%</TableCell>
            </TableRow>
            <TableRow className="border-t-2">
              <TableCell className="font-bold">No. of Shareholders</TableCell>
              <TableCell>33,06,732</TableCell>
              <TableCell>34,85,825</TableCell>
              <TableCell>33,62,915</TableCell>
              <TableCell>36,39,396</TableCell>
              <TableCell>35,06,867</TableCell>
              <TableCell>36,98,648</TableCell>
              <TableCell>36,13,814</TableCell>
              <TableCell>34,63,276</TableCell>
              <TableCell>34,93,125</TableCell>
              <TableCell>38,34,968</TableCell>
              <TableCell>47,14,959</TableCell>
              <TableCell>47,65,728</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

const FinancialStatementsSection = () => (
  <>
    {/* Profit & Loss Statement */}
    <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-600" />
          Profit & Loss Statement
        </CardTitle>
        <p className="text-sm text-muted-foreground">Consolidated Figures in Rs. Crores</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Particulars</TableHead>
                <TableHead>Mar 2014</TableHead>
                <TableHead>Mar 2015</TableHead>
                <TableHead>Mar 2016</TableHead>
                <TableHead>Mar 2017</TableHead>
                <TableHead>Mar 2018</TableHead>
                <TableHead>Mar 2019</TableHead>
                <TableHead>Mar 2020</TableHead>
                <TableHead>Mar 2021</TableHead>
                <TableHead>Mar 2022</TableHead>
                <TableHead>Mar 2023</TableHead>
                <TableHead>Mar 2024</TableHead>
                <TableHead>Mar 2025</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Sales</TableCell>
                <TableCell>433,521</TableCell>
                <TableCell>374,372</TableCell>
                <TableCell>272,583</TableCell>
                <TableCell>303,954</TableCell>
                <TableCell>390,823</TableCell>
                <TableCell>568,337</TableCell>
                <TableCell>596,679</TableCell>
                <TableCell>466,307</TableCell>
                <TableCell>694,673</TableCell>
                <TableCell>876,396</TableCell>
                <TableCell>899,041</TableCell>
                <TableCell>964,693</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Expenses</TableCell>
                <TableCell>398,586</TableCell>
                <TableCell>336,923</TableCell>
                <TableCell>230,802</TableCell>
                <TableCell>257,647</TableCell>
                <TableCell>326,508</TableCell>
                <TableCell>484,087</TableCell>
                <TableCell>507,413</TableCell>
                <TableCell>385,517</TableCell>
                <TableCell>586,092</TableCell>
                <TableCell>734,078</TableCell>
                <TableCell>736,543</TableCell>
                <TableCell>799,249</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Operating Profit</TableCell>
                <TableCell className="font-bold">34,935</TableCell>
                <TableCell className="font-bold">37,449</TableCell>
                <TableCell className="font-bold">41,781</TableCell>
                <TableCell className="font-bold">46,307</TableCell>
                <TableCell className="font-bold">64,315</TableCell>
                <TableCell className="font-bold">84,250</TableCell>
                <TableCell className="font-bold">89,266</TableCell>
                <TableCell className="font-bold">80,790</TableCell>
                <TableCell className="font-bold">108,581</TableCell>
                <TableCell className="font-bold">142,318</TableCell>
                <TableCell className="font-bold">162,498</TableCell>
                <TableCell className="font-bold">165,444</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">OPM %</TableCell>
                <TableCell>8%</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>16%</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>17%</TableCell>
                <TableCell>16%</TableCell>
                <TableCell>16%</TableCell>
                <TableCell>18%</TableCell>
                <TableCell>17%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Other Income</TableCell>
                <TableCell>8,865</TableCell>
                <TableCell>8,528</TableCell>
                <TableCell>12,212</TableCell>
                <TableCell>9,222</TableCell>
                <TableCell>9,869</TableCell>
                <TableCell>8,406</TableCell>
                <TableCell>8,570</TableCell>
                <TableCell>22,432</TableCell>
                <TableCell>19,600</TableCell>
                <TableCell>12,020</TableCell>
                <TableCell>16,179</TableCell>
                <TableCell>17,978</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Interest</TableCell>
                <TableCell>3,836</TableCell>
                <TableCell>3,316</TableCell>
                <TableCell>3,691</TableCell>
                <TableCell>3,849</TableCell>
                <TableCell>8,052</TableCell>
                <TableCell>16,495</TableCell>
                <TableCell>22,027</TableCell>
                <TableCell>21,189</TableCell>
                <TableCell>14,584</TableCell>
                <TableCell>19,571</TableCell>
                <TableCell>23,118</TableCell>
                <TableCell>24,269</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Depreciation</TableCell>
                <TableCell>11,201</TableCell>
                <TableCell>11,547</TableCell>
                <TableCell>11,565</TableCell>
                <TableCell>11,646</TableCell>
                <TableCell>16,706</TableCell>
                <TableCell>20,934</TableCell>
                <TableCell>22,203</TableCell>
                <TableCell>26,572</TableCell>
                <TableCell>29,782</TableCell>
                <TableCell>40,303</TableCell>
                <TableCell>50,832</TableCell>
                <TableCell>53,136</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Profit before tax</TableCell>
                <TableCell className="font-bold">28,763</TableCell>
                <TableCell className="font-bold">31,114</TableCell>
                <TableCell className="font-bold">38,737</TableCell>
                <TableCell className="font-bold">40,034</TableCell>
                <TableCell className="font-bold">49,426</TableCell>
                <TableCell className="font-bold">55,227</TableCell>
                <TableCell className="font-bold">53,606</TableCell>
                <TableCell className="font-bold">55,461</TableCell>
                <TableCell className="font-bold">83,815</TableCell>
                <TableCell className="font-bold">94,464</TableCell>
                <TableCell className="font-bold">104,727</TableCell>
                <TableCell className="font-bold">106,017</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Tax %</TableCell>
                <TableCell>22%</TableCell>
                <TableCell>24%</TableCell>
                <TableCell>23%</TableCell>
                <TableCell>25%</TableCell>
                <TableCell>27%</TableCell>
                <TableCell>28%</TableCell>
                <TableCell>26%</TableCell>
                <TableCell>3%</TableCell>
                <TableCell>19%</TableCell>
                <TableCell>22%</TableCell>
                <TableCell>25%</TableCell>
                <TableCell>24%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-green-600">Net Profit</TableCell>
                <TableCell className="font-bold text-green-600">22,548</TableCell>
                <TableCell className="font-bold text-green-600">23,640</TableCell>
                <TableCell className="font-bold text-green-600">29,861</TableCell>
                <TableCell className="font-bold text-green-600">29,833</TableCell>
                <TableCell className="font-bold text-green-600">36,080</TableCell>
                <TableCell className="font-bold text-green-600">39,837</TableCell>
                <TableCell className="font-bold text-green-600">39,880</TableCell>
                <TableCell className="font-bold text-green-600">53,739</TableCell>
                <TableCell className="font-bold text-green-600">67,845</TableCell>
                <TableCell className="font-bold text-green-600">74,088</TableCell>
                <TableCell className="font-bold text-green-600">79,020</TableCell>
                <TableCell className="font-bold text-green-600">81,309</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EPS in Rs</TableCell>
                <TableCell>16.31</TableCell>
                <TableCell>17.07</TableCell>
                <TableCell>21.51</TableCell>
                <TableCell>21.55</TableCell>
                <TableCell>26.69</TableCell>
                <TableCell>29.28</TableCell>
                <TableCell>29.10</TableCell>
                <TableCell>38.75</TableCell>
                <TableCell>44.87</TableCell>
                <TableCell>49.29</TableCell>
                <TableCell>51.45</TableCell>
                <TableCell>51.47</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dividend Payout %</TableCell>
                <TableCell>12%</TableCell>
                <TableCell>12%</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>11%</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>9%</TableCell>
                <TableCell>9%</TableCell>
                <TableCell>9%</TableCell>
                <TableCell>10%</TableCell>
                <TableCell>11%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    {/* Balance Sheet */}
    <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Balance Sheet
        </CardTitle>
        <p className="text-sm text-muted-foreground">Consolidated Figures in Rs. Crores</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Particulars</TableHead>
                <TableHead>Mar 2014</TableHead>
                <TableHead>Mar 2015</TableHead>
                <TableHead>Mar 2016</TableHead>
                <TableHead>Mar 2017</TableHead>
                <TableHead>Mar 2018</TableHead>
                <TableHead>Mar 2019</TableHead>
                <TableHead>Mar 2020</TableHead>
                <TableHead>Mar 2021</TableHead>
                <TableHead>Mar 2022</TableHead>
                <TableHead>Mar 2023</TableHead>
                <TableHead>Mar 2024</TableHead>
                <TableHead>Mar 2025</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Equity Capital</TableCell>
                <TableCell>2,940</TableCell>
                <TableCell>2,943</TableCell>
                <TableCell>2,948</TableCell>
                <TableCell>2,959</TableCell>
                <TableCell>5,922</TableCell>
                <TableCell>5,926</TableCell>
                <TableCell>6,339</TableCell>
                <TableCell>6,445</TableCell>
                <TableCell>6,765</TableCell>
                <TableCell>6,766</TableCell>
                <TableCell>6,766</TableCell>
                <TableCell>13,532</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Reserves</TableCell>
                <TableCell>195,747</TableCell>
                <TableCell>215,556</TableCell>
                <TableCell>228,608</TableCell>
                <TableCell>260,750</TableCell>
                <TableCell>287,584</TableCell>
                <TableCell>381,186</TableCell>
                <TableCell>442,827</TableCell>
                <TableCell>693,727</TableCell>
                <TableCell>772,720</TableCell>
                <TableCell>709,106</TableCell>
                <TableCell>786,715</TableCell>
                <TableCell>829,668</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Borrowings</TableCell>
                <TableCell>138,761</TableCell>
                <TableCell>168,251</TableCell>
                <TableCell>194,714</TableCell>
                <TableCell>217,475</TableCell>
                <TableCell>239,843</TableCell>
                <TableCell>307,714</TableCell>
                <TableCell>355,133</TableCell>
                <TableCell>278,962</TableCell>
                <TableCell>319,158</TableCell>
                <TableCell>451,664</TableCell>
                <TableCell>458,991</TableCell>
                <TableCell>369,575</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Other Liabilities</TableCell>
                <TableCell>91,395</TableCell>
                <TableCell>117,736</TableCell>
                <TableCell>172,727</TableCell>
                <TableCell>225,618</TableCell>
                <TableCell>277,924</TableCell>
                <TableCell>302,804</TableCell>
                <TableCell>358,716</TableCell>
                <TableCell>340,931</TableCell>
                <TableCell>399,979</TableCell>
                <TableCell>438,346</TableCell>
                <TableCell>502,576</TableCell>
                <TableCell>737,346</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total Liabilities</TableCell>
                <TableCell className="font-bold">428,843</TableCell>
                <TableCell className="font-bold">504,486</TableCell>
                <TableCell className="font-bold">598,997</TableCell>
                <TableCell className="font-bold">706,802</TableCell>
                <TableCell className="font-bold">811,273</TableCell>
                <TableCell className="font-bold">997,630</TableCell>
                <TableCell className="font-bold">1,163,015</TableCell>
                <TableCell className="font-bold">1,320,065</TableCell>
                <TableCell className="font-bold">1,498,622</TableCell>
                <TableCell className="font-bold">1,605,882</TableCell>
                <TableCell className="font-bold">1,755,048</TableCell>
                <TableCell className="font-bold">1,950,121</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Fixed Assets</TableCell>
                <TableCell>141,417</TableCell>
                <TableCell>156,458</TableCell>
                <TableCell>184,910</TableCell>
                <TableCell>198,526</TableCell>
                <TableCell>403,885</TableCell>
                <TableCell>398,374</TableCell>
                <TableCell>532,658</TableCell>
                <TableCell>541,258</TableCell>
                <TableCell>627,798</TableCell>
                <TableCell>724,805</TableCell>
                <TableCell>779,985</TableCell>
                <TableCell>1,092,041</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CWIP</TableCell>
                <TableCell>91,494</TableCell>
                <TableCell>166,462</TableCell>
                <TableCell>228,697</TableCell>
                <TableCell>324,837</TableCell>
                <TableCell>187,022</TableCell>
                <TableCell>179,463</TableCell>
                <TableCell>109,106</TableCell>
                <TableCell>125,953</TableCell>
                <TableCell>172,506</TableCell>
                <TableCell>293,752</TableCell>
                <TableCell>338,855</TableCell>
                <TableCell>169,710</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Investments</TableCell>
                <TableCell>60,602</TableCell>
                <TableCell>76,451</TableCell>
                <TableCell>84,015</TableCell>
                <TableCell>82,899</TableCell>
                <TableCell>82,862</TableCell>
                <TableCell>235,635</TableCell>
                <TableCell>276,767</TableCell>
                <TableCell>364,828</TableCell>
                <TableCell>394,264</TableCell>
                <TableCell>235,560</TableCell>
                <TableCell>225,672</TableCell>
                <TableCell>242,381</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Other Assets</TableCell>
                <TableCell>135,330</TableCell>
                <TableCell>105,115</TableCell>
                <TableCell>101,375</TableCell>
                <TableCell>100,540</TableCell>
                <TableCell>137,504</TableCell>
                <TableCell>184,158</TableCell>
                <TableCell>244,484</TableCell>
                <TableCell>288,026</TableCell>
                <TableCell>304,054</TableCell>
                <TableCell>351,765</TableCell>
                <TableCell>410,536</TableCell>
                <TableCell>445,989</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total Assets</TableCell>
                <TableCell className="font-bold">428,843</TableCell>
                <TableCell className="font-bold">504,486</TableCell>
                <TableCell className="font-bold">598,997</TableCell>
                <TableCell className="font-bold">706,802</TableCell>
                <TableCell className="font-bold">811,273</TableCell>
                <TableCell className="font-bold">997,630</TableCell>
                <TableCell className="font-bold">1,163,015</TableCell>
                <TableCell className="font-bold">1,320,065</TableCell>
                <TableCell className="font-bold">1,498,622</TableCell>
                <TableCell className="font-bold">1,605,882</TableCell>
                <TableCell className="font-bold">1,755,048</TableCell>
                <TableCell className="font-bold">1,950,121</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    {/* Cash Flow Statement */}
    <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-600" />
          Cash Flow Statement
        </CardTitle>
        <p className="text-sm text-muted-foreground">Consolidated Figures in Rs. Crores</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Particulars</TableHead>
                <TableHead>Mar 2014</TableHead>
                <TableHead>Mar 2015</TableHead>
                <TableHead>Mar 2016</TableHead>
                <TableHead>Mar 2017</TableHead>
                <TableHead>Mar 2018</TableHead>
                <TableHead>Mar 2019</TableHead>
                <TableHead>Mar 2020</TableHead>
                <TableHead>Mar 2021</TableHead>
                <TableHead>Mar 2022</TableHead>
                <TableHead>Mar 2023</TableHead>
                <TableHead>Mar 2024</TableHead>
                <TableHead>Mar 2025</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Cash from Operating Activity</TableCell>
                <TableCell className="text-green-600">43,261</TableCell>
                <TableCell className="text-green-600">34,374</TableCell>
                <TableCell className="text-green-600">38,134</TableCell>
                <TableCell className="text-green-600">49,550</TableCell>
                <TableCell className="text-green-600">71,459</TableCell>
                <TableCell className="text-green-600">42,346</TableCell>
                <TableCell className="text-green-600">94,877</TableCell>
                <TableCell className="text-green-600">26,958</TableCell>
                <TableCell className="text-green-600">110,654</TableCell>
                <TableCell className="text-green-600">115,032</TableCell>
                <TableCell className="text-green-600">158,788</TableCell>
                <TableCell className="text-green-600">178,703</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cash from Investing Activity</TableCell>
                <TableCell className="text-red-600">-73,070</TableCell>
                <TableCell className="text-red-600">-64,706</TableCell>
                <TableCell className="text-red-600">-36,186</TableCell>
                <TableCell className="text-red-600">-66,201</TableCell>
                <TableCell className="text-red-600">-68,192</TableCell>
                <TableCell className="text-red-600">-94,507</TableCell>
                <TableCell className="text-red-600">-72,497</TableCell>
                <TableCell className="text-red-600">-142,385</TableCell>
                <TableCell className="text-red-600">-109,162</TableCell>
                <TableCell className="text-red-600">-93,001</TableCell>
                <TableCell className="text-red-600">-113,581</TableCell>
                <TableCell className="text-red-600">-137,535</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cash from Financing Activity</TableCell>
                <TableCell>13,713</TableCell>
                <TableCell>8,444</TableCell>
                <TableCell className="text-red-600">-3,210</TableCell>
                <TableCell>8,617</TableCell>
                <TableCell className="text-red-600">-2,001</TableCell>
                <TableCell className="text-green-600">55,906</TableCell>
                <TableCell className="text-red-600">-2,541</TableCell>
                <TableCell className="text-green-600">101,904</TableCell>
                <TableCell>17,289</TableCell>
                <TableCell>10,455</TableCell>
                <TableCell className="text-red-600">-16,646</TableCell>
                <TableCell className="text-red-600">-31,891</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Net Cash Flow</TableCell>
                <TableCell className="font-bold text-red-600">-16,096</TableCell>
                <TableCell className="font-bold text-red-600">-21,888</TableCell>
                <TableCell className="font-bold text-red-600">-1,262</TableCell>
                <TableCell className="font-bold text-red-600">-8,034</TableCell>
                <TableCell className="font-bold text-green-600">1,266</TableCell>
                <TableCell className="font-bold text-green-600">3,745</TableCell>
                <TableCell className="font-bold text-green-600">19,839</TableCell>
                <TableCell className="font-bold text-red-600">-13,523</TableCell>
                <TableCell className="font-bold text-green-600">18,781</TableCell>
                <TableCell className="font-bold text-green-600">32,486</TableCell>
                <TableCell className="font-bold text-green-600">28,561</TableCell>
                <TableCell className="font-bold text-green-600">9,277</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </>
);

const PeerComparisonSection = () => (
  <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="w-5 h-5 text-purple-600" />
        Peer Comparison
      </CardTitle>
      <p className="text-sm text-muted-foreground">Energy › Oil, Gas & Consumable Fuels › Petroleum Products › Refineries & Marketing</p>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>CMP Rs.</TableHead>
              <TableHead>P/E</TableHead>
              <TableHead>Mar Cap Rs.Cr.</TableHead>
              <TableHead>Div Yld %</TableHead>
              <TableHead>NP Qtr Rs.Cr.</TableHead>
              <TableHead>Qtr Profit Var %</TableHead>
              <TableHead>Sales Qtr Rs.Cr.</TableHead>
              <TableHead>Qtr Sales Var %</TableHead>
              <TableHead>ROCE %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-blue-50">
              <TableCell>1.</TableCell>
              <TableCell className="font-medium text-blue-600">Reliance Industries</TableCell>
              <TableCell>1517.20</TableCell>
              <TableCell>29.48</TableCell>
              <TableCell>2053078.61</TableCell>
              <TableCell>0.33</TableCell>
              <TableCell>22611.00</TableCell>
              <TableCell className="text-green-600">2.41</TableCell>
              <TableCell>261388.00</TableCell>
              <TableCell className="text-green-600">10.51</TableCell>
              <TableCell>9.43</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2.</TableCell>
              <TableCell className="font-medium">I O C L</TableCell>
              <TableCell>152.30</TableCell>
              <TableCell>17.75</TableCell>
              <TableCell>215281.38</TableCell>
              <TableCell>7.88</TableCell>
              <TableCell>8367.63</TableCell>
              <TableCell className="text-green-600">57.76</TableCell>
              <TableCell>195270.29</TableCell>
              <TableCell className="text-red-600">-1.70</TableCell>
              <TableCell>7.37</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3.</TableCell>
              <TableCell className="font-medium">B P C L</TableCell>
              <TableCell>350.70</TableCell>
              <TableCell>11.17</TableCell>
              <TableCell>152085.93</TableCell>
              <TableCell>5.98</TableCell>
              <TableCell>4391.83</TableCell>
              <TableCell className="text-red-600">-8.12</TableCell>
              <TableCell>111230.21</TableCell>
              <TableCell className="text-red-600">-4.57</TableCell>
              <TableCell>16.25</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4.</TableCell>
              <TableCell className="font-medium">H P C L</TableCell>
              <TableCell>441.20</TableCell>
              <TableCell>13.95</TableCell>
              <TableCell>93963.90</TableCell>
              <TableCell>4.76</TableCell>
              <TableCell>3415.44</TableCell>
              <TableCell className="text-green-600">26.06</TableCell>
              <TableCell>109632.80</TableCell>
              <TableCell className="text-red-600">-4.40</TableCell>
              <TableCell>10.51</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5.</TableCell>
              <TableCell className="font-medium">M R P L</TableCell>
              <TableCell>145.50</TableCell>
              <TableCell>453.63</TableCell>
              <TableCell>25498.57</TableCell>
              <TableCell>2.06</TableCell>
              <TableCell>370.63</TableCell>
              <TableCell className="text-red-600">-67.60</TableCell>
              <TableCell>24595.87</TableCell>
              <TableCell className="text-red-600">-2.89</TableCell>
              <TableCell>4.33</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6.</TableCell>
              <TableCell className="font-medium">C P C L</TableCell>
              <TableCell>733.25</TableCell>
              <TableCell>51.01</TableCell>
              <TableCell>10920.41</TableCell>
              <TableCell>7.51</TableCell>
              <TableCell>469.93</TableCell>
              <TableCell className="text-red-600">-25.16</TableCell>
              <TableCell>17249.12</TableCell>
              <TableCell className="text-red-600">-2.66</TableCell>
              <TableCell>4.30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>7.</TableCell>
              <TableCell className="font-medium">Rajasthan Gases</TableCell>
              <TableCell>41.50</TableCell>
              <TableCell>45.45</TableCell>
              <TableCell>319.02</TableCell>
              <TableCell>0.00</TableCell>
              <TableCell>0.67</TableCell>
              <TableCell className="text-green-600">1775.00</TableCell>
              <TableCell>1.80</TableCell>
              <TableCell></TableCell>
              <TableCell>24.81</TableCell>
            </TableRow>
            <TableRow className="border-t-2 bg-gray-50">
              <TableCell></TableCell>
              <TableCell className="font-bold">Median: 9 Co.</TableCell>
              <TableCell>152.3</TableCell>
              <TableCell>29.48</TableCell>
              <TableCell>25498.57</TableCell>
              <TableCell>2.06</TableCell>
              <TableCell>469.93</TableCell>
              <TableCell>4.55</TableCell>
              <TableCell>24595.87</TableCell>
              <TableCell>-2.18</TableCell>
              <TableCell>9.43</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

const StockProductPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  // Enhanced stock data for Reliance Industries
  const stockData = {
    symbol: symbol?.toUpperCase() || 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    price: 2847.65,
    change: 45.30,
    changePercent: 1.62,
    marketCap: '₹19.2L Cr',
    sector: 'Energy & Petrochemicals',
    industry: 'Oil & Gas',
    description: 'Reliance Industries Limited is India\'s largest private sector company engaged in energy, petrochemicals, textiles, natural resources, retail, and telecommunications. The company operates across various business segments including oil refining, petrochemicals, oil and gas exploration, retail, and digital services through Jio Platforms.'
  };

  const isPositive = stockData.change >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/stock-market')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Market
          </Button>
          <div className="h-6 w-px bg-border" />
          <nav className="text-sm text-muted-foreground">
            <span>Stock Market</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{stockData.symbol}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Company Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{stockData.symbol}</h1>
                    <p className="text-lg text-muted-foreground">{stockData.companyName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {stockData.sector}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300">
                    {stockData.industry}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-gray-300">NSE</Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {stockData.description}
                </p>
              </div>

              {/* Right: Price & Actions */}
              <div className="lg:text-right">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    ₹{stockData.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                  <div className={`flex items-center gap-2 text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'} lg:justify-end`}>
                    {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span>
                      {isPositive ? '+' : ''}₹{stockData.change.toFixed(2)} 
                      ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Market Cap: {stockData.marketCap}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                    <Plus size={16} />
                    Buy Stock
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`flex items-center gap-2 ${isFollowing ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : ''}`}
                  >
                    <Heart size={16} className={isFollowing ? 'fill-current' : ''} />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bell size={16} />
                    Alerts
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">24.5</div>
              <div className="text-xs text-muted-foreground">P/E Ratio</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">₹3,024</div>
              <div className="text-xs text-muted-foreground">52W High</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">₹2,220</div>
              <div className="text-xs text-muted-foreground">52W Low</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">0.35%</div>
              <div className="text-xs text-muted-foreground">Dividend Yield</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">1.2Cr</div>
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="text-xs mt-1 text-green-600">+15%</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">0.95</div>
              <div className="text-xs text-muted-foreground">Beta</div>
            </CardContent>
          </Card>
        </div>

        {/* Price Chart */}
        <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Price Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive price chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout for Highlights and Business Segments */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Key Highlights */}
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Largest private sector company in India by market capitalization</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Strong presence in energy, petrochemicals, and retail sectors</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Jio platforms driving digital transformation initiatives</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Consistent dividend payments with strong cash flows</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Strategic partnerships with global technology giants</p>
              </div>
            </CardContent>
          </Card>

          {/* Business Segments */}
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                Business Segments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Oil & Gas</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Retail</span>
                  <span className="text-sm text-muted-foreground">32%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Digital Services</span>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Petrochemicals</span>
                  <span className="text-sm text-muted-foreground">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Health and Research Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Financial Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Debt to Equity</span>
                  <span className="text-sm font-medium">0.21</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Ratio</span>
                  <span className="text-sm font-medium">1.15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ROE</span>
                  <span className="text-sm font-medium">13.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ROA</span>
                  <span className="text-sm font-medium">7.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Net Profit Margin</span>
                  <span className="text-sm font-medium">8.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Research Integration */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                AI Research Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Get detailed AI-powered analysis, personalized recommendations, and real-time insights for this stock.
              </p>
              <Button 
                onClick={() => navigate(`/research/stock/${symbol}`)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <BarChart3 size={16} className="mr-2" />
                View Detailed Research
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <DocumentsSection />

        {/* Shareholding Pattern */}
        <ShareholdingPatternSection />

        {/* Financial Statements */}
        <FinancialStatementsSection />

        {/* Peer Comparison */}
        <PeerComparisonSection />

        {/* News Section */}
        <Card className="bg-white/70 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Latest News & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">Reliance Reports Strong Q3 Results with 12% Revenue Growth</h4>
                <p className="text-sm text-muted-foreground mb-2">Company beats analyst expectations with improved margins across all business segments, driven by strong performance in retail and digital services.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>2 hours ago</span>
                  <span>•</span>
                  <span>Economic Times</span>
                </div>
              </div>
              <div className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">Jio Platforms Announces 5G Expansion Across 1000 Cities</h4>
                <p className="text-sm text-muted-foreground mb-2">Reliance Jio accelerates 5G rollout with plans to cover major cities by Q2 2024, expecting significant subscriber growth.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>1 day ago</span>
                  <span>•</span>
                  <span>Business Standard</span>
                </div>
              </div>
              <div className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">RIL Green Energy Initiative Gets ₹75,000 Cr Investment</h4>
                <p className="text-sm text-muted-foreground mb-2">Company commits to carbon neutrality by 2035 with major investments in solar, hydrogen, and battery storage technologies.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>3 days ago</span>
                  <span>•</span>
                  <span>Financial Express</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockProductPage;

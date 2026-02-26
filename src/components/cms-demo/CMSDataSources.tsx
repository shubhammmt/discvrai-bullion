import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { bankEntries, erpEntries, cashEntries, formatINR } from '@/data/cmsDemo';
import { Building2, FileText, Banknote } from 'lucide-react';

const CMSDataSources = () => {
  return (
    <Card className="border border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold text-slate-800">Data Sources</CardTitle>
        <p className="text-xs text-slate-500">Real-time feeds from Bank, ERP, and Cash systems</p>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="bank" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-3">
            <TabsTrigger value="bank" className="text-xs gap-1"><Building2 className="h-3 w-3" />Bank</TabsTrigger>
            <TabsTrigger value="erp" className="text-xs gap-1"><FileText className="h-3 w-3" />ERP Ledger</TabsTrigger>
            <TabsTrigger value="cash" className="text-xs gap-1"><Banknote className="h-3 w-3" />Cash / ATM</TabsTrigger>
          </TabsList>

          <TabsContent value="bank">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-semibold">Date</TableHead>
                    <TableHead className="text-xs font-semibold">Reference</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Amount</TableHead>
                    <TableHead className="text-xs font-semibold">Narration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bankEntries.map(e => (
                    <TableRow key={e.id} className="text-xs">
                      <TableCell className="py-2">{e.date}</TableCell>
                      <TableCell className="py-2 font-mono text-xs">{e.reference}</TableCell>
                      <TableCell className="py-2 text-right font-semibold">{formatINR(e.amount)}</TableCell>
                      <TableCell className="py-2 text-slate-500">{e.narration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="erp">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-semibold">Invoice ID</TableHead>
                    <TableHead className="text-xs font-semibold">Client</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Amount</TableHead>
                    <TableHead className="text-xs font-semibold">Date</TableHead>
                    <TableHead className="text-xs font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {erpEntries.map(e => (
                    <TableRow key={e.id} className="text-xs">
                      <TableCell className="py-2 font-mono">{e.invoiceId}</TableCell>
                      <TableCell className="py-2">{e.client}</TableCell>
                      <TableCell className="py-2 text-right font-semibold">{formatINR(e.amount)}</TableCell>
                      <TableCell className="py-2">{e.date}</TableCell>
                      <TableCell className="py-2"><Badge variant="outline" className="text-[10px]">{e.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="cash">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="text-xs font-semibold">ATM ID</TableHead>
                    <TableHead className="text-xs font-semibold">Date</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Dispensed</TableHead>
                    <TableHead className="text-xs font-semibold text-right">Deposited</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashEntries.map(e => (
                    <TableRow key={e.id} className="text-xs">
                      <TableCell className="py-2 font-mono">{e.atmId}</TableCell>
                      <TableCell className="py-2">{e.date}</TableCell>
                      <TableCell className="py-2 text-right font-semibold">{formatINR(e.dispensed)}</TableCell>
                      <TableCell className="py-2 text-right font-semibold">{formatINR(e.deposited)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CMSDataSources;

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ACTIVITIES, CATEGORIES, ITEMS, PLANTS, SUBCATEGORIES, WASTAGE_REASONS } from './store';

export default function MasterDataPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Master Data</h1>
        <p className="text-sm text-slate-500">Reference taxonomy used across forms. Admin-only edits.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <MasterCard title="Plants" rows={PLANTS} />
        <MasterCard title="Categories / Plant Lines" rows={CATEGORIES} />
        <MasterCard title="Subcategories / Departments" rows={SUBCATEGORIES} />
        <MasterCard title="Activities" rows={ACTIVITIES} />
        <MasterCard title="Product Items" rows={ITEMS} />
        <MasterCard title="Wastage Reasons" rows={WASTAGE_REASONS} />
      </div>

      <Card className="p-5">
        <div className="text-sm font-semibold mb-3">Product Wastage Standards</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead><TableHead>Output Unit</TableHead><TableHead>Standard %</TableHead><TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ITEMS.map(i => (
              <TableRow key={i}>
                <TableCell>{i}</TableCell>
                <TableCell>MT</TableCell>
                <TableCell>1.5%</TableCell>
                <TableCell><Badge className="bg-emerald-100 text-emerald-700">Active</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function MasterCard({ title, rows }: { title: string; rows: string[] }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold">{title}</div>
        <Badge variant="outline">{rows.length}</Badge>
      </div>
      <ul className="space-y-1.5 text-sm">
        {rows.map(r => <li key={r} className="flex items-center justify-between border-b border-dashed border-slate-100 pb-1.5">{r}<Badge variant="outline" className="text-xs">Active</Badge></li>)}
      </ul>
    </Card>
  );
}

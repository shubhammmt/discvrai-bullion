import React, { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ACTIVITIES, CATEGORIES, ITEMS, OUTPUT_UNITS, PLANTS, SUBCATEGORIES, WASTAGE_REASONS, WASTAGE_UNITS,
  classifyWastage, computeActualWastagePct, useWastage, WastageEntry as WE, OutputUnit, WastageUnit,
} from './store';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);

export default function WastageEntryPage() {
  const { data, add, remove } = useWastage();
  const [form, setForm] = useState({
    date: today(),
    plant: PLANTS[0],
    category: '',
    subcategory: '',
    product_line: '',
    activity: '',
    item_name: '',
    output_quantity: 0,
    output_unit: 'MT' as OutputUnit,
    output_mt: 0,
    wastage_quantity: 0,
    wastage_unit: 'Kg' as WastageUnit,
    standard_wastage_percent: 1.5,
    wastage_reason: '',
    remarks: '',
  });
  const [filterDate, setFilterDate] = useState('');
  const [showExceptions, setShowExceptions] = useState(false);

  const actual = +computeActualWastagePct(
    form.wastage_quantity, form.wastage_unit,
    form.output_quantity, form.output_unit, form.output_mt
  ).toFixed(2);
  const variance = +(actual - form.standard_wastage_percent).toFixed(2);
  const status = classifyWastage(actual, form.standard_wastage_percent);
  const outputMissing = form.wastage_quantity > 0 && !form.output_quantity && !form.output_mt;

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.date) return toast.error('Date is mandatory');
    if (!form.product_line) return toast.error('Product Line is mandatory');
    if (!form.item_name) return toast.error('Item Name is mandatory');
    if (form.wastage_quantity < 0) return toast.error('Wastage cannot be negative');
    if (form.wastage_quantity > 0 && !form.output_quantity && !form.output_mt)
      return toast.error('Output is required when wastage is entered');

    const entry: WE = {
      id: crypto.randomUUID(),
      ...form,
      actual_wastage_percent: actual,
      wastage_variance_percent: variance,
      wastage_status: status,
      source_type: 'manual',
      created_by: 'supervisor',
      created_at: new Date().toISOString(),
    };
    add(entry);
    toast.success('Wastage entry saved');
    setForm(f => ({ ...f, wastage_quantity: 0, output_quantity: 0, output_mt: 0, remarks: '' }));
  };

  const filtered = useMemo(() => {
    let arr = filterDate ? data.filter(d => d.date === filterDate) : data;
    if (showExceptions) arr = arr.filter(e => e.actual_wastage_percent > e.standard_wastage_percent);
    return arr;
  }, [data, filterDate, showExceptions]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Daily Product Line Wastage</h1>
        <p className="text-sm text-slate-500">Capture wastage by product line and item; variance flagged vs standard.</p>
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Field label="Date *"><Input type="date" value={form.date} onChange={e => set('date', e.target.value)} /></Field>
          <Field label="Plant / Unit"><SelectBox value={form.plant} onChange={v => set('plant', v)} options={PLANTS} /></Field>
          <Field label="Category / Plant Line"><SelectBox value={form.category} onChange={v => set('category', v)} options={CATEGORIES} placeholder="Select category" /></Field>
          <Field label="Subcategory / Department"><SelectBox value={form.subcategory} onChange={v => set('subcategory', v)} options={SUBCATEGORIES} placeholder="Select subcategory" /></Field>
          <Field label="Product Line / Activity *"><SelectBox value={form.product_line} onChange={v => set('product_line', v)} options={SUBCATEGORIES} placeholder="Select product line" /></Field>
          <Field label="Activity"><SelectBox value={form.activity} onChange={v => set('activity', v)} options={ACTIVITIES} placeholder="Select activity" /></Field>
          <Field label="Item Name *"><SelectBox value={form.item_name} onChange={v => set('item_name', v)} options={ITEMS} placeholder="Select item" /></Field>
          <Field label="Output Quantity"><Input type="number" min={0} value={form.output_quantity} onChange={e => set('output_quantity', +e.target.value)} /></Field>
          <Field label="Output Unit"><SelectBox value={form.output_unit} onChange={v => set('output_unit', v as OutputUnit)} options={OUTPUT_UNITS} /></Field>
          <Field label="Output in MT"><Input type="number" min={0} step="0.01" value={form.output_mt} onChange={e => set('output_mt', +e.target.value)} /></Field>
          <Field label="Wastage Quantity"><Input type="number" min={0} value={form.wastage_quantity} onChange={e => set('wastage_quantity', +e.target.value)} /></Field>
          <Field label="Wastage Unit"><SelectBox value={form.wastage_unit} onChange={v => set('wastage_unit', v as WastageUnit)} options={WASTAGE_UNITS} /></Field>
          <Field label="Standard Wastage %"><Input type="number" min={0} step="0.01" value={form.standard_wastage_percent} onChange={e => set('standard_wastage_percent', +e.target.value)} /></Field>
          <Field label="Wastage Reason"><SelectBox value={form.wastage_reason} onChange={v => set('wastage_reason', v)} options={WASTAGE_REASONS} placeholder="Select reason" /></Field>
          <Field label="Remarks"><Input value={form.remarks} onChange={e => set('remarks', e.target.value)} /></Field>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t pt-4">
          <Badge variant="outline">Actual %: <span className={`ml-1 font-semibold ${actual > form.standard_wastage_percent ? 'text-red-600' : 'text-emerald-700'}`}>{outputMissing ? 'Output Missing' : `${actual}%`}</span></Badge>
          <Badge variant="outline">Variance: <span className="ml-1 font-semibold">{variance}%</span></Badge>
          <Badge className={
            status === 'Within Limit' ? 'bg-emerald-100 text-emerald-700' :
              status === 'Slightly High' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
          }>{status}</Badge>
          <div className="ml-auto">
            <Button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700">Save Entry</Button>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <div className="text-sm font-semibold">Wastage Entries ({filtered.length})</div>
          <div className="flex gap-2 items-center">
            <Button variant={showExceptions ? 'default' : 'outline'} size="sm" onClick={() => setShowExceptions(s => !s)}>
              {showExceptions ? 'Showing exceptions' : 'Exceptions only'}
            </Button>
            <Input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-44" />
          </div>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product Line</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Output (MT)</TableHead>
                <TableHead className="text-right">Wastage</TableHead>
                <TableHead className="text-right">Std %</TableHead>
                <TableHead className="text-right">Actual %</TableHead>
                <TableHead className="text-right">Variance</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 100).map(e => (
                <TableRow key={e.id}>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.product_line}</TableCell>
                  <TableCell>{e.item_name}</TableCell>
                  <TableCell className="text-right">{e.output_mt}</TableCell>
                  <TableCell className="text-right">{e.wastage_quantity} {e.wastage_unit}</TableCell>
                  <TableCell className="text-right">{e.standard_wastage_percent}%</TableCell>
                  <TableCell className={`text-right font-medium ${e.actual_wastage_percent > e.standard_wastage_percent ? 'text-red-600' : 'text-emerald-700'}`}>{e.actual_wastage_percent}%</TableCell>
                  <TableCell className="text-right">{e.wastage_variance_percent}%</TableCell>
                  <TableCell>{e.wastage_reason}</TableCell>
                  <TableCell>
                    <Badge className={
                      e.wastage_status === 'Within Limit' ? 'bg-emerald-100 text-emerald-700' :
                        e.wastage_status === 'Slightly High' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                    }>{e.wastage_status}</Badge>
                  </TableCell>
                  <TableCell><Button size="icon" variant="ghost" onClick={() => remove(e.id)}><Trash2 className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={11} className="text-center text-slate-400 py-8">No entries</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs text-slate-600">{label}</Label>{children}</div>;
}
function SelectBox({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder={placeholder || 'Select'} /></SelectTrigger>
      <SelectContent className="bg-white z-50">
        {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

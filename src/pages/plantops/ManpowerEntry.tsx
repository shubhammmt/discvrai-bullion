import React, { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ACTIVITIES, CATEGORIES, OUTPUT_UNITS, PLANTS, SUBCATEGORIES,
  classifyProductivity, useManpower, ManpowerEntry as ME, OutputUnit,
} from './store';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const today = () => new Date().toISOString().slice(0, 10);

export default function ManpowerEntryPage() {
  const { data, add, remove } = useManpower();
  const [form, setForm] = useState({
    date: today(),
    plant: PLANTS[0],
    category: '',
    subcategory: '',
    activity: '',
    manpower_day: 0,
    manpower_night: 0,
    manpower_ot: 0,
    output_quantity: 0,
    output_unit: 'MT' as OutputUnit,
    output_mt: 0,
    remarks: '',
  });
  const [filterDate, setFilterDate] = useState('');

  const total = form.manpower_day + form.manpower_night + form.manpower_ot;
  const mtPerMan = total > 0 ? +(form.output_mt / total).toFixed(3) : 0;
  const status = classifyProductivity(mtPerMan);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.date) return toast.error('Date is mandatory');
    if (!form.category) return toast.error('Category is mandatory');
    if (!form.subcategory) return toast.error('Subcategory is mandatory');
    if (form.manpower_day < 0 || form.manpower_night < 0 || form.manpower_ot < 0)
      return toast.error('Shift manpower cannot be negative');
    if (form.output_mt > 0 && total === 0) toast.warning('Output entered but manpower is zero');
    const activity = form.activity || (total > 0 ? 'General / Support' : '');

    const entry: ME = {
      id: crypto.randomUUID(),
      ...form,
      activity,
      total_manpower: total,
      mt_per_man: mtPerMan,
      productivity_status: status,
      source_type: 'manual',
      created_by: 'supervisor',
      created_at: new Date().toISOString(),
    };
    add(entry);
    toast.success('Manpower entry saved');
    setForm(f => ({ ...f, manpower_day: 0, manpower_night: 0, manpower_ot: 0, output_quantity: 0, output_mt: 0, remarks: '' }));
  };

  const filtered = useMemo(() =>
    filterDate ? data.filter(d => d.date === filterDate) : data,
    [data, filterDate]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Daily Manpower Deployment</h1>
        <p className="text-sm text-slate-500">Capture shift-wise manpower deployed per category, subcategory and activity.</p>
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Field label="Date *">
            <Input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
          </Field>
          <Field label="Plant / Unit">
            <SelectBox value={form.plant} onChange={v => set('plant', v)} options={PLANTS} />
          </Field>
          <Field label="Category / Plant Line *">
            <SelectBox value={form.category} onChange={v => set('category', v)} options={CATEGORIES} placeholder="Select category" />
          </Field>
          <Field label="Subcategory / Department *">
            <SelectBox value={form.subcategory} onChange={v => set('subcategory', v)} options={SUBCATEGORIES} placeholder="Select subcategory" />
          </Field>
          <Field label="Activity">
            <SelectBox value={form.activity} onChange={v => set('activity', v)} options={ACTIVITIES} placeholder="Auto: General / Support" />
          </Field>
          <Field label="Day Manpower">
            <Input type="number" min={0} value={form.manpower_day} onChange={e => set('manpower_day', +e.target.value)} />
          </Field>
          <Field label="Night Manpower">
            <Input type="number" min={0} value={form.manpower_night} onChange={e => set('manpower_night', +e.target.value)} />
          </Field>
          <Field label="OT Manpower">
            <Input type="number" min={0} value={form.manpower_ot} onChange={e => set('manpower_ot', +e.target.value)} />
          </Field>
          <Field label="Output Quantity">
            <Input type="number" min={0} value={form.output_quantity} onChange={e => set('output_quantity', +e.target.value)} />
          </Field>
          <Field label="Output Unit">
            <SelectBox value={form.output_unit} onChange={v => set('output_unit', v as OutputUnit)} options={OUTPUT_UNITS} />
          </Field>
          <Field label="Output in MT">
            <Input type="number" min={0} step="0.01" value={form.output_mt} onChange={e => set('output_mt', +e.target.value)} />
          </Field>
          <Field label="Remarks / Abnormality">
            <Input value={form.remarks} onChange={e => set('remarks', e.target.value)} placeholder="Optional" />
          </Field>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t pt-4">
          <Badge variant="outline">Total Manpower: <span className="ml-1 font-semibold">{total}</span></Badge>
          <Badge variant="outline">MT / Man: <span className="ml-1 font-semibold">{mtPerMan}</span></Badge>
          <Badge className={
            status === 'Good' ? 'bg-emerald-100 text-emerald-700' :
              status === 'Low' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
          }>{status}</Badge>
          <div className="ml-auto">
            <Button onClick={submit} className="bg-emerald-600 hover:bg-emerald-700">Save Entry</Button>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <div className="text-sm font-semibold">Daily Entry Table ({filtered.length})</div>
          <Input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-44" placeholder="Filter date" />
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Day</TableHead>
                <TableHead className="text-right">Night</TableHead>
                <TableHead className="text-right">OT</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">MT</TableHead>
                <TableHead className="text-right">MT/Man</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 100).map(e => (
                <TableRow key={e.id}>
                  <TableCell>{e.date}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{e.category}</TableCell>
                  <TableCell>{e.subcategory}</TableCell>
                  <TableCell>{e.activity}</TableCell>
                  <TableCell className="text-right">{e.manpower_day}</TableCell>
                  <TableCell className="text-right">{e.manpower_night}</TableCell>
                  <TableCell className="text-right">{e.manpower_ot}</TableCell>
                  <TableCell className="text-right font-medium">{e.total_manpower}</TableCell>
                  <TableCell className="text-right">{e.output_mt}</TableCell>
                  <TableCell className="text-right">{e.mt_per_man}</TableCell>
                  <TableCell>
                    <Badge className={
                      e.productivity_status === 'Good' ? 'bg-emerald-100 text-emerald-700' :
                        e.productivity_status === 'Low' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                    }>{e.productivity_status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => remove(e.id)}><Trash2 className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={12} className="text-center text-slate-400 py-8">No entries</TableCell></TableRow>
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

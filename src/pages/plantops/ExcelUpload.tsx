import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload, FileSpreadsheet, Download } from 'lucide-react';
import { useManpower, useWastage, classifyProductivity, classifyWastage, computeActualWastagePct, ManpowerEntry, WastageEntry, OutputUnit, WastageUnit } from './store';

type Mode = 'manpower' | 'wastage';

export default function ExcelUploadPage() {
  const [mode, setMode] = useState<Mode>('manpower');
  const [preview, setPreview] = useState<any[]>([]);
  const [fileName, setFileName] = useState('');
  const { replaceAll: replaceMp, data: mp } = useManpower();
  const { replaceAll: replaceWs, data: ws } = useWastage();

  const parseCsv = (text: string) => {
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (!lines.length) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const cells = line.split(',').map(c => c.trim());
      const obj: any = {};
      headers.forEach((h, i) => { obj[h] = cells[i]; });
      return obj;
    });
  };

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    const text = await f.text();
    const rows = parseCsv(text);
    setPreview(rows.slice(0, 50));
    toast.success(`Parsed ${rows.length} rows from ${f.name}`);
  };

  const importNow = () => {
    if (!preview.length) return toast.error('Nothing to import');
    if (mode === 'manpower') {
      const newRows: ManpowerEntry[] = preview.map((r, i) => {
        const day = +(r.manpower_day || 0), night = +(r.manpower_night || 0), ot = +(r.manpower_ot || 0);
        const total = day + night + ot;
        const outMt = +(r.output_mt || 0);
        const mpm = total > 0 ? +(outMt / total).toFixed(3) : 0;
        return {
          id: crypto.randomUUID(),
          date: r.date, plant: r.plant || 'Unit 1 - Valsad',
          category: r.category || '', subcategory: r.subcategory || '',
          activity: r.activity || 'General / Support',
          manpower_day: day, manpower_night: night, manpower_ot: ot,
          total_manpower: total,
          output_quantity: +(r.output_quantity || 0),
          output_unit: (r.output_unit || 'MT') as OutputUnit,
          output_mt: outMt, mt_per_man: mpm,
          productivity_status: classifyProductivity(mpm),
          remarks: r.remarks || '',
          source_type: 'excel', source_file_name: fileName,
          created_by: 'upload', created_at: new Date().toISOString(),
        };
      });
      replaceMp([...newRows, ...mp]);
    } else {
      const newRows: WastageEntry[] = preview.map(r => {
        const wq = +(r.wastage_quantity || 0);
        const wu = (r.wastage_unit || 'Kg') as WastageUnit;
        const oq = +(r.output_quantity || 0);
        const ou = (r.output_unit || 'MT') as OutputUnit;
        const omt = +(r.output_mt || 0);
        const std = +(r.standard_wastage_percent || 1.5);
        const actual = +computeActualWastagePct(wq, wu, oq, ou, omt).toFixed(2);
        return {
          id: crypto.randomUUID(),
          date: r.date, plant: r.plant || 'Unit 1 - Valsad',
          category: r.category || '', subcategory: r.subcategory || '',
          product_line: r.product_line || r.subcategory || '',
          activity: r.activity || '', item_name: r.item_name || '',
          output_quantity: oq, output_unit: ou, output_mt: omt,
          wastage_quantity: wq, wastage_unit: wu,
          standard_wastage_percent: std,
          actual_wastage_percent: actual,
          wastage_variance_percent: +(actual - std).toFixed(2),
          wastage_reason: r.wastage_reason || 'Other',
          wastage_status: classifyWastage(actual, std),
          remarks: r.remarks || '',
          source_type: 'excel', source_file_name: fileName,
          created_by: 'upload', created_at: new Date().toISOString(),
        };
      });
      replaceWs([...newRows, ...ws]);
    }
    toast.success(`Imported ${preview.length} ${mode} rows`);
    setPreview([]); setFileName('');
  };

  const downloadTemplate = () => {
    const headers = mode === 'manpower'
      ? ['date','plant','category','subcategory','activity','manpower_day','manpower_night','manpower_ot','output_quantity','output_unit','output_mt','remarks']
      : ['date','plant','category','subcategory','product_line','activity','item_name','output_quantity','output_unit','output_mt','wastage_quantity','wastage_unit','standard_wastage_percent','wastage_reason','remarks'];
    const csv = headers.join(',') + '\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${mode}_template.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Excel / CSV Upload</h1>
        <p className="text-sm text-slate-500">Bulk import daily entries using the template format (CSV).</p>
      </div>

      <Card className="p-5 space-y-4">
        <div className="flex gap-2">
          <Button variant={mode === 'manpower' ? 'default' : 'outline'} onClick={() => setMode('manpower')}>Manpower</Button>
          <Button variant={mode === 'wastage' ? 'default' : 'outline'} onClick={() => setMode('wastage')}>Wastage</Button>
          <Button variant="ghost" className="ml-auto" onClick={downloadTemplate}><Download className="w-4 h-4 mr-2" /> Download template</Button>
        </div>

        <label className="border-2 border-dashed border-slate-300 rounded-lg p-10 grid place-items-center cursor-pointer hover:bg-slate-50">
          <input type="file" accept=".csv" onChange={onFile} className="hidden" />
          <div className="text-center">
            <Upload className="w-10 h-10 mx-auto text-slate-400 mb-2" />
            <div className="text-sm font-medium">Click to upload CSV</div>
            <div className="text-xs text-slate-500">{fileName || `Use the ${mode} template column names`}</div>
          </div>
        </label>

        {preview.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium"><FileSpreadsheet className="w-4 h-4" /> Preview ({preview.length} rows)</div>
            <div className="overflow-auto border rounded-md max-h-72">
              <table className="w-full text-xs">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>{Object.keys(preview[0]).map(k => <th key={k} className="p-2 text-left">{k}</th>)}</tr>
                </thead>
                <tbody>
                  {preview.map((r, i) => (
                    <tr key={i} className="border-t">
                      {Object.values(r).map((v: any, j) => <td key={j} className="p-2">{String(v)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button onClick={importNow} className="bg-emerald-600 hover:bg-emerald-700">Import {preview.length} rows</Button>
          </div>
        )}
      </Card>
    </div>
  );
}

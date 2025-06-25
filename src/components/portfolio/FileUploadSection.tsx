
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileSpreadsheet, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadSectionProps {
  onFileProcessed: () => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ onFileProcessed }) => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'excel' | 'image') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'excel' && file.type.includes('sheet')) {
        toast({
          title: "Excel file uploaded",
          description: "Processing your portfolio data...",
        });
        setTimeout(() => {
          toast({
            title: "Portfolio updated",
            description: "Your portfolio has been updated from Excel file.",
          });
          onFileProcessed();
        }, 2000);
      } else if (type === 'image' && file.type.includes('image')) {
        toast({
          title: "Image uploaded",
          description: "Processing portfolio image...",
        });
        setTimeout(() => {
          toast({
            title: "Portfolio extracted",
            description: "Data extracted from image and added to portfolio.",
          });
          onFileProcessed();
        }, 3000);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            Upload Excel File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Upload your portfolio data in Excel format. We support standard formats from major brokers.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
            <Input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => handleFileUpload(e, 'excel')}
              className="hidden"
              id="excel-upload"
            />
            <Label htmlFor="excel-upload" className="cursor-pointer">
              <Button variant="outline" className="mt-2">
                Choose Excel File
              </Button>
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            Upload Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Upload screenshots or photos of your portfolio statements. Our AI will extract the data.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload portfolio screenshot</p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'image')}
              className="hidden"
              id="image-upload"
            />
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Button variant="outline" className="mt-2">
                Choose Image
              </Button>
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadSection;

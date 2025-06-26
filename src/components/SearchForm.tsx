
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Loader2 } from 'lucide-react';

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  searchType: string;
  setSearchType: (type: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchForm = ({ 
  query, 
  setQuery, 
  searchType, 
  setSearchType, 
  onSubmit, 
  isLoading 
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 mb-3">
      <div className="flex-1 relative">
        <div className="flex items-center border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-28 border-0 bg-transparent focus:ring-0 focus:ring-offset-0 shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="stock">Stock</SelectItem>
              <SelectItem value="ipo">IPO</SelectItem>
              <SelectItem value="mutual-fund">Mutual Fund</SelectItem>
            </SelectContent>
          </Select>
          <div className="h-6 w-px bg-border mx-1"></div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${searchType === 'stock' ? 'stocks' : searchType === 'ipo' ? 'IPOs' : 'mutual funds'}...`}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none flex-1"
            disabled={isLoading}
          />
        </div>
      </div>
      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600" disabled={isLoading}>
        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
      </Button>
    </form>
  );
};

export default SearchForm;

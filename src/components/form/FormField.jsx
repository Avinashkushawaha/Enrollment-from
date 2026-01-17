import React from 'react';
import { Label } from '../ui/Label';
import { AlertCircle } from 'lucide-react';

export const FormField = ({ label, error, children, required, htmlFor }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};
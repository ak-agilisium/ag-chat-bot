'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, FileText, Image, XCircle } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = {
  'image/*': ['.jpeg', '.png', '.gif', '.webp'],
  'application/pdf': ['.pdf'],
  'text/plain': ['.txt'],
};

export function FileUploadModal({ isOpen, onClose, onUpload }: FileUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = (file: File) => {
    const newErrors: string[] = [];
    if (file.size > MAX_FILE_SIZE) {
      newErrors.push(`File ${file.name} is too large (max 5MB).`);
    }

    const fileType = file.type;
    const isAcceptedType = Object.keys(ACCEPTED_FILE_TYPES).some(mimeType => {
      if (mimeType.endsWith('/*')) {
        return fileType.startsWith(mimeType.slice(0, -1));
      }
      return mimeType === fileType;
    });

    if (!isAcceptedType) {
      newErrors.push(`File ${file.name} has an unsupported type.`);
    }
    return newErrors;
  };

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    acceptedFiles.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        newErrors.push(...fileErrors);
      }
    });

    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((err: any) => newErrors.push(`File ${file.name}: ${err.message}`));
    });

    setFiles(prev => [...prev, ...validFiles]);
    setErrors(newErrors);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
  });

  const handleRemoveFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleUpload = () => {
    if (files.length > 0 && errors.length === 0) {
      onUpload(files);
      setFiles([]);
      setErrors([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here, or click to select them. Max 5MB per file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            {isDragActive ? (
              <p className="text-gray-600">Drop the files here ...</p>
            ) : (
              <p className="text-gray-600">Drag 'n' drop files here, or click to select files</p>
            )}
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Selected Files:</Label>
              <ul className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      {file.type.startsWith('image/') ? (
                        <Image className="w-4 h-4 text-blue-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-green-500" />
                      )}
                      <span>{file.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(file.name)}>
                      <XCircle className="w-4 h-4 text-red-500" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {errors.length > 0 && (
            <div className="mt-4 text-red-500 text-sm">
              <Label className="font-medium">Errors:</Label>
              <ul className="mt-2 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>- {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={files.length === 0 || errors.length > 0}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
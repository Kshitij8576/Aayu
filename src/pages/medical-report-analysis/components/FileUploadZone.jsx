import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const supportedFormats = [
    { type: 'PDF', description: 'Lab reports, prescriptions, discharge summaries' },
    { type: 'JPEG/PNG', description: 'X-rays, MRI scans, CT scans' },
    { type: 'DICOM', description: 'Medical imaging files' },
    { type: 'DOC/DOCX', description: 'Medical reports and documents' }
  ];

  const handleDrag = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const files = Array.from(e?.dataTransfer?.files);
      setSelectedFiles(files);
      onFileSelect(files);
    }
  }, [onFileSelect]);

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      const files = Array.from(e?.target?.files);
      setSelectedFiles(files);
      onFileSelect(files);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles?.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFileSelect(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 hover:bg-muted/50'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.dicom,.doc,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-primary" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {dragActive ? 'Drop your files here' : 'Upload Medical Reports'}
            </h3>
            <p className="text-text-secondary mb-4">
              Drag and drop your files here, or click to browse
            </p>
            
            <Button variant="outline" size="sm" className="mb-4">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Choose Files
            </Button>
            
            <div className="text-xs text-text-secondary space-y-1">
              <p>Maximum file size: 50MB per file</p>
              <p>Up to 10 files can be uploaded at once</p>
            </div>
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && uploadProgress > 0 && (
          <div className="absolute inset-0 bg-surface/90 rounded-xl flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - uploadProgress / 100)}`}
                    className="text-primary transition-all duration-300"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium text-text-primary">Uploading...</p>
                <p className="text-sm text-text-secondary">{uploadProgress}% complete</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Selected Files */}
      {selectedFiles?.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary">Selected Files ({selectedFiles?.length})</h4>
          <div className="space-y-2">
            {selectedFiles?.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary text-sm">{file?.name}</p>
                    <p className="text-xs text-text-secondary">{formatFileSize(file?.size)}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Supported Formats */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          Supported File Formats
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {supportedFormats?.map((format, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm text-text-primary">{format?.type}</p>
                <p className="text-xs text-text-secondary">{format?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-medium text-success mb-1">HIPAA Compliant & Secure</h4>
            <p className="text-sm text-text-secondary">
              All uploaded files are encrypted end-to-end and stored securely. Your medical data is protected according to healthcare privacy standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadZone;
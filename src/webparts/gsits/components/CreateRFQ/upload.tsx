/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { IconButton, Stack, mergeStyleSets } from '@fluentui/react';

interface FileUploadComponentProps {
  title: string;
  initalNum?: number;
  uploadTitle?: string;
  subtitle?: string;
}

const useStyles = mergeStyleSets({
  uploadArea: {
    border: '1px dashed #0078d4',
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: '#f3f9fc',
  },
  fileList: {
    marginTop: '10px',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e1dfdd',
    padding: '5px 10px',
    alignItems: 'center',
    height: '30px',
  },
  oddItem: {
    backgroundColor: '#fff',
  },
  evenItem: {
    backgroundColor: '#F6F6F6',
  },
  title: {
    fontWeight: 'bold',
  },
});

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  title,
  initalNum = 4,
  uploadTitle,
  subtitle,
}) => {
  const [files, setFiles] = React.useState<any[]>(Array(initalNum).fill(null));
  const classes = useStyles;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index: number): void => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <span className={classes.title}>{title}</span>
      <div className={classes.uploadArea}>
        <input
          type="file"
          multiple
          style={{ display: 'none' }}
          id="file-input"
          onChange={handleFileUpload}
        />
        
        <IconButton iconProps={{ iconName: 'AttachIcon' }} style={{ width: '20px', height: '20px' }} />
        <label htmlFor="file-input" style={{ fontSize: '12px' }}>
          <span role="img" aria-label="paperclip" style={{ fontWeight: 'bold', fontSize: '16px' }}>
            {uploadTitle ?? 'Click to Upload'}
          </span>
          <br />
          ({subtitle ?? 'File number limit: 10; Single file size limit: 10MB'})
        </label>
      </div>
      <Stack className={classes.fileList}>
        {files.map((file, index) => (
          <div key={index} className={`${classes.fileItem} ${index % 2 === 0 ? classes.evenItem : classes.oddItem}`}>
            {file?.name || `File ${index + 1}`}
            {file && (
              <IconButton
                iconProps={{ iconName: 'Delete' }}
                onClick={() => removeFile(index)}
              />
            )}
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default FileUploadComponent;

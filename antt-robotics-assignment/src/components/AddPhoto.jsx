import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
const AddPhoto = ({ formData, setFormData }) => {
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    
    setPreview(previewUrls);

    const newPhotos = files.map(file => ({
        name: file.name,
        preview: URL.createObjectURL(file)
    }));
    
    setFormData(newPhotos);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleFileChange}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Grid>
      <Grid item xs={12}>
        {preview.map((src, index) => (
          <img key={index} src={src} alt={`Preview ${index}`} style={{ width: '100px', height: '100px', margin: '10px' }} />
        ))}
      </Grid>
    </Grid>
  );
};

export default AddPhoto;

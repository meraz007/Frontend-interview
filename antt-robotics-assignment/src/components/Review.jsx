import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const Review = ({ formData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Product Title"
          name="productTitle"
          value={formData.productTitle}
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Description"
          name="description"
          rows={4}
          multiline
          value={formData.description}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Regular Price"
          name="regularPrice"
          value={formData.regularPrice}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Extra Price"
          name="extraPrice"
          value={formData.extraPrice}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Tax Amount"
          name="taxAmount"
          value={formData.taxAmount}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Weight"
          name="weight"
          value={formData.weight}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Length"
          name="length"
          value={formData.length}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Height"
          name="height"
          value={formData.height}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Width"
          name="width"
          value={formData.width}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Total Stock"
          name="totalStock"
          value={formData.totalStock}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        {formData.photos.map((file, index) => (
            <img 
              key={index} 
              src={file.preview || URL.createObjectURL(file)} 
              alt={`Photo ${index}`} 
              style={{ width: '100px', height: '100px', margin: '10px' }} 
            />
        ))}
      </Grid>
    </Grid>
  );
};

export default Review;
``

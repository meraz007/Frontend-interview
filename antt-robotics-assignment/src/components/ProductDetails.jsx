import React from 'react';
import { TextField, Grid } from '@mui/material';

const ProductDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Product Title"
          name="productTitle"
          value={formData.productTitle}
          onChange={handleChange}
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
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Regular Price"
          name="regularPrice"
          value={formData.regularPrice}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Extra Price"
          name="extraPrice"
          value={formData.extraPrice}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Tax Amount"
          name="taxAmount"
          value={formData.taxAmount}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;

import React from 'react';
import { TextField, Grid } from '@mui/material';

const InventoryDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <TextField
          label="Weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Length"
          name="length"
          value={formData.length}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Width"
          name="width"
          value={formData.width}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Total Stock"
          name="totalStock"
          value={formData.totalStock}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default InventoryDetails;

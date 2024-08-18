import React from 'react';
import { Grid, Typography } from '@mui/material';

const Review = ({ formData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Product Details</Typography>
        <Typography>Title: {formData.productTitle}</Typography>
        <Typography>Description: {formData.description}</Typography>
        <Typography>Category: {formData.category}</Typography>
        <Typography>Regular Price: {formData.regularPrice}</Typography>
        <Typography>Extra Price: {formData.extraPrice}</Typography>
        <Typography>Tax Amount: {formData.taxAmount}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Inventory Details</Typography>
        <Typography>Weight: {formData.weight}</Typography>
        <Typography>Length: {formData.length}</Typography>
        <Typography>Height: {formData.height}</Typography>
        <Typography>Width: {formData.width}</Typography>
        <Typography>Total Stock: {formData.totalStock}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Photos</Typography>
        {formData.photos.map((file, index) => (
          <img key={index} src={URL.createObjectURL(file)} alt={`Photo ${index}`} style={{ width: '100px', height: '100px', margin: '10px' }} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Review;
``

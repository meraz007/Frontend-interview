import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteProduct } from '../features/productSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ product }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
    handleClose(); 
  };
  return (
    <div>
      <Button onClick={handleOpen}><MoreVertIcon sx={{ cursor: 'pointer'}} /></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" component="h2">
                  Product Title: { product.productTitle }
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" component="h2">
                Products Description: { product.description }
                </Typography>
              </Grid>
            </Grid>
              <Typography variant='body2' sx={{ mt: 2 }}>
                Category: { product.category }
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                      Regular Price :{ product.regularPrice }
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body2' sx={{ mt: 2 }}>
                  Extra Price: { product.extraPrice }
                </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Tax Amount { product.taxAmount }
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Weight: { product.weight }
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body2' sx={{ mt: 2 }}>
                  Length: { product.length }
                </Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='body2' sx={{ mt: 2 }}>
                  Height: { product.height }
                </Typography>
                </Grid>
              </Grid>
              
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Width: { product.width } + 'cm'
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='body2' sx={{ mt: 2 }}>
                    Total Stock: { product.totalStock }
                  </Typography>
                </Grid>
              </Grid> 
              <Typography variant='body2' sx={{ mt: 2 }}>
                  {product.photos.map((file, index) => (
                      <img 
                          key={index} 
                          src={file.preview || URL.createObjectURL(file)} 
                          alt={`Photo ${index}`} 
                          style={{ width: '50px', height: '50px', margin: '10px' }} 
                      />
                    ))}
              </Typography>
              <Button onClick={handleDelete}>
                <DeleteIcon/>
              </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}


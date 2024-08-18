import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel } from '@mui/material';
import ProductDetails from './ProductDetails';
import InventoryDetails from './InventoryDetails';
import AddPhoto from './AddPhoto';
import Review from './Review';
import { addProduct } from '../features/productSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const steps = ['Product Details', 'Inventory Details', 'Add Photo', 'Review'];

const MainForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    
    const [formData, setFormData] = useState({
        id: 0,
        productTitle: '',
        description: '',
        category: '',
        regularPrice: '',
        extraPrice: '',
        taxAmount: '',
        weight: '',
        length: '',
        height: '',
        width: '',
        totalStock: '',
        photos: []
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => setActiveStep(prevStep => prevStep + 1);
  const handleBack = () => setActiveStep(prevStep => prevStep - 1);

  const handleFormDataChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handlePhotoChange = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      preview: URL.createObjectURL(file)
    }));
    setFormData(prevFormData => ({
      ...prevFormData,
      photos: [...prevFormData.photos, ...fileData]
    }));
  };

  const handleFinish = () => {
    dispatch(addProduct(formData));
    navigate('/products');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProductDetails formData={formData} setFormData={handleFormDataChange} />;
      case 1:
        return <InventoryDetails formData={formData} setFormData={handleFormDataChange} />;
      case 2:
        return <AddPhoto formData={formData} setFormData={handlePhotoChange} />;
      case 3:
        return <Review formData={formData} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
         <Typography 
            variant="h1"
            sx={{ fontSize: '3rem', 
                fontWeight: 'bold', 
                color: '#ED1A34', 
                textTransform: 'uppercase'
            }}
        >
            Antt Robotics Form
        </Typography>
        <Stepper 
            activeStep={activeStep}
            alternativeLabel 
            sx={{ marginTop: '40px', marginBottom: '40px' }}
        >
            {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
      <div>
        {getStepContent(activeStep)}
        <Container sx={{ marginTop: '40px' }}>
          {activeStep > 0 && activeStep < 4 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep < 3 && (
            <Button variant="contained" color="secondary" onClick={handleNext}>
              Next
            </Button>
          )}
          {activeStep === 3 && (
            <Button variant="contained" onClick={handleFinish}>
              Finish
            </Button>
          )}
        </Container>
      </div>
      </>

  );
};

export default MainForm;

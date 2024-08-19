import Review from './Review';
import AddPhoto from './AddPhoto';
import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import { useNavigate } from 'react-router-dom';
import InventoryDetails from './InventoryDetails';
import Typography from '@mui/material/Typography';
import { addProduct } from '../features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Stepper, Step, StepLabel, Container } from '@mui/material';

const steps = ['Product Details', 'Inventory Details', 'Add Photo', 'Review'];

const MainForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        id: null,
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
    const currentFormCount = useSelector((state) => state.product.products);

    const handleNext = () => setActiveStep(prevStep => prevStep + 1);
    const handleBack = () => setActiveStep(prevStep => prevStep - 1);

    const handleFormDataChange = (newData) => {
      setFormData({ ...formData, ...newData });
    };

    const handlePhotoChange = (newPhotos) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        photos: [...prevFormData.photos, ...newPhotos]
    }));
    };

    const handleFinish = () => {
      const formId = Math.floor(Math.random() * 9999) + 1
      const finalFormData = { ...formData, id: formId };
      dispatch(addProduct(finalFormData));
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
      <Container 
        maxWidth='md'      
        disableGutters 
      >
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
                    <StepLabel sx={{ 
                      '& .MuiStepLabel-label': { fontSize: '16px' },
                      '& .MuiStepLabel-iconContainer': { fontSize: '40px' },}}
                    >
                        {label}
                    </StepLabel>
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
            <Button variant="contained"  onClick={handleNext}>
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
      </Container>
      </>

  );
};

export default MainForm;

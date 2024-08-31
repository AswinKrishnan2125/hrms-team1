import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const PerformanceReviewForm = () => {
  const [formValues, setFormValues] = useState({
    employeeID: '',
    rating: '',
    comments: '',
    reviewerID: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.employeeID.trim()) {
      newErrors.employeeID = 'Employee ID is required.';
    }
    if (!formValues.rating.trim()) {
      newErrors.rating = 'Rating is required.';
    }
    if (!formValues.comments.trim()) {
      newErrors.comments = 'Comments are required.';
    }
    if (!formValues.reviewerID.trim()) {
      newErrors.reviewerID = 'Reviewer ID is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const db = getFirestore();
      try {
        await addDoc(collection(db, "Performance"), {
          employeeID: formValues.employeeID,
          rating: parseInt(formValues.rating, 10),
          comments: formValues.comments,
          reviewerID: formValues.reviewerID,
          createdAt: new Date(),
          updatedAt: new Date(),
          reviewDate: new Date(),
        });
        setSubmitted(true);
        // Reset form
        setFormValues({
          employeeID: '',
          rating: '',
          comments: '',
          reviewerID: '',
        });
        setErrors({});
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Dashboard />
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, ml: { xs: 0, sm: 4, md: 20 } }}>
          <Paper sx={{ padding: '24px', width: { xs: '100%', sm: '80%', md: '70%' } }}>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>
              Performance Review Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Employee ID"
                    name="employeeID"
                    variant="outlined"
                    fullWidth
                    value={formValues.employeeID}
                    onChange={handleInputChange}
                    error={!!errors.employeeID}
                    helperText={errors.employeeID}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Rating"
                    name="rating"
                    variant="outlined"
                    fullWidth
                    value={formValues.rating}
                    onChange={handleInputChange}
                    error={!!errors.rating}
                    helperText={errors.rating}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Comments"
                    name="comments"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={formValues.comments}
                    onChange={handleInputChange}
                    error={!!errors.comments}
                    helperText={errors.comments}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Reviewer ID"
                    name="reviewerID"
                    variant="outlined"
                    fullWidth
                    value={formValues.reviewerID}
                    onChange={handleInputChange}
                    error={!!errors.reviewerID}
                    helperText={errors.reviewerID}
                  />
                </Grid>

                <Grid item xs={12}>
                  {submitted && (
                    <Typography variant="body2" color="success.main" sx={{ marginBottom: '8px' }}>
                      Review submitted successfully!
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ padding: '12px', borderRadius: '8px' }}
                  >
                    Submit Review
                  </Button>
                </Grid>
              </Grid>
            </form>
            {Object.keys(errors).length > 0 && (
              <Box
                sx={{ marginTop: '16px', padding: '12px', bgcolor: 'error.light', borderRadius: '4px' }}
              >
                <Typography variant="body2" color="error.main">
                  Please correct the errors above.
                </Typography>
              </Box>
            )}
            <Box sx={{ marginTop: '16px' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate(-1)}
                fullWidth
              >
                Back
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformanceReviewForm;

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
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const PerformanceReviewForm = () => {
  const [formValues, setFormValues] = useState({
    performanceMetrics: '',
    communicationSkills: '',
    teamwork: '',
    problemSolving: '',
    attendance: '',
    comments: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.performanceMetrics.trim()) {
      newErrors.performanceMetrics = 'Performance metrics are required.';
    }
    if (!formValues.communicationSkills.trim()) {
      newErrors.communicationSkills = 'Communication skills are required.';
    }
    if (!formValues.teamwork.trim()) {
      newErrors.teamwork = 'Teamwork is required.';
    }
    if (!formValues.problemSolving.trim()) {
      newErrors.problemSolving = 'Problem-solving is required.';
    }
    if (!formValues.attendance.trim()) {
      newErrors.attendance = 'Attendance is required.';
    }
    if (!formValues.comments.trim()) {
      newErrors.comments = 'Comments are required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      // Submit the form (you can handle API calls here)
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
                    label="Team"
                    name="performanceMetrics"
                    variant="outlined"
                    fullWidth
                    value={formValues.performanceMetrics}
                    onChange={handleInputChange}
                    error={!!errors.performanceMetrics}
                    helperText={errors.performanceMetrics}
                  />
                </Grid>

                {/* Communication Skills Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" error={!!errors.communicationSkills}>
                    <InputLabel>Collaboration</InputLabel>
                    <Select
                      name="communicationSkills"
                      value={formValues.communicationSkills}
                      onChange={handleInputChange}
                      label="Communication Skills"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Excellent">Excellent</MenuItem>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                      <MenuItem value="Poor">Poor</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.communicationSkills && (
                    <Typography color="error">{errors.communicationSkills}</Typography>
                  )}
                </Grid>

                {/* Teamwork Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" error={!!errors.teamwork}>
                    <InputLabel>Teamwork</InputLabel>
                    <Select
                      name="teamwork"
                      value={formValues.teamwork}
                      onChange={handleInputChange}
                      label="Teamwork"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Excellent">Excellent</MenuItem>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                      <MenuItem value="Poor">Poor</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.teamwork && (
                    <Typography color="error">{errors.teamwork}</Typography>
                  )}
                </Grid>

                {/* Problem-Solving Dropdown */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" error={!!errors.problemSolving}>
                    <InputLabel>Problem-Solving</InputLabel>
                    <Select
                      name="problemSolving"
                      value={formValues.problemSolving}
                      onChange={handleInputChange}
                      label="Problem-Solving"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Excellent">Excellent</MenuItem>
                      <MenuItem value="Good">Good</MenuItem>
                      <MenuItem value="Average">Average</MenuItem>
                      <MenuItem value="Poor">Poor</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.problemSolving && (
                    <Typography color="error">{errors.problemSolving}</Typography>
                  )}
                </Grid>

                {/* Attendance Field */}
                <Grid item xs={12}>
                  <TextField
                    label="Attendance"
                    name="attendance"
                    variant="outlined"
                    fullWidth
                    value={formValues.attendance}
                    onChange={handleInputChange}
                    error={!!errors.attendance}
                    helperText={errors.attendance}
                  />
                </Grid>

                {/* Comments */}
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
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformanceReviewForm;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Avatar, Button, Modal, TextField, IconButton, CircularProgress } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../fireBaseConfig'; // Adjust the import based on your Firebase config
import avatar from '../../src/assets/avatar.png'; // Adjust the path as needed
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Dashboard from './Dashboard';

const EmployeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.row;

  // State for managing the modal and form data
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(employee?.image || avatar);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    role: employee?.role || '',
    department: employee?.department || '',
    phoneNumber: employee?.phoneNumber || '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle save function (for updating data)
  const handleSave = async () => {
    try {
      const employeeRef = doc(db, "Employee", employee.id);
      await updateDoc(employeeRef, formData);
      navigate(-1); // Navigate back after updating
    } catch (e) {
      console.error('Error updating document: ', e);
    }
    handleClose();
  };

  // Handle photo upload
  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `employee_photos/${employee.id}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setPhoto(url);
        // Update the employee's photo URL in Firestore
        const employeeRef = doc(db, "Employee", employee.id);
        await updateDoc(employeeRef, { image: url });
      } catch (error) {
        console.error('Error uploading photo:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  if (!employee) {
    return <Typography variant="h6" color="error">Employee not found</Typography>;
  }

  return (
    <>
    <Dashboard/>
    <Box 
      sx={{ 
        mt:8,
        p: { xs: 2, sm: 3 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Card 
        sx={{ 
          width: '100%', 
          maxWidth: 600, 
          borderRadius: '12px', 
          boxShadow: 3 
        }}
      >
        <CardContent 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: 3 
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar 
              src={photo} 
              alt={employee.name || 'Employee'} 
              sx={{ 
                width: 100, 
                height: 100, 
                mt: 2 
              }}
            />
            <input 
              type="file" 
              accept="image/*" 
              id="photoUpload" 
              onChange={handlePhotoUpload} 
              style={{ display: 'none' }}
            />
            <label htmlFor="photoUpload">
              <IconButton 
                color="primary" 
                component="span" 
                sx={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  right: 0, 
                  bgcolor: 'background.paper', 
                  borderRadius: '50%', 
                  boxShadow: 3,
                  '&:hover': {
                    bgcolor: 'primary.light',
                  },
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {uploading && <CircularProgress size={24} sx={{ position: 'absolute', bottom: -5, right: -5 }} />}
          </Box>
          <Typography variant="h5" fontWeight="bold" color="#1976d2" sx={{ mt: 2 }}>
            {employee.name || 'No Name Available'}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="textSecondary" sx={{ mt: 1 }}>
            {employee.role || 'No Role Available'}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Department: {employee.department || 'No Department Available'}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Phone: {employee.phoneNumber || 'No Phone Number Available'}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Joining Date: {employee.joiningDate || 'No Joining Date Available'}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate(-1)}
          sx={{ 
            borderRadius: '8px', 
            padding: { xs: '8px 16px', sm: '10px 20px' }, 
            fontSize: { xs: '0.875rem', sm: '1rem' },
            mr: 2
          }}
        >
          Back to List
        </Button>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={handleOpen}
          sx={{ 
            borderRadius: '8px', 
            padding: { xs: '8px 16px', sm: '10px 20px' }, 
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Edit
        </Button>
      </Box>

      {/* Modal for Editing */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit Employee
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <TextField
            label="Department"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export default EmployeeDetails;

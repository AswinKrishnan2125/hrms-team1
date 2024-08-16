import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Button, 
  Divider 
} from '@mui/material';
import avatar from '../../src/assets/avatar.png';

const EmployeeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.row;

  if (!employee) {
    return <Typography variant="h6" color="error">Employee not found</Typography>;
  }

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          gap: 3, 
          width: '100%', 
          maxWidth: 1000 
        }}
      >
        {/* First Card */}
        <Card 
          sx={{ 
            width: '100%', 
            flex: 1, 
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
            <Avatar 
              src={employee.image || avatar} 
              alt={employee.name || 'Employee'} 
              sx={{ 
                width: 100, 
                height: 100, 
                mt: 2 
              }}
            />
            <Typography variant="h5" fontWeight="bold" color="#1976d2" sx={{ mt: 2 }}>
              {employee.name || 'No Name Available'}
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="cdb4db" sx={{ mt: 2 }}>
              {employee.role || 'No Role Available'}
            </Typography>
          </CardContent>
        </Card>

        {/* Second Card */}
        <Card 
          sx={{ 
            width: '100%', 
            flex: 1, 
            borderRadius: '12px', 
            boxShadow: 3 
          }}
        >
          <CardContent 
            sx={{ 
              padding: 3 
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">ID</Typography>
              <Typography variant="body1">{employee.id}</Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">Email</Typography>
              <Typography variant="body1">{employee.email}</Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">Role</Typography>
              <Typography variant="body1">{employee.role}</Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">Phone Number</Typography>
              <Typography variant="body1">{employee.phoneNumber}</Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">Joining Date</Typography>
              <Typography variant="body1">{employee.joiningDate}</Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">Address</Typography>
              <Typography variant="body1">{employee.address}</Typography>
            </Box>
            <Divider />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Typography variant="subtitle1" color="textSecondary">Attendance</Typography>
              <Typography variant="body1">{employee.attendance}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

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
          onClick={() => navigate(`/edit/${employee.id}`, { state: { row: employee } })}
          sx={{ 
            borderRadius: '8px', 
            padding: { xs: '8px 16px', sm: '10px 20px' }, 
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeDetails;

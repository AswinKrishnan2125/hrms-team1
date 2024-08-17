import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dashboard from './Dashboard';

const initialDepartments = [
  { id: 1, name: 'Human Resources' },
  { id: 2, name: 'Development' },
  { id: 3, name: 'Sales' },
];

const DepartmentTable = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [open, setOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingDepartment(null);
    setNewDepartment('');
  };

  const handleAddEditDepartment = () => {
    if (editingDepartment) {
      setDepartments(departments.map(dep =>
        dep.id === editingDepartment.id ? { ...dep, name: newDepartment } : dep
      ));
    } else {
      setDepartments([...departments, { id: departments.length + 1, name: newDepartment }]);
    }
    handleClose();
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setNewDepartment(department.name);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(dep => dep.id !== id));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Dashboard />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: '240px' }, // Adjust the margin to account for the sidebar width
          marginTop: '64px', // Adjust the margin to account for the navbar height
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4">Department List</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{ borderRadius: '8px' }}
          >
            Add Department
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Department Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(department)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(department.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editingDepartment ? 'Edit Department' : 'Add Department'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Department Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddEditDepartment} color="primary">
              {editingDepartment ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DepartmentTable;

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
  Checkbox,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dashboard from './Dashboard';

const initialDepartments = [
  { id: 1, name: 'Human Resources', managerId: 'HR001', createdAt: new Date().toLocaleDateString() },
  { id: 2, name: 'Development', managerId: 'DEV001', createdAt: new Date().toLocaleDateString() },
  { id: 3, name: 'Sales', managerId: 'SAL001', createdAt: new Date().toLocaleDateString() },
];

const DepartmentTable = () => {
  const [departments, setDepartments] = useState(initialDepartments);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState('');
  const [newManagerId, setNewManagerId] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingDepartment(null);
    setNewDepartment('');
    setNewManagerId('');
  };

  const handleViewClose = () => setViewOpen(false);

  const handleAddEditDepartment = () => {
    if (editingDepartment) {
      setDepartments(departments.map(dep =>
        dep.id === editingDepartment.id ? { ...dep, name: newDepartment, managerId: newManagerId } : dep
      ));
    } else {
      setDepartments([...departments, { 
        id: departments.length + 1, 
        name: newDepartment, 
        managerId: newManagerId, 
        createdAt: new Date().toLocaleDateString() 
      }]);
    }
    handleClose();
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setNewDepartment(department.name);
    setNewManagerId(department.managerId);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(dep => dep.id !== id));
  };

  const handleView = (department) => {
    setSelectedDepartment(department);
    setViewOpen(true);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(departments.map(dep => dep.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const handleDeleteSelected = () => {
    setDepartments(departments.filter(dep => !selectedRows.includes(dep.id)));
    setSelectedRows([]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Dashboard />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: { sm: '240px' },
          marginTop: '64px',
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
          <Table size="small"> {/* This makes the rows more compact */}
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selectedRows.length > 0 && selectedRows.length < departments.length}
                    checked={departments.length > 0 && selectedRows.length === departments.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Department Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Manager ID</TableCell>
                <TableCell sx={{ color: 'white' }}>Created At</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedRows.includes(department.id)}
                      onChange={(event) => handleSelectRow(event, department.id)}
                    />
                  </TableCell>
                  <TableCell>{department.id}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.managerId}</TableCell>
                  <TableCell>{department.createdAt}</TableCell>
                  <TableCell>
                    <IconButton color="default" onClick={() => handleView(department)}>
                      <VisibilityIcon />
                    </IconButton>
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
        {selectedRows.length > 0 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteSelected}
            sx={{ mt: 2 }}
          >
            Delete Selected
          </Button>
        )}

        {/* Add/Edit Department Dialog */}
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
            <TextField
              margin="dense"
              label="Manager ID"
              type="text"
              fullWidth
              variant="outlined"
              value={newManagerId}
              onChange={(e) => setNewManagerId(e.target.value)}
              sx={{ mt: 2 }}
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

        {/* View Department Dialog */}
        <Dialog open={viewOpen} onClose={handleViewClose}>
          <DialogTitle>Department Details</DialogTitle>
          <DialogContent>
            <Typography variant="body1"><strong>ID:</strong> {selectedDepartment?.id}</Typography>
            <Typography variant="body1"><strong>Name:</strong> {selectedDepartment?.name}</Typography>
            <Typography variant="body1"><strong>Manager ID:</strong> {selectedDepartment?.managerId}</Typography>
            <Typography variant="body1"><strong>Created At:</strong> {selectedDepartment?.createdAt}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleViewClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DepartmentTable;

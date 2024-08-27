import React, { useState, useEffect } from 'react';
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
  Menu,
  MenuItem,
  TablePagination, // Import TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import Dashboard from './Dashboard';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../fireBaseConfig'; // Adjust the path as needed
import * as XLSX from 'xlsx';
import { styled } from '@mui/material/styles';

const DepartmentTable = () => {
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState('');
  const [newManagerId, setNewManagerId] = useState('');
  const [newDepartmentId, setNewDepartmentId] = useState(''); // New state for Department ID
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDepartments = async () => {
      const querySnapshot = await getDocs(collection(db, "Departments"));
      const departmentsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDepartments(departmentsList);
    };
    fetchDepartments();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingDepartment(null);
    setNewDepartment('');
    setNewManagerId('');
    setNewDepartmentId(''); // Clear Department ID
  };

  const handleViewClose = () => setViewOpen(false);

  const handleAddEditDepartment = async () => {
    if (editingDepartment) {
      const departmentRef = doc(db, "Departments", editingDepartment.id);
      await updateDoc(departmentRef, {
        name: newDepartment,
        managerId: newManagerId,
      });
      setDepartments(departments.map(dep =>
        dep.id === editingDepartment.id ? { ...dep, name: newDepartment, managerId: newManagerId } : dep
      ));
    } else {
      const docRef = await addDoc(collection(db, "Departments"), { 
        id: newDepartmentId, // Set Department ID
        name: newDepartment, 
        managerId: newManagerId, 
        createdAt: new Date().toLocaleDateString() 
      });
      setDepartments([...departments, { id: newDepartmentId, name: newDepartment, managerId: newManagerId, createdAt: new Date().toLocaleDateString() }]);
    }
    handleClose();
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setNewDepartment(department.name);
    setNewManagerId(department.managerId);
    setNewDepartmentId(department.id); // Set Department ID for editing
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Departments", id));
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

  const handleDeleteSelected = async () => {
    for (const id of selectedRows) {
      await deleteDoc(doc(db, "Departments", id));
    }
    setDepartments(departments.filter(dep => !selectedRows.includes(dep.id)));
    setSelectedRows([]);
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
  
        // Check if the json has the required fields
        if (json.length > 0 && json[0].name && json[0].managerId) {
          const newDepartments = json.map((item) => ({
            id: item.id || (departments.length + 1).toString(), // Generate ID if not provided
            name: item.name,
            managerId: item.managerId,
            createdAt: new Date().toLocaleDateString(),
          }));
  
          // Add new departments to Firestore
          for (const dept of newDepartments) {
            await addDoc(collection(db, "Departments"), dept);
          }
  
          // Update state with new departments
          setDepartments([...departments, ...newDepartments]);
        } else {
          alert('Invalid file format');
        }
      } catch (error) {
        console.error('Error processing file:', error);
        alert('Error processing file');
      }
    };
    reader.readAsArrayBuffer(file);
  };
  
  const handleBulkDownload = (type) => {
    const data = departments.map(dep => ({
      ID: dep.id,
      Name: dep.name,
      "Manager ID": dep.managerId,
      "Created At": dep.createdAt,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Departments");
    if (type === 'excel') {
      XLSX.writeFile(workbook, 'departments.xlsx');
    } else if (type === 'pdf') {
      // You can use jsPDF or a similar library to generate a PDF here
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedDepartments = departments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          <Box>
            {selectedRows.length > 0 && (
              // <Button
              //   variant="contained"
              //   color="secondary"
              //   onClick={handleDeleteSelected}
              //   sx={{ mr: 2 }}
              // >
              //   Delete Selected
              // </Button>
              <IconButton
                color="secondary"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0} // Disable if no rows selected
              >
                <DeleteIcon />
              </IconButton>

            )}
            <IconButton color="primary" component="label">
              <UploadFileIcon />
              <input type="file" hidden onChange={handleBulkUpload} />
            </IconButton>
            <IconButton
              color="primary"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <DownloadIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleBulkDownload('excel')}>Download as Excel</MenuItem>
              <MenuItem onClick={() => handleBulkDownload('pdf')}>Download as PDF</MenuItem>
            </Menu>
            <IconButton color="primary" onClick={handleOpen} sx={{ border: '2px solid', borderRadius: '0%' }}>
              <AddIcon />
            </IconButton>
          </Box>
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
              {paginatedDepartments.map((department) => (
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
                    <IconButton color="primary" onClick={() => handleView(department)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEdit(department)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleDelete(department.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={departments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Add/Edit Department Dialog */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editingDepartment ? 'Edit Department' : 'Add Department'}</DialogTitle>
          <DialogContent>
            {!editingDepartment && (
              <TextField
                autoFocus
                margin="dense"
                label="Department ID"
                type="text"
                fullWidth
                variant="outlined"
                value={newDepartmentId}
                onChange={(e) => setNewDepartmentId(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
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

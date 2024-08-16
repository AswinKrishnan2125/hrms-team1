import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  IconButton,
  Checkbox,
  Typography,
  Modal,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { db } from '../fireBaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default function EmployeeTable() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    phoneNumber: '',
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Employee"));
    const employees = [];
    querySnapshot.forEach((doc) => {
      employees.push({ id: doc.id, ...doc.data() });
    });
    setRows(employees);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setFormData({ name: '', role: '', department: '', phoneNumber: '' });
  };

  const handleDelete = async (idList) => {
    try {
      for (const id of idList) {
        await deleteDoc(doc(db, "Employee", id));
      }
      setRows(rows.filter((row) => !idList.includes(row.id)));
      setSelected([]);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleView = (row) => {
    navigate(`/profile/${row.name}`, { state: { row } });
  };

  const handleEdit = (row) => {
    setFormData({
      name: row.name,
      role: row.role,
      department: row.department || '',
      phoneNumber: row.phoneNumber,
    });
    setEditId(row.id);
    setIsEdit(true);
    handleOpen();
  };

  const handleSave = async () => {
    if (isEdit) {
      try {
        const employeeRef = doc(db, "Employee", editId);
        await updateDoc(employeeRef, formData);
        setRows(rows.map((row) => (row.id === editId ? { ...row, ...formData } : row)));
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, 'Employee'), {
          name: formData.name,
          role: formData.role,
          department: formData.department,
          phoneNumber: formData.phoneNumber,
          joiningDate: new Date().toISOString().split('T')[0],
        });
        setRows([{ id: docRef.id, ...formData, joiningDate: new Date().toISOString().split('T')[0] }, ...rows]);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
    handleClose();
  };

  const filteredRows = rows.filter((row) =>
    [row.name, row.role, row.department, row.phoneNumber].some(value =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <TextField
                label="Search Employees"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  flexGrow: 1,
                  maxWidth: isMobile ? 'calc(100% - 48px)' : 300,
                  bgcolor: 'white',
                }}
                placeholder="Name, role, department, contact"
                InputProps={{
                  endAdornment: (
                    <IconButton edge="end" color="primary">
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
              <IconButton
                color="primary"
                onClick={handleOpen}
                sx={{ ml: 2, border: 1, borderRadius: 1 }}
              >
                <AddIcon />
              </IconButton>
              {selected.length > 0 && (
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(selected)}
                  sx={{ ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Employee List
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="employee table">
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                      checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all employees' }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>Name</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell sx={{ color: 'white' }}>Department</TableCell>
                      <TableCell sx={{ color: 'white' }}>Role</TableCell>
                      <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
                      <TableCell sx={{ color: 'white' }}>Joining Date</TableCell>
                    </>
                  )}
                  <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selected.indexOf(row.id) !== -1}
                        onChange={() => handleCheckboxClick(row.id)}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.joiningDate}</TableCell>
                      </>
                    )}
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <IconButton onClick={() => handleView(row)} color="primary" size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(row)} color="primary" size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete([row.id])}
                          color="secondary"
                          size="small"
                          disabled={selected.length === 0}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Modal for Adding or Editing Employee */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEdit ? 'Edit Employee' : 'Add New Employee'}
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
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

const style = {
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

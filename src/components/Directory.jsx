import React, { useState, useEffect } from 'react';
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
  Download as DownloadIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../fireBaseConfig';  // Import auth from your Firebase config
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc ,setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth methods
import Dashboard from './Dashboard';
import * as XLSX from 'xlsx';

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
    action: {
      hover: '#e3f2fd',
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
    email: '',           // New field for email
    password: '',        // New field for password
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
    setFormData({ name: '', role: '', department: '', phoneNumber: '', email: '', password: '' });
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
      email: row.email || '',       // New field for email
      password: '',                 // Leave password blank for editing
    });
    setEditId(row.id);
    setIsEdit(true);
    handleOpen();
  };

  const handleSave = async () => {
    try {
        if (isEdit) {
            // Update existing employee document
            const employeeRef = doc(db, "Employee", editId);
            await updateDoc(employeeRef, formData);
            setRows(rows.map((row) => (row.id === editId ? { ...row, ...formData } : row)));
        } else {
            // Create a new user with email and password in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
  
            // Set the document ID as the user's UID
            const newEmployeeRef = doc(db, 'Employee', user.uid);
            await setDoc(newEmployeeRef, {
                ...formData,
                joiningDate: new Date().toISOString().split('T')[0],
                uid: user.uid,  // Store the user ID in the document
            });
  
            // Add the new employee to the rows state
            setRows([{ id: user.uid, ...formData, joiningDate: new Date().toISOString().split('T')[0] }, ...rows]);
        }
        handleClose();
    } catch (error) {
        console.error('Error saving document: ', error);
    }
};

  const filteredRows = rows.filter((row) =>
    [row.name, row.role, row.department, row.phoneNumber].some((value) =>
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

  const handleDownload = () => {
    // Convert data to a worksheet
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');

    // Create a download link and trigger download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Convert string to array buffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }

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
          <Dashboard />
          <section style={{ paddingLeft: '240px', paddingRight: '0px', paddingTop: '40px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                mt: 2,
              }}
            >
              <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
                Employee List
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 2,
                  flexGrow: 1,
                }}
              >
                <TextField
                  label="Search Employees"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
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
                  sx={{ border: 1, borderRadius: 1 }}
                >
                  <AddIcon />
                </IconButton>
                {selected.length > 0 && (
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(selected)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <IconButton
                  color="primary"
                  onClick={handleDownload}
                >
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>

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
                        sx={{
                          color: 'white',
                          '&.Mui-checked': {
                            color: 'white',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                    {!isMobile && (
                      <>
                        <TableCell sx={{ color: 'white' }}>Department</TableCell>
                        <TableCell sx={{ color: 'white' }}>Role</TableCell>
                        <TableCell sx={{ color: 'white' }}>Contact</TableCell>
                      </>
                    )}
                    <TableCell align="right" sx={{ color: 'white' }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow key={row.id}>
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
                        </>
                      )}
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleView(row)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(row)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => handleDelete([row.id])}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </Box>
      </Box>

      {/* Modal for adding/editing employee */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            {isEdit ? 'Edit Employee' : 'Add Employee'}
          </Typography>
          <Box
            component="form"
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Role"
              variant="outlined"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              fullWidth
            />
            <TextField
              label="Department"
              variant="outlined"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              fullWidth
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              value={formData.email}  // New field for email
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}  // New field for password
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              {isEdit ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

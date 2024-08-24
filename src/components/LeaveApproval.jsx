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
  Search as SearchIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { db } from '../fireBaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Dashboard from './Dashboard';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
});

export default function LeaveTable() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    leaveType: '',
    status: '',
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "LeaveApplication"));
      const Employee = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().Employee || '',
        startDate: doc.data().StartDate || '',
        endDate: doc.data().EndDate || '',
        leaveType: doc.data().LeaveType || '',
        status: doc.data().Status || 'Pending',
      }));
      setRows(Employee);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setFormData({ name: '', startDate: '', endDate: '', leaveType: '', status: '' });
  };

  const handleDelete = async (idList) => {
    try {
      for (const id of idList) {
        await deleteDoc(doc(db, "LeaveApplication", id));
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
      startDate: row.startDate,
      endDate: row.endDate,
      leaveType: row.leaveType,
      status: row.status,
    });
    setEditId(row.id);
    setIsEdit(true);
    handleOpen();
  };

  const handleSave = async () => {
    try {
      if (isEdit && editId) {
        const EmployeeRef = doc(db, "LeaveApplication", editId);
        await updateDoc(EmployeeRef, {
          Employee: formData.name,
          StartDate: formData.startDate,
          EndDate: formData.endDate,
          LeaveType: formData.leaveType,
          Status: formData.status,
        });

        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === editId ? { ...row, ...formData } : row
          )
        );
      } else {
        const docRef = await addDoc(collection(db, 'LeaveApplication'), {
          Employee: formData.name,
          StartDate: formData.startDate,
          EndDate: formData.endDate,
          LeaveType: formData.leaveType,
          Status: formData.status,
        });

        setRows([{ id: docRef.id, ...formData }, ...rows]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const filteredRows = rows.filter((row) =>
    ['name', 'startDate', 'endDate', 'leaveType', 'status']
      .map(key => row[key]?.toLowerCase() || '')
      .some((value) => value.includes(searchTerm.toLowerCase()))
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
          <Dashboard />
          <section style={{ paddingLeft: '240px', paddingTop: '40px', paddingRight: '16px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
                mt: 2, // Added margin-top
              }}
            >
              <Typography variant="h4" component="h2" sx={{ mt: 1 }}> {/* Added margin-top */}
                Leave Approval
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    bgcolor: 'white',
                    mr: 2,
                    mt: 1, // Added margin-top
                  }}
                  placeholder="Name, Start Date, End Date, Leave Type, Status"
                  InputProps={{
                    endAdornment: (
                      <IconButton edge="end" color="primary">
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
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
            <TableContainer component={Paper} sx={{ boxShadow: 3, overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="Employee table">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                        checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all Employee' }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'white' }}>Employee</TableCell>
                    {!isMobile && (
                      <>
                        <TableCell sx={{ color: 'white' }}>Start Date</TableCell>
                        <TableCell sx={{ color: 'white' }}>End Date</TableCell>
                        <TableCell sx={{ color: 'white' }}>Leave Type</TableCell>
                        <TableCell sx={{ color: 'white' }}>Status</TableCell>
                      </>
                    )}
                    <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={selected.includes(row.id)}
                          onChange={() => handleCheckboxClick(row.id)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      {!isMobile && (
                        <>
                          <TableCell>{row.startDate}</TableCell>
                          <TableCell>{row.endDate}</TableCell>
                          <TableCell>{row.leaveType}</TableCell>
                          <TableCell>{row.status}</TableCell>
                        </>
                      )}
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleView(row)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle}>
              <Typography variant="h6" component="h2">
                {isEdit ? 'Edit Leave' : 'Add New Leave'}
              </Typography>
              <TextField
                label="Employee Name"
                variant="outlined"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Start Date"
                variant="outlined"
                fullWidth
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Date"
                variant="outlined"
                fullWidth
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                sx={{ mb: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Leave Type"
                variant="outlined"
                fullWidth
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
                {isEdit ? 'Save Changes' : 'Add Leave'}
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { db } from '../fireBaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Dashboard from './Dashboard';

const theme = createTheme();

export default function LeaveHistory() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leaveType, setLeaveType] = useState('');
  const [status, setStatus] = useState('');

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
      setFilteredRows(Employee);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFilter = () => {
    let tempRows = rows;

    if (startDate) {
      tempRows = tempRows.filter(row => new Date(row.startDate) >= new Date(startDate));
    }

    if (endDate) {
      tempRows = tempRows.filter(row => new Date(row.endDate) <= new Date(endDate));
    }

    if (leaveType) {
      tempRows = tempRows.filter(row => row.leaveType === leaveType);
    }

    if (status) {
      tempRows = tempRows.filter(row => row.status === status);
    }

    setFilteredRows(tempRows);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setLeaveType('');
    setStatus('');
    setFilteredRows(rows);
  };

  return (
    <ThemeProvider theme={theme}>
        <Dashboard/>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box 
            sx={{ 
              p: 3,
              ml: { xs: 0, sm: '240px' },  // Adjust left margin based on the sidebar width
              mt: { xs: '64px', sm: '64px' }  // Adjust top margin based on navbar height
            }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Leave History
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                mb: 3,
                justifyContent: 'space-between',
              }}
            >
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Leave Type</InputLabel>
                <Select
                  value={leaveType}
                  label="Leave Type"
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                  <MenuItem value="Vacation">Vacation</MenuItem>
                  <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
                  <MenuItem value="Paternity Leave">Paternity Leave</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleFilter}>
                  Apply Filters
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleReset}>
                  Reset Filters
                </Button>
              </Box>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table aria-label="Leave History Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.startDate}</TableCell>
                      <TableCell>{row.endDate}</TableCell>
                      <TableCell>{row.leaveType}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </LocalizationProvider>
    </ThemeProvider>
  );
}

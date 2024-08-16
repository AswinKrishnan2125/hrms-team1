import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

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

function createData(id, name, email, role, phoneNumber, joiningDate, address, attendance) {
  return { id, name, email, role, phoneNumber, joiningDate, address, attendance };
}

const initialRows = [
  createData(1, 'John Doe', 'john@example.com', 'Developer', '123-456-7890', '2023-01-15', '123 Elm St, Springfield, IL', '95%'),
  createData(2, 'Jane Smith', 'jane@example.com', 'Designer', '234-567-8901', '2023-02-20', '456 Oak St, Springfield, IL', '98%'),
  createData(3, 'Bob Johnson', 'bob@example.com', 'Manager', '345-678-9012', '2023-03-25', '789 Pine St, Springfield, IL', '90%'),
  createData(4, 'Alice Brown', 'alice@example.com', 'Tester', '456-789-0123', '2023-04-30', '101 Maple St, Springfield, IL', '92%'),
  createData(5, 'Charlie Davis', 'charlie@example.com', 'Developer', '567-890-1234', '2023-05-05', '202 Birch St, Springfield, IL', '97%'),
  createData(6, 'Emma Wilson', 'emma@example.com', 'Analyst', '678-901-2345', '2023-06-10', '303 Cedar St, Springfield, IL', '96%'),
  createData(7, 'Liam Taylor', 'liam@example.com', 'Support', '789-012-3456', '2023-07-15', '404 Ash St, Springfield, IL', '93%'),
  createData(8, 'Olivia Martinez', 'olivia@example.com', 'HR', '890-123-4567', '2023-08-20', '505 Walnut St, Springfield, IL', '94%'),
  createData(9, 'William Anderson', 'william@example.com', 'Sales', '901-234-5678', '2023-09-25', '606 Elm St, Springfield, IL', '89%'),
  createData(10, 'Sophia Clark', 'sophia@example.com', 'Marketing', '012-345-6789', '2023-10-30', '707 Oak St, Springfield, IL', '91%')
];

export default function EmployeeTable() {
  const [rows, setRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleView = (row) => {
    navigate(`/profile/${row.name}`, { state: { row } });
  };

  const handleEdit = (row) => {
    navigate(`/edit/${row.id}`, { state: { row } });
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
            <TextField
              label="Search Employees"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1, maxWidth: isMobile ? 'calc(100% - 48px)' : 300, bgcolor: 'white' }}
              placeholder='Name, role'
            />
            <IconButton
              color="primary"
              onClick={() => navigate('/add')}
              sx={{ ml: 2 ,
                border: 1 ,
                br: 0,
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Employee List
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="employee table">
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white' }}>Name</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell sx={{ color: 'white' }}>Email</TableCell>
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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>{row.phoneNumber}</TableCell>
                        <TableCell>{row.joiningDate}</TableCell>
                      </>
                    )}
                    <TableCell>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton onClick={() => handleView(row)} color="primary" size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(row)} color="primary" size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)} color="secondary" size="small">
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
    </ThemeProvider>
  );
}

// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Box,
//   IconButton,
//   Checkbox,
//   Typography,
//   Modal,
//   Button,
// } from '@mui/material';
// import {
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   Edit as EditIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
// } from '@mui/icons-material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../fireBaseConfig';
// import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
// import Dashboard from './Dashboard';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//     background: {
//       default: '#f5f5f5',
//     },
//     action: {
//       hover: '#e3f2fd', // Light blue hover color for table rows
//     },
//   },
// });

// export default function EmployeeTable() {
//   const [rows, setRows] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [open, setOpen] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     role: '',
//     department: '',
//     phoneNumber: '',
//   });
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const querySnapshot = await getDocs(collection(db, "Employee"));
//     const employees = [];
//     querySnapshot.forEach((doc) => {
//       employees.push({ id: doc.id, ...doc.data() });
//     });
//     setRows(employees);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setIsEdit(false);
//     setFormData({ name: '', role: '', department: '', phoneNumber: '' });
//   };

//   const handleDelete = async (idList) => {
//     try {
//       for (const id of idList) {
//         await deleteDoc(doc(db, "Employee", id));
//       }
//       setRows(rows.filter((row) => !idList.includes(row.id)));
//       setSelected([]);
//     } catch (error) {
//       console.error('Error deleting document: ', error);
//     }
//   };

//   const handleView = (row) => {
//     navigate(`/profile/${row.name}`, { state: { row } });
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       name: row.name,
//       role: row.role,
//       department: row.department || '',
//       phoneNumber: row.phoneNumber,
//     });
//     setEditId(row.id);
//     setIsEdit(true);
//     handleOpen();
//   };

//   const handleSave = async () => {
//     try {
//       if (isEdit) {
//         const employeeRef = doc(db, "Employee", editId);
//         await updateDoc(employeeRef, formData);
//         setRows(rows.map((row) => (row.id === editId ? { ...row, ...formData } : row)));
//       } else {
//         const docRef = await addDoc(collection(db, 'Employee'), {
//           ...formData,
//           joiningDate: new Date().toISOString().split('T')[0],
//         });
//         setRows([{ id: docRef.id, ...formData, joiningDate: new Date().toISOString().split('T')[0] }, ...rows]);
//       }
//       handleClose();
//     } catch (error) {
//       console.error('Error saving document: ', error);
//     }
//   };

//   const filteredRows = rows.filter((row) =>
//     [row.name, row.role, row.department, row.phoneNumber].some((value) =>
//       value.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = filteredRows.map((row) => row.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleCheckboxClick = (id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           display: 'flex',
//           bgcolor: 'background.default',
//           minHeight: '100vh',
//         }}
//       >
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Dashboard />
//           <section style={{ paddingLeft: '240px', paddingRight: '0px', paddingTop: '40px' }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 mb: 2,
//                 mt: 2,
//               }}
//             >
//               <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
//                 Employee List
//               </Typography>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'flex-end',
//                   gap: 2,
//                   flexGrow: 1,
//                 }}
//               >
//                 <TextField
//                   label="Search Employees"
//                   variant="outlined"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   sx={{
//                     maxWidth: isMobile ? 'calc(100% - 48px)' : 300,
//                     bgcolor: 'white',
//                   }}
//                   placeholder="Name, role, department, contact"
//                   InputProps={{
//                     endAdornment: (
//                       <IconButton edge="end" color="primary">
//                         <SearchIcon />
//                       </IconButton>
//                     ),
//                   }}
//                 />
//                 <IconButton
//                   color="primary"
//                   onClick={handleOpen}
//                   sx={{ border: 1, borderRadius: 1 }}
//                 >
//                   <AddIcon />
//                 </IconButton>
//                 {selected.length > 0 && (
//                   <IconButton
//                     color="secondary"
//                     onClick={() => handleDelete(selected)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 )}
//               </Box>
//             </Box>

//             <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
//               <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="employee table">
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: 'primary.main' }}>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                         checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                         onChange={handleSelectAllClick}
//                         inputProps={{ 'aria-label': 'select all employees' }}
//                         sx={{
//                           color: 'white', // Checkbox remains visible with white color on blue background
//                           '&.Mui-checked': {
//                             color: 'white', // Ensures checkbox is visible when checked
//                           },
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ color: 'white' }}>Name</TableCell>
//                     {!isMobile && (
//                       <>
//                         <TableCell sx={{ color: 'white' }}>Department</TableCell>
//                         <TableCell sx={{ color: 'white' }}>Role</TableCell>
//                         <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
//                         <TableCell sx={{ color: 'white' }}>Joining Date</TableCell>
//                       </>
//                     )}
//                     <TableCell sx={{ color: 'white' }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredRows.map((row) => (
//                     <TableRow
//                       key={row.id}
//                       sx={{
//                         '&:last-child td, &:last-child th': { border: 0 },
//                         '&:hover': { bgcolor: 'action.hover' },
//                       }}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={selected.indexOf(row.id) !== -1}
//                           onChange={() => handleCheckboxClick(row.id)}
//                           sx={{
//                             color: 'primary.main',
//                             '&.Mui-checked': {
//                               color: 'primary.main', // Ensures checkbox is visible when checked
//                             },
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell>{row.name}</TableCell>
//                       {!isMobile && (
//                         <>
//                           <TableCell>{row.department}</TableCell>
//                           <TableCell>{row.role}</TableCell>
//                           <TableCell>{row.phoneNumber}</TableCell>
//                           <TableCell>{row.joiningDate}</TableCell>
//                         </>
//                       )}
//                       <TableCell>
//                         <IconButton color="primary" onClick={() => handleView(row)}>
//                           <VisibilityIcon />
//                         </IconButton>
//                         <IconButton color="primary" onClick={() => handleEdit(row)}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton color="secondary" onClick={() => handleDelete([row.id])}>
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </section>
//         </Box>
//       </Box>
//       <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Box
//           sx={{
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 3,
//             maxWidth: 400,
//             width: '100%',
//           }}
//         >
//           <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
//             {isEdit ? 'Edit Employee' : 'Add Employee'}
//           </Typography>
//           <form noValidate autoComplete="off">
//             <TextField
//               fullWidth
//               label="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Role"
//               value={formData.role}
//               onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//               margin="normal"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Department"
//               value={formData.department}
//               onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Phone Number"
//               value={formData.phoneNumber}
//               onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//               margin="normal"
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button color="primary" onClick={handleSave}>
//                 {isEdit ? 'Update' : 'Save'}
//               </Button>
//               <Button onClick={handleClose} sx={{ ml: 1 }}>
//                 Cancel
//               </Button>
//             </Box>
//           </form>
//         </Box>
//       </Modal>
//     </ThemeProvider>
//   );
// }


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
import { db } from '../fireBaseConfig';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
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
      hover: '#e3f2fd', // Light blue hover color for table rows
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
    try {
      if (isEdit) {
        const employeeRef = doc(db, "Employee", editId);
        await updateDoc(employeeRef, formData);
        setRows(rows.map((row) => (row.id === editId ? { ...row, ...formData } : row)));
      } else {
        const docRef = await addDoc(collection(db, 'Employee'), {
          ...formData,
          joiningDate: new Date().toISOString().split('T')[0],
        });
        setRows([{ id: docRef.id, ...formData, joiningDate: new Date().toISOString().split('T')[0] }, ...rows]);
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
                          color: 'white', // Checkbox remains visible with white color on blue background
                          '&.Mui-checked': {
                            color: 'white', // Ensures checkbox is visible when checked
                          },
                        }}
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
                          sx={{
                            color: 'primary.main',
                            '&.Mui-checked': {
                              color: 'primary.main', // Ensures checkbox is visible when checked
                            },
                          }}
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
                        <IconButton color="primary" onClick={() => handleView(row)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => handleDelete([row.id])}>
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
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {isEdit ? 'Edit Employee' : 'Add Employee'}
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button color="primary" onClick={handleSave}>
                {isEdit ? 'Update' : 'Save'}
              </Button>
              <Button onClick={handleClose} sx={{ ml: 1 }}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

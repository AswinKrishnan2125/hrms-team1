// // src/components/EmployeeReport.js
// import React, { useState } from 'react';
// import {
//   TextField,
//   Box,
//   Button,
//   IconButton,
//   Typography,
// } from '@mui/material';
// import { Download as DownloadIcon, Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';
// import * as XLSX from 'xlsx';

// const EmployeeReport = ({ rows, onFilter, onReset, onDownload }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleFilter = () => {
//     onFilter(searchTerm);
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     onReset();
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         mb: 2,
//         mt: 2,
//       }}
//     >
//       <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
//         Employee List
//       </Typography>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//           gap: 2,
//           flexGrow: 1,
//         }}
//       >
//         <TextField
//           label="Search Employees"
//           variant="outlined"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{ maxWidth: 300, bgcolor: 'white' }}
//           placeholder="Name, role, department, contact"
//           InputProps={{
//             endAdornment: (
//               <IconButton edge="end" color="primary" onClick={handleFilter}>
//                 <SearchIcon />
//               </IconButton>
//             ),
//           }}
//         />
//         <IconButton
//           color="primary"
//           onClick={handleReset}
//           sx={{ border: 1, borderRadius: 1 }}
//         >
//           <RefreshIcon />
//         </IconButton>
//         <IconButton
//           color="primary"
//           onClick={onDownload}
//         >
//           <DownloadIcon />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default EmployeeReport;



















// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   TextField,
//   Button,
//   TablePagination,
// } from '@mui/material';
// import { createTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { db } from '../fireBaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import * as XLSX from 'xlsx';

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
//       hover: '#e3f2fd',
//     },
//   },
// });

// export default function EmployeeReport() {
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [nameFilter, setNameFilter] = useState('');
//   const [departmentFilter, setDepartmentFilter] = useState('');
//   const [roleFilter, setRoleFilter] = useState('');
//   const [joiningDateFilter, setJoiningDateFilter] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [rows, nameFilter, departmentFilter, roleFilter, joiningDateFilter]);

//   const fetchData = async () => {
//     const querySnapshot = await getDocs(collection(db, "Employee"));
//     const employees = [];
//     querySnapshot.forEach((doc) => {
//       employees.push({ id: doc.id, ...doc.data() });
//     });
//     setRows(employees);
//   };

//   const applyFilters = useCallback(() => {
//     const filtered = rows.filter((row) => 
//       (nameFilter ? row.name.toLowerCase().includes(nameFilter.toLowerCase()) : true) &&
//       (departmentFilter ? row.department.toLowerCase().includes(departmentFilter.toLowerCase()) : true) &&
//       (roleFilter ? row.role.toLowerCase().includes(roleFilter.toLowerCase()) : true) &&
//       (joiningDateFilter ? row.joiningDate.includes(joiningDateFilter) : true)
//     );
//     setFilteredRows(filtered);
//   }, [rows, nameFilter, departmentFilter, roleFilter, joiningDateFilter]);

//   const handleDownload = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredRows);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Employees');

//     const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
//     const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'employees.xlsx';
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const s2ab = (s) => {
//     const buf = new ArrayBuffer(s.length);
//     const view = new Uint8Array(buf);
//     for (let i = 0; i < s.length; i++) {
//       view[i] = s.charCodeAt(i) & 0xff;
//     }
//     return buf;
//   };

//   const handleFilter = (name, department, role) => {
//     setNameFilter(name);
//     setDepartmentFilter(department);
//     setRoleFilter(role);
//   };

//   const handleReset = () => {
//     setNameFilter('');
//     setDepartmentFilter('');
//     setRoleFilter('');
//     setJoiningDateFilter('');
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <section style={{ paddingLeft: '240px', paddingRight: '0px', paddingTop: '40px' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
//           <Button variant="contained" onClick={handleDownload}>
//             Download
//           </Button>
//           <Button variant="outlined" onClick={handleReset}>
//             Reset Filters
//           </Button>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <TextField
//                     label="Name"
//                     variant="standard"
//                     value={nameFilter}
//                     onChange={(e) => setNameFilter(e.target.value)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     label="Role"
//                     variant="standard"
//                     value={roleFilter}
//                     onChange={(e) => setRoleFilter(e.target.value)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     label="Department"
//                     variant="standard"
//                     value={departmentFilter}
//                     onChange={(e) => setDepartmentFilter(e.target.value)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     label="Joining Date"
//                     variant="standard"
//                     type="date"
//                     value={joiningDateFilter}
//                     onChange={(e) => setJoiningDateFilter(e.target.value)}
//                   />
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//                 <TableRow key={row.id} hover>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell>{row.role}</TableCell>
//                   <TableCell>{row.department}</TableCell>
//                   <TableCell>{row.phoneNumber}</TableCell>
//                   <TableCell>{row.joiningDate}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredRows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </section>
//     </Box>
//   );
// }












// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Box,
//   Select,
//   MenuItem,
//   Button,
//   TablePagination,
//   TextField
// } from '@mui/material';
// import { createTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { db } from '../fireBaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import * as XLSX from 'xlsx';

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
//       hover: '#e3f2fd',
//     },
//   },
// });

// export default function EmployeeReport() {
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [filterCategory, setFilterCategory] = useState('');
//   const [filterValue, setFilterValue] = useState('');
//   const [departments, setDepartments] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [names, setNames] = useState([]);
//   const [dates, setDates] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     applyFilters();
//   }, [rows, filterCategory, filterValue]);

//   const fetchData = async () => {
//     const querySnapshot = await getDocs(collection(db, "Employee"));
//     const employees = [];
//     const departmentSet = new Set();
//     const roleSet = new Set();
//     const nameSet = new Set();
//     const dateSet = new Set();

//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       employees.push({ id: doc.id, ...data });
//       departmentSet.add(data.department);
//       roleSet.add(data.role);
//       nameSet.add(data.name);
//       dateSet.add(data.joiningDate);
//     });

//     setRows(employees);
//     setDepartments([...departmentSet]);
//     setRoles([...roleSet]);
//     setNames([...nameSet]);
//     setDates([...dateSet]);
//   };

//   const applyFilters = useCallback(() => {
//     const filtered = rows.filter((row) =>
//       (filterCategory === 'Name' ? row.name === filterValue : true) &&
//       (filterCategory === 'Role' ? row.role === filterValue : true) &&
//       (filterCategory === 'Department' ? row.department === filterValue : true) &&
//       (filterCategory === 'Joining Date' ? row.joiningDate === filterValue : true) &&
//       (filterCategory === '' ? true : true)
//     );
//     setFilteredRows(filtered);
//   }, [rows, filterCategory, filterValue]);

//   const handleDownload = () => {
//     if (filteredRows.length > 0) {
//       const ws = XLSX.utils.json_to_sheet(filteredRows);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, 'Employees');

//       const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
//       const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'employees.xlsx';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } else {
//       alert("No data to download");
//     }
//   };

//   const s2ab = (s) => {
//     const buf = new ArrayBuffer(s.length);
//     const view = new Uint8Array(buf);
//     for (let i = 0; i < s.length; i++) {
//       view[i] = s.charCodeAt(i) & 0xff;
//     }
//     return buf;
//   };

//   const handleFilterCategoryChange = (event) => {
//     setFilterCategory(event.target.value);
//     setFilterValue(''); // Reset filter value when category changes
//   };

//   const handleFilterValueChange = (event) => {
//     setFilterValue(event.target.value);
//   };

//   const handleReset = () => {
//     setFilterCategory('');
//     setFilterValue('');
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <section style={{ paddingLeft: '240px', paddingRight: '0px', paddingTop: '40px' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
//           <Button variant="contained" onClick={handleDownload}>
//             Download
//           </Button>
//           <Button variant="outlined" onClick={handleReset}>
//             Reset Filters
//           </Button>
//         </Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
//           <Select
//             value={filterCategory}
//             onChange={handleFilterCategoryChange}
//             displayEmpty
//             sx={{ marginRight: 2 }}
//           >
//             <MenuItem value="">Select Filter</MenuItem>
//             <MenuItem value="Name">Name</MenuItem>
//             <MenuItem value="Role">Role</MenuItem>
//             <MenuItem value="Department">Department</MenuItem>
//             <MenuItem value="Joining Date">Joining Date</MenuItem>
//           </Select>
//           <Select
//             value={filterValue}
//             onChange={handleFilterValueChange}
//             displayEmpty
//           >
//             <MenuItem value="">Select Value</MenuItem>
//             {(filterCategory === 'Name' ? names :
//               filterCategory === 'Role' ? roles :
//               filterCategory === 'Department' ? departments :
//               filterCategory === 'Joining Date' ? dates :
//               []).map((item, index) => (
//               <MenuItem key={index} value={item}>{item}</MenuItem>
//             ))}
//           </Select>
//         </Box>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Department</TableCell>
//                 <TableCell>Phone Number</TableCell>
//                 <TableCell>Joining Date</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//                 <TableRow key={row.id} hover>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell>{row.role}</TableCell>
//                   <TableCell>{row.department}</TableCell>
//                   <TableCell>{row.phoneNumber}</TableCell>
//                   <TableCell>{row.joiningDate}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredRows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </section>
//     </Box>
//   );
// }










import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  MenuItem,
  Button,
  TablePagination,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { db } from '../fireBaseConfig';
import { collection, getDocs } from 'firebase/firestore';
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

export default function EmployeeReport() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [names, setNames] = useState([]);
  const [dates, setDates] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rows, filterCategory, filterValue]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Employee"));
    const employees = [];
    const departmentSet = new Set();
    const roleSet = new Set();
    const nameSet = new Set();
    const dateSet = new Set();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      employees.push({ id: doc.id, ...data });
      departmentSet.add(data.department);
      roleSet.add(data.role);
      nameSet.add(data.name);
      dateSet.add(data.joiningDate);
    });

    setRows(employees);
    setDepartments([...departmentSet]);
    setRoles([...roleSet]);
    setNames([...nameSet]);
    setDates([...dateSet]);
  };

  const applyFilters = useCallback(() => {
    const filtered = rows.filter((row) =>
      (filterCategory === 'Name' ? row.name === filterValue : true) &&
      (filterCategory === 'Role' ? row.role === filterValue : true) &&
      (filterCategory === 'Department' ? row.department === filterValue : true) &&
      (filterCategory === 'Joining Date' ? row.joiningDate === filterValue : true) &&
      (filterCategory === '' ? true : true)
    );
    setFilteredRows(filtered);
  }, [rows, filterCategory, filterValue]);

  const handleDownload = () => {
    if (filteredRows.length > 0) {
      const ws = XLSX.utils.json_to_sheet(filteredRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Employees');

      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employees.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert("No data to download");
    }
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
    setFilterValue(''); // Reset filter value when category changes
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleReset = () => {
    setFilterCategory('');
    setFilterValue('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <section style={{ paddingLeft: '240px', paddingRight: '0px', paddingTop: '40px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <Button variant="contained" onClick={handleDownload} sx={{ marginRight: 2 }}>
            Download
          </Button>
          <Button variant="outlined" onClick={handleReset} sx={{ marginRight: 2 }}>
            Reset Filters
          </Button>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 2 }}>
            <Select
              value={filterCategory}
              onChange={handleFilterCategoryChange}
              displayEmpty
              sx={{ marginRight: 2 }}
            >
              <MenuItem value="">Select Filter</MenuItem>
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="Role">Role</MenuItem>
              <MenuItem value="Department">Department</MenuItem>
              <MenuItem value="Joining Date">Joining Date</MenuItem>
            </Select>
            <Select
              value={filterValue}
              onChange={handleFilterValueChange}
              displayEmpty
            >
              <MenuItem value="">Select Value</MenuItem>
              {(filterCategory === 'Name' ? names :
                filterCategory === 'Role' ? roles :
                filterCategory === 'Department' ? departments :
                filterCategory === 'Joining Date' ? dates :
                []).map((item, index) => (
                <MenuItem key={index} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Joining Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.joiningDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </section>
    </Box>
  );
}

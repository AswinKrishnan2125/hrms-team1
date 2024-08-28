











// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   IconButton,
//   Modal,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   ThemeProvider,
//   Typography,
//   createTheme,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import { useMediaQuery } from "@mui/material";
// import { db } from "../fireBaseConfig";
// import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import * as XLSX from "xlsx";
// import Dashboard from "./Dashboard";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//   },
// });

// const Payroll = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     employeeName: "",
//     salary: "",
//     deductions: "",
//     netPay: "",
//     payPeriodStart: "",
//     payPeriodEnd: "",
//     status: "",
//   });
//   const [isEdit, setIsEdit] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedPayroll, setSelectedPayroll] = useState(null);

//   const isMobile = useMediaQuery("(max-width:600px)");

//   useEffect(() => {
//     const fetchPayrolls = async () => {
//       const payrollsCollection = collection(db, "Payrolls");
//       const payrollSnapshot = await getDocs(payrollsCollection);
//       const payrollList = payrollSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setRows(payrollList);
//       setFilteredRows(payrollList);
//     };
//     fetchPayrolls();
//   }, []);

//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredRows(rows);
//     } else {
//       const filtered = rows.filter((row) =>
//         row.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         row.salary.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         row.payPeriodStart.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredRows(filtered);
//     }
//   }, [searchTerm, rows]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleSave = async () => {
//     if (isEdit && currentId) {
//       const payrollDoc = doc(db, "Payrolls", currentId);
//       await updateDoc(payrollDoc, formData);
//     } else {
//       await addDoc(collection(db, "Payrolls"), formData);
//     }
//     handleClose();
//     setFormData({
//       employeeName: "",
//       salary: "",
//       deductions: "",
//       netPay: "",
//       payPeriodStart: "",
//       payPeriodEnd: "",
//       status: "",
//     });
//     setIsEdit(false);
//     setCurrentId(null);

//     const payrollsCollection = collection(db, "Payrolls");
//     const payrollSnapshot = await getDocs(payrollsCollection);
//     const payrollList = payrollSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setRows(payrollList);
//     setFilteredRows(payrollList);
//   };

//   const handleDelete = async (selectedIds) => {
//     for (const id of selectedIds) {
//       const payrollDoc = doc(db, "Payrolls", id);
//       await deleteDoc(payrollDoc);
//     }
//     setSelected([]);

//     const payrollsCollection = collection(db, "Payrolls");
//     const payrollSnapshot = await getDocs(payrollsCollection);
//     const payrollList = payrollSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setRows(payrollList);
//     setFilteredRows(payrollList);
//   };

//   const handleEdit = (row) => {
//     setFormData(row);
//     setIsEdit(true);
//     setCurrentId(row.id);
//     handleOpen();
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

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = filteredRows.map((row) => row.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const downloadExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredRows);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Payrolls");
//     XLSX.writeFile(wb, "Payrolls_Report.xlsx");
//   };

//   const handleView = (row) => {
//     setSelectedPayroll(row);
//     setViewMode(true);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <section>
//         <div className="h-8"></div>
//       </section>
//       <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Dashboard />
//           <section style={{ paddingLeft: "240px", paddingRight: "0px", paddingTop: "30px" }}>
//             {viewMode ? (
//               // Detailed view card
//               <Paper sx={{ padding: 3, boxShadow: 3 }}>
//                 <Typography variant="h5" component="h3" gutterBottom>
//                   Payroll Details for {selectedPayroll.employeeName}
//                 </Typography>
//                 <Typography>Salary: {selectedPayroll.salary}</Typography>
//                 <Typography>Deductions: {selectedPayroll.deductions}</Typography>
//                 <Typography>Net Pay: {selectedPayroll.netPay}</Typography>
//                 <Typography>Pay Period Start: {selectedPayroll.payPeriodStart}</Typography>
//                 <Typography>Pay Period End: {selectedPayroll.payPeriodEnd}</Typography>
//                 <Typography>Status: {selectedPayroll.status}</Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => setViewMode(false)}
//                   sx={{ mt: 2 }}
//                 >
//                   Back
//                 </Button>
//               </Paper>
//             ) : (
//               <>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "space-between" }}>
//                   <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//                     <TextField
//                       label="Search Payrolls"
//                       variant="outlined"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       sx={{
//                         flexGrow: 1,
//                         maxWidth: isMobile ? "calc(100% - 48px)" : 300,
//                         bgcolor: "white",
//                       }}
//                       placeholder="Employee name, salary, date"
//                       InputProps={{
//                         endAdornment: (
//                           <IconButton edge="end" color="primary">
//                             <SearchIcon />
//                           </IconButton>
//                         ),
//                       }}
//                     />
//                     <IconButton
//                       color="primary"
//                       onClick={handleOpen}
//                       sx={{ ml: 2, border: 1, borderRadius: 1 }}
//                     >
//                       <AddIcon />
//                     </IconButton>
//                     {selected.length > 0 && (
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleDelete(selected)}
//                         sx={{ ml: 2 }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     )}
//                   </Box>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<FileDownloadIcon />}
//                     onClick={downloadExcel}
//                   >
//                     Download Report
//                   </Button>
//                 </Box>
//                 <Typography variant="h4" component="h2" gutterBottom>
//                   Payroll List
//                 </Typography>
//                 <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="payroll table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             color="primary"
//                             indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                             checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                             onChange={handleSelectAllClick}
//                           />
//                         </TableCell>
//                         <TableCell>Employee Name</TableCell>
//                         <TableCell>Salary</TableCell>
//                         <TableCell>Deductions</TableCell>
//                         <TableCell>Net Pay</TableCell>
//                         <TableCell>Pay Period Start</TableCell>
//                         <TableCell>Pay Period End</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {filteredRows.map((row) => (
//                         <TableRow key={row.id}>
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               color="primary"
//                               checked={selected.indexOf(row.id) !== -1}
//                               onClick={() => handleCheckboxClick(row.id)}
//                             />
//                           </TableCell>
//                           <TableCell>{row.employeeName}</TableCell>
//                           <TableCell>{row.salary}</TableCell>
//                           <TableCell>{row.deductions}</TableCell>
//                           <TableCell>{row.netPay}</TableCell>
//                           <TableCell>{row.payPeriodStart}</TableCell>
//                           <TableCell>{row.payPeriodEnd}</TableCell>
//                           <TableCell>{row.status}</TableCell>
//                           <TableCell>
//                             <IconButton color="primary" onClick={() => handleEdit(row)}>
//                               <EditIcon />
//                             </IconButton>
//                             <IconButton color="secondary" onClick={() => handleView(row)}>
//                               <VisibilityIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </>
//             )}
//           </section>
//         </Box>
//       </Box>
//       {/* Modal for Add/Edit Payroll */}
//       <Modal open={open} onClose={handleClose}>
//         <Paper sx={{ padding: 3, margin: "auto", marginTop: "1%", maxWidth: 600 }}>
//           <Typography variant="h6" component="h2" gutterBottom>
//             {isEdit ? "Edit Payroll" : "Add Payroll"}
//           </Typography>
//           <TextField
//             label="Employee Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.employeeName}
//             onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
//           />
//           <TextField
//             label="Salary"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.salary}
//             onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
//           />
//           <TextField
//             label="Deductions"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.deductions}
//             onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
//           />
//           <TextField
//             label="Net Pay"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.netPay}
//             onChange={(e) => setFormData({ ...formData, netPay: e.target.value })}
//           />
//           <TextField
//             label="Pay Period Start"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formData.payPeriodStart}
//             onChange={(e) => setFormData({ ...formData, payPeriodStart: e.target.value })}
//           />
//           <TextField
//             label="Pay Period End"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formData.payPeriodEnd}
//             onChange={(e) => setFormData({ ...formData, payPeriodEnd: e.target.value })}
//           />
//           <TextField
//             label="Status"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.status}
//             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//           />
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//             <Button onClick={handleClose} sx={{ mr: 2 }}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//             >
//               Save
//             </Button>
//           </Box>
//         </Paper>
//       </Modal>
//     </ThemeProvider>
//   );
// };

// export default Payroll;






































// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   IconButton,
//   Modal,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   ThemeProvider,
//   Typography,
//   createTheme,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import UploadIcon from "@mui/icons-material/Upload";
// import { useMediaQuery } from "@mui/material";
// import { db } from "../fireBaseConfig";
// import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, writeBatch } from "firebase/firestore";
// import * as XLSX from "xlsx";
// import Dashboard from "./Dashboard";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//   },
// });

// const Payroll = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     employeeName: "",
//     salary: "",
//     deductions: "",
//     netPay: "",
//     payPeriodStart: "",
//     payPeriodEnd: "",
//     status: "",
//   });
//   const [isEdit, setIsEdit] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedPayroll, setSelectedPayroll] = useState(null);
//   const [file, setFile] = useState(null);

//   const isMobile = useMediaQuery("(max-width:600px)");

//   useEffect(() => {
//     const fetchPayrolls = async () => {
//       const payrollsCollection = collection(db, "Payrolls");
//       const payrollSnapshot = await getDocs(payrollsCollection);
//       const payrollList = payrollSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setRows(payrollList);
//       setFilteredRows(payrollList);
//     };
//     fetchPayrolls();
//   }, []);

//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredRows(rows);
//     } else {
//       const filtered = rows.filter((row) =>
//         row.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         row.salary.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         row.payPeriodStart.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredRows(filtered);
//     }
//   }, [searchTerm, rows]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleSave = async () => {
//     if (isEdit && currentId) {
//       const payrollDoc = doc(db, "Payrolls", currentId);
//       await updateDoc(payrollDoc, formData);
//     } else {
//       await addDoc(collection(db, "Payrolls"), formData);
//     }
//     handleClose();
//     setFormData({
//       employeeName: "",
//       salary: "",
//       deductions: "",
//       netPay: "",
//       payPeriodStart: "",
//       payPeriodEnd: "",
//       status: "",
//     });
//     setIsEdit(false);
//     setCurrentId(null);

//     const payrollsCollection = collection(db, "Payrolls");
//     const payrollSnapshot = await getDocs(payrollsCollection);
//     const payrollList = payrollSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setRows(payrollList);
//     setFilteredRows(payrollList);
//   };

//   const handleDelete = async (selectedIds) => {
//     const batch = writeBatch(db);
//     selectedIds.forEach((id) => {
//       const payrollDoc = doc(db, "Payrolls", id);
//       batch.delete(payrollDoc);
//     });
//     await batch.commit();
//     setSelected([]);

//     const payrollsCollection = collection(db, "Payrolls");
//     const payrollSnapshot = await getDocs(payrollsCollection);
//     const payrollList = payrollSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setRows(payrollList);
//     setFilteredRows(payrollList);
//   };

//   const handleEdit = (row) => {
//     setFormData(row);
//     setIsEdit(true);
//     setCurrentId(row.id);
//     handleOpen();
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

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = filteredRows.map((row) => row.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const downloadExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredRows);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Payrolls");
//     XLSX.writeFile(wb, "Payrolls_Report.xlsx");
//   };

//   const handleView = (row) => {
//     setSelectedPayroll(row);
//     setViewMode(true);
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleBulkUpload = async () => {
//     if (file) {
//       const data = await file.arrayBuffer();
//       const workbook = XLSX.read(data);
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       const batch = writeBatch(db);
//       jsonData.forEach((item) => {
//         const docRef = collection(db, "Payrolls");
//         batch.set(docRef.doc(), item); // Use batch.set() for adding multiple documents
//       });
//       await batch.commit();
//       setFile(null);

//       const payrollsCollection = collection(db, "Payrolls");
//       const payrollSnapshot = await getDocs(payrollsCollection);
//       const payrollList = payrollSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setRows(payrollList);
//       setFilteredRows(payrollList);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <section>
//         <div className="h-8"></div>
//       </section>
//       <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Dashboard />
//           <section style={{ paddingLeft: "240px", paddingRight: "0px", paddingTop: "30px" }}>
//             {viewMode ? (
//               // Detailed view card
//               <Paper sx={{ padding: 3, boxShadow: 3 }}>
//                 <Typography variant="h5" component="h3" gutterBottom>
//                   Payroll Details for {selectedPayroll.employeeName}
//                 </Typography>
//                 <Typography>Salary: {selectedPayroll.salary}</Typography>
//                 <Typography>Deductions: {selectedPayroll.deductions}</Typography>
//                 <Typography>Net Pay: {selectedPayroll.netPay}</Typography>
//                 <Typography>Pay Period Start: {selectedPayroll.payPeriodStart}</Typography>
//                 <Typography>Pay Period End: {selectedPayroll.payPeriodEnd}</Typography>
//                 <Typography>Status: {selectedPayroll.status}</Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => setViewMode(false)}
//                   sx={{ mt: 2 }}
//                 >
//                   Back
//                 </Button>
//               </Paper>
//             ) : (
//               <>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "space-between" }}>
//                   <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
//                   <Typography variant="h4" component="h2" gutterBottom>
//                   Payroll List
//                 </Typography>
//                     <TextField
//                       label="Search Payrolls"
//                       variant="outlined"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       sx={{
//                         flexGrow: 1,
//                         maxWidth: isMobile ? "calc(100% - 48px)" : 300,
//                         bgcolor: "white",
//                       }}
//                       placeholder="Employee name, salary, date"
//                       InputProps={{
//                         endAdornment: (
//                           <IconButton edge="end" color="primary">
//                             <SearchIcon />
//                           </IconButton>
//                         ),
//                       }}
//                     />
//                     <IconButton
//                       color="primary"
//                       onClick={handleOpen}
//                       sx={{ ml: 2, border: 1, borderRadius: 1 }}
//                     >
//                       <AddIcon />
//                     </IconButton>
//                     {selected.length > 0 && (
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleDelete(selected)}
//                         sx={{ ml: 2 }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     )}
//                     <input
//                       type="file"
//                       accept=".xlsx, .xls"
//                       onChange={handleFileChange}
//                       style={{ display: "none" }}
//                       id="upload-file"
//                     />
//                     <label htmlFor="upload-file">
//                       <IconButton
//                         color="primary"
//                         component="span"
//                         onClick={handleBulkUpload}
//                         sx={{ ml: 2 }}
//                       >
//                         <UploadIcon />
//                       </IconButton>
//                     </label>
//                   </Box>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<FileDownloadIcon />}
//                     onClick={downloadExcel}
//                   >
//                     Download Report
//                   </Button>
//                 </Box>
//                 <Typography variant="h4" component="h2" gutterBottom>
//                   Payroll List
//                 </Typography>
//                 <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
//                   <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="payroll table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             color="primary"
//                             indeterminate={selected.length > 0 && selected.length < filteredRows.length}
//                             checked={filteredRows.length > 0 && selected.length === filteredRows.length}
//                             onChange={handleSelectAllClick}
//                           />
//                         </TableCell>
//                         <TableCell>Employee Name</TableCell>
//                         <TableCell>Salary</TableCell>
//                         <TableCell>Deductions</TableCell>
//                         <TableCell>Net Pay</TableCell>
//                         <TableCell>Pay Period Start</TableCell>
//                         <TableCell>Pay Period End</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {filteredRows.map((row) => (
//                         <TableRow key={row.id}>
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               color="primary"
//                               checked={selected.indexOf(row.id) !== -1}
//                               onClick={() => handleCheckboxClick(row.id)}
//                             />
//                           </TableCell>
//                           <TableCell>{row.employeeName}</TableCell>
//                           <TableCell>{row.salary}</TableCell>
//                           <TableCell>{row.deductions}</TableCell>
//                           <TableCell>{row.netPay}</TableCell>
//                           <TableCell>{row.payPeriodStart}</TableCell>
//                           <TableCell>{row.payPeriodEnd}</TableCell>
//                           <TableCell>{row.status}</TableCell>
//                           <TableCell>
//                             <IconButton color="primary" onClick={() => handleEdit(row)}>
//                               <EditIcon />
//                             </IconButton>
//                             <IconButton color="secondary" onClick={() => handleView(row)}>
//                               <VisibilityIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </>
//             )}
//           </section>
//         </Box>
//       </Box>
//       {/* Modal for Add/Edit Payroll */}
//       <Modal open={open} onClose={handleClose}>
//         <Paper sx={{ padding: 3, margin: "auto", marginTop: "1%", maxWidth: 600 }}>
//           <Typography variant="h6" component="h2" gutterBottom>
//             {isEdit ? "Edit Payroll" : "Add Payroll"}
//           </Typography>
//           <TextField
//             label="Employee Name"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.employeeName}
//             onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
//           />
//           <TextField
//             label="Salary"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.salary}
//             onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
//           />
//           <TextField
//             label="Deductions"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.deductions}
//             onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
//           />
//           <TextField
//             label="Net Pay"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.netPay}
//             onChange={(e) => setFormData({ ...formData, netPay: e.target.value })}
//           />
//           <TextField
//             label="Pay Period Start"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formData.payPeriodStart}
//             onChange={(e) => setFormData({ ...formData, payPeriodStart: e.target.value })}
//           />
//           <TextField
//             label="Pay Period End"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={formData.payPeriodEnd}
//             onChange={(e) => setFormData({ ...formData, payPeriodEnd: e.target.value })}
//           />
//           <TextField
//             label="Status"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={formData.status}
//             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//           />
//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//             <Button onClick={handleClose} sx={{ mr: 2 }}>
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//             >
//               Save
//             </Button>
//           </Box>
//         </Paper>
//       </Modal>
//     </ThemeProvider>
//   );
// };

// export default Payroll;































































import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadIcon from "@mui/icons-material/Upload"; // Add this if you use UploadIcon
import { useMediaQuery } from "@mui/material";
import { db } from "../fireBaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import * as XLSX from "xlsx";
import Dashboard from "./Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    salary: "",
    deductions: "",
    netPay: "",
    payPeriodStart: "",
    payPeriodEnd: "",
    status: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchPayrolls = async () => {
      const payrollsCollection = collection(db, "Payrolls");
      const payrollSnapshot = await getDocs(payrollsCollection);
      const payrollList = payrollSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(payrollList);
      setFilteredRows(payrollList);
    };
    fetchPayrolls();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) =>
        row.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.salary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.payPeriodStart.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRows(filtered);
    }
  }, [searchTerm, rows]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    if (isEdit && currentId) {
      const payrollDoc = doc(db, "Payrolls", currentId);
      await updateDoc(payrollDoc, formData);
    } else {
      await addDoc(collection(db, "Payrolls"), formData);
    }
    handleClose();
    setFormData({
      employeeName: "",
      salary: "",
      deductions: "",
      netPay: "",
      payPeriodStart: "",
      payPeriodEnd: "",
      status: "",
    });
    setIsEdit(false);
    setCurrentId(null);

    const payrollsCollection = collection(db, "Payrolls");
    const payrollSnapshot = await getDocs(payrollsCollection);
    const payrollList = payrollSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(payrollList);
    setFilteredRows(payrollList);
  };

  const handleDelete = async (selectedIds) => {
    for (const id of selectedIds) {
      const payrollDoc = doc(db, "Payrolls", id);
      await deleteDoc(payrollDoc);
    }
    setSelected([]);

    const payrollsCollection = collection(db, "Payrolls");
    const payrollSnapshot = await getDocs(payrollsCollection);
    const payrollList = payrollSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(payrollList);
    setFilteredRows(payrollList);
  };

  const handleEdit = (row) => {
    setFormData(row);
    setIsEdit(true);
    setCurrentId(row.id);
    handleOpen();
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payrolls");
    XLSX.writeFile(wb, "Payrolls_Report.xlsx");
  };

  const handleView = (row) => {
    setSelectedPayroll(row);
    setViewMode(true);
  };

  const handleFileChange = (e) => {
    // Handle file upload
  };

  const handleBulkUpload = () => {
    // Handle bulk upload
  };

  return (
    <ThemeProvider theme={theme}>
      <section>
        <div className="h-8"></div>
      </section>
      <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Dashboard />
          <section style={{ paddingLeft: "240px", paddingRight: "0px", paddingTop: "30px" }}>
            {viewMode ? (
              // Detailed view card
              <Paper sx={{ padding: 3, boxShadow: 3 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  Payroll Details for {selectedPayroll.employeeName}
                </Typography>
                <Typography>Salary: {selectedPayroll.salary}</Typography>
                <Typography>Deductions: {selectedPayroll.deductions}</Typography>
                <Typography>Net Pay: {selectedPayroll.netPay}</Typography>
                <Typography>Pay Period Start: {selectedPayroll.payPeriodStart}</Typography>
                <Typography>Pay Period End: {selectedPayroll.payPeriodEnd}</Typography>
                <Typography>Status: {selectedPayroll.status}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setViewMode(false)}
                  sx={{ mt: 2 }}
                >
                  Back
                </Button>
              </Paper>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "space-between" }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Payroll List
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                      label="Search Payrolls"
                      variant="outlined"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{
                        flexGrow: 1,
                        maxWidth: isMobile ? "calc(100% - 48px)" : 300,
                        bgcolor: "white",
                      }}
                      placeholder="Employee name, salary, date"
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
                    <input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="upload-file"
                    />
                    <label htmlFor="upload-file">
                      <IconButton
                        color="primary"
                        component="span"
                      >
                        <UploadIcon />
                      </IconButton>
                    </label>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<FileDownloadIcon />}
                      onClick={downloadExcel}
                    >
                      Download Report
                    </Button>
                  </Box>
                </Box>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                  <Table sx={{ minWidth: { xs: 300, sm: 650 } }} aria-label="payroll table">
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                            checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                            onChange={handleSelectAllClick}
                          />
                        </TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Salary</TableCell>
                        <TableCell>Deductions</TableCell>
                        <TableCell>Net Pay</TableCell>
                        <TableCell>Pay Period Start</TableCell>
                        <TableCell>Pay Period End</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={selected.indexOf(row.id) !== -1}
                              onClick={() => handleCheckboxClick(row.id)}
                            />
                          </TableCell>
                          <TableCell>{row.employeeName}</TableCell>
                          <TableCell>{row.salary}</TableCell>
                          <TableCell>{row.deductions}</TableCell>
                          <TableCell>{row.netPay}</TableCell>
                          <TableCell>{row.payPeriodStart}</TableCell>
                          <TableCell>{row.payPeriodEnd}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>
                            <IconButton color="primary" onClick={() => handleEdit(row)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="secondary" onClick={() => handleView(row)}>
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </section>
        </Box>
      </Box>
      {/* Modal for Add/Edit Payroll */}
      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ padding: 3, margin: "auto", marginTop: "1%", maxWidth: 600 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {isEdit ? "Edit Payroll" : "Add Payroll"}
          </Typography>
          <TextField
            label="Employee Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
          />
          <TextField
            label="Salary"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />
          <TextField
            label="Deductions"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.deductions}
            onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
          />
          <TextField
            label="Net Pay"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.netPay}
            onChange={(e) => setFormData({ ...formData, netPay: e.target.value })}
          />
          <TextField
            label="Pay Period Start"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.payPeriodStart}
            onChange={(e) => setFormData({ ...formData, payPeriodStart: e.target.value })}
          />
          <TextField
            label="Pay Period End"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.payPeriodEnd}
            onChange={(e) => setFormData({ ...formData, payPeriodEnd: e.target.value })}
          />
          <TextField
            label="Status"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default Payroll;




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
import UploadIcon from "@mui/icons-material/Upload";
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
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchPayrolls = async () => {
      setLoading(true);
      try {
        const payrollsCollection = collection(db, "Payrolls");
        const payrollSnapshot = await getDocs(payrollsCollection);
        const payrollList = payrollSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(payrollList);
        setFilteredRows(payrollList);
      } catch (error) {
        console.error("Error fetching payrolls: ", error);
      } finally {
        setLoading(false);
      }
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
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error saving payroll: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (selectedIds) => {
    setLoading(true);
    try {
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
    } catch (error) {
      console.error("Error deleting payrolls: ", error);
    } finally {
      setLoading(false);
    }
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
    XLSX.utils.book_append_sheet(wb, ws, "Payroll");
    XLSX.writeFile(wb, "payroll_data.xlsx");
  };

  // const handleView = (row) => {
  //   setSelectedPayroll(row);
  //   setViewMode(true);
  //   handleOpen();
  // };


  const handleView = (row) => {
    setSelectedPayroll(row);
    setViewMode(true);
    // setOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        await processAndSaveData(jsonData);
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  const processAndSaveData = async (data) => {
    setLoading(true);
    try {
      const payrollsCollection = collection(db, "Payrolls");
      for (const record of data) {
        const { employeeName, salary, deductions, netPay, payPeriodStart, payPeriodEnd, status } = record;
        if (employeeName && salary && payPeriodStart && payPeriodEnd) {
          await addDoc(payrollsCollection, {
            employeeName,
            salary,
            deductions,
            netPay,
            payPeriodStart,
            payPeriodEnd,
            status,
          });
        }
      }
      const payrollSnapshot = await getDocs(payrollsCollection);
      const payrollList = payrollSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(payrollList);
      setFilteredRows(payrollList);
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section style={{ paddingLeft: "240px", paddingRight: "0px", paddingTop: "50px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
      
        <Dashboard />
        
        <Box sx={{ display: "flex", flexDirection: "column" }}>
        
          <section>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
  <Typography variant="h4" gutterBottom sx={{ flexGrow: 1 }}>
    Payroll Record
  </Typography>
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    sx={{
      maxWidth: 300,
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
    <IconButton color="primary" component="span">
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

            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
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
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
          

        </Paper>
      </Modal>
      {/* Modal for Viewing Details     */}
      <Modal open={viewMode && selectedPayroll} onClose={() => setViewMode(false)}>
        <Paper sx={{ padding: 3, margin: "auto", marginTop: "1%", maxWidth: 600 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Payroll Details
          </Typography>
          {selectedPayroll && (
            <>
              <Typography variant="body1">
                <strong>Employee Name:</strong> {selectedPayroll.employeeName}
              </Typography>
              <Typography variant="body1">
                <strong>Salary:</strong> {selectedPayroll.salary}
              </Typography>
              <Typography variant="body1">
                <strong>Deductions:</strong> {selectedPayroll.deductions}
              </Typography>
              <Typography variant="body1">
                <strong>Net Pay:</strong> {selectedPayroll.netPay}
              </Typography>
              <Typography variant="body1">
                <strong>Pay Period Start:</strong> {selectedPayroll.payPeriodStart}
              </Typography>
              <Typography variant="body1">
                <strong>Pay Period End:</strong> {selectedPayroll.payPeriodEnd}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedPayroll.status}
              </Typography>
            </>
          )}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setViewMode(false)}>Close</Button>
          </Box>
          
        </Paper>
       
      </Modal>
      </section>
    </ThemeProvider>
  );
};

export default Payroll;










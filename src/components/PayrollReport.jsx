






// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Grid,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import * as XLSX from "xlsx";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../fireBaseConfig";
// import Dashboard from "./Dashboard";

// const PayrollReport = () => {
//   const [payrollData, setPayrollData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(30);

//   // Filter states
//   const [filterName, setFilterName] = useState("");
//   const [filterSalary, setFilterSalary] = useState("");
//   const [filterNetPay, setFilterNetPay] = useState("");
//   const [filterPeriod, setFilterPeriod] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");

//   // Dropdown options
//   const [nameOptions, setNameOptions] = useState([]);
//   const salaryOptions = ["<50k", "50k-100k", "100k-200k", ">200k"];
//   const netPayOptions = ["<30k", "30k-70k", "70k-150k", ">150k"];
//   const periodOptions = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
//   const statusOptions = ["Active", "Inactive", "On Leave"];

//   // Fetch payroll data from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const payrollsCollection = collection(db, "Payrolls");
//         const payrollSnapshot = await getDocs(payrollsCollection);
//         const payrollList = payrollSnapshot.docs.map((doc) => doc.data());
//         setPayrollData(payrollList);
//         setFilteredData(payrollList); // Initialize filtered data with full dataset

//         // Extract unique employee names for dropdown options
//         const uniqueNames = [...new Set(payrollList.map((payroll) => payroll.employeeName))];
//         setNameOptions(uniqueNames);
//       } catch (error) {
//         console.error("Error fetching payroll data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Function to handle filtering
//   const applyFilters = () => {
//     const filtered = payrollData.filter((payroll) => {
//       const nameMatch = filterName === "" || payroll.employeeName === filterName;
//       const salaryMatch = filterSalary === "" || matchRange(payroll.salary, filterSalary, salaryOptions);
//       const netPayMatch = filterNetPay === "" || matchRange(payroll.netPay, filterNetPay, netPayOptions);
//       const periodMatch = filterPeriod === "" || matchPeriod(payroll, filterPeriod);
//       const statusMatch = filterStatus === "" || payroll.status === filterStatus;

//       return nameMatch && salaryMatch && netPayMatch && periodMatch && statusMatch;
//     });

//     setFilteredData(filtered);
//     setPage(0); // Reset to the first page
//   };

//   // Helper function to match ranges for salary and net pay
//   const matchRange = (value, filter, options) => {
//     if (filter === options[0]) return value < 50000;
//     if (filter === options[1]) return value >= 50000 && value <= 100000;
//     if (filter === options[2]) return value >= 100000 && value <= 200000;
//     if (filter === options[3]) return value > 200000;
//     return false;
//   };

//   // Helper function to match pay period
//   const matchPeriod = (payroll, filter) => {
//     const periodStart = new Date(payroll.payPeriodStart).getMonth();
//     const periodEnd = new Date(payroll.payPeriodEnd).getMonth();
//     switch (filter) {
//       case "Jan-Mar":
//         return periodStart <= 2 && periodEnd <= 2;
//       case "Apr-Jun":
//         return periodStart >= 3 && periodEnd <= 5;
//       case "Jul-Sep":
//         return periodStart >= 6 && periodEnd <= 8;
//       case "Oct-Dec":
//         return periodStart >= 9 && periodEnd <= 11;
//       default:
//         return false;
//     }
//   };

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Function to download the payroll data as an Excel file
//   const downloadExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Payrolls");
//     XLSX.writeFile(wb, "Filtered_Payrolls_Report.xlsx");
//   };

//   // Calculate the data to display for the current page
//   const currentPageData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Box sx={{ p: 3 }}>
//       <section style={{ paddingLeft: "240px", paddingRight: "0px", paddingTop: "40px" }}>
//         <Dashboard />
//         <Paper sx={{ p: 3, boxShadow: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Payroll Report
//           </Typography>

//           {/* Filter Fields */}
//           <Grid container spacing={2} sx={{ mb: 3 }}>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Filter by Employee Name</InputLabel>
//                 <Select
//                   value={filterName}
//                   onChange={(e) => setFilterName(e.target.value)}
//                   label="Filter by Employee Name"
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   {nameOptions.map((name, index) => (
//                     <MenuItem key={index} value={name}>{name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Filter by Salary</InputLabel>
//                 <Select
//                   value={filterSalary}
//                   onChange={(e) => setFilterSalary(e.target.value)}
//                   label="Filter by Salary"
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   {salaryOptions.map((option, index) => (
//                     <MenuItem key={index} value={option}>{option}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Filter by Net Pay</InputLabel>
//                 <Select
//                   value={filterNetPay}
//                   onChange={(e) => setFilterNetPay(e.target.value)}
//                   label="Filter by Net Pay"
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   {netPayOptions.map((option, index) => (
//                     <MenuItem key={index} value={option}>{option}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Filter by Pay Period</InputLabel>
//                 <Select
//                   value={filterPeriod}
//                   onChange={(e) => setFilterPeriod(e.target.value)}
//                   label="Filter by Pay Period"
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   {periodOptions.map((option, index) => (
//                     <MenuItem key={index} value={option}>{option}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <FormControl fullWidth>
//                 <InputLabel>Filter by Status</InputLabel>
//                 <Select
//                   value={filterStatus}
//                   onChange={(e) => setFilterStatus(e.target.value)}
//                   label="Filter by Status"
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   {statusOptions.map((option, index) => (
//                     <MenuItem key={index} value={option}>{option}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={4}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={applyFilters}
//                 fullWidth
//               >
//                 Apply Filters
//               </Button>
//             </Grid>
//           </Grid>

//           {/* Payroll Data Table */}
//           <TableContainer component={Paper} sx={{ mt: 3 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Employee Name</TableCell>
//                   <TableCell>Salary</TableCell>
//                   <TableCell>Deductions</TableCell>
//                   <TableCell>Net Pay</TableCell>
//                   <TableCell>Pay Period Start</TableCell>
//                   <TableCell>Pay Period End</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentPageData.map((payroll, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{payroll.employeeName}</TableCell>
//                     <TableCell>{payroll.salary}</TableCell>
//                     <TableCell>{payroll.deductions}</TableCell>
//                     <TableCell>{payroll.netPay}</TableCell>
//                     <TableCell>{payroll.payPeriodStart}</TableCell>
//                     <TableCell>{payroll.payPeriodEnd}</TableCell>
//                     <TableCell>{payroll.status}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination Controls */}
//           <TablePagination
//             component="div"
//             count={filteredData.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[30]} // Fixed at 30 records per page
//           />

//           {/* Button to download Excel report */}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={downloadExcel}
//             sx={{ mt: 3 }}
//           >
//             Download Excel
//           </Button>
//         </Paper>
//       </section>
//     </Box>
//   );
// };

// export default PayrollReport;








import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as XLSX from "xlsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fireBaseConfig";
import Dashboard from "./Dashboard";

const PayrollReport = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  // Filter states
  const [filterType, setFilterType] = useState(""); // Filter type (e.g., Name, Salary)
  const [filterValue, setFilterValue] = useState(""); // Filter value based on the selected type

  // Dropdown options
  const [nameOptions, setNameOptions] = useState([]);
  const salaryOptions = ["<50k", "50k-100k", "100k-200k", ">200k"];
  const netPayOptions = ["<30k", "30k-70k", "70k-150k", ">150k"];
  const periodOptions = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
  const statusOptions = ["pending", "approve"];

  // Fetch payroll data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payrollsCollection = collection(db, "Payrolls");
        const payrollSnapshot = await getDocs(payrollsCollection);
        const payrollList = payrollSnapshot.docs.map((doc) => doc.data());
        setPayrollData(payrollList);
        setFilteredData(payrollList); // Initialize filtered data with full dataset

        // Extract unique employee names for dropdown options
        const uniqueNames = [...new Set(payrollList.map((payroll) => payroll.employeeName))];
        setNameOptions(uniqueNames);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle filtering
  const applyFilters = () => {
    const filtered = payrollData.filter((payroll) => {
      switch (filterType) {
        case "Name":
          return filterValue === "" || payroll.employeeName === filterValue;
        case "Salary":
          return filterValue === "" || matchRange(payroll.salary, filterValue, salaryOptions);
        case "Net Pay":
          return filterValue === "" || matchRange(payroll.netPay, filterValue, netPayOptions);
        case "Period":
          return filterValue === "" || matchPeriod(payroll, filterValue);
        case "Status":
          return filterValue === "" || payroll.status === filterValue;
        default:
          return true;
      }
    });

    setFilteredData(filtered);
    setPage(0); // Reset to the first page
  };

  // Helper function to match ranges for salary and net pay
  const matchRange = (value, filter, options) => {
    if (filter === options[0]) return value < 50000;
    if (filter === options[1]) return value >= 50000 && value <= 100000;
    if (filter === options[2]) return value >= 100000 && value <= 200000;
    if (filter === options[3]) return value > 200000;
    return false;
  };

  // Helper function to match pay period
  const matchPeriod = (payroll, filter) => {
    const periodStart = new Date(payroll.payPeriodStart).getMonth();
    const periodEnd = new Date(payroll.payPeriodEnd).getMonth();
    switch (filter) {
      case "Jan-Mar":
        return periodStart <= 2 && periodEnd <= 2;
      case "Apr-Jun":
        return periodStart >= 3 && periodEnd <= 5;
      case "Jul-Sep":
        return periodStart >= 6 && periodEnd <= 8;
      case "Oct-Dec":
        return periodStart >= 9 && periodEnd <= 11;
      default:
        return false;
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Function to download the payroll data as an Excel file
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payrolls");
    XLSX.writeFile(wb, "Filtered_Payrolls_Report.xlsx");
  };

  // Calculate the data to display for the current page
  const currentPageData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <section style={{ paddingLeft: "240px", paddingRight: "0px", paddingTop: "40px" }}>
        <Dashboard />
        <Paper sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Payroll Report
          </Typography>

          {/* Filter Fields */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filter Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Filter Type"
                >
                  <MenuItem value="">Select Filter Type</MenuItem>
                  <MenuItem value="Name">Name</MenuItem>
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Net Pay">Net Pay</MenuItem>
                  <MenuItem value="Period">Period</MenuItem>
                  <MenuItem value="Status">Status</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filter Value</InputLabel>
                <Select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  label="Filter Value"
                  disabled={filterType === ""}
                >
                  <MenuItem value="">All</MenuItem>
                  {filterType === "Name" && nameOptions.map((name, index) => (
                    <MenuItem key={index} value={name}>{name}</MenuItem>
                  ))}
                  {filterType === "Salary" && salaryOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                  {filterType === "Net Pay" && netPayOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                  {filterType === "Period" && periodOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                  {filterType === "Status" && statusOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={applyFilters}
                fullWidth
                disabled={filterType === "" || filterValue === ""}
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>

          {/* Payroll Data Table */}
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Salary</TableCell>
                  <TableCell>Deductions</TableCell>
                  <TableCell>Net Pay</TableCell>
                  <TableCell>Pay Period Start</TableCell>
                  <TableCell>Pay Period End</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageData.map((payroll, index) => (
                  <TableRow key={index}>
                    <TableCell>{payroll.employeeName}</TableCell>
                    <TableCell>{payroll.salary}</TableCell>
                    <TableCell>{payroll.deductions}</TableCell>
                    <TableCell>{payroll.netPay}</TableCell>
                    <TableCell>{payroll.payPeriodStart}</TableCell>
                    <TableCell>{payroll.payPeriodEnd}</TableCell>
                    <TableCell>{payroll.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Controls */}
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[30]} // Fixed at 30 records per page
          />

          {/* Button to download Excel report */}
          <Button
            variant="contained"
            color="primary"
            onClick={downloadExcel}
            sx={{ mt: 3 }}
          >
            Download Excel
          </Button>
        </Paper>
      </section>
    </Box>
  );
};

export default PayrollReport;


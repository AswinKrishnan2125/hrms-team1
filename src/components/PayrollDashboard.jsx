// import React, { useState, useEffect } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../fireBaseConfig";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// const PayrollDashboard = () => {
//   const [payrollData, setPayrollData] = useState([]);

//   useEffect(() => {
//     const fetchPayrolls = async () => {
//       const payrollsCollection = collection(db, "Payrolls");
//       const payrollSnapshot = await getDocs(payrollsCollection);
//       const payrollList = payrollSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPayrollData(payrollList);
//     };
//     fetchPayrolls();
//   }, []);

//   // Prepare data for the graph
//   const graphData = payrollData.map((payroll) => ({
//     name: payroll.employeeName,
//     netPay: parseFloat(payroll.netPay),
//   }));

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Payroll Dashboard
//       </Typography>

//       <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <Paper className="p-4">
//           <Typography variant="h6">Total Payroll Records</Typography>
//           <Typography variant="h3">{payrollData.length}</Typography>
//         </Paper>
//         <Paper className="p-4">
//           <Typography variant="h6">Total Salary Paid</Typography>
//           <Typography variant="h3">
//             ₹{payrollData.reduce((total, payroll) => total + parseFloat(payroll.salary), 0)}
//           </Typography>
//         </Paper>
//         <Paper className="p-4">
//           <Typography variant="h6">Total Net Pay</Typography>
//           <Typography variant="h3">
//             ₹{payrollData.reduce((total, payroll) => total + parseFloat(payroll.netPay), 0)}
//           </Typography>
//         </Paper>
//       </Box>

//       <Paper className="p-4">
//         <Typography variant="h6" component="h2" gutterBottom>
//           Net Pay Distribution
//         </Typography>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={graphData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="netPay" fill="#1976d2" />
//           </BarChart>
//         </ResponsiveContainer>
//       </Paper>
//     </Box>
//   );
// };

// export default PayrollDashboard;









import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../fireBaseConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Dashboard from "./Dashboard";

const PayrollDashboard = () => {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    const fetchPayrolls = async () => {
      const payrollsCollection = collection(db, "Payrolls");
      const payrollSnapshot = await getDocs(payrollsCollection);
      const payrollList = payrollSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayrollData(payrollList);
    };
    fetchPayrolls();
  }, []);

  // Prepare data for the graph
  const graphData = payrollData.map((payroll) => ({
    name: payroll.employeeName,
    netPay: parseFloat(payroll.netPay),
  }));

  return (
    <Box className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 min-h-screen gap-2">
        <section style={{ paddingLeft: "240px", paddingRight: "0px", paddingTop: "30px" }}>
            <Dashboard/>
            <section>
          <div className="h-8"></div>
          {/* <div className="h-8"></div>
          <div className="h-8"></div> */}
        </section>
      <Typography variant="h4" component="h1" className="text-indigo-600 mb-8 font-bold text-center">
        Payroll Dashboard
      </Typography>

      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Paper className="p-6 shadow-lg rounded-lg bg-gradient-to-r from-purple-400 to-blue-500 text-white transition-transform transform hover:scale-105">
          <Typography variant="h6" className="font-semibold">
            Total Payroll Records
          </Typography>
          <Typography variant="h3" className="font-bold mt-4">
            {payrollData.length}
          </Typography>
        </Paper>
        <Paper className="p-6 shadow-lg rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white transition-transform transform hover:scale-105">
          <Typography variant="h6" className="font-semibold">
            Total Salary Paid
          </Typography>
          <Typography variant="h3" className="font-bold mt-4">
            ₹{payrollData.reduce((total, payroll) => total + parseFloat(payroll.salary), 0)}
          </Typography>
        </Paper>
        <Paper className="p-6 shadow-lg rounded-lg bg-gradient-to-r from-pink-400 to-blue-500 text-white transition-transform transform hover:scale-105">
          <Typography variant="h6" className="font-semibold">
            Total Net Pay
          </Typography>
          <Typography variant="h3" className="font-bold mt-4">
            ₹{payrollData.reduce((total, payroll) => total + parseFloat(payroll.netPay), 0)}
          </Typography>
        </Paper>
      </Box>

      <Paper className="p-6 shadow-lg rounded-lg bg-white transition-transform transform hover:scale-103">
        <Typography variant="h6" component="h2" className="font-bold text-indigo-500 mb-4">
          Net Pay Distribution
        </Typography>
        <ResponsiveContainer width="90%" height={400}>
          <BarChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="netPay" fill="#4a90e2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      </section>
    </Box>
  );
};

export default PayrollDashboard;










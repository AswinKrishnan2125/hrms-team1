// import React, { useEffect, useState } from 'react';
// import { auth, db } from '../fireBaseConfig';
// import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
// import { Box, Typography, TextField, MenuItem, Button, Alert } from '@mui/material';
// import Dashboard from './Dashboard';
// const RolesPage = () => {
//   const [userRole, setUserRole] = useState('');
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [newRole, setNewRole] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const employeeRef = doc(db, 'Employee', user.uid); // Fetch role from Employee collection
//         const docSnap = await getDoc(employeeRef);

//         if (docSnap.exists()) {
//           setUserRole(docSnap.data().role);
//         }
//       }
//     };

//     fetchUserRole();
//   }, []);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       const employeesCollection = collection(db, 'Employee');
//       const employeeSnapshot = await getDocs(employeesCollection);
//       const employeeList = employeeSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setEmployees(employeeList);
//     };

//     fetchEmployees();
//   }, []);

//   const handleAssignRole = async () => {
//     try {
//       const docRef = doc(db, 'Employee', selectedEmployee); // Update role in Employee collection
//       await setDoc(docRef, { role: newRole }, { merge: true });
//       setSuccess(`Role ${newRole} assigned to employee ${selectedEmployee}`);
//       setNewRole('');
//     } catch (err) {
//       setError('Error assigning role: ' + err.message);
//     }
//   };

//   // Check if userRole is one of the allowed roles
//   if (!['Super Admin', 'Admin', 'HR'].includes(userRole)) {
//     return <Typography>You do not have access to this page.</Typography>;
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Dashboard />
//       <Typography variant="h4">Roles Management</Typography>
//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//       {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
//       <TextField
//         select
//         label="Select Employee"
//         value={selectedEmployee}
//         onChange={(e) => setSelectedEmployee(e.target.value)}
//         fullWidth
//         margin="normal"
//       >
//         {employees.map((employee) => (
//           <MenuItem key={employee.id} value={employee.id}>
//             {employee.name}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         select
//         label="Select Role"
//         value={newRole}
//         onChange={(e) => setNewRole(e.target.value)}
//         fullWidth
//         margin="normal"
//       >
//         <MenuItem value="Employee">Employee</MenuItem>
//         <MenuItem value="HR">HR</MenuItem>
//         <MenuItem value="Admin">Admin</MenuItem>
//         <MenuItem value="Super Admin">Super Admin</MenuItem>
//       </TextField>
//       <Button
//         onClick={handleAssignRole}
//         variant="contained"
//         color="primary"
//         fullWidth
//         sx={{ mt: 2 }}
//       >
//         Assign Role
//       </Button>
//     </Box>
//   );
// };

// export default RolesPage;



import React, { useEffect, useState } from 'react';
import { auth, db } from '../fireBaseConfig';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { Box, Typography, TextField, MenuItem, Button, Alert, Paper } from '@mui/material';
import Dashboard from './Dashboard';

const RolesPage = () => {
  const [userRole, setUserRole] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [newRole, setNewRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const employeeRef = doc(db, 'Employee', user.uid);
        const docSnap = await getDoc(employeeRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
      }
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesCollection = collection(db, 'Employee');
      const employeeSnapshot = await getDocs(employeesCollection);
      const employeeList = employeeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(employeeList);
    };
    fetchEmployees();
  }, []);

  const handleAssignRole = async () => {
    try {
      const docRef = doc(db, 'Employee', selectedEmployee);
      await setDoc(docRef, { role: newRole }, { merge: true });
      setSuccess(`Role ${newRole} assigned to employee ${selectedEmployee}`);
      setNewRole('');
      setSelectedEmployee('');
    } catch (err) {
      setError('Error assigning role: ' + err.message);
    }
  };

  if (!['Super Admin', 'Admin', 'HR'].includes(userRole)) {
    return <Typography>You do not have access to this page.</Typography>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Dashboard />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Typography variant="h4" sx={{ mb: 4 }}>Roles Management</Typography> */}
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', pt: 10 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <TextField
            select
            label="Select Employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            fullWidth
            margin="normal"
          >
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                {employee.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Super Admin">Super Admin</MenuItem>
          </TextField>
          <Button
            onClick={handleAssignRole}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Assign Role
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default RolesPage;
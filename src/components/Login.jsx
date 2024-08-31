// // src/LoginPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../fireBaseConfig';
// import { Container, TextField, MenuItem, Button, Typography, Alert, Box } from '@mui/material';
// import QuickLinks from './QuickLinks';
// const roles = ['Super Admin', 'Admin', 'HR', 'Employee'];

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState(roles[0]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Use useNavigate from react-router-dom

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Authenticate with Firebase
//       const userCredential = await signInWithEmailAndPassword(auth, username, password);
//       const user = userCredential.user;

//       // Store role in Firestore
//       await setDoc(doc(db, 'users', user.uid), { role }, { merge: true });

//       // Redirect based on role
//       switch (role) {
//         case 'Super Admin':
//           navigate('/home'); // Use navigate instead of history.push
//           break;
//         case 'Admin':
//           navigate('/home');
//           break;
//         case 'HR':
//           navigate('/home');
//           break;
//         case 'Employee':
//           navigate('/home');
//           break;
//         default:
//           navigate('/home');
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           mt: 8,
//           p: 3,
//           borderRadius: 1,
//           boxShadow: 3
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         <form onSubmit={handleLogin} style={{ width: '100%' }}>
//           <TextField
//             label="Username"
//             type="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <TextField
//             select
//             label="Role"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             {roles.map((r) => (
//               <MenuItem key={r} value={r}>
//                 {r}
//               </MenuItem>
//             ))}
//           </TextField>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 3 }}
//           >
//             Login
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default LoginPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../fireBaseConfig';
import { Container, TextField, MenuItem, Button, Typography, Alert, Box } from '@mui/material';

const roles = ['Super Admin', 'Admin', 'HR', 'Employee'];

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Authenticate with Firebase using email and password
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Retrieve the user's role from the Employee collection in Firestore
      const userDocRef = doc(db, 'Employee', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error('User does not exist in the Employee database.');
      }

      const userData = userDoc.data();

      // Check if the selected role matches the role in Firestore
      if (userData.role !== role) {
        throw new Error('Selected role does not match the user\'s assigned role.');
      }

      // Redirect to home page on successful login
      navigate('/home');
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          borderRadius: 1,
          boxShadow: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Username"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            select
            label="Role"
            variant="outlined"
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;

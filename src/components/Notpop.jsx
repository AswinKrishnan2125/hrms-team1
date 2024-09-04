// import React, { useState } from 'react';
// import { Popover, Typography, Box, IconButton } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';

// const notifications = [
//   { id: 1, message: 'New task assigned to you.' },
//   { id: 2, message: 'Meeting at 3 PM today.' },
//   { id: 3, message: 'Your leave request is approved.' }
// ];

// const NotificationPopup = () => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'notification-popover' : undefined;

//   return (
//     <Box>
//       <IconButton aria-describedby={id} onClick={handleClick}>
//         <NotificationsIcon className="text-gray-700 text-lg" />
//       </IconButton>

//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center'
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center'
//         }}
//       >
//         <Box sx={{ p: 2, width: 300 }}>
//           <Typography variant="h6">Notifications</Typography>
//           {notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <Typography key={notification.id} sx={{ mt: 1 }}>
//                 {notification.message}
//               </Typography>
//             ))
//           ) : (
//             <Typography>No new notifications</Typography>
//           )}
//         </Box>
//       </Popover>
//     </Box>
//   );
// };

// export default NotificationPopup;




import React, { useState, useEffect } from 'react';
import { Popover, Typography, Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationPopup = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load notifications from local storage on component mount
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  useEffect(() => {
    // Update local storage whenever notifications change
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <Box>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <NotificationsIcon className="text-gray-700 text-lg" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="h6">Notifications</Typography>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Typography key={notification.id} sx={{ mt: 1 }}>
                {notification.message}
              </Typography>
            ))
          ) : (
            <Typography>No new notifications</Typography>
          )}
        </Box>
      </Popover>
    </Box>
  );
};

export default NotificationPopup;
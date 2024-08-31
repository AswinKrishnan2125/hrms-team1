import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Card,
  CardContent
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const PerformanceAnalyticsPage = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const reviewsCollection = collection(db, "Performance");

      let reviewsQuery = reviewsCollection;
      if (selectedDate) {
        const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
        reviewsQuery = query(reviewsCollection, where("reviewDate", ">=", startOfDay), where("reviewDate", "<=", endOfDay));
      }

      const reviewsSnapshot = await getDocs(reviewsQuery);
      const reviewsData = reviewsSnapshot.docs.map(doc => ({
        employeeID: doc.data().employeeID,
        rating: doc.data().rating,
      }));
      setData(reviewsData);
    };

    fetchData();
  }, [selectedDate]);

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item xs={12} md={2}>
        <Dashboard />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} md={10}>
        <Box sx={{ padding: 3 ,paddingTop: 8}}>
          <Typography variant="h4" gutterBottom>
            {/* Performance Analytics */}
          </Typography>

          {/* Navigation Button */}
          <Box sx={{ marginBottom: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/performance-management')}
            >
              Performance Review
            </Button>
          </Box>

          {/* Filters Section */}
          <Box sx={{ marginBottom: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ height: '100%' }}
                  onClick={() => setSelectedDate(null)}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Chart Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Employee Performance Ratings
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="employeeID" label={{ value: 'Employee ID', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={[0, 10]} label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PerformanceAnalyticsPage;

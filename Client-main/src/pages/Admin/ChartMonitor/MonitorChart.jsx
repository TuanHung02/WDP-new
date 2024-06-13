import { Card, Grid, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { CHART_RANGE } from '../../utils/components/ChartTime';
import ChartSection from './ChartSection';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MonitorChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(1800);

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
  };


  const sampleData = [
    {
      name: 'Series 1',
      data: [
        [1614940800, 50],
        [1614944400, 75],
        [1614948000, 60],
      ],
    },
    {
      name: 'Series 2',
      data: [
        [1614940800, 30],
        [1614944400, 45],
        [1614948000, 80],
      ],
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12} sx={{ p: 6 }}>
        <Grid container>
          <Grid item xs={12} sx={{ py: 3 }}>
            <Select
              value={selectedTimeRange}
              onChange={handleTimeRangeChange}
              startAdornment={
                <AccessTimeIcon sx={{ mr: 1, color: 'orange' }} />
              }
            >
              {CHART_RANGE.map((chart) => {
                return (
                  <MenuItem key={chart.key} value={chart.key}>
                    {chart.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} md={6} sx={{ py: 3, paddingRight: 2 }}>
            <ChartSection
              metric="cpu_usage_timeseries"
              timeRange={selectedTimeRange}
              min={0}
              max={100}
              title="Tour"
              unit={'%'}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ py: 3, paddingLeft: 2 }}>
            <ChartSection
              metric="cpu_usage_timeseries"
              timeRange={selectedTimeRange}
              min={0}
              max={100}
              title="User booking tour"
              unit={'%'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MonitorChart;

import { useContext, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Card,
  CardHeader,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  TextField,
  Tab,
} from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import ActionButton from './ActionButton';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import { StyledDialog } from '../../utils/components/StyledDialog';
import { jwtDecode } from 'jwt-decode';
import { STATE_ADMIN_TOUR } from '../../utils/components/StateAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableListTourAdmin = () => {
  const [tours, setTours] = useState([]);
  const [tabValue, setTabValue] = useState('1');


  const headCells = [
    { id: 'tour-name', label: 'Tour', filterable: true, defaultFilter: true },
    { id: 'tour-description', label: 'Tour Description', filterable: false },
    { id: 'tour-price', label: 'Tour Price', filterable: false },
    { id: 'max-tourist', label: 'Max Tourist', filterable: false },
    { id: 'start-date', label: 'Start Date', filterable: false },
    { id: 'end-date', label: 'End Date', filterable: false },
    { id: 'start-position', label: 'Start Position', filterable: false },
    { id: 'end-position', label: 'End Position', filterable: false },
    { id: 'action-button', label: 'Action Button', filterable: false, align: 'center' },
  ];

  const headCellsOverdue = [
    { id: 'tour-name', label: 'Tour', filterable: true, defaultFilter: true },
    { id: 'tour-description', label: 'Tour Description', filterable: false },
    { id: 'tour-price', label: 'Tour Price', filterable: false },
    { id: 'max-tourist', label: 'Max Tourist', filterable: false },
    { id: 'start-date', label: 'Start Date', filterable: false },
    { id: 'end-date', label: 'End Date', filterable: false },
    { id: 'start-position', label: 'Start Position', filterable: false },
    { id: 'end-position', label: 'End Position', filterable: false },
    { id: 'review-status', label: 'Review Status', filterable: false, align: 'center' },
  ];

  const currentDate = new Date().toISOString();
  const [status, setStatus] = useState(true)
  const [searchTour, setSearchTour] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/tour/find-all')
      .then((response) => {
        const tourData = response.data.tours;
        setTours(tourData);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/api/tour/search?page=1&pageSize=10&query=${searchTour}`);
      const searchedTour = response.data.tours;
      setSearchTour(searchedTour);
      setStatus(false)
      console.log(searchedTour);
      toast.success('Wait a few seconds ~')
    } catch (error) {
      const errorData = error.response.data.error;
      console.log(errorData);
      setStatus(true)
      toast.error(errorData)
    }
  };

  useEffect(() => {
    console.log(searchTour);
  }, [searchTour]);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ p: 6 }}>
        <Card>
          <CardHeader
            className="bg-slate-200 text-slate-400 font-bold"
            title="List Tour Admin"
            titleTypographyProps={{ variant: 'h6', color: 'primary' }}
          />

          <Box sx={{
            marginTop: '20px',
            marginBottom: '10px',
            gap: '3',
          }}>
            <form onSubmit={handleSubmit}>
              <div
                className="relative flex items-center w-80 h-9 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
                style={{
                  border: '1px solid lightgrey',
                  boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                  height: '60px',
                  borderRadius: '100px'
                }}
              >
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <SearchIcon />
                </div>
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search tour name.."
                  onChange={(e) => { setSearchTour(e.target.value) }}
                />
                <button
                  type="submit"
                  className="btnSearch text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </Box>

          {status ? (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TabContext value={tabValue}>
                <TabList
                  onChange={(event, newValue) => {
                    setTabValue(newValue);
                  }}
                  aria-label="card navigation example"
                >
                  <Tab value="1" label="Approved tour" />
                  <Tab value="2" label="Pending tour" />
                  <Tab value="3" label="rejected tour" />
                  <Tab value="4" label="Overdue tour" />
                </TabList>
                <TabPanel value="1" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tours.map((row) => {
                          if (row.isAppove === 'APPROVE' && row.start_date > currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'right'}>
                                  <ActionButton
                                    row={row}
                                    statusTour={row.isAppove}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tours.map((row) => {
                          if (row.isAppove === 'NOTAPPROVE' && row.start_date > currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'right'}>
                                  <ActionButton
                                    row={row}
                                    statusTour={row.isAppove}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="3" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tours.map((row) => {
                          if (row.isAppove === 'DECLINE' && row.start_date > currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'right'}>
                                  <ActionButton
                                    row={row}
                                    statusTour={row.isAppove}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="4" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCellsOverdue.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tours.map((row) => {
                          if (row.start_date < currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'center'}>
                                  {STATE_ADMIN_TOUR.find(state => state.value === row.isAppove)?.label || 'UNKNOWN'}
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabContext>
            </Paper>
          ) : (
            // Search results
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TabContext value={tabValue}>
                <TabList
                  onChange={(event, newValue) => {
                    setTabValue(newValue);
                  }}
                  aria-label="card navigation example"
                >
                  <Tab value="1" label="Approved tour" />
                  <Tab value="2" label="Pending tour" />
                  <Tab value="3" label="rejected tour" />
                  <Tab value="4" label="Overdue tour" />
                </TabList>
                <TabPanel value="1" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(searchTour) && searchTour.map((row) => {
                          if (row.isAppove === 'APPROVE' && row.start_date > currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'right'}>
                                  <ActionButton
                                    row={row}
                                    statusTour={row.isAppove}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(searchTour) && searchTour.map((row) => {
                          if (row.isAppove === 'NOTAPPROVE' && row.start_date > currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'right'}>
                                  <ActionButton
                                    row={row}
                                    statusTour={row.isAppove}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="3" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(searchTour) && searchTour.map((row) => {
                          if (row.isAppove === 'DECLINE' && row.start_date > currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'right'}>
                                  <ActionButton
                                    row={row}
                                    statusTour={row.isAppove}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value="4" sx={{ p: 0 }}>
                  <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {headCellsOverdue.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={headCell.align ?? 'left'}
                              style={{ fontWeight: 'bold' }}
                            >
                              {headCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Array.isArray(searchTour) && searchTour.map((row) => {
                          if (row.start_date < currentDate) {
                            return (
                              <TableRow hover tabIndex={-1} key={row?._id}>
                                <TableCell>{row.tour_name}</TableCell>
                                <TableCell>{row.tour_description}</TableCell>
                                <TableCell>{row.tour_price}$</TableCell>
                                <TableCell>{row.max_tourist}</TableCell>
                                <TableCell>
                                  {moment(row.start_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {moment(row.end_date).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell>
                                  {row.start_position?.location_name}
                                </TableCell>
                                <TableCell>
                                  {row.end_position[0]?.location_name}
                                </TableCell>
                                <TableCell align={'center'}>
                                  {STATE_ADMIN_TOUR.find(state => state.value === row.isAppove)?.label || 'UNKNOWN'}
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabContext>
            </Paper>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default TableListTourAdmin;

import { useContext, useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import { Card, CardHeader, Grid, TableBody, TableCell, TableHead, TableRow, Toolbar, Button } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import ActionButton from './ActionButton'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const ADMIN = "65aa44271de57d06c7f378a7";
const USER = "65aa441d1de57d06c7f378a6";
const PARTNER = "65aa44431de57d06c7f378a8";

const UserTable = () => {

  const [target, setTarget] = useState('')
  const [users, setUsers] = useState([]);

  const [userData, setUserData] = useState(null)

  const [selectedUserId, setSelectedUserId] = useState([]);
  const navigate = useNavigate();

  const headCells = [
    // { id: 'expand-button', filterable: false },
    { id: 'id', label: 'ID Number', filterable: true},
    { id: 'user-name', label: 'Name', filterable: false },
    { id: 'email', label: 'Email', filterable: false },
    { id: 'dob', label: 'Date of Birth', filterable: false },
    { id: 'gender', label: 'Gender', filterable: false },
    { id: 'phone number', label: 'Phone Number', filterable: false },
    { id: 'address', label: 'Address', filterable: false },
    { id: 'role', label: 'Role', filterable: false },
    { id: 'action-button', label: 'Action Button', align: 'center', filterable: false }
  ]
  const [searchUser, setSearchNameUser] = useState([])
  const userList = () => {
    axios.get('http://localhost:8080/api/user/all')
      .then((response) => {
        const usersData = response.data.data;
        
        if(searchUser == ''){
          setUsers(usersData);
        }else{
          setUsers(usersData.filter(u => u.username.toLowerCase().includes(searchUser.toLowerCase())));
        }
        
        console.log(usersData);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
      userList()
  }, [searchUser]);

  const handleUpdateUser = () => {
      userList()
    } 

    const getRoleName = (roleId) => {
      switch (roleId) {
        case USER:
          return "User";
        case ADMIN:
          return "Admin";
        case PARTNER:
          return "Partner";
        default:
          return "Unknown";
      }
    };

    const [searchTour, setSearchTour] = useState([])
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

    
    // const handleSubmitSearch = (e) => {
    //   e.preventDefault();
    //   const searched = e.target.value;
    //   console.log(searched);
    //   if(searched != ''){
    //     setUsers(users.filter(u => u.username.toLowerCase().includes(searched.toLowerCase())));
    //   }else{

    //   }
    // };

    return (
      <Grid container>
      <Grid item xs={12} sx={{ p: 6 }}>
          {/* <Button variant="outlined" color="primary" style={{marginBottom:'1rem'}}>Create User</Button> */}
        <Card>
          <CardHeader className='bg-slate-200 text-slate-400 font-bold' title='List User Admin' titleTypographyProps={{ variant: 'h6', color: 'primary' }} />
           
              <div
                className="relative flex items-center w-80 h-9 rounded-lg focus-within:shadow-lg bg-white overflow-hidden"
                style={{
                  border: '1px solid lightgrey',
                  boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, 0.1)',
                  height: '60px',
                  borderRadius: '100px',
                  margin:'10px'
                }}
              >
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <SearchIcon />
                </div>
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search user name.."
                  onChange={(e) => setSearchNameUser(e.target.value)}
                />
              </div>
           
      




          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow >
                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id} align={headCell.align ?? 'left'} style={{fontWeight:'bold'}}>
                        {headCell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((user, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={user?._id}>
                        <TableCell align={'center'}>
                            {index + 1}
                        </TableCell>
                        <TableCell>
                          {user?.username}
                        </TableCell>
                        <TableCell>{user?.email}</TableCell>
                        <TableCell>{moment(user?.dob).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{user?.gender}</TableCell>
                        <TableCell>{user?.phoneNumber}</TableCell>
                        <TableCell>{user?.address}</TableCell>
                        <TableCell>{getRoleName(user?.role_id)}</TableCell>
                        <TableCell align={'center'}>
                          <ActionButton user={user} onUpdateUser={handleUpdateUser} setUserData={setUserData} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Card>
      </Grid>
    </Grid>
    );
}

export default UserTable;

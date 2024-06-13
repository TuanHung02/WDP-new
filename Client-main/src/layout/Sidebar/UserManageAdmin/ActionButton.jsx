import React, { useState, useContext, useEffect } from 'react';
//MUI Imports
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CustomButton } from '../../../pages/utils/components/CustomButton.jsx';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import './ActionButton.scss';
import moment from 'moment'

import axios from 'axios';

const ADMIN = "65aa44271de57d06c7f378a7";
const USER = "65aa441d1de57d06c7f378a6";
const PARTNER = "65aa44431de57d06c7f378a8";

const ActionButton = ({ user, onUpdateUser, setUserData }) => {
  const [visibleModals, setVisibleModals] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [value, setValue] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role_id, setRoleId] = useState('');
  const [gender, setGender] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  // check validate phone number
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(value)) {
      setPhoneNumberError('Phone number must be exactly 10 digits');
      return false;
    } else {
      setPhoneNumberError('');
      return true;
    }
  };

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  //----------

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (showEditDialog === true) {
      axios.get(`http://localhost:8080/api/user/${user._id}`)
        .then((response) => {
          const useData = response.data.data
          setValue(useData)
          setUsername(useData.username)
          setEmail(useData.email)
          setPassword(useData.password)
          setDob(useData.dob)
          setGender(useData.gender)
          setPhoneNumber(useData.phoneNumber)
          setAddress(useData.address)
          setRoleId(useData.role_id)

        })
        .catch(error => console.log(error))
    }
  }, [user._id, showEditDialog]);

  const handleClickUser = (userId) => {
    setSelectedUserId(userId);
    navigate(`/users/${userId}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Invalid email format');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }
    const updateUser = {
      username, 
      email,
      password, 
      dob, 
      gender,
      phoneNumber, 
      address, 
      role_id
    }
    console.log(updateUser);
    axios.put(`http://localhost:8080/api/user/update/${user._id}`, updateUser)
      .then((response) => {
        const updatedUser = response.data.data;
        console.log('update data: ', updatedUser);
        setValue(updatedUser)
        setShowEditDialog(false)  
        onUpdateUser(updatedUser)
        setUserData(updatedUser)
        alert('Update data successfully !')

      })
      .catch(error => console.log(error))
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


  // const handleDeleteClick = () => {
  //   setShowDeleteDialog(true);
  // };

  // const handleDeleteConfirm = () => {
  //   setShowDeleteDialog(false);
  // };

  // const handleDeleteCancel = () => {
  //   setShowDeleteDialog(false);
  // };

  const handleEditClick = () => {
    setShowEditDialog(true);
  };

  const handleEditClose = () => {
    setShowEditDialog(false);
  };

  const handleIconButtonOnClick = (modalType) => {
    if (modalType === 'edit') {
      handleEditClick();
    } 
    // else if (modalType === 'delete') {
    //   handleDeleteClick();
    // }
  };

  return (
    <>
      <div classNameNameName="flex gap-1">
        <CustomButton
          id="loadbalancer-action-edit"
          title={'Edit'}
          icon={<EditIcon fontSize="small"/>}
          onClick={() => handleIconButtonOnClick('edit')}
          disabled={false}
        />
        {/* <CustomButton
          id="loadbalancer-action-resize"
          title={'Delete'}
          icon={<DeleteForeverIcon fontSize="small" />}
          onClick={() => handleIconButtonOnClick('delete')}
          disabled={false}
        /> */}
      </div>

      {/* <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Data'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} variant="outlined" color="error">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="primary"
            
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={showEditDialog}
        onClose={handleEditClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title" className="fw-bold">
          Edit User
        </DialogTitle>
        <DialogContent className="mt-4 mb-4">
          <div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <div className="mb-5">
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  readOnly
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                {!validateEmail(email) && <p className="text-red-500 text-sm">Invalid email format</p>}
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  readOnly
                  value={password}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label
                  for="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of birth
                </label>
                <input
                  type="text"
                  id="dateOfBirth"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  readOnly
                  value={moment(dob).format("DD/MM/YYYY")}
                  onChange={(event) => {
                    setDob(event.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label
                  for="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value)
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-5">
                <label
                  for="PhoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="PhoneNumber"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={phoneNumber}
                  // onChange={(event) => {
                  //   setPhoneNumber(event.target.value);
                  // }}
                  onChange={handlePhoneNumberChange}
                />
                {phoneNumberError && <p className="text-red-500 text-sm">{phoneNumberError}</p>}
              </div>
              <div className="mb-5">
                <label
                  for="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label
                  for="roleId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  id="roleId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={role_id}
                  onChange={(event) => {
                    setRoleId(event.target.value);
                  }}
                >
                  <option value={USER}>{getRoleName(USER)}</option>
                  <option value={ADMIN}>{getRoleName(ADMIN)}</option>
                  <option value={PARTNER}>{getRoleName(PARTNER)}</option>
                </select>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button type='submit' onClick={handleSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={showEditDialog}
        onClose={handleEditClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title" className="fw-bold">
          Create User
        </DialogTitle>
        <DialogContent className="mt-4 mb-4">
          <div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <div className="mb-5">
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={username}
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={email}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={password}
                  readOnly
                />
              </div>
              <div className="mb-5">
                <label
                  for="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of birth
                </label>
                <input
                  type="text"
                  id="dateOfBirth"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={moment(dob).format("DD/MM/YYYY")}
                  onChange={(event) => {
                    setDob(event.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label
                  for="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value)
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-5">
                <label
                  for="PhoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="PhoneNumber"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label
                  for="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
              <div className="mb-5">
                <label
                  for="roleId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="roleId"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                  value={role_id === "65aa441d1de57d06c7f378a6" ? "User" : "Admin"}
                  onChange={(event) => {
                    setRoleId(event.target.value);
                  }}
                  readOnly
                />
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button type='submit' onClick={handleSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default ActionButton;

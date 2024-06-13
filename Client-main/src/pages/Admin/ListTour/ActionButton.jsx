//React Imports
import React, { useState, useContext, useEffect } from 'react'
//MUI Imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CustomButton } from '../../utils/components/CustomButton'
import EditStateModal from './modals/Edit.jsx'
import ViewStateModal from './modals/view.jsx'
import DeleteTourAdminModal from './modals/Delete.jsx'
import { Button, IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import { STATE_ADMIN_TOUR } from '../../utils/components/StateAdmin.jsx';
//Styled Imports

const ActionButton = ({ row, statusTour }) => {
  const [visibleModals, setVisibleModals] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [status, setStatus] = useState(false)
  const [tour, setTour] = useState([]);
  const [adminSelect, setAdminSelect] = useState([]);
  const [aTour, setATour] = useState([]);
  const [tourDetail, setTourDetail] = useState([]);


  // const handleIconButtonOnClick = async (row, setShowModalFunc, tourId) => {
  //   setVisibleModals(true)
  //   setAnchorEl(null)
  //   setShowModalFunc(true)
  //   setAdminSelect(tourId)
  // }

  useEffect(() => {
    // Rest all tours
    axios.get('http://localhost:8080/api/tour/find-all')
      .then((response) => {
        const tourData = response.data.tours;
        setTour(tourData);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    const tourId = row._id

    // Rest a tour
    axios.get(`http://localhost:8080/api/tour/${tourId}`)
      .then((response) => {
        const tourData = response.data.tour.tour;
        setATour(tourData);
        // console.log("tour this: ", tourData);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

  }, []);

  const handleIconButtonOnClick = async (row, setShowModalFunc, tourId) => {
    setVisibleModals(true)
    setAnchorEl(null)
    setShowModalFunc(true)
    setAdminSelect(tourId)
    setTourDetail(aTour)
  }

  return (
    <div className='flex gap-1'>
      <Tooltip
        PopperProps={{
          sx: {
            '& .MuiTooltip-tooltip': {
              border: 'solid primary.main 1px',
              backgroundColor: 'primary.contrastText',
              color: 'primary.main',
              fontSize: '0.875rem'
            }
          }
        }}
      >
        <span>
          <Button
            onClick={() => handleIconButtonOnClick(row, setShowEditModal)}
            disabled={false}
            sx={{
              border: `rgba(0,0,0,0.2) solid 1px`,
              borderRadius: '5px',
              padding: '2px',
              marginLeft: '4px',
              marginRight: '4px',
              mr: '7px',
              backgroundColor: '#ffffff',
              color: '#',
              paddingLeft: '15px',
              paddingRight: '15px'
            }}
          >
            
            {STATE_ADMIN_TOUR.find(state => state.value === statusTour)?.label || 'UNKNOWN'}
          </Button>
        </span>
      </Tooltip>
      <CustomButton
        id='loadbalancer-action-resize'
        title={'View'}
        icon={<VisibilityIcon fontSize='small' />}
        onClick={() => handleIconButtonOnClick(row, setShowViewModal)}
        disabled={false}
      />
      <CustomButton
        id='loadbalancer-action-resize'
        title={'Delete'}
        icon={<DeleteForeverIcon fontSize='small' />}
        onClick={() => handleIconButtonOnClick(row, setShowDeleteModal)}
        disabled={false}
      />
      {visibleModals && (
        <div>
          <EditStateModal
            row={tourDetail}
            openModal={showEditModal}
            setOpenModal={setShowEditModal}
          />
          <ViewStateModal
            row={tourDetail}
            rowID={tourDetail._id}
            openModal={showViewModal}
            setOpenModal={setShowViewModal}
          />
          <DeleteTourAdminModal
            row={row}
            openModal={showDeleteModal}
            setOpenModal={setShowDeleteModal}
          />
        </div>
      )}
    </div>
  )
}

export default ActionButton

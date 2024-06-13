import { useEffect, useState } from 'react';
import { StyledDialog } from '../../../utils/components/StyledDialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { STATE_ADMIN_TOUR } from '../../../utils/components/StateAdmin';

const EditStateModal = ({ row, openModal, setOpenModal }) => {
  const [loadingEditSubmit, setLoadingForEdit] = useState(false);
  const [stateTour, setStateTour] = useState('PENDING');
  const [tours, setTours] = useState([])

  useEffect(() => {
    // setStateTour(row.state) // cái này truyên từ bên Action Button sang, cái này là để trong popup hiển thị giá trị của state đang có, ví dụ đang là pedding thì hiển thị là pedding
    console.log(`row in EDIT: ${row._id}`);
  }, [row])

  const handleActionEditSubmit = async () => {
    setLoadingForEdit(true);

    try {
      const response = await axios.put('http://localhost:8080/api/tour/change_status', {
        "tour_id": row._id,
        "status": stateTour
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status == 200) {
        const responseData = response.data;
        toast.success(responseData.message);
        window.location.href = '/dashboard';
      } else {
        const errorData = response.data;
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  console.log(`oke: ${stateTour}`)

  return (
    <div>
      <StyledDialog open={openModal} maxWidth="md">
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Update State Tour by Admin:
            </Typography>
            <Button
              color="secondary"
              onClick={() => {
                setOpenModal(false);
              }}
              id="close-outline-edit"
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Do you really want to approve or reject the post?
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControl fullWidth id='metric-type-create-silence'>
              <InputLabel id='demo-simple-select-helper-label' required={true}>
              State Tour
              </InputLabel>
              <Select
                onChange={event => {
                  setStateTour(event.target.value)
                }}
                value={stateTour}
                label='State Tour'
              >
                {STATE_ADMIN_TOUR.map(option => (
                  <MenuItem key={option.value} value={option.value} id={`subnet-name-${option.value}`}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancel-edit"
          >
            Cancel
          </Button>
          <LoadingButton
            size="medium"
            variant="contained"
            loading={loadingEditSubmit}
            onClick={() => handleActionEditSubmit()}
            id="submit-edit"
          // disabled={
          //   row.state === stateTour
          //   //cái state này thì lấy từ api xuống, row.state là được truyền từ component cha là action button sang nha
          // }
          >
            Edit
          </LoadingButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default EditStateModal;

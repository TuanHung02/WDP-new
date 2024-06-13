import { useEffect, useState } from 'react';
import { StyledDialog } from '../../../utils/components/StyledDialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const DeleteTourAdminModal = ({ row, openModal, setOpenModal }) => {
  const [loadingDeleteSubmit, setLoadingForDelete] = useState(false);

  const closeDeleteTourAminModal = () => {
    setOpenModal(false);
  };

  const handleActionDeleteSubmit = async () => {
    setLoadingForDelete(true);
  };

  return (
    <div>
      <StyledDialog open={openModal} maxWidth="md">
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              DeleteName Tour:
              {/* {row.name}  */}
            </Typography>
            <Button
              color="secondary"
              onClick={() => {
                closeDeleteTourAminModal();
              }}
              id="close-outline-delete"
            >
              <CloseOutlinedIcon />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2">
            Do you really want to delete tour?
          </Typography>
          <Typography variant="body2">
            The tour will be lost even if it is in distribution status
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            This action cannot be undone!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              closeDeleteTourAminModal();
            }}
            id="cancel-delete"
          >
            Cancel
          </Button>
          <LoadingButton
            size="medium"
            variant="contained"
            onClick={handleActionDeleteSubmit}
            loading={loadingDeleteSubmit}
            id="submit-delete"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default DeleteTourAdminModal;

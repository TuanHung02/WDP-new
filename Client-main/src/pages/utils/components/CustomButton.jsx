import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

export const CustomButton = ({ title, icon, onClick, disabled, id = null }) => {
  return (
    <Tooltip
      title={title}
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
        <IconButton
          id={id}
          onClick={onClick}
          disabled={disabled}
          sx={{
            border: `rgba(0,0,0,0.2) solid 1px`,
            borderRadius: '5px',
            padding: '4px',
            mr: '7px'
          }}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}
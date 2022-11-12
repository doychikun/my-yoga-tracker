import { Dialog, DialogContent, DialogTitle, Box, IconButton } from "@mui/material"
import Close from '@mui/icons-material/Close'

const CustomDialog = ({ Component, title, open, close }) => 
  <Dialog open={open} onClose={close}>
    <DialogTitle>
      <Box display="flex" alignItems="center">
            <Box flexGrow={1} >{title}</Box>
            <Box>
                <IconButton onClick={close}>
                      <Close />
                </IconButton>
            </Box>
      </Box>
    </DialogTitle>
    <DialogContent>
      <Component close={close} />
    </DialogContent>
  </Dialog>

export default CustomDialog
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import isUrl from 'validator/es/lib/isUrl';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



export default function Index() {
  
  const [open, setOpen] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('');
  const [error, setError] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('enter pressed', sheetUrl);
      if (!isUrl(sheetUrl) || !sheetUrl.includes('docs.google.com/spreadsheets')) {
        setError('Not a valid Google Sheets URL');
      } else {
        setError('');
        console.log('Valid Google Sheets URL:', sheetUrl);
        // Add your logic here
        // const navigate = useNavigate();
        // navigate({
        //   to: '.',
        //   search: {sheet: sheetUrl} ,
        // })
        
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} size={{ xs: 4, sm: 8, md: 6, lg: 4, xl: 3 }}>
            <Item>{index + 1}</Item>
          </Grid>
        ))}
      </Grid>
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16 
        }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        closeAfterTransition={false}
        open={open}
        onClose={handleClose}
        // slotProps={{
        //   paper: {
        //     component: 'form',
        //     onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //       event.preventDefault();
        //       const formData = new FormData(event.currentTarget);
        //       const formJson = Object.fromEntries((formData as any).entries());
        //       const email = formJson.email;
        //       console.log(email);
        //       handleClose();
        //     },
        //   },
        // }}
      >
        <DialogTitle>Google Sheets Url</DialogTitle>
        <DialogContent>
          <DialogContentText>
            enter your google sheets url 
          </DialogContentText>
          <TextField
              
            autoFocus
            required
            margin="dense"
            id="name"
            name="sheets"
            label="Google Sheets Url"
            type="sheets"
            fullWidth
            variant="standard"
            onChange={(e) => setSheetUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {error && <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>}
        </DialogContent>
        <DialogActions>          
        </DialogActions>
      </Dialog>
    </Box>
  );
}
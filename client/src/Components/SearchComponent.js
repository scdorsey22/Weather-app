import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import {IconButton} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';



function SearchComponent({ city, setCity, onCitySearch, handleOpen }) {

   const handleChange = (e) => {
       e.preventDefault()
       setCity(e.target.value)
   }

  return (
    <Paper sx={{ maxWidth: 700, margin: 'auto', overflow: 'hidden' }}>
        <Toolbar type="form" >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
          <Grid item xs>
            <TextField
                fullWidth
                value={city}
                placeholder="Search by city or ZIP code"
                onChange={handleChange}
                InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'default' },
                }}
                variant="standard"
            />
          </Grid>
            <Grid item>
              <Button onClick={onCitySearch} variant="contained" sx={{ mr: 1 }}>
                Search
              </Button>
            </Grid>
            <Grid item>
            <IconButton aria-label="settings">
                <MyLocationIcon sx={{ color: "gray" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
    </Paper>

  )}

export default SearchComponent
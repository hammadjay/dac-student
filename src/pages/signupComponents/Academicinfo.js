import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import validator from 'validator';

import '../../App.css'

export default function AcademicInfo({ batch, degree, rollno, passOutYear, email, password,confirmPassword, handleBatch, handleDegree, handleRollno, handlePassOutYear, handleEmail, handlePassword, handleConfirmPassword }) {

  // const d = new Date();
  const batches = ['FA00', 'FA01', 'FA02', 'FA03', 'FA04', 'FA05', 'FA06', 'FA07', 'FA08', 'FA09', 'FA10', 'FA11', 'FA12', 'FA13', 'FA14', 'FA15', 'FA16', 'FA17', 'SP00', 'SP01', 'SP02', 'SP03', 'SP04', 'SP05', 'SP06', 'SP07', 'SP08', 'SP09', 'SP10', 'SP11', 'SP12', 'SP13', 'SP14', 'SP15', 'SP16', 'SP17']
  const years = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
  const [values, setValues] = React.useState({
    showPassword: false,
  });


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Academic Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3} md={4} >
          <InputLabel id="Batch">Batch</InputLabel>
          <Select
            labelId="Batch"
            id="Batch"
            value={batch}
            fullWidth
            label="Batch"
            variant="standard"
            onChange={handleBatch}
          >
            {
              batches.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    <em>{item}</em>
                  </MenuItem>
                )
              })
            }

          </Select>

        </Grid>
        <Grid item xs={3} md={4} >
          <InputLabel id="Degree">Degree</InputLabel>
          <Select
            labelId="Degree"
            id="Degree"
            value={degree}
            size='medium'
            fullWidth
            label="Degree"
            variant="standard"
            onChange={handleDegree}
          >
            <MenuItem value="BCS">
              <em>BCS</em>
            </MenuItem>
            <MenuItem value="BSE">
              <em>BSE</em>
            </MenuItem>
            <MenuItem value="BBA">
              <em>BBA</em>
            </MenuItem>
            <MenuItem value="BAF">
              <em>BAF</em>
            </MenuItem>
            <MenuItem value="BEE">
              <em>BAF</em>
            </MenuItem>
          </Select>

        </Grid>
        <Grid item xs={3} md={4} >
          <TextField
            required
            id="Rollno"
            label="Roll no"
            fullWidth
            type='number'
            value={rollno}
            onChange={handleRollno}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="passOutYear">Graduation Year</InputLabel>
          <Select
            labelId="passOutYear"
            id="passOutYear"
            value={passOutYear}
            size='medium'
            fullWidth
            label="passOutYear"
            variant="standard"
            onChange={handlePassOutYear}
          >
            {
              years.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    <em>{item}</em>
                  </MenuItem>
                )
              })
            }
          </Select>

        </Grid>
      </Grid>
      <div className='mt-2'>
        <Typography variant="h6" gutterBottom>
          Account Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              value={email}
              onChange={handleEmail}
              error={!validator.isEmail(email)}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePassword}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          </Grid>
          <Grid item xs={12}>
          <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            error={password!==confirmPassword}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
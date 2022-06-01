import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MuiPhoneNumber from 'material-ui-phone-number';
import InputMask from 'react-input-mask';
import { Country, State, City } from 'country-state-city';



export default function PersonalInfo({ firstname, lastname, cnic, gender, contact, address, country, state, city,date, handlefirstName, handlelastName, handleCnic, handleGender, handleCity, handleCountry, handleState, handleAddress, handleContact,handleDate }) {

  const [countryCode, setCountryCode] = React.useState('');     
  const [stateCode, setStateCode] = React.useState('');
  const Countries = Country.getAllCountries();
  const States = State.getStatesOfCountry(countryCode)
  const Cities = City.getCitiesOfState(countryCode, stateCode)


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            value={firstname}
            onChange={handlefirstName}
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            value={lastname}
            onChange={handlelastName}
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <InputMask mask="99999-9999999-9" value={cnic} onChange={handleCnic}>
            {() => <TextField
              required
              id="CNIC"
              name="CNIC"
              label="CNIC"
              fullWidth

              variant="standard"

            />}
          </InputMask>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="demo-simple-select-standard-label">Date of birth</InputLabel>

          <input type='date' value={date} onChange={handleDate} />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="demo-simple-select-standard-label">Contact number</InputLabel>
          <MuiPhoneNumber defaultCountry={'pk'} countryCodeEditable={false} value={contact} onChange={handleContact} />
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="Gender">Gender</InputLabel>
          <Select
            labelId="Gender"
            id="Gender"
            value={gender}
            fullWidth
            label="Gender"
            variant="standard"
            onChange={handleGender}
          >

            <MenuItem value="Male">
              <em>Male</em>
            </MenuItem>
            <MenuItem value="Female">
              <em>Female</em>
            </MenuItem>
            <MenuItem value="Other">
              <em>Other</em>
            </MenuItem>

          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line"
            variant="standard"
            value={address}
            onChange={handleAddress}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
          <Select
            labelId="Country"
            id="Country"
            value={country}
            onChange={handleCountry}
            variant="standard"
            fullWidth
            label="Country"
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            {Countries.map((item) => {
              return (
                <MenuItem key={item.name} value={item.name} onClick={() => {
                  setCountryCode(item.isoCode)
                }}>
                  <em>{item.name}</em>
                </MenuItem>
              )
            })}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="State">State</InputLabel>
          <Select
            labelId="State"
            id="State"
            value={state}
            onChange={handleState}
            label="State"
            variant="standard"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {States.map((item) => {
              return (
                <MenuItem key={item.name} value={item.name} onClick={() => {
                  setStateCode(item.isoCode)
                }}>
                  <em>{item.name}</em>
                </MenuItem>
              )
            })}

          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel id="City">City</InputLabel>
          <Select
            labelId="City"
            id="City"
            value={city}
            onChange={handleCity}
            label="City"
            variant="standard"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Cities.map((item) => {
              return (
                <MenuItem key={item.name} value={item.name}>
                  <em>{item.name}</em>
                </MenuItem>
              )
            })}
          </Select>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
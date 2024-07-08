import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack} from "@mui/material";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";

function AddFestival({fetchFestivals}){
  const[open,setOpen]=useState(false)
  const[festival,setFestival]=useState({
    fesName:"",
    country:"",
    region:"",
    detail:"",
    startDate:"",
    endDate:""
  })

  const handleClickOpen=()=>{
    setOpen(true)
  }
  const handleClickClose=()=>{
    setOpen(false)
    setFestival({
      fesName:"",
      country:"",
      region:"",
      detail:"",
      startDate:"",
      endDate:""
    })
  }
  const handleChange=(event)=>{
    setFestival({...festival,[event.target.name]:event.target.value})
  }

  const addFestival=(festival)=>{
    fetch(
      "http://localhost:8080/api/festivals",
      {
        method:"POST",
        headers:{"detail-Type":"application/json"},
        body:JSON.stringify(festival)
      }
    )
    .then(
      response=>{
        if(response.ok){
          fetchFestivals();
        }
      }
    )
  }

  const handleSave=()=>{
    addFestival(festival);
    handleClickClose();
    console.log(festival)
  }

  const type=[
    {value:"서울", label:"서울"},
    {value:"인천", label:"인천"},
    {value:"대전", label:"대전"},
    {value:"대구", label:"대구"},
    {value:"광주", label:"광주"},
    {value:"부산", label:"부산"},
    {value:"울산", label:"울산"},
    {value:"세종시", label:"세종시"},
    {value:"경기도", label:"경기도"},
    {value:"강원도", label:"강원도"},
    {value:"충청북도", label:"충청북도"},
    {value:"충청남도", label:"충청남도"},
    {value:"경상북도", label:"경상북도"},
    {value:"경상남도", label:"경상남도"},
    {value:"전북특별자치도", label:"전북특별자치도"},
    {value:"전라남도", label:"전라남도"},
    {value:"제주도", label:"제주도"}
  ]

  return(
    <div>
      <Button variant="contained" onClick={handleClickOpen}>Add</Button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>New Festival</DialogTitle>
        <DialogContent>
          <Stack spacing={1} mt={1}>
            <TextField label="FesName" name="fesName" variant="standard" value={festival.fesName} onChange={handleChange} />
            <TextField label="Country" name="country" variant="standard" value={festival.country} onChange={handleChange} />
            <TextField select label="Region" name="region" variant="standard" value={festival.region} onChange={handleChange}>
              {type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} 
            </TextField>
            <TextField label="Detail" name="detail" variant="standard" value={festival.detail} onChange={handleChange} />
            <h4>Start Date</h4>
            <input type="date" name="startDate" value={festival.startDate} onChange={handleChange}></input>
            <h4>End Date</h4>
            <input type="date" name="endDate" value={festival.endDate} onChange={handleChange}></input>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancle</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddFestival;
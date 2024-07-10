import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, DialogContentText, Typography, Stack} from "@mui/material";
import { useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function DetailFes({data}){
    const[open,setOpen]=useState(false)
    const[festival,setFes]=useState({
      fesName:"",
      address:"",
      startDate:"",
      endDate:"",
      imageUrl:""
    }) 

    const handleClickOpen=()=>{
        setOpen(true)
        setFes(
          {
            fesName:data.row.fesName,
            address:data.row.address,
            startDate:data.row.startDate,
            endDate:data.row.endDate,
            imageUrl:data.row.imageUrl,
          }
      )
    }
    const handleClickClose=()=>{
        setOpen(false)
    }


    return(
        <div>
            <IconButton onClick={handleClickOpen}>
              <SearchRoundedIcon color="info"></SearchRoundedIcon>
            </IconButton>
            <Dialog open={open} onClose={handleClickClose} style={{textAlign:"center"}}>
              <DialogTitle>{festival.fesName}</DialogTitle>
              <DialogContent>
                <Stack>
                  <ul style={{listStyle:"none"}}>
                    <li><img src={festival.imageUrl} style={{width:400, marginLeft:"auto", marginRight:"auto"}} /></li>
                    <li></li>
                    <li>주소 : {festival.address}</li>
                    <li>시작일 : {festival.startDate}</li>
                    <li>종료일 : {festival.endDate}</li>
                  </ul>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickClose}>Cancle</Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

export default DetailFes
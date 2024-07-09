import {useState, useEffect} from "react"
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid"
import { Snackbar, IconButton } from "@mui/material"
import CustomToolbar from "./CustomToolbar"
import AddFestival from "./AddFes"

function FestivalList(){

  const [festivals,setFestivals] = useState([])
  const [open,setOpen] = useState(false)

  const fetchFestivals=()=>{
    fetch("http://localhost:8080/api/festivals")
    .then(res=>res.json())
    .then(data=>
      setFestivals(data._embedded.festivals)
    )
    .catch(err=>console.log(err))
  }

  useEffect(
    ()=>
    {
      fetchFestivals()
    },
    []
    )

  const columns=[
    {headerName:'Image',width:150},
    {field:'fesName',headerName:'FesName',width:150},
    {field:'region',headerName:'Region',width:100},
    {field:'startDate',headerName:'StartDate',width:150},
    {field:'endDate',headerName:'EndDate',width:150},
    {field:'detail',headerName:'Detail',width:500},
    {
      field:"delete",
      headerName:'',
      sortable:false,
      filterable:false,
      renderCell:(row)=>
        <IconButton onClick={()=>onDelClick(row.id)}>
          <GridDeleteIcon color="warning" />
        </IconButton>
    }
  ]

    const onDelClick=(url)=>{
      if(window.confirm("Are you sure to delete?")){
        fetch(url,{method:"delete"})
          .then((response)=>{
            if(response.ok){
              fetchFestivals()
              setOpen(true)
            }else{
              alert("Something went wrong!")
            }
          }
        )    
        .catch(err=>console.error(err))
      }
    }
  
  
    return (
      <div>
        <DataGrid
          columns={columns}
          rows={festivals}
          getRowId={row=>row._links.self.href}
          disableRowSelectionOnClick={true}
          components={{toolbar:CustomToolbar}}
        />            
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={()=>setOpen(false)}
          message="festival deleted"
        />
        <AddFestival fetchFestivals={fetchFestivals}/>
      </div>
    )
  }


export default FestivalList;
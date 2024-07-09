// components/customtoolbar.js
import { GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid"


function CustomToolbar(){
  return(
    <GridToolbarContainer className="gridClasses.ToolbarContainer">
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default CustomToolbar
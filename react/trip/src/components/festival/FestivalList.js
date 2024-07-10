import { useState, useEffect } from "react";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import CustomToolbar from "./CustomToolbar";
import DetailFes from "./DetailFes";

function FestivalList() {
  const [festivals, setFestivals] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchFestivals = () => {
    fetch("http://localhost:8080/api/festivals")
      .then((res) => res.json())
      .then((data) => setFestivals(data._embedded.festivals))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const columns = [
    { field: "fesName", headerName: "축제이름", width: 260 },
    { field: "country", headerName: "국가", width: 120 },
    { field: "region", headerName: "지역", width: 100 },
    { field: "startDate", headerName: "시작날짜", width: 150 },
    { field: "endDate", headerName: "종료날짜", width: 150 },
    {
      field: "detailFes",
      headerName: "상세보기",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <DetailFes data={row} fetchFestivals={fetchFestivals} />
      ),
    },
    {
      field: "delete",
      headerName: "삭제",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (row) => (
        <IconButton onClick={() => onDelClick(row.id)}>
          <GridDeleteIcon color="warning" />
        </IconButton>
      ),
    },
  ];

  const onDelClick = (url) => {
    if (window.confirm("정말 지우시겠습니까?")) {
      fetch(url, { method: "delete" })
        .then((response) => {
          if (response.ok) {
            fetchFestivals();
            setOpen(true);
            window.location.reload("/festival");
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1>축제 정보</h1>
      <DataGrid
        style={{ width: 1000, margin: "auto", backgroundColor: "#FFF7F7" }}
        columns={columns}
        rows={festivals}
        getRowId={(row) => row._links.self.href}
        disableRowSelectionOnClick={true}
        components={{ toolbar: CustomToolbar }}
      />
    </div>
  );
}

export default FestivalList;

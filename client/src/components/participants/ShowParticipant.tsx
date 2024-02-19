import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

function ShowParticipant({ particpants }) {
  const rows: GridRowsProp = particpants;
  const numbersArray = Array.from(
    { length: particpants.length },
    (_, index) => index + 1
  );
  const columns: GridColDef[] = [
    { field: "Booking ID", headerName: "ID", width: 90 },
    { field: "Name", headerName: "Name", width: 100 },
    { field: "Email", headerName: "Email", width: 100 },
    { field: "Phone", headerName: "Phone", width: 100 },
    { field: "Gender", headerName: "Gender", width: 100 },
    { field: "Category", headerName: "Category", width: 100 },
    { field: "T-shirt Size", headerName: "T-shirt Size", width: 100 },
    { field: "Organization", headerName: "Organization", width: 100 },
  ];
  return (
    <div className="h-full">
      {particpants.length == 0 ? (
        <div>Not Participant Data Uploaded</div>
      ) : (
        <div className="h-[400px]">
          <DataGrid
            rowHeight={25}
            getRowId={(row) => row["Booking ID"]}
            rows={rows}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
}

export default ShowParticipant;

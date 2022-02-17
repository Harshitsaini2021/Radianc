// import * as React from 'react';
// import { useRef, useState, useEffect, useCallback } from 'react';
// import '@progress/kendo-theme-material/dist/all.css';
// import './style.css';
// import { JsonToTable } from "react-json-to-table";

// import {
//   Grid,
//   GridColumn as Column,
//   GridToolbar
// } from '@progress/kendo-react-grid';
// import { GridPDFExport } from '@progress/kendo-react-pdf';
// import { Button } from '@progress/kendo-react-buttons';
// import { Checkbox } from '@progress/kendo-react-inputs';
// // import { gridSampleProducts } from './grid-sample-products.jsx';
// import { process } from '@progress/kendo-data-query';

// function PDF(props) {

//   const [data, setData] = useState();
//   const [take, setTake] = useState(5);
//   const [skip, setSkip] = useState(0);
//   const [allPageCheck, setAllPageCheck] = useState(false);
//   const [isPdfExporting, setIsPdfExporting] = useState(false);
//   const pdfExportRef = useRef(null);

//   const dataState = {
//     take,
//     skip
//   };

  // let data = [{"physics":{"score":54,"complete":82},"chemistry":{"score":82,"complete":82},"maths":{"score":82,"complete":82},"date":"1202","mydate":"2/12/2022"},{"physics":{"score":54,"complete":82},"chemistry":{"score":82,"complete":85},"maths":{"score":82,"complete":82},"date":"1202","mydate":"2/12/2022"},{"physics":{"score":60,"complete":82},"chemistry":{"score":73,"complete":83},"maths":{"score":85,"complete":99},"date":"1202","mydate":"2/12/2022"}];

  // let data = { ...props.data} 
  // console.log(data);
//   return (
//     <>
//        {/* <Grid
//       // style={{
//       //   height: "420px",
//       // }}
//       // resizable={true}
//       // reorderable={true}
//       // data={data}
//     >
//       {/* <Column field="date" title="date" resizable={false} />
//       <Column title="Physics">
//         <Column field="physics.marks" title="Marks" />
//         <Column field="physics.complete" title="Complete" />
//       </Column> */}
      
//     {/* </Grid> */} 

//     {/* <JsonToTable json = {data} /> */}
//     </>
//   );
// }

// export default PDF;


import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'date', label: 'Date', minWidth: 80 },
  { id: 'marks', subject:"physics", label: 'Marks', minWidth: 80 },
  { id: 'complete', subject:"physics", label: 'Complete', minWidth: 80 },
  { id: 'marks', subject:"chemistry", label: 'Marks', minWidth: 80 },
  { id: 'complete', subject:"chemistry", label: 'Complete', minWidth: 80 },
  { id: 'marks', subject:"maths", label: 'Marks', minWidth: 80 },
  { id: 'complete', subject:"maths", label: 'Complete', minWidth: 80 },
  { id: 'marks', subject:"total", label: 'Marks', minWidth: 80 },
  { id: 'complete', subject:"total", label: 'Complete', minWidth: 80 }
  
];

export default function PDF(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows =[];
  for (const i in props.data.physics.marks) {
       rows.push({
        physics:{
          marks:props.data.physics.marks[i],
          complete:props.data.physics.complete[i]
        },
        chemistry:{
          marks:props.data.chemistry.marks[i],
          complete:props.data.chemistry.complete[i]
        },
        maths:{
          marks:props.data.maths.marks[i],
          complete:props.data.maths.complete[i]
        },
        total:{
          marks:props.data.totalMarks[i]*3,
          complete:props.data.totalComplete[i]*3
        },
        date:props.data.date[i]
      });   
    }

    console.log(rows);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}>
                
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Physics
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Chemistry
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Maths
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Total
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      let id = ()=> column.id==="date"?row[column.id]:row[column.subject][column.id]
                      
                      const value = id();
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

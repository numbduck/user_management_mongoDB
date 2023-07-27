

// MUI components
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';

// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, getUser } from '../redux/reducers';
import { useEffect } from 'react';
import axios from 'axios';

    
 const StyledTableCell = styled(TableCell)(() => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'black',
        color: 'white',
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));



export default function Page1() {

   


  const users = useSelector(state => state.users.users)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
      axios.delete('http://localhost:3001/deleteuser/'+id)
      .then(res => {
          dispatch(deleteUser({id}))
      }).catch(err => console.log(err))
  }
    

  

      return (<Box>
        <Link to='/create'><Button variant="contained" startIcon={<AddCircleIcon />} sx={{m:2}} size="large" >Add New User</Button></Link>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {/* <StyledTableCell>Id</StyledTableCell> */}
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
               
                <StyledTableCell align="right"></StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody >
              {users.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  
                  <StyledTableCell align="right">
                    <Link to={`/view/${row.id}`}><Button variant="outlined" startIcon={<OpenInNewIcon />} sx={{mr:2}}>View</Button></Link>
                    <Link to={`/edit/${row.id}`}><Button variant="outlined" endIcon={<EditIcon />} 
                    sx={{mr:2}}>Edit</Button></Link>

                    <Button variant="outlined " startIcon={<DeleteIcon />} color="error" onClick={()=>handleDelete(row.id)}>Delete</Button>
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer></Box>
      );
    }



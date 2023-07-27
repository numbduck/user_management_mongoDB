import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Page3 = () => {

const {id} = useParams();
const users = useSelector((state)=> state.users.users)
const existingUser = users.find((i) => i.id==id)



  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{backgroundColor:"grey"}}>
          
          <TableCell><b>Name</b></TableCell>
          <TableCell><b>Email</b></TableCell>
          <TableCell><b>Phone</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{}}>
        <TableCell>{existingUser.name}</TableCell>
        <TableCell>{existingUser.email}</TableCell>
        <TableCell>{existingUser.phone}</TableCell>
        
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Page3
import { Box, Button, TextField } from '@mui/material'
// import { Axios } from 'axios';
import { useState } from 'react';
import { addUser } from '../redux/reducers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const Page2 = () => {
  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
  const [phone, setPhone]= useState("")
  const [id, setID]= useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate()

  // function handleClick(e){
  //     e.preventDefault();
  //     dispatch(addUser({id: Math.floor(Math.random()*100), name, email, phone}));
  //     navigate("/")
      
  // }
  const handleClick = (e) => {
    e.preventDefault()
    axios.post('https://user-management-mongo-db.vercel.app/create', {id, name, email, phone})
    .then(res => {
        dispatch(addUser(res.data))
        navigate('/')
    })
    .catch(err => console.log(err))
}

  return (
    <Box component="form" sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}>
      <TextField id="outlined-basic" label="ID" type='number' variant="outlined" color="secondary"  inputProps={{ style: { color: "white" } }} focused onChange={(event)=>setID(event.target.value)}/>
      <TextField id="outlined-basic" label="Name" variant="outlined" color="secondary"  inputProps={{ style: { color: "white" } }} focused onChange={(event)=>setName(event.target.value)}/>
      <TextField id="filled-basic" label="Email" variant="outlined" color="secondary" inputProps={{ style: { color: "white" } }} focused onChange={(event)=>setEmail(event.target.value)}/>
      <TextField id="standard-basic" label="Phone" variant="outlined" color="secondary" inputProps={{ style: { color: "white" } }} focused onChange={(event)=>setPhone(event.target.value)}/>
      <Button type='submit' variant='contained' size="large" onClick={handleClick} >Create User</Button>
    </Box>
  )
}

export default Page2
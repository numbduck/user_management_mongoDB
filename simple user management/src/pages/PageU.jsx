import { Box, Button, TextField } from '@mui/material'
// import { Axios } from 'axios';
import { useEffect, useState } from 'react';
import { updateUser } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';




const PageU = () => {

const {id} = useParams();
const users = useSelector(state => state.users.users)

const existingUser = users.find((i) => i.id==id)
console.log(existingUser)

const [name, setName]= useState(existingUser.name)
const [email, setEmail]= useState(existingUser.email)
const [phone, setPhone]= useState(existingUser.phone)



// useEffect(()=> {
//   const user = users.find(u => u.id == id)
//   setName(user.name)
//   setEmail(user.email)
//   setPhone(user.phone)
// }, [])

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3001/update/'+id, {name, email, phone})
    .then(res => {
        dispatch(updateUser({id, name, email, phone}))
        navigate('/')
    })
    .catch(err => console.log(err))
}

  return (
    <Box component="form" sx={{
        '& > :not(style)': { m: 1, width: '25ch' }
      }}>
      <TextField id="outlined-basic" label="Name" variant="outlined" color="secondary"  inputProps={{ style: { color: "white" } }} focused onChange={(event)=>setName(event.target.value)} value={name}/>
      <TextField id="filled-basic" label="Email" variant="outlined" color="secondary" inputProps={{ style: { color: "white" } }} focused onChange={(event)=>setEmail(event.target.value)} value={email}/>
      <TextField id="standard-basic" label="Phone" variant="outlined" color="secondary" inputProps={{ style: { color: "white" } }} focused onChange={(event)=>setPhone(event.target.value)} value={phone}/>
      <Button type='submit' variant='contained' size="large" onClick={handleUpdate} >Update User</Button>
    </Box>
  )
}

export default PageU;
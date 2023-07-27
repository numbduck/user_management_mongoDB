import { createSlice } from "@reduxjs/toolkit";
// import { useEffect } from "react";
// import {usersList} from '../pages/rows.jsx'

// const [userList, setUserList] = useState([]);

// useEffect(() => {
//     Axios.get("http://localhost:3001/users").then((response) => {
//       setUserList(response.data);
//     });
//   },[])

const userSlice = createSlice({
    name : "users", 
    initialState : {
        users :[]
    },
    reducers:{
        getUser : (state, action) => {
            state.users = action.payload.map(user => {
                return {id: user.id, name: user.name, email: user.email, phone: user.phone}
            })
        },
        addUser : (state, action) => {
            console.log(action)
            console.log(state)
            state.users.push(action.payload)
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(item => item.id == action.payload.id)
            state.users[index] = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone,
            }
        },
        viewUser:(state, action)=>{
            const {id, name, email, phone} = action.payload;
            const updatedUser = state.find((i)=>i.id==id)

            if(updatedUser){
                updatedUser.name = name;
                updatedUser.email = email;
                updatedUser.phone = phone;
            }

        },
        deleteUser: (state, action) => {
            const id = action.payload.id;
            state.users = state.users.filter(u => u.id != id)
        }

        
    }
})
export const {getUser , addUser, updateUser, deleteUser, viewUser} = userSlice.actions;
export default userSlice.reducer;

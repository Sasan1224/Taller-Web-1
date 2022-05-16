import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";

async function createUser(auth, { email, pasword }){
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, pasword);
        return user
    } catch (e) {
        console.log(e.code)
    alert("algo esta mal revisa otra vez")
    
    }
    
    }
    
    async function login(auth, email,password){
        try {
            const { user } = await signInWithEmailAndPassword(auth,email,password);
return user

        } catch (e) {
            console.log(e.code)
                alert("algo esta mal revisa otra vez")
    
        }
    }

    async function createUserInfo(db,userID,userInfo){
        try {
            await setDoc(doc(db,"Users",userID),userInfo,{

            })
        } catch (e) {
            console.log(e.code)
        }

    }

    export{createUser,login,createUserInfo}
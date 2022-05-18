
import {
    createUser,
    login,
    createUserInfo
} from "../funcion/auth";

import {db,auth,app} from "../funcion/app"



const createUserB = document.getElementById("CreateUserForm");
const loginUserB = document.getElementById("loguinForm");

createUserB.addEventListener("submit", async e => {
    e.preventDefault();
    const name = CreateUserForm.name.value
    const lastname = CreateUserForm.lastName.value
    const cel = CreateUserForm.Cel.value
    const email = CreateUserForm.email.value
    const pasword = CreateUserForm.password.value


    const newUser = {
        name,
        lastname,
        cel,
        email,
        pasword,
        admin: false
    }

    const userCreated = await createUser(auth, newUser);
    await createUserInfo(db, userCreated.uid, newUser);
    console.log(userCreated)
})

loginUserB.addEventListener("submit", e => {
    e.preventDefault();

    const email = loginUserB.email.value;
    const password = loginUserB.password.value;

    login(auth, email, password);
});
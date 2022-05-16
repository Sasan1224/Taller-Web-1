 import {collection, doc, getDocs, } from "firebase/firestore"
 
 async function getProducts(db){
    const collectionRef = collection(db,"product")
    const { docs } = await getDocs(collectionRef)
const  firebaseProducs  = docs.map((doc)=>{
    return{
        ...doc.data(),
    }
});

}

export{getProducts}
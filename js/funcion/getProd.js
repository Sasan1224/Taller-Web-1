 import {
     collection,
     doc,
     getDocs,getDoc
 } from "firebase/firestore"
 import {
    db,
    auth
} from "../funcion/app";

async function getProducts(db) {
    const collectionRef = collection(db, "product");
    try {
        const { docs } =  await getDocs(collectionRef);
        const products = docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        return products;
    } catch(e) {
        console.log(e);
    }
}

 async function tomaProduct(id) {
     try {
         const docRef = doc(db, "product", id);
         const docSnap = await getDoc(docRef);
         const data = docSnap.data();
         return data
     } catch (e) {
         console.log(e)
     }

}

 export {
     getProducts, tomaProduct
 }
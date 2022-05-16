// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";

import {
    getFirestore,
} from "firebase/firestore"
import firebaseConfig from "../funcion/firebase";
import {
    addProduct,
    uploadImages
} from "../utilies/newProduc";
import {
    getStorage
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)

const creteProducForm = document.getElementById("forma")

creteProducForm.addEventListener("submit", async e => {
    e.preventDefault();


    const name = creteProducForm.name.value
    const periodic_table_type = creteProducForm.periodic_table_type.value
    const price = creteProducForm.price.value
    const unit_presenation = creteProducForm.unit_presenation.value
    const license_needed = creteProducForm.license_needed.value
    const disponibility = creteProducForm.disponibility.value
    const cuantity = creteProducForm.cuantity.value
    const cdu = creteProducForm.cdu.value
    const imgs = creteProducForm.imgs.files
    const dengerous = creteProducForm.dengerous.value
    const description = creteProducForm.description.value
    let galleria = [];
    
    if (imgs.length) {
        const uploadedImages = await uploadImages(storage, [...imgs])

        galleria = await Promise.all ( uploadedImages);
    }

    const newproduct = {
        name,
        periodic_table_type,
        price,
        unit_presenation,
        license_needed,
        disponibility,
        cuantity,
        cdu,
        images:galleria,
        dengerous,
        description
    }


    // console.log(newproduct)

    await addProduct(db, newproduct)
})
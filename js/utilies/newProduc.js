import {
    async
} from "@firebase/util";
import {
    addDoc,
    collection
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL,fullPath
} from "firebase/storage";

async function addProduct(db, product) {
    try {
        await addDoc(collection(db, "product"), product);

    } catch (e) {
        console.log(e)
    }
}

async function cargaIMGreference(storage, Image) {
    const storageref = ref(storage, `product/images/${Image.name}`)
    return await uploadBytes(storageref, Image)
}

async function uploadImages(storage, imgs = []) {

        const uploadImages = imgs.map(async Image => {
            const imagereference = await cargaIMGreference(storage, Image)

            return getDownloadURL(ref(storage,imagereference.ref.fullPath));
        })

        return uploadImages


}

export {
    addProduct,
    uploadImages
}
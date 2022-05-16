import {
    app,
    auth,
    db,
    storage
} from "../funcion/app"
import {
    getProducts
} from "../funcion/getProd";

const productSection = document.getElementById("products")

async function loadProd() {
  const firenase =  await getProducts(db)
}
loadProd()
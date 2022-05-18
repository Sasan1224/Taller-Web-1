import {
    db,
    auth
} from "../funcion/app";
import {
    doc,
    getDoc
} from "firebase/firestore";
import {
    onAuthStateChanged
} from "firebase/auth";
import {
    getProduct,
    tomaProduct
} from "../funcion/getProd";
import {
    getFirebaseCart,
    createFirebaseCart
} from "../utilies/cart";
import {
    getMyLocalCart,
    addProductToCart
} from "../funcion/index";
import {
    async
} from "@firebase/util";

const secction = document.getElementById("product")

function getParam(param) {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function loadproduct() {
    const productId = await getParam("id")
    const data = await tomaProduct(productId);

    const produtto = {
        ...data,
        id: productId
    }
    console.log(produtto)
    renderProduct(produtto)
}

function renderProduct(prod) {
    const coverImage = prod.images ? prod.images[0] : "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png";
    let permiso = "";
    if (prod.license_needed === "false") {
        permiso = "No"
    }
    if (prod.license_needed === "true") {
        permiso = "Si"
    }
    let Peligro = "";
    if (prod.dengerous === "true") {
        Peligro = "Si"
    }
    if (prod.dengerous === "false") {
        Peligro = "No"
    }


    secction.innerHTML = `
<div class="product__main flex">
<div class="product__main__title flex">
    <h1>${prod.name}</h1>
</div>
<div class="product__main__content flex">
        <img src="${coverImage}" alt=""class="product__main__content__img">
    <div class="product__main__content__descrip flex">
        <div class="product__main__content__descrip__content flex">
            <div class="product__main__content__descrip__content__1 flex">
                <p class="product__main__content__descrip__content__1__item flex"> <h2>descripcion</h2> ${prod.description}</p>
                <p class="product__main__content__descrip__content__1__item flex"> <h2>familia</h2> ${prod.periodic_table_type}</p>
                <p class="product__main__content__descrip__content__1__item flex">cantidad disponible = ${prod.cuantity}</p>
                <p class="product__main__content__descrip__content__1__item flex">permiso?: ${permiso}</p>
                <p class="product__main__content__descrip__content__1__item flex">es peligroso?: ${Peligro}</p>
            </div>
            <div class="product__main__content__descrip__content__2 flex">
                <p class="product__main__content__descrip__content__2__item flex"><h2>Precio /${prod.unit_presenation}</h2></p>
                <p class="product__main__content__descrip__content__2__item flex">${prod.price}</p>
                <button class="product__main__content__descrip__content__2__item__b flex">agregar al carro</button>
                <button class="product__main__content__descrip__content__2__item__b flex">comprar</button>
                <div class="product__main__content__descrip__content__2__cant flex">
                    <p >CANTIDAD</p>
                    <input type="number" name="" class="7">
                </div>

            </div>
        </div>
    </div>
</div>
</div>
`
    const productCartButton = document.querySelector(".pproduct__main__content__descrip__content__2__item__buct__cart");
    productCartButton.addEventListener("click", e => {
        console.log("anilllos")
        /*       
        cart.push(product);
        
      if (userLogged) {

        addProductToCart(cart);
            createFirebaseCart(db, userLogged.uid, cart);
            productCartButton.setAttribute("disabled", true);
            productCartButton.innerText = "Producto añadido";
        }*/
    });

}



loadproduct("id")
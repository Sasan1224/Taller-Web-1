import {
    db,
    auth
} from "../funcion/app";

import {
    onAuthStateChanged
} from "firebase/auth";
import {
    tomaProduct
} from "../funcion/getProd";
import {
    getFirebaseCart,
    createFirebaseCart
} from "../utilies/cart";
import {
    getMyLocalCart,
    addProductToCart,currencyFormat
} from "../funcion/index";


const secction = document.getElementById("product")
const userLogged = undefined;
let cart = [];

loadproduct("id")

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
    const isProductAddedToCart = cart.some((productCart) => productCart.id === prod.id);

    const productButtonCart = isProductAddedToCart ?
    '<  <button class="product__main__content__descrip__content__2__item__b flex" disable>agregar al carro</button>' :
    '  <button class="product__main__content__descrip__content__2__item__b flex">agregar al carro</button>';

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
                <p class="product__main__content__descrip__content__2__item flex">${currencyFormat( prod.price)}</p>
              
                ${productButtonCart}
                
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

    const PCB = document.querySelector(".product__main__content__descrip__content__2__item__b");
    PCB.addEventListener("click", async (e) => {
        console.log("anilllos")
        cart.push(prod)
        addProductToCart(cart)

        if (userLogged) {
            createFirebaseCart(db, userLogged.uid, cart);
        }
        PCB.setAttribute("disabled", true);
        PCB.innerText = "Producto añadido";

    });

}
onAuthStateChanged(auth, async (user) => {
    if (user) {

      userLogged = user;
      console.log(user)
      cart = await getFirebaseCart(db, userLogged.uid);

      // ...
    } else {
        cart = getMyLocalCart();

    }

    loadproduct()

  });
import { auth, db } from "../funcion/app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseCart, createFirebaseCart } from "../funcion/getProd";
import { getMyLocalCart, currencyFormat,addProductToCart } from "../funcion/index";

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");
let cart = [];

function loadCart(cart) {
    let total = 0;
    cart.forEach(product => {
        renderProduct(product);
        total += parseInt(product.price);
    });

    totalSection.innerText = currencyFormat(total);
};

async function removeProduct(productId) {
    const newCart = cart.filter(product => product.id !== productId);
    
    cart = newCart;

    if (userLogged) {
        await createFirebaseCart(db, userLogged.uid, newCart);
    }

    addProductToCart(newCart);

    cartSection.innerHTML = "";

    loadCart(newCart);

}


function renderProduct(product) {
    const productCart = document.createElement("li");
    productCart.className = "product";
    productCart.innerHTML = `
    <img src="${product.images[0]}" class="product__image">
    <h2 class="product__name">${product.name}</h2>
    <h3 class="product__price">${currencyFormat(product.price)}</h3>
    <button class="product__delete">Eliminar producto</button>
    `;

    cartSection.appendChild(productCart);

    productCart.addEventListener("click", e => {
         if (e.target.tagName === "BUTTON") {
             console.log("remove it!");
             removeProduct(product.id);
         }
    })
};

onAuthStateChanged(auth, async (user) => {
    if (user) {

      userLogged = user;
      cart = await getFirebaseCart(db, userLogged.uid);
    } else {
        cart = getMyLocalCart();

    }

    loadCart(cart);

  });
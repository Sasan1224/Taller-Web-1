import {
  db,
  auth
} from "../funcion/app"
import {
  getProducts
} from "../funcion/getProd";
import {
  createFirebaseCart,
  getFirebaseCart
} from "./cart";
import {
  onAuthStateChanged

} from "firebase/auth";




const productSection = document.getElementById("products")
const Cfiltro = document.getElementById("cat")
const orden = document.getElementById("orden")

let userLogged = undefined;
let producktos = [];
let cart = [];

async function loadProd() {
  cart = GETMYCART()
  const firebaseProducts = await getProducts(db)
  productSection.innerHTML = ""
  firebaseProducts.forEach(product => {
    renderProduct(product)
    console.log(product.id)
  })
  producktos = firebaseProducts;
}

function renderProduct(item) {
  const product = document.createElement("a");
  product.className = "produck";

  product.setAttribute("href", `./producto.html?id=${item.id}`);

  const coverImage = item.images ? item.images[0] : "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png";

  const isProductAddedToCart = cart.some((productCart) => productCart.id === item.id);

  const productButtonCart = isProductAddedToCart ?
    '<button class="produck__cart" disabled>Producto añadido</button>' :
    '<button class="produck__cart">Añadir al carrito</button>';

  product.innerHTML = `
  <img src="${coverImage}" alt="" class="produck__imag flex">
  <div class="produck__info">
      <p class="produck__category">${item.periodic_table_type}</p> 
      <h2 class="produck__name">${item.name}</h2>
      <h3 class="produck__price">${item.price}</h3>
      ${productButtonCart}
  </div>
  `;

  productSection.appendChild(product);

  const productCartButton = product.querySelector(".produck__cart");

  productCartButton.addEventListener("click", async (e) => {
    e.preventDefault();
    addProductToCart()
    cart.push(item);
    if (userLogged) {
      await createFirebaseCart(db, userLogged.uid, cart);
    }

    productCartButton.setAttribute("disabled", true);
    productCartButton.innerText = "Producto añadido";

  });
}

Cfiltro.addEventListener("change", e => {
  filter()
})
orden.addEventListener("change", e => {
  filter()
})

async function addProductToCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
  await createFirebaseCart();
}

function GETMYCART() {
  const mycart = localStorage.getItem("cart")
  return mycart ? JSON.parse(mycart) : [];
}

function filter() {
  const categoryF = Cfiltro.value
  const NewOrder = orden.value

  console.log(NewOrder)

  let productosFiltrados = []
  if (categoryF !== "") {
    productosFiltrados = producktos.filter((producktos) => producktos.unit_presenation === categoryF)

  } else {
    productosFiltrados = producktos
  }
  if (NewOrder === "asc") {
    productosFiltrados = productosFiltrados.sort((a, b) => a.price - b.price)
  }
  if (NewOrder === "desc") {
    productosFiltrados = productosFiltrados.sort((a, b) => b.price - a.price)
  }
  if (NewOrder === "") {
    productosFiltrados = producktos
  }

  productSection.innerHTML = ""
  productosFiltrados.forEach(product => {
    renderProduct(product)
  })
}
onAuthStateChanged(auth, async (user) => {
  if (user) {

    userLogged = user;
    cart = await getFirebaseCart(db, userLogged.uid);

  } else {
    cart = getMyLocalCart();

  }
  loadProd()
});
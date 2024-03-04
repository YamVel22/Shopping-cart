//get elements from DOM
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

//Declare products using an array
const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes",
    images: "images/vanilla cupcake.webp",
    price: "48.00",
    category: "Cupcake",
  },

  {
    id: 2,
    name: "French Macaron",
    images: "./images/French macaroons.jpg",
    price: "23.00",
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    images: "./images/pumkin cupckae.jpg",
    price: "15.00",
    category: "Cupcake",
  },

  {
    id: 4,
    name: "Chocolate balls",
    images: "./images/chocolate balls.jpg",
    price: "8.00",
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    images: "./images/chocolate pretzels.jpg",
    price: "30.00",
    category: "Pretzel",
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    images: "./images/strawberry icecream.jpg",
    price: "17.00",
    category: "Ice Cream",
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    images: "./images/chocolate macarons.jpg",
    price: "95.00",
    category: "Macaron",
  },
  {
    id: 8,
    name: "Strawberry Cheesecake",
    images: "./images/strawberry cheesecake.jpg",
    price: "44.00",
    category: "Tart",
  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    images: "./images/butter pecan ice cream.jpg",
    price: "22.00",
    category: "Ice Cream",
  },
  {
    id: 10,
    name: "Chocolate Croissant",
    images: "./images/chocolate croissant.jpg",
    price: "19.00",
    category: "Croissant",
  },
  {
    id: 11,
    name: "Mocha Macarons (5 Pack)",
    images: "./images/mocha macarons.jpg",
    price: "115.00",
    category: "Macaron",
  },
  {
    id: 12,
    name: "Fruit tarts (4 Pack)",
    images: "./images/fruit tarts.jpg",
    price: "60.00",
    category: "Tart",
  },
];

//display available products in HTML
products.forEach(({ id, name, images, price, category }) => {
  dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <img src ="${images}">
        <p class="dessert-price">R${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
});

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(id, products, quantity) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    for (let i = 0; i < quantity; i++) {
      this.items.push(product);
    }

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;
    });

    //display new products added by user
    const currentProductCount = totalCountPerProduct[id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`
    );

    if (currentProductCount > 1) {
      currentProductCountSpan.textContent = `${currentProductCount}x`;
    } else {
      productsContainer.innerHTML += `
      <div id=dessert${id} class="product">
        <p>
          <span class="product-count" id=product-count-for-id${id}></span>${name}
        </p>
        <p>${price}</p>
      </div>
    `;
    }
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTotal() {
    const subTotal = this.items.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
    this.total = subTotal;
    cartSubTotal.textContent = `R${subTotal.toFixed(2)}`;
    cartTotal.textContent = `R${this.total.toFixed(2)}`;
    return this.total;
  }
}

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
  });
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));

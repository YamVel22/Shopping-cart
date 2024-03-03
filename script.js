//get elements from DOM
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

//Declare products using an array
const products = [
  {
    id: 1,
    productName: "Vanilla Cupcakes (6 Pack)",
    images: "images/vanilla cupcake.webp",
    price: "12.99",
    category: "Cupcake",
  },

  {
    id: 2,
    productName: "French Macaron",
    images: "./images/French macaroons.jpg",
    price: "3.99",
    category: "Macaron",
  },
  {
    id: 3,
    productName: "Pumpkin Cupcake",
    images: ".images/pumkin cupckae.jpg",
    price: "3.99",
    category: "Cupcake",
  },

  {
    id: 4,
    productName: "Chocolate balls",
    images: ".images/chocolate balls.jpg",
    price: "5.99",
    category: "Cupcake",
  },
  {
    id: 5,
    productName: "Chocolate Pretzels (4 Pack)",
    images: "./images/chocolate pretzels.jpg",
    price: "10.99",
    category: "Pretzel",
  },
  {
    id: 6,
    productName: "Strawberry Ice Cream",
    images: ".images/strawberry icecream.jpg",
    price: "2.99",
    category: "Ice Cream",
  },
  {
    id: 7,
    productName: "Chocolate Macarons (4 Pack)",
    images: ".images/chocolate macarons.jpg",
    price: "9.99",
    category: "Macaron",
  },
  {
    id: 8,
    productName: "Strawberry Cheesecake",
    images: ".images/strawberry cheesecake.jpg",
    price: "4.99",
    category: "Tart",
  },
  {
    id: 9,
    productName: "Butter Pecan Ice Cream",
    images: ".images/butter pecan ice cream.jpg",
    price: "2.99",
    category: "Ice Cream",
  },
  {
    id: 10,
    productName: "Chocolate Croissant",
    images: ".images/chocolate croissant.jpg",
    price: "2.99",
    category: "Croissant",
  },
  {
    id: 11,
    productName: "Mocha Macarons (5 Pack)",
    images: ".images/mocha macarons.jpg",
    price: "11.99",
    category: "Macaron",
  },
  {
    id: 12,
    productName: "Fruit tarts (4 Pack)",
    images: ".images/fruit tarts.jpg",
    price: 12.99,
    category: "Tart",
  },
];

//display available products in HTML
products.forEach(({ id, productName, images, price, category }) => {
  dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${productName}</h2>
        <img src ="${value.images}">
        <p class="dessert-price">$${price}</p>
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

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { productName, price } = product;
    this.items.push(product);

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
          <span class="product-count" id=product-count-for-id${id}></span>${productName}
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
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
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

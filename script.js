//get elements from DOM
const cartContainer = document.querySelector("#cart-container");
const productsContainer = document.querySelector("#products-container");
const dessertCards = document.querySelector("#dessert-card-container");
const cartBtn = document.querySelector("#cart-btn");
const clearCartBtn = document.querySelector("#clear-cart-btn");
const totalNumberOfItems = document.querySelector("#total-items");
const cartSubTotal = document.querySelector("#subtotal");
const cartTotal = document.querySelector("#total");
const showHideCartSpan = document.querySelector("#show-hide-cart");
let isCartShowing = false;

//declare the products using an array
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
    name: "Mocha Macarons",
    images: "./images/mocha macarons.jpg",
    price: "115.00",
    category: "Macaron",
  },
  {
    id: 12,
    name: "Fruit tarts",
    images: "./images/fruit tarts.jpg",
    price: "60.00",
    category: "Tart",
  },
];

products.forEach(({ id, name, images, price, category }) => {
  const dessertCard = document.createElement("div");
  dessertCard.className = "dessert-card";
  dessertCard.innerHTML = `
    <h2>${name}</h2>
    <div class="product-image-container">
      <img src="${images}" class="product-image" alt="${name}">
    </div>
    <p class="dessert-price">R${price}</p>
    <p class="product-category">Category: ${category}</p>
    <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
  `;
  dessertCards.appendChild(dessertCard);
});

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }

  addItem(id, products, quantity = 1) {
    const product = products.find((item) => item.id === id);
    this.items.push({ ...product, quantity });

    const totalCount = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    totalNumberOfItems.textContent = totalCount;

    this.displayCartItem(product, totalCount);
    this.calculateTotal();
  }

  removeItem(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.calculateTotal();
      this.updateCartDisplay();
    }
  }

  //Display cart added by user
  displayCartItem(product, totalCount) {
    const existingItem = document.getElementById(`dessert${product.id}`);
    if (existingItem) {
      existingItem.querySelector(
        ".product-count"
      ).textContent = `${totalCount}x`;
    } else {
      const newItem = document.createElement("div");
      newItem.id = `dessert${product.id}`;
      newItem.className = "product";
      newItem.innerHTML = `
        <p>
          <span class="product-count">${totalCount}x</span>${product.name}
        </p>
        <p>${product.price}</p>
        <button class="btn remove-from-cart-btn" data-id="${product.id}">Remove</button>
      `;
      productsContainer.appendChild(newItem);
    }
  }

  updateCartDisplay() {
    productsContainer.innerHTML = "";
    const totalCount = this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    totalNumberOfItems.textContent = totalCount;

    this.items.forEach((item) => {
      const newItem = document.createElement("div");
      newItem.className = "product";
      newItem.innerHTML = `
        <p>
          <span class="product-count">${item.quantity}x</span>${item.name}
        </p>
        <p>${item.price}</p>
        <button class="btn remove-from-cart-btn" data-id="${item.id}">Remove</button>
      `;
      productsContainer.appendChild(newItem);
    });
  }

  calculateTotal() {
    const subTotal = this.items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
    this.total = subTotal;
    cartSubTotal.textContent = `R${subTotal.toFixed(2)}`;
    cartTotal.textContent = `R${this.total.toFixed(2)}`;
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
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = "R0.00";
      cartTotal.textContent = "R0.00";
      productsContainer.innerHTML = "";
    }
  }
}

const cart = new ShoppingCart();

dessertCards.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    cart.addItem(Number(event.target.id), products);
  }
});

cartContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const itemId = Number(event.target.dataset.id);
    cart.removeItem(itemId);
  }
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", () => cart.clearCart());

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

//Declare products
const products = [];
{
    id: 1,
    productName: "Vanilla Cupcakes (6 Pack)",
    price: "12.99",
    category: "Cupcake",
  },

  {
    id: 2,
    productName: "French Macaron",
    price: "3.99",
    category: "Macaron",
  },
  {
    id: 3,
    productName: "Pumpkin Cupcake",
    price: "3.99",
    category: "Cupcake",
  },
  {
    id: 4,
    productName: "Chocolate Cupcake",
    price: "5.99",
    category: "Cupcake",
  },
  {
    id: 5,
    productName: "Chocolate Pretzels (4 Pack)",
    price: "10.99",
    category: "Pretzel",
  },
  {
    id: 6,
    productName: "Strawberry Ice Cream",
    price: "2.99"   ,
    category: "Ice Cream",
  },
  {
    id: 7,
    productName: "Chocolate Macarons (4 Pack)",
    price:"9.99",
    category: "Macaron",
  },
  {
    id: 8,
    productName: "Strawberry Pretzel",
    price: "4.99",
    category: "Pretzel",
  },
  {
    id: 9,
    productName: "Butter Pecan Ice Cream",
    price: "2.99",
    category: "Ice Cream",
  },
  {
    id: 10,
    productName: "Rocky Road Ice Cream",
    price: "2.99",
    category: "Ice Cream",
  },
  {
    id: 11,
    productName: "Vanilla Macarons (5 Pack)",
    price: "11.99",
    category: "Macaron",
  },
  {
    id: 12,
    productName: "Lemon Cupcakes (4 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
];

//display available products in HTML 
products.forEach(
    ({ name, id, price, category }) => {
      dessertCards.innerHTML += 
        <div class="dessert-card">
          <h2>${name}</h2>
          <p class="dessert-price">$${price}</p>
          <p class="product-category">Category: ${category}</p>
          <button 
            id="${id}" 
            class="btn add-to-cart-btn">Add to cart
          </button>
        </div>
      ;
    }
);

addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
        //to clear bug I should add || 0
      totalCountPerProduct[dessert.id] = totalCountPerProduct[dessert.id] + 1;
    })
}
  
//display new products added by user
const currentProductcount = totalCountPerProduct[product.id];
const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);


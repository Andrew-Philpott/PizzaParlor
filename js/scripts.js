//Business logic for Crust
function Crust(size, type) {
  this.size = size;
  this.type = type;
  this.price;
  if(this.size === "Small") {
    this.price = "7.99";
  } else if (this.size === "Medium") {
    this.price = "9.99";
  } else if (this.size === "Large") {
    this.price = "11.99";
  }
}

Crust.prototype.getSize = function() {
  return this.size;
}

Crust.prototype.getType = function() {
  return this.type;
}

Crust.prototype.getPrice = function() {
  return this.price;
}

//Business logic for topping
function Topping(name, price) {
  this.name = name;
  this.price = price;
}

Topping.prototype.getToppingPrice = function() {
  return this.price;
}

Topping.prototype.getToppingName = function() {
  return this.name;
}

//Business logic for pizza
function Pizza(toppings, crust) {
  this.toppings = toppings;
  this.crust = crust;
}

Pizza.prototype.getToppings = function() {
  return this.toppings;
}

Pizza.prototype.getPizzaCrust = function() {
  return this.crust;
}
Pizza.prototype.setPizzaCrust = function(crust) {
  this.crust = crust;
}

Pizza.prototype.calculatePizzaCost = function() {
  let pizzaCost = 0;
  for(let i = 0; i < this.getToppings().length; i++) {
    pizzaCost += parseFloat(this.getToppings()[i].getToppingPrice());
  }
  pizzaCost += parseFloat((this.getPizzaCrust().getPrice()));
  return pizzaCost.toFixed(2);
}


function createHomePageImageHtml() {
  let imageSize = `<picture>
  <source srcset="img/pizzasmall.jpg"
  media="(max-width: 575.98px)">  
  <source srcset="img/pizzamedium.jpg"
          media="(max-width: 767.98px)">   
  <img src="img/pizzamedium.jpg" />
</picture>`;



  // if(window.matchMedia("(min-width: 1900px)").matches) {
  //   imageSize = "img/pizzalarge.jpg";
  // } else if(window.matchMedia("(min-width: 630px)").matches && window.matchMedia("(max-width: 1200px)").matches) {
  //   imageSize = "img/pizzamedium.jpg";
  // } else if(window.matchMedia("(min-width: 400px)").matches && (window.matchMedia("(max-width: 631px)").matches)) {
  //   imageSize = "img/pizzasmall.jpg";
  // }
  let homePageImageHtml = `<div id='home-page-image'>${imageSize}</div>`;
  return homePageImageHtml;
}

function createHomePageButtonsHtml() {
  let carryOut = `<div id ='home-buttons'><button id='carryout-button' class='button-theme'>Carry Out</button></div>`;
  let buttons = `${carryOut}`;
  return buttons;
}

// function resize() {
//   let homePageImage = $("#home-page-image");
//   if(homePageImage) {
//     $("#home-page-image").remove();
//     createHomePageImageHtml();
//   }
// }

function createHomePageHtml() {
  let main = $("#main-content");
  let homePageImageHtml = createHomePageImageHtml();
  let homePageButtonsHtml = createHomePageButtonsHtml();
  let homePageHtml = `<div id='home-page'>${homePageImageHtml}${homePageButtonsHtml}</div>`;
  return main.html(homePageHtml);
}

function attachCarryOutButtonListener(pizzas) {
  $("#carryout-button").on("click", function() {
    createPizzaCrustTypesView(pizzas);
  });
}

function createHomePageView(pizzas) {
  createHomePageHtml();
  attachCarryOutButtonListener(pizzas);
}

function definePizzaCrustSizes() {
  let pizzaSizes = [];
  pizzaSizes.push(['Small (10")', 'Small']);
  pizzaSizes.push(['Medium (12")', 'Medium']);
  pizzaSizes.push(['Large (14")', 'Large']);
  return pizzaSizes;
}

function definePizzaCrustTypes() {
  let crustTypes = [];
  crustTypes.push("Hand Tossed", "Handmade Pan", "Crunchy Thin", "Brooklyn Style");
  return crustTypes;
}

function createPizzaCrustTypesHtml(crustTypes) {
  let main = $("#main-content");
  let pizzaCrustTypesHtml = `<div id='pizza-crust-type-select'><h2>Select Pizza type</h2><ul>`;
  for(let i = 0; i < crustTypes.length; i++) {
    pizzaCrustTypesHtml += `<div class='pizza-crust-type option-container'><li class='list-group-item'><p class='option-text'>${crustTypes[i]}</p></li></div>`;
  }
  pizzaCrustTypesHtml += '</ul></div>';
  return main.html(pizzaCrustTypesHtml);
}

function createPizzaSizesHtml(pizzaSizes) {
  let main = $("#main-content");
  let pizzaSizesHtml = "<div id='pizza-size-select'><h2>Select Pizza size</h2><ul>";
  for(let i = 0; i < pizzaSizes.length; i++) {
  pizzaSizesHtml += `<div id=${pizzaSizes[i][1]} class='pizza-size option-container'><li class='list-group-item'><p class='option-text'>${pizzaSizes[i][0]}</p></li></div>`;
  }
  pizzaSizesHtml += '</ul></div>';

  return main.html(pizzaSizesHtml);
}

function attachPizzaSizeSelectListener(pizzas, pizzaCrust) {
  $("#pizza-size-select").on("click", ".pizza-size", function() {
    let pizzaSize = this.id;
    createCustomerPizzaStatusView();
    updateCustomerPizzaStatusViewWithPizzaSize(pizzaSize, pizzaCrust);
    createToppingsView(pizzas);
  });
}

function attachPizzaCrustTypeSelectListener(pizzas) {
  $("#pizza-crust-type-select").on("click", ".pizza-crust-type", function() {
    let pizzaCrust = $(this).text();
    createPizzaSizesView(pizzas, pizzaCrust);
  })
}

function createPizzaSizesView(pizzas, pizzaCrust) {
  createPizzaSizesHtml(definePizzaCrustSizes());
  attachPizzaSizeSelectListener(pizzas, pizzaCrust);
}

function createPizzaCrustTypesView(pizzas) {
  createPizzaCrustTypesHtml(definePizzaCrustTypes());
  attachPizzaCrustTypeSelectListener(pizzas);
}
function displayPizzaPrice(pizza) {
  let main = $("#main-content");
  let htmlForPriceofPizza = ""
  htmlForPriceofPizza += `<div id="pizza-price">${pizza.calculatePizzaCost()}</div>`;
  return main.append(htmlForPriceofPizza);
}

function createCustomerPizzaStatusView() {
  let main = $("#main-content");
  let htmlForCustomerPizzaStatus = "<div id='pizza-status-header'><h2>Your Pizza</h2></div><div id='pizza-status'</div>";
  return main.html(htmlForCustomerPizzaStatus);
}

function updateCustomerPizzaStatusViewWithPizzaSize(size, pizzaCrustType) {
  const customerPizzaStatusView = $("#pizza-status");
  let htmlForCustomerPizzaStatusUpdate = "";
  htmlForCustomerPizzaStatusUpdate += `<div class='pizza-option-status'><p><span id='selected-pizza-crust-size'>${size}</span><span>> </span></span><span id='selected-pizza-crust-type'>${pizzaCrustType}</span></p></div>`;
  return customerPizzaStatusView.append(htmlForCustomerPizzaStatusUpdate);
}

function updateCustomerPizzaStatusViewWithTopping(toppingName) {
  const customerPizzaStatusView = $("#pizza-status");
  let htmlForCustomerPizzaStatus = "";
  htmlForCustomerPizzaStatus += `<div class='pizza-option-status'><p id=${toppingName}><span> > </span><span>${toppingName}</span></p></div>`;
  return customerPizzaStatusView.append(htmlForCustomerPizzaStatus);
}

function defineToppings() {
  const bacon = new Topping("Bacon", "0.50");
  const chicken = new Topping("Chicken", "0.75");
  const sausage = new Topping("Sausage", "0.29");
  const salami = new Topping("Salami", "0.40");
  const steak = new Topping("Steak", "0.80");
  const jalapenoPeppers = new Topping("Jalapenos", "0.15");
  const blackOlives = new Topping("Olives", "0.15");
  const mushrooms = new Topping("Mushrooms", "0.25");
  const onions = new Topping("Onions", "0.10");
  const pineapple = new Topping("Pineapple", "0.30");
  const spinach = new Topping("Spinach", "0.40");
  const pepperoni = new Topping("Pepperoni", "2.33");
  const toppings = [bacon, chicken, sausage, salami, steak, jalapenoPeppers, blackOlives, mushrooms, onions, pineapple, spinach, pepperoni];
  return toppings;
}

function createToppingsHtml(toppings) {
  let main = $("#main-content");
  let toppingsHtml= "<div id='toppings-select'><h2>Select Toppings</h2><ul>";
  toppings.forEach(function(topping) {
  toppingsHtml += `<div id=${topping.getToppingName()},${topping.getToppingPrice()} class='toppings option-container'><li class='list-group-item' ><p class='option-text'>${topping.getToppingName()}<span class='topping-price'>$ ${topping.getToppingPrice()}</span></p></li></div>`;
  });
  toppingsHtml += "</ul></div>";
  toppingsHtml += `<button id="review-pizza-order-button">Review Pizza Order</button>`;
  return main.append(toppingsHtml);
}

function attachToppingsSelectListener() {
  $("#toppings-select").on("click", ".toppings", function() {
    let topping = this.id;
    let toppingName = topping.split(",")[0];
    if($(this).hasClass("option-selected")) {
      $(this).removeClass("option-selected");
      $(`#${toppingName}`).remove();
    } else {
      $(this).addClass("option-selected");
      updateCustomerPizzaStatusViewWithTopping(toppingName);
    }
  });
}

function createPizzaOrderHtml(pizzas) {
  let main = $("#main-content");
  let pizzasHtml = `<div id='order-info'>`;
  pizzas.forEach(function(pizza) {
    pizzasHtml += `<div class='order-item-spacer'><span>${pizza.getPizzaCrust().getSize()} ${pizza.getPizzaCrust().getType()}</span></div><div class='order-item-spacer'><span>${pizza.getPizzaCrust().getPrice()}</span></div>`;
    pizza.toppings.forEach(function(topping) {
      pizzasHtml += `<div class='order-item-spacer topping-name'><span>${topping.getToppingName()}</span></div><div class='order-item-spacer-spacer topping-price'><span>${topping.getToppingPrice()}</span></div>`;
    });
    pizzasHtml += `<div class='order-item-spacer'></div><div class='order-item-spacer'><span>${pizza.calculatePizzaCost()}</span></div>`;
  });
  pizzasHtml += `<hr></div><div><button id='add-pizza-button'>Add Pizza</button></div>`;
  return main.html(pizzasHtml);
};

function createPizzaOrderView(pizzas) {
  createPizzaOrderHtml(pizzas);
  attachAddPizzaToOrderListener(pizzas);
}

function attachReviewPizzaOrderListener(pizzas) {
  $("#review-pizza-order-button").on("click", function() {
    let toppingsSelected = [];
    let size = $("#main-content #selected-pizza-crust-size").text();
    let type = $("#main-content #selected-pizza-crust-type").text();
    toppingsSelected =  Array.from($("div.option-selected"));
    let toppingsForCustomerPizza = [];
    for(let i = 0; i < toppingsSelected.length; i++) {
      let toppingNameAndPriceArray = [];
      toppingNameAndPriceArray = toppingsSelected[i].id.split(",");
      let newTopping = new Topping(toppingNameAndPriceArray[0], toppingNameAndPriceArray[1]);
      toppingsForCustomerPizza.push(newTopping);
    }
    let crust = new Crust(size, type);
    let pizza = new Pizza(toppingsForCustomerPizza, crust);
    pizzas.push(pizza);
    createPizzaOrderView(pizzas);
  });
}

function attachAddPizzaToOrderListener(pizzas) {
  $("#add-pizza-button").on("click", function() {
    addNewPizza(pizzas);
  })
}

function createToppingsView(pizzas) {
  createToppingsHtml(defineToppings());
  attachToppingsSelectListener();
  attachReviewPizzaOrderListener(pizzas);
}

function addNewPizza(pizzas) {
  createPizzaCrustTypesView(pizzas);
 // createPizzaSizesView(pizzas);
}

function go() {
  let pizzas = [];
  createHomePageView(pizzas);
}
    
$(document).ready(function() {
  go();
});

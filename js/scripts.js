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
function Pizza(toppings, size) {
  this.toppings = toppings;
  this.size = size;
}

Pizza.prototype.getToppings = function() {
  return this.toppings;
}

Pizza.prototype.getPizzaSize = function() {
  return this.size;
}
Pizza.prototype.setPizzaSize = function(size) {
  this.size = size;
}

Pizza.prototype.calculatePizzaCost = function() {
  let pizzaCost = 0;
  for(let i = 0; i < this.getToppings().length; i++) {
    pizzaCost += parseFloat(this.getToppings()[i].getToppingPrice());
  }
  if(this.size === "Small") {
    pizzaCost += 8.99;
  } else if (this.size === "Medium") {
    pizzaCost += 10.99;
  } else if (this.size === "Large"){
    pizzaCost += 12.99;
  }
  return pizzaCost.toFixed(2);
}

function createHomePageImageHtml() {
  let imageSize = "";
  if(window.matchMedia("(min-width: 632px)").matches) {
    imageSize = "img/pizzacloseupmedium.jpg";
  } else if(window.matchMedia("(min-width: 400px)").matches) {
    imageSize = "img/pizzacloseupsmall.jpg";
  }
  let homePageImageHtml = `<div id='home-page-image'><img src='${imageSize}'/></div>`;
  return homePageImageHtml;
}

function createHomePageButtonsHtml() {
  let carryOut = `<div id ='carry-out'><button id='carry-out-button'>Carry Out</button></div>`;
  let delivery = `<div id ='delivery'><button id='delivery-button'>Delivery</button></div>`;
  let buttons = `${carryOut}${delivery}`;
  return buttons;
}

function createHomePageHtml() {
  let main = $("#main-content");
  let homePageImageHtml = createHomePageImageHtml();
  let homePageButtonsHtml = createHomePageButtonsHtml();
  let homePageHtml = `<div id='home-page'>${homePageImageHtml}${homePageButtonsHtml}</div>`;
  return main.html(homePageHtml);
}

function attachDeliveryButtonListener(pizzas) {
  $("#delivery-button").on("click", function() {
    createPizzaSizesView(pizzas);
  });
}

function createHomePageView(pizzas) {
  createHomePageHtml();
  attachDeliveryButtonListener(pizzas);
}

function definePizzaSizes() {
  let pizzaSizes = [];
  pizzaSizes.push(['Small (10")', 'Small']);
  pizzaSizes.push(['Medium (12")', 'Medium']);
  pizzaSizes.push(['Large (14")', 'Large']);
  return pizzaSizes;
}

function createPizzaSizesHtml(pizzaSizes) {
  let main = $("#main-content");
  let pizzaSizesHtml = "<div id='pizza-size-select'><h2>Select Pizza size</h2><ul>";
  for(let i = 0; i < pizzaSizes.length; i++) {
  pizzaSizesHtml += `<div id=${pizzaSizes[i][1]} class='pizza-size'><li class='list-group-item'><p>${pizzaSizes[i][0]}</p></li></div>`;
  }
  pizzaSizesHtml += '</ul></div>';

  return main.html(pizzaSizesHtml);
}

function attachPizzaSizeSelectListener(pizzas) {
  $("#pizza-size-select").on("click", ".pizza-size", function() {
    let pizzaSize = this.id;
    createCustomerPizzaStatusView();
    updateCustomerPizzaStatusViewWithPizzaSize(pizzaSize);
    createToppingsView(pizzas);
  });
}

function createPizzaSizesView(pizzas) {
  createPizzaSizesHtml(definePizzaSizes());
  attachPizzaSizeSelectListener(pizzas);
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

function updateCustomerPizzaStatusViewWithPizzaSize(size) {
  let customerPizzaStatusView = $("#pizza-status");
  let htmlForCustomerPizzaStatusUpdate = "";
  htmlForCustomerPizzaStatusUpdate += `<div class='pizza-option-status'><p><span id='selected-pizza-size'>${size}</span></p></div>`;
  return customerPizzaStatusView.append(htmlForCustomerPizzaStatusUpdate);
}

function updateCustomerPizzaStatusViewWithTopping(toppingName) {
  let customerPizzaStatusView = $("#pizza-status");
  let htmlForCustomerPizzaStatus = "";
  htmlForCustomerPizzaStatus += `<div class='pizza-option-status'><p  id=${toppingName}><span> > </span><span>${toppingName}</span></p></div>`;
  return customerPizzaStatusView.append(htmlForCustomerPizzaStatus);
}

function defineToppings() {
  let bacon = new Topping("Bacon", "0.50");
  let chicken = new Topping("Chicken", "0.75");
  let sausage = new Topping("Sausage", "0.29");
  let salami = new Topping("Salami", "0.40");
  let steak = new Topping("Steak", "0.80");
  let jalapenoPeppers = new Topping("Jalapenos", "0.15");
  let blackOlives = new Topping("Olives", "0.15");
  let mushrooms = new Topping("Mushrooms", "0.25");
  let onions = new Topping("Onions", "0.10");
  let pineapple = new Topping("Pineapple", "0.30");
  let spinach = new Topping("Spinach", "0.40");
  let pepperoni = new Topping("Pepperoni", "2.33");
  let toppings = [bacon, chicken, sausage, salami, steak, jalapenoPeppers, blackOlives, mushrooms, onions, pineapple, spinach, pepperoni];
  return toppings;
}

function createToppingsHtml(toppings) {
  let main = $("#main-content");
  let toppingsHtml= "<div id='toppings-select'><h2>Select Toppings</h2><ul>";
  toppings.forEach(function(topping) {
  toppingsHtml += `<div id=${topping.getToppingName()},${topping.getToppingPrice()} class='toppings'><li class='list-group-item' ><p>${topping.getToppingName()}<span class='topping-price'>$ ${topping.getToppingPrice()}</span></p></li></div>`;
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
    pizzasHtml += `<div class='order-item-spacer'><span>${pizza.getPizzaSize()}</span></div><div class='order-item-spacer'><span>Insert size cost</span></div>`;
    pizza.toppings.forEach(function(topping) {
      pizzasHtml += `<div class='order-item-spacer topping-name'><span>${topping.getToppingName()}</span></div><div class='order-item-spacer-spacer topping-price'><span>${topping.getToppingPrice()}</span></div>`;
    });
    pizzasHtml += `<div class='order-item-spacer'></div><div class='order-item-spacer'><span>${pizza.calculatePizzaCost()}</span></div>`;
  });
  pizzasHtml += `<hr></div><div><button id='add-pizza-button'>Add Pizza</button></div>`;
  return main.html(pizzasHtml);
}

function createPizzaOrderView(pizzas) {
  createPizzaOrderHtml(pizzas);
  attachAddPizzaToOrderListener(pizzas);
}

function attachReviewPizzaOrderListener(pizzas) {
  $("#review-pizza-order-button").on("click", function() {
    let toppingsSelected = [];
    let size = $("#main-content #selected-pizza-size").text();
    toppingsSelected =  Array.from($("div.option-selected"));
    let toppingsForCustomerPizza = [];
    for(let i = 0; i < toppingsSelected.length; i++) {
      let toppingNameAndPriceArray = [];
      toppingNameAndPriceArray = toppingsSelected[i].id.split(",");
      let newTopping = new Topping(toppingNameAndPriceArray[0], toppingNameAndPriceArray[1]);
      toppingsForCustomerPizza.push(newTopping);
    }
    let pizza = new Pizza(toppingsForCustomerPizza, size);
    pizzas.push(pizza);
    alert(pizzas.length);
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
  createPizzaSizesView(pizzas);
}

function go() {
  let pizzas = [];
  createHomePageView(pizzas);
}
    
$(document).ready(function() {
  go();
});

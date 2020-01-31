//Business logic for pizza
function Pizza(toppings) {
  this.toppings = toppings;
  this.size = "";
}

Pizza.prototype.getPizzaSize = function() {
  return this.size;
}
Pizza.prototype.setPizzaSize = function(size) {
  this.size = size;
}

Pizza.prototype.calculatePizzaCost = function() {
  let pizzaCost = 0;
  this.toppings.forEach(element => {
  pizzaCost += element.getToppingPrice();
  });
  pizzaCost += this.size;
  return pizzaCost;
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

function attachPageListeners(pizza) {
  $("#pizza-size-select").on("click", ".pizza-size", function() {
    let pizzaSize = this.id;
    pizza.setPizzaSize(pizzaSize);
    removePizzaSizesView();
    createCustomerPizzaStatusView();
    updateCustomerPizzaStatusViewWithPizzaSize(pizza.getPizzaSize());
    createToppingsView(defineToppings());
  
    $("#toppings-select").on("click", ".toppings", function() {
      let topping = this.id;
      let toppingName = topping.split(",")[0];
      updateCustomerPizzaStatusViewWithTopping(toppingName);
    });
  });

}
function createCustomerPizzaStatusView() {
  let main = $("#main-content");
  let htmlForCustomerPizzaStatus = "<div id='pizza-status'><h2>Your Pizza</h2></div>";
  return main.append(htmlForCustomerPizzaStatus);
}

function updateCustomerPizzaStatusViewWithPizzaSize(size) {
  let customerPizzaStatusView = $("#pizza-status");
  let htmlForCustomerPizzaStatusUpdate = "";
  htmlForCustomerPizzaStatusUpdate += `<p><span>${size} > </span></p>`;
  return customerPizzaStatusView.append(htmlForCustomerPizzaStatusUpdate);
}

function updateCustomerPizzaStatusViewWithTopping(topping) {
  let customerPizzaStatusView = $("#pizza-status");
  let htmlForCustomerPizzaStatus = "";
  htmlForCustomerPizzaStatus += `<p><span>${topping}</span></p>`;
  return customerPizzaStatusView.append(htmlForCustomerPizzaStatus);
}

// function reviewPizzaOrder() {
//   let pizzaOrderStatus 
// }
function definePizzaSizes() {
  let pizzaSizes = [];
  pizzaSizes.push(['Small (10")', 'Small']);
  pizzaSizes.push(['Medium (12")', 'Medium']);
  pizzaSizes.push(['Large (14")', 'Large']);
  return pizzaSizes;
}

function createPizzaSizesView(pizzaSizes) {
  let main = $("#main-content");
  let pizzaSizesHtml = "<div id='pizza-size-select'><h2>Select size</h2><ul>";
  for(let i = 0; i < pizzaSizes.length; i++) {
    pizzaSizesHtml += `<li class='list-group-item pizza-size' id=${pizzaSizes[i][1]}><p>${pizzaSizes[i][0]}</p></li>`;
  }
  pizzaSizesHtml += '</ul></div>';
  return main.html(pizzaSizesHtml);
}

function removePizzaSizesView() {
  let pizzaSizeContainer = $("#pizza-size-select");
  pizzaSizeContainer.remove();
}
function defineToppings() {
  let bacon = new Topping("Bacon", 0.50);
  let chicken = new Topping("Chicken", 0.75);
  let sausage = new Topping("Sausage", 0.29);
  let salami = new Topping("Salami", 0.40);
  let steak = new Topping("Steak", 0.80);
  let jalapenoPeppers = new Topping("Jalapeno Peppers", 0.15);
  let blackOlives = new Topping("Black Olives", 0.15);
  let mushrooms = new Topping("Mushrooms", 0.25);
  let onions = new Topping("Onions", .10);
  let pineapple = new Topping("Pineapple", .30);
  let spinach = new Topping("Spinach", .40);
  let pepperoni = new Topping("Pepperoni", 2.33);
  let toppings = [bacon, chicken, sausage, salami, steak, jalapenoPeppers, blackOlives, mushrooms, onions, pineapple, spinach, pepperoni];
  return toppings;
}
function createToppingsView(toppings) {
  let main = $("#main-content");
  let toppingsHtml= "<div id='toppings-select'><h2>Select Toppings</h2><ul>";
  toppings.forEach(function(topping) {
    toppingsHtml += `<li class='list-group-item toppings' id=${topping.getToppingName()},${topping.getToppingPrice()}><p>${topping.getToppingName()}</p></li>`;
  });
  toppingsHtml += "</ul></div>";
  return main.append(toppingsHtml);
}
$(document).ready(function() {
  let pizza = new Pizza();
  createPizzaSizesView(definePizzaSizes());
  attachPageListeners(pizza);
})
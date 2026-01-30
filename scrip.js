let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(section).style.display = "block";
  if (section === "cart") displayCart();
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

function displayCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `<p>${item.name} - ₹${item.price} 
    <button onclick="removeItem(${index})">Remove</button></p>`;
  });

  totalEl.textContent = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  localStorage.removeItem("cart");
  cart = [];
  showSection("order");
}

window.onload = () => showSection("home");

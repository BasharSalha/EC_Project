const
  topHeader = document.querySelector("header.main-header"),
  goUpBtn = document.querySelector("#goUp");
// on scroll bar down add / remove effect to main header
// on scroll bar down show / hide button scroll up
addEventListener("scroll", _ => {
  if (scrollY > 100) {
    topHeader.classList.add("shadow", "border-bottom", "border-info");
    goUpBtn.classList.remove("d-none");
  } else {
    topHeader.classList.remove("shadow", "border-bottom", "border-info");
    goUpBtn.classList.add("d-none");
  }
})
// on click button go Up  scrollto up page 
goUpBtn.addEventListener("click", _ => scrollTo(0, 0));



const addFoodBtnAll = document.querySelectorAll("#addCart"),
  foodList = document.querySelector("#foodList .offcanvas-body"),
  foodCount = document.querySelector("header .number "),
  totalCart = document.querySelector("#foodList #total");

let FoodList = JSON.parse(localStorage.getItem("food list")) || [];

// on click in any food button add Foods List 
addFoodBtnAll.forEach(btn => {
  btn.onclick = event => {
    // prevent update page 
    event.preventDefault();
    // Call Function Collect foods data and storage  in local storage 
    collectData(btn);

  }
});

// Function Collect foods data in storage in Food List then in local storage  
function collectData(item) {
  // Collect data for the chosen food
  let card = item.parentElement.parentElement.parentElement;
  let imgSrc = card.querySelector("img").src;
  let title = card.querySelector("h4").innerText;
  let price = card.querySelector("#priceNumber").innerText;
  let count = card.querySelector("input[type='number']").value;


  let postionFood = FoodList.findIndex(item => {
    return item.name === title
  })

  if (postionFood >= 0) {
    let UpdateCount = +FoodList[postionFood].count

    UpdateCount += +count;
    FoodList[postionFood].count = UpdateCount
    storeEnd(FoodList)
  } else {
    // Storage the chosen food in food object
    let FoodObject = {};
    FoodObject.img = imgSrc;
    FoodObject.name = title;
    FoodObject.price = price;
    FoodObject.count = count;

    // Storage chosen food object in foods list array 
    FoodList.push(FoodObject);

    storeEnd(FoodList)

  }




}
// Function show all food store in loacl storage in list Food Cart
function showFood() {
  let totalSum = 0;

  foodList.innerHTML = ""
  FoodList.forEach((food, ind) => {
    let tatalOneProduct = food.price * food.count
    let foodViwe = `
      <div class="row mt-4">
        <div class="col">
          <img src="${food.img}" alt="food pic" class="img-fluid">
        </div>
        <div class="col">
          ${food.name}
        </div>
        <div class="col">
          ${food.price}
        </div>
        <div class="col">
        ${food.count}

        </div>
        <div class="col">
        ${tatalOneProduct.toFixed(2)}
        </div>
        <div class="col">
          <button class="btn btn-sm text-danger fs-4" 
          id='delete' data-id =${ind}>
                  <i class="bi bi-trash" id="delete-icon" data-id =${ind}></i> 
          </button>
        </div>
      </div>`;
    foodList.innerHTML += foodViwe
    totalSum += tatalOneProduct
  });

  if (totalSum < 10) {
    totalCart.innerText = "0" + totalSum.toFixed(2)
  } else {
    totalCart.innerText = totalSum.toFixed(2)
  }
  foodCount.innerText = FoodList.length;
}
// Call Function show update foods list
showFood()


// delete all food list in cart 
function deleteAllFood() {
  FoodList = [];
  storeEnd(FoodList)

}


// delete on food
addEventListener("click", event => {
  if (event.target.id == "delete" || event.target.id == "delete-icon") {
    let idd = event.target.getAttribute("data-id")
    FoodList.splice(idd, 1)
    storeEnd(FoodList)
  }
})


function storeEnd(arr) {
  localStorage.setItem("food list", JSON.stringify(arr));
  showFood()
}

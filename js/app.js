// import meal from "./data-food.js";
const hamburgerMenu = document.querySelector(".menu-hamburger i");
const menuList = document.querySelector(".list-menu");
const foodContainer = document.querySelector(".container-food");
const search = document.querySelector("#search");
const food = document.querySelector(".food");
let foodArr = [];
hamburgerMenu.addEventListener("click", function () {
  menuList.classList.toggle("hidden");
});

const loadFood = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=seafood")
    .then((res) => res.json())
    .then((res) => {
      foodArr = res.meals;
      setTimeout(() => {
        renderFood(foodArr);
      }, 1000);
    });
};

let foodHTML = "";
const renderFood = (foods) => {
  foodHTML = "";
  foods.map((food) => {
    foodHTML += `
              <div class="my-1 w-1/2 px-1 md:w-1/3 lg:my-8 lg:px-4 lg:w-1/4 lg:h-128">
                 <article class="overflow-hidden rounded-lg shadow-lg">
                   <a href="#">
                       <img alt="Placeholder" class="preview block h-auto w-full preview" src="${food.strMealThumb}">
                   </a>
                   <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                       <h1 class="text-lg">
                           <a class="no-underline hover:underline text-black" href="#">
                               ${food.strMeal}
                           </a>
                       </h1>
                   </header>
                   <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                       <a class="flex items-center no-underline hover:underline text-black" href="#">
                           <p>ID</p>
                   <p class="ml-2 text-sm">
                       ${food.idMeal}
                   </p>
               </a>
           <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
               <span class="hidden">Like</span>
               <i class="fa fa-heart"></i>
           </a>
               </footer>
               </article>
             </div>
           `
  });
  foodContainer.innerHTML = foodHTML;
};
document.addEventListener("DOMContentLoaded", loadFood);

search.addEventListener('keyup', function(e) {
  let searchFor = e.target.value;
  let filteredFood;

  filteredFood = foodArr.filter(food => {
    return food.strMeal.toLowerCase().includes(searchFor)
  })

  renderFood(filteredFood);
})
const foodContainer = document.querySelector(".container-food");
const btnSearch = document.querySelector(".btn-search");
const search = document.querySelector("#search");
let foodArr = [];

window.onload = () => {
  loadFood();
};

const loadFood = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
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
    <!-- Column -->
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">

            <!-- Article -->
            <article class="overflow-hidden rounded-lg shadow-lg">

                <a href="#">
                    <img alt="Placeholder" class="block h-auto w-full" src="${food.strMealThumb}">
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
            <!-- END Article -->

        </div>
        <!-- END Column -->
        `;
  });
  foodContainer.innerHTML = foodHTML;
};

search.addEventListener("keyup", (e) => {
  let forSearch = e.target.value;
  let foodFilter;

  foodFilter = foodArr.filter((food) => {
    return food.strMeal.toLowerCase().includes(forSearch);
  });
  renderFood(foodFilter);
});
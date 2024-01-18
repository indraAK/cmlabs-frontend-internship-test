import "./style.css";

function renderMealsSkeleton() {
  document.querySelector("#meal-categories").innerHTML = `
    <div class="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${Array.from({ length: 12 })
        .map(() => '<div class="w-full h-32 rounded-md overflow-hidden bg-slate-200 animate-pulse"></div>')
        .join("")}
    </div>
  `;
}

function renderMeals(mealCategories) {
  document.querySelector("#meal-categories").innerHTML = `
    <div class="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${mealCategories
        .map(
          (item) =>
            `
          <figure class="relative isolate w-full h-32 rounded-md overflow-hidden">
            <img src=${item.strCategoryThumb} alt=${item.strCategory} class="absolute inset-0 w-full h-full object-cover" />
            <figcaption class="absolute inset-0 w-full h-full bg-black/60 text-white grid hover:bg-black/70 transition">
              <a href="/foods/?category=${item.strCategory}" class="p-2 grid place-content-center text-lg font-semibold">${item.strCategory}</a>
            </figcaption> 
          </figure>
        `
        )
        .join("")}
    </div>
  `;
}

function renderErrorMessage(message) {
  document.querySelector("#meal-categories").innerHTML = `
    <div class="max-w-sm mx-auto text-center">
      <h2 class="text-xl text-slate-800 font-bold text-balance">${message}</h2>
    </div>
  `;
}

(async () => {
  renderMealsSkeleton();

  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");

    if (!response.ok) throw new Error("Failed to fetch meals");

    const data = await response.json();
    renderMeals(data.categories);
  } catch (err) {
    renderErrorMessage(err.message);
  }
})();

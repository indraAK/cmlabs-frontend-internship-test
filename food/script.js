import "../style.css";

function renderMealSkeleton() {
  document.querySelector("#meal-detail-content").innerHTML = `
    <div class="animate-pulse">
      <div class="w-20 h-6 bg-slate-200 rounded animate-pulse"></div>
      <div class="w-[75%] h-6 bg-slate-200 rounded mt-6"></div>
      <div class="w-full aspect-video bg-slate-200 rounded mt-6"></div>
      <div class="w-40 h-5 bg-slate-200 rounded mt-6"></div>
      <div class="w-full h-4 bg-slate-200 rounded mt-4"></div>
      <div class="w-full h-4 bg-slate-200 rounded mt-3"></div>
      <div class="w-full h-4 bg-slate-200 rounded mt-3"></div>
      <div class="w-full h-4 bg-slate-200 rounded mt-3"></div>
      <div class="w-40 h-5 bg-slate-200 rounded mt-6"></div>
      <div class="w-56 h-4 bg-slate-200 rounded mt-4"></div>
      <div class="w-56 h-4 bg-slate-200 rounded mt-3"></div>
      <div class="w-56 h-4 bg-slate-200 rounded mt-3"></div>
      <div class="w-56 h-4 bg-slate-200 rounded mt-3"></div>
      <div class="w-40 h-5 bg-slate-200 rounded mt-6"></div>
      <div class="w-full aspect-video bg-slate-200 rounded mt-4"></div>
    </div>
  `;
}

function renderMealDetail(meal) {
  document.querySelector("#meal-detail-content").innerHTML = `
    <article class="space-y-6" id="meal-detail">
      <a href=/foods/?category=${
        meal.strCategory
      } class="inline-flex justify-center items-center px-4 py-1 bg-green-100 text-green-700 text-sm rounded-full">${meal.strCategory}</a>
      <h1 class="text-2xl sm:text-3xl text-slate-800 font-bold">${meal.strMeal}</h1>
      <img src=${meal.strMealThumb} class="w-full aspect-video object-cover rounded shadow-lg" alt="" />
      <div class="space-y-4">
        <h2 class="text-xl sm:text-2xl text-slate-800 font-semibold">Instructions</h2>
        <div class="text-slate-600 leading-relaxed space-y-4">
          ${meal.strInstructions
            .split(/\r?\n/g)
            .map((str) => `<p>${str}</p>`)
            .join("")}
        </div>
      </div>
      <div class="space-y-4">
        <h2 class="text-xl sm:text-2xl text-slate-800 font-semibold">Ingredients</h2>
        <ul class="list-disc pl-4 space-y-1 text-slate-600">
          ${getIngredients(meal)
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="space-y-4">
        <h2 class="text-xl sm:text-2xl text-slate-800 font-semibold">Tutorials</h2>
        <iframe class="w-full aspect-video" src=https://www.youtube.com/embed/${
          meal.strYoutube.split("v=")[1]
        } allowfullscreen frameborder="0"></iframe>
      </div>
    </article>
  `;
}

function renderErrorMessage(message) {
  document.querySelector("#meal-detail-content").innerHTML = `
    <div class="max-w-sm mx-auto text-center space-y-1.5 mt-12">
      <h2 class="text-2xl text-slate-800 font-bold text-balance">${message}</h2>
    </div>
  `;
}

function getIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`);
    }
  }

  return ingredients;
}

(async () => {
  const params = new URLSearchParams(location.search);

  if (!params.has("id")) return (location.href = "/");

  const mealId = params.get("id");

  document.title = "Detail | MealApp";

  renderMealSkeleton();

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);

    if (!response.ok) throw new Error("Failed to fetch meal");

    const data = await response.json();
    const { meals } = data;

    if (!meals) throw new Error("No meal found");

    renderMealDetail(meals[0]);
  } catch (err) {
    renderErrorMessage(err.message);
  }
})();

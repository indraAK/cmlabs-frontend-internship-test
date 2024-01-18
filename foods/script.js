import "../style.css";

function renderMeals(meals) {
  document.querySelector("#meal-recipes").innerHTML = `
    <div class="container grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${meals
        .map(
          (meal) =>
            `
              <figure class="w-full aspect-video rounded-md overflow-hidden relative isolate">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="absolute inset-0 w-full h-full object-cover" />
                <figcaption class="absolute inset-0 w-full h-full grid bg-black/60 text-white hover:bg-black/70 transition">
                  <a href="/food/?id=${meal.idMeal}" class="p-2 grid place-content-center text-center text-balance text-lg font-semibold">${meal.strMeal}</a>
                </figcaption>
              </figure>
            `
        )
        .join("")}
    </div>
  `;
}

function renderMealsSkeleton() {
  document.querySelector("#meal-recipes").innerHTML = `
    <div class="container grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${Array.from({ length: 12 })
        .map(() => `<div class="w-full aspect-video rounded-md bg-slate-200 animate-pulse"></div>`)
        .join("")}
    </div>
  `;
}

function renderErrorMessage(message) {
  document.querySelector("#meal-recipes").innerHTML = `
    <div class="max-w-sm mx-auto text-center space-y-1.5 mt-12">
      <h2 class="text-2xl text-slate-800 font-bold text-balance">${message}</h2>
      <p class="text-slate-500 text-balance">Try changing your filter, or check back later for new meals</p>
    </div>
  `;
}

function renderPageHeader({ title, description }) {
  document.querySelector("#page-header").innerHTML = `
    <nav aria-label="breadcrumb">
      <ul class="flex items-center gap-x-1.5">
        <li class="flex items-center">
          <a href="/" class="flex items-center gap-x-1 text-sm text-slate-700 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-5 h-5 fill-current">
              <path
                d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"
              ></path>
            </svg>
            Home
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ml-1.5 fill-slate-400">
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </li>
        <li class="flex items-center">
          <a href="/" class="text-sm text-slate-700 font-medium">Foods</a>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ml-1.5 fill-slate-400">
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </li>
        <li aria-current="page">
          <span class="text-sm text-slate-500 font-normal">${title}</span>
        </li>
      </ul>
    </nav>

    <h1 class="text-3xl text-slate-800 font-bold mt-6">${title}</h1>
    <p class="text-base text-slate-500 mt-1">${description}</p>
  `;
}

function renderPageHeaderSkeleton() {
  document.querySelector("#page-header").innerHTML = `
    <div class="flex gap-x-2 animate-pulse">
      <div class="w-16 h-6 bg-slate-200 rounded"></div>
      <div class="w-16 h-6 bg-slate-200 rounded"></div>
      <div class="w-16 h-6 bg-slate-200 rounded"></div>
    </div>
    <div class="w-48 h-8 bg-slate-200 rounded animate-pulse mt-6"></div>
    <div class="w-72 h-5 bg-slate-200 rounded animate-pulse mt-2"></div>
  `;
}

(async () => {
  const params = new URLSearchParams(location.search);

  if (!params.has("category")) return (location.href = "/");

  const category = params.get("category");

  document.title = `${category} | MealApp`;

  renderPageHeaderSkeleton();
  renderMealsSkeleton();

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

    if (!response.ok) throw new Error("Could not find requested resource");

    const data = await response.json();
    const { meals } = data;

    if (!meals) throw new Error("No meals found");

    renderPageHeader({ title: category, description: `Explore ${category.toLocaleLowerCase()} recipes from around the world` });
    renderMeals(meals);
  } catch (err) {
    document.querySelector("#page-header").remove();
    renderErrorMessage(err.message);
  }
})();

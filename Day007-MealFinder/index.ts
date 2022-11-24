const api = {
    searchMeals:'https://www.themealdb.com/api/json/v1/1/search.php',
    randomMeal:'https://www.themealdb.com/api/json/v1/1/random.php',
    getMealById:'https://www.themealdb.com/api/json/v1/1/lookup.php'
}

async function request( url:string, key?:string, value?:string ) {
    const finalUrl = key ? `${url}?${key}=${value}` : url;
    console.log(finalUrl);
    const res = await fetch(finalUrl);
    const data = await res.json();
    return (data && data.meals) ? data.meals:[]
}

const searchInput = document.querySelector('.search') as HTMLInputElement,
      searchBtn = document.querySelector('.search-btn') as HTMLDivElement,
      randomBtn = document.querySelector('.random-btn'),
      headingEl = document.querySelector('.heading'),
      mealsEl = document.querySelector('.meals'),
      singleMealEl = document.querySelector('.single-meal');

searchBtn?.addEventListener('click', searchMeals);
randomBtn?.addEventListener('click', randomMeal);
mealsEl?.addEventListener('click', singleMeal)

async function searchMeals(e){
    e.preventDefault();
    singleMealEl!.innerHTML = ''
    const term = searchInput.value;

    if(term.trim()){
        const data = await request(api.searchMeals,'s',term);
        if(data.length  === 0){
            headingEl!.innerHTML = `<p>There are no search results. Try again!</p>`
        }else{
            headingEl!.innerHTML = `<h2>Search results for '${term}':</h2>`;
            mealsEl!.innerHTML = `${
                data.map( meal => `
                <div class="meal">
                    <img src=${meal.strMealThumb} alt=${meal.strMeal}>
                    <div class="meal-info" data-meal-id=${meal.idMeal}>
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `).join('')
            }`
        }
        searchInput.value = ''
    }else{
        alert('Please enter a term')
    }
}

async function randomMeal(){
    mealsEl!.innerHTML = ''
    headingEl!.innerHTML = ''
    const data = await request(api.randomMeal);
    const meal = data[0];
    addMealToDom(meal);
}
 
async function singleMeal(e){
      const mealInfo = e.path.find( ele => {
            if(ele.classList){
                return ele.classList.contains('meal-info')
            }else{
                return false
            }
      })

      if(mealInfo){
         let mealId:string = mealInfo.getAttribute("data-meal-id");
         const data = await request(api.getMealById,'i',mealId);
         addMealToDom(data[0])
      }

}

function addMealToDom(meal){
    const tags:string[] = [];

    for(let i = 1; i < 20; i++){
        if(meal[`strIngredient${i}`]){
            tags.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        }
    }

    singleMealEl!.innerHTML = `
        <h1>${meal.strMeal}</h1>
        <img src=${meal.strMealThumb} alt=${meal.strMeal} >
        <div class="main">
            <div class="titles">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul class="tags">
                ${
                    tags.map( tag => `<li>${tag}</li>`).join('')
                }
            </ul>
        </div>
    `
}
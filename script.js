let input = document.getElementById("input")
let submit = document.getElementById("submit")
let Heading = document.getElementById("Heading")
let content = document.getElementById("content")

let APICONTAINER = async (putInput) => {
    try {
        Heading.innerHTML = "Searching..."
        let API = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${putInput}`)
        let promise = await API.json()

        Heading.innerHTML = "";
        promise.meals.forEach(meal => {
            let CreateDiv = document.createElement("div");
            CreateDiv.classList.add("FoodContent")
            CreateDiv.innerHTML = `
        <div class="hole">
        <img src="${meal.strMealThumb}" id="image">
        <h3 style="padding: 5px;">${meal.strMeal}</h3>
        <p>${meal.strArea}, ${meal.strCategory}</p>

        <button id="viewDetails" >View Details</button>
        </div>
        `
            content.appendChild(CreateDiv);
        });
    } catch (error) {
        Heading.innerHTML = "Your Food is not found 404";
    }
}


submit.addEventListener("click", (e) => {
    e.preventDefault();

    let getInputData = input.value.trim()
    if (!getInputData) {
        Heading.innerHTML = "Please Enter your food in the search box";
        return
    }
    APICONTAINER(getInputData);
})

input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        submit.click();
    }
})
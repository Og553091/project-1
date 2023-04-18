$(document).ready(function () {
    function replaceSpaces(str) {
        return str.replace(/\s/g, "%20");
    }

    // Function to save an array to local storage
    function saveToLocalStorage(value) {
        const localStorageKey = "myArray";
        let myArray = JSON.parse(localStorage.getItem(localStorageKey)) || [];

        // Add the new value to the beginning of the array
        myArray.unshift(value);

        // If the array is longer than 5, remove the last element
        if (myArray.length > 5) {
            myArray.pop();
        }
        // Store the array in local storage
        localStorage.setItem(localStorageKey, JSON.stringify(myArray));
    }

    // Function to retrieve the array from local storage and assign elements to buttons
    function retrieveFromLocalStorage() {
        const localStorageKey = "myArray";
        let myArray = JSON.parse(localStorage.getItem(localStorageKey)) || [];
      
        const buttonContainer = $("#button-container");
        buttonContainer.empty();
      
        // Create a button element for each stored value and append it to the button container
        myArray.forEach((value) => {
          const button = $("<button>").text(value).addClass("historyButton");
          buttonContainer.append(button);
      
          // Add a click event listener to each button
          button.click(function() {
            retrieveRecipe($(this).text());
          });
        });
      }

    function retrieveRecipe(recipeName) {
        fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + recipeName + '&app_id=271c8225&app_key=5374f74deef33c98c857b98a7d45851d')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.hits[0].recipe.ingredients.length; i++) {
                var ingredient = replaceSpaces(data.hits[0].recipe.ingredients[i].food)
                var ingredientUnit = data.hits[0].recipe.ingredients[i].measure
                var ingredientAmount = data.hits[0].recipe.ingredients[i].quantity
                var ingredientAPI = ingredientAmount + "%20" + ingredientUnit + "%20" + ingredient;
                console.log(ingredientAPI);
                if (data.hits[0].recipe.ingredients[i].measure && data.hits[0].recipe.ingredients[i].measure != "<unit>") {
                    fetch('https://api.edamam.com/api/nutrition-data?app_id=cf29f7ff&app_key=84d1ca10c101b0b3508890c74ce78779&nutrition-type=cooking&ingr=' + ingredientAPI)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            const ulElement = document.getElementById("ingredient-list");
                            // Create a new list item
                            const listItem = document.createElement("li");
                            listItem.textContent = data.ingredients[0].text + " - " + data.calories + " calories";
                            // Append the new list item to the ol element
                            ulElement.appendChild(listItem);
                        })
                } else {
                    const ulElement = document.getElementById("ingredient-list");
                    // Create a new list item
                    const listItem = document.createElement("li");
                    listItem.textContent = "No nutrition information found for " + data.hits[0].recipe.ingredients[i].food;
                    // Append the new list item to the ol element
                    ulElement.appendChild(listItem);
                }
            }
        })
    }

    retrieveFromLocalStorage();

    $("#search").click(function (event) {
        $("#ingredient-list").empty();
        caloriesTotal = 0;
        //recpie api documentation link: https://developer.edamam.com/edamam-docs-recipe-api
        var recipeName = $("#recipeField").val();
        saveToLocalStorage(recipeName);
        retrieveFromLocalStorage();
        retrieveRecipe(recipeName);
    });
});
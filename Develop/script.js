$(document).ready(function () {
    function replaceSpaces(str) {
        return str.replace(/\s/g, "%20");
      }

    $("#search").click(function (event) {
        //recpie api documentation link: https://developer.edamam.com/edamam-docs-recipe-api

        var recipeName = $("#recipeField").val();
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
                    fetch('https://api.edamam.com/api/nutrition-data?app_id=cf29f7ff&app_key=84d1ca10c101b0b3508890c74ce78779&nutrition-type=cooking&ingr=' + ingredientAPI)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        const ulElement = document.getElementById("ingredient-list");
                        // Create a new list item
                        const listItem = document.createElement("li");
                        listItem.textContent = data.ingredients[0].text + "-" + data.calories + " calories";
                        // Append the new list item to the ol element
                        ulElement.appendChild(listItem);
                    })
                }
            })




            





            // var query = data.hits[0].recipe.ingredients[i]
            // $.ajax({
            //     method: 'GET',
            //     url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
            //     headers: { 'X-Api-Key': 'BHHPgWSWEz7qCU3ZzHhwlw==QvCiKSXoC0vCl8vL' },
            //     contentType: 'application/json',
            //     success: function (result) {
            //         console.log(result);
            //     },
            //     error: function ajaxError(jqXHR) {
            //         console.error('Error: ', jqXHR.responseText);
            //     }

            // });






        //ingredient nutrition api link: https://fdc.nal.usda.gov/api-guide.html#bkmk-1 

        //search for ingredient name and grab "fdcID" required to search food database
        //currently has "cheddar cheese" as placeholder ingredient to test api response (see last parameter)
        // fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=8VTuU6cSy8y9SdIYrTAAQnJfQAQdJgAXJnSfw58C&query=Cheddar%20Cheese')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //         console.log(data.foods[0].fdcId);
        //         //Use fdcId to search food database and grab first result
        //         //MUST STANDARDIZE PORTION MEASUREMENT... USE GRAMS
        //         fetch('https://api.nal.usda.gov/fdc/v1/food/' + data.foods[0].fdcId + '?api_key=8VTuU6cSy8y9SdIYrTAAQnJfQAQdJgAXJnSfw58C')
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //         })
        //     })
    });
});
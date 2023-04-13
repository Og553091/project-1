$(document).ready(function () {
    $("#search").click(function (event) {
        //recpie api documentation link: https://developer.edamam.com/edamam-docs-recipe-api
        
        var recipeName = $("#recipeField").val();
        fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + recipeName + '&app_id=271c8225&app_key=5374f74deef33c98c857b98a7d45851d')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

        //need to figure out a way to consolidate portion measurement or find other nutrition api that handles cups/other volume based measures (myfitnesspal?)

        //ingredient nutrition api link: https://fdc.nal.usda.gov/api-guide.html#bkmk-1 

        //search for ingredient name and grab "fdcID" required to search food database
        //currently has "cheddar cheese" as placeholder ingredient to test api response (see last parameter)
        fetch('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=8VTuU6cSy8y9SdIYrTAAQnJfQAQdJgAXJnSfw58C&query=Cheddar%20Cheese')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(data.foods[0].fdcId);
                //Use fdcId to search food database and grab first result
                //MUST STANDARDIZE PORTION MEASUREMENT... USE GRAMS
                fetch('https://api.nal.usda.gov/fdc/v1/food/' + data.foods[0].fdcId + '?api_key=8VTuU6cSy8y9SdIYrTAAQnJfQAQdJgAXJnSfw58C')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
            })
    });
});
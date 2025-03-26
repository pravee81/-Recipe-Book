// Function to add a recipe
function addRecipe() {
    let name = document.getElementById("recipeName").value;
    let ingredients = document.getElementById("ingredients").value;
    let steps = document.getElementById("steps").value;
    let imageInput = document.getElementById("recipeImage");

    if (name === "" || ingredients === "" || steps === "") {
        alert("Please fill all fields!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        let imageUrl = e.target.result;

        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push({ name, ingredients, steps, imageUrl });
        localStorage.setItem("recipes", JSON.stringify(recipes));

        displayRecipes();
        clearForm();
    };

    if (imageInput.files.length > 0) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert("Please upload an image.");
    }
}

// Function to display all recipes
function displayRecipes() {
    let recipesContainer = document.getElementById("recipesContainer");
    recipesContainer.innerHTML = "";

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.forEach((recipe, index) => {
        let recipeCard = `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
                <img src="${recipe.imageUrl}" alt="Recipe Image" style="width:100%">
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
                <button onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `;
        recipesContainer.innerHTML += recipeCard;
    });
}

// Function to search for recipes
function searchRecipe() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    let filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) || 
        recipe.ingredients.toLowerCase().includes(query)
    );

    let recipesContainer = document.getElementById("recipesContainer");
    recipesContainer.innerHTML = "";

    filteredRecipes.forEach(recipe => {
        let recipeCard = `
            <div class="recipe-card">
                <h3>${recipe.name}</h3>
                <img src="${recipe.imageUrl}" alt="Recipe Image" style="width:100%">
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
            </div>
        `;
        recipesContainer.innerHTML += recipeCard;
    });
}

// Function to delete a recipe
function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    displayRecipes();
}

// Function to clear input fields after adding a recipe
function clearForm() {
    document.getElementById("recipeName").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("steps").value = "";
    document.getElementById("recipeImage").value = "";
}

// Load recipes when the page loads
document.addEventListener("DOMContentLoaded", displayRecipes);

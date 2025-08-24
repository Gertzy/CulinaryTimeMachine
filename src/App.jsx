import React, { useState, useEffect } from "react";

// A reusable component to manage and display ingredients.
const IngredientList = ({ ingredients, onRemove }) => (
  <div className="flex flex-wrap gap-2 min-h-[4rem]">
    {ingredients.map((item, index) => (
      <div
        key={index}
        className="flex items-center space-x-2 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm"
      >
        <span>{item}</span>
        <button
          onClick={() => onRemove(item)}
          className="text-blue-500 hover:text-blue-700 transition-colors"
          aria-label={`Remove ${item}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    ))}
  </div>
);

// A component that handles the conditional rendering of the recipe, loading state, or a placeholder.
const RecipeDisplay = ({ recipe, isLoading, recipeImage, isImageLoading }) => {
  // Loading state for text generation
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <svg
          className="animate-spin h-10 w-10 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-gray-500">Unearthing a forgotten recipe...</p>
      </div>
    );
  }

  // Placeholder state when no recipe is generated yet
  if (!recipe) {
    return (
      <div className="text-center text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="mt-2">Your culinary adventure awaits!</p>
      </div>
    );
  }

  // Display the generated recipe
  return (
    <div className="text-left space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <span className="inline-block bg-pink-100 text-pink-600 text-sm md:text-base font-bold py-1 px-3 rounded-full uppercase tracking-wider mb-2">
          {recipe.era}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {recipe.recipeName}
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          {recipe.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 italic">
            <span className="font-bold not-italic text-gray-600">
              Fun Fact:
            </span>{" "}
            {recipe.funFact}
          </p>
        </div>
      </div>

      {/* Conditional image rendering with loading state */}
      <div className="flex justify-center items-center w-full h-64 bg-gray-100 rounded-xl overflow-hidden shadow-lg">
        {isImageLoading ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <svg
              className="animate-spin h-8 w-8 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-sm text-gray-500">Conjuring image...</p>
          </div>
        ) : recipeImage ? (
          <img
            src={recipeImage}
            alt={recipe.recipeName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-center px-4">
            <p>Image not available for this recipe.</p>
          </div>
        )}
      </div>

      {/* Recipe ingredients */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Ingredients
        </h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {recipe.ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Recipe instructions */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
          Instructions
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          {recipe.instructions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

// Modal component for displaying saved recipes
const SavedRecipesModal = ({ savedRecipes, onSelectRecipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto transform scale-100 transition-transform">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Saved Recipes
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {savedRecipes.length > 0 ? (
          <ul className="space-y-4">
            {savedRecipes.map((recipe, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => {
                  onSelectRecipe(recipe);
                  onClose();
                }}
              >
                <p className="font-semibold text-gray-800">
                  {recipe.recipeName}
                </p>
                <p className="text-sm text-gray-600 italic">{recipe.era}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 italic">
            You haven't saved any recipes yet.
          </p>
        )}
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NOTE: This is where you should paste your API key.
  // It is recommended to use environment variables for a deployed project.
  const apiKey = "";

  // Load saved recipes from local storage on component mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("culinaryRecipes")) || [];
      setSavedRecipes(saved);
    } catch (error) {
      console.error("Failed to load recipes from local storage:", error);
    }
  }, []);

  // Utility function for exponential backoff
  const exponentialBackoff = async (fn, retries = 5, delay = 1000) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        console.error(`Retrying... (${retries} attempts left)`);
        await new Promise((res) => setTimeout(res, delay));
        return exponentialBackoff(fn, retries - 1, delay * 2);
      } else {
        throw error;
      }
    }
  };

  // Handles adding an ingredient to the list
  const handleAddIngredient = (e) => {
    e.preventDefault();
    const trimmedInput = ingredientInput.trim();
    if (trimmedInput && !ingredients.includes(trimmedInput.toLowerCase())) {
      setIngredients([...ingredients, trimmedInput.toLowerCase()]);
      setIngredientInput("");
    } else if (ingredients.includes(trimmedInput.toLowerCase())) {
      setMessage({ text: "Ingredient already added!", type: "error" });
    }
  };

  // Handles removing an ingredient from the list
  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  // **UPDATED** Generates an image based on the recipe name
  const generateImage = async (recipeName) => {
    setIsImageLoading(true);
    setRecipeImage(null);

    const prompt = `A photograph of "${recipeName}", a rustic and beautiful historical dish, food styling, detailed, high resolution, soft lighting.`;

    // New payload for the generateContent method
    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"], // Requesting an image response
      },
    };

    // New API URL for a compatible model that uses generateContent
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`;

    try {
      const response = await exponentialBackoff(() =>
        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );
      const result = await response.json();

      // The response structure for generateContent is different from predict
      const base64Data = result?.candidates?.[0]?.content?.parts?.find(
        (p) => p.inlineData
      )?.inlineData?.data;

      if (base64Data) {
        const imageUrl = `data:image/png;base64,${base64Data}`;
        setRecipeImage(imageUrl);
        setMessage({ text: "Image generated!", type: "success" });
      } else {
        console.error("Image generation failed, API response:", result);
        setMessage({
          text: "Could not generate an image. Check console for details.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to generate image:", error);
      setMessage({ text: "Failed to generate image.", type: "error" });
    } finally {
      setIsImageLoading(false);
    }
  };

  // Asynchronously fetches a recipe based on ingredients using the Gemini API
  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      setMessage({
        text: "Please add at least one ingredient to generate a recipe.",
        type: "error",
      });
      return;
    }

    setMessage({ text: "", type: "" });
    setIsLoading(true);
    setRecipe(null);
    setRecipeImage(null); // Clear previous image

    const ingredientPrompt = ingredients.join(", ");
    const prompt = `Generate a historical recipe based on the following ingredients. The recipe must include a culinary era, a recipe name, a brief description, a fun fact about the era or dish, a list of ingredients with quantities, and step-by-step instructions. The response should be a JSON object. Ingredients: ${ingredientPrompt}.`;

    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];

    // Define the JSON schema for the structured response
    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            era: { type: "STRING" },
            recipeName: { type: "STRING" },
            description: { type: "STRING" },
            funFact: { type: "STRING" },
            ingredients: { type: "ARRAY", items: { type: "STRING" } },
            instructions: { type: "ARRAY", items: { type: "STRING" } },
          },
          propertyOrdering: [
            "era",
            "recipeName",
            "description",
            "funFact",
            "ingredients",
            "instructions",
          ],
        },
      },
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const response = await exponentialBackoff(() =>
        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (responseText) {
        const parsedRecipe = JSON.parse(responseText);
        setRecipe(parsedRecipe);
        setMessage({
          text: "Recipe generated! Now creating an image...",
          type: "success",
        });
        // Call the image generation function after successfully getting the recipe
        await generateImage(parsedRecipe.recipeName);
      } else {
        setMessage({
          text: "Could not generate a recipe. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      setMessage({
        text: "Failed to connect to the server. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save the current recipe to local storage
  const handleSaveRecipe = () => {
    if (recipe) {
      const newRecipe = { ...recipe, id: Date.now(), imageUrl: recipeImage };
      const updatedRecipes = [...savedRecipes, newRecipe];
      setSavedRecipes(updatedRecipes);
      localStorage.setItem("culinaryRecipes", JSON.stringify(updatedRecipes));
      setMessage({ text: "Recipe saved!", type: "success" });
    } else {
      setMessage({ text: "Nothing to save!", type: "error" });
    }
  };

  // Function to load a saved recipe and display it
  const handleLoadRecipe = (selectedRecipe) => {
    setRecipe(selectedRecipe);
    setRecipeImage(selectedRecipe.imageUrl);
    setIsModalOpen(false);
    setMessage({ text: "Recipe loaded!", type: "success" });
  };

  // Renders the message box with a fade-out effect
  const renderMessageBox = () => {
    if (!message.text) return null;
    return (
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl transition-opacity duration-500           ${
          message.type === "error"
            ? "bg-red-500 text-white"
            : "bg-green-500 text-white"
        }
        }`}
      >
        {message.text}
      </div>
    );
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gray-100 font-sans">
      {renderMessageBox()}
      {isModalOpen && (
        <SavedRecipesModal
          savedRecipes={savedRecipes}
          onSelectRecipe={handleLoadRecipe}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Left Panel: Ingredient Input */}
        <div className="w-full lg:w-1/2 space-y-6 flex flex-col">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800">
            Culinary Time Machine 🕰️
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light">
            Enter the ingredients you have and discover a recipe from another
            era, complete with an image and instructions!
          </p>
          <form
            onSubmit={handleAddIngredient}
            className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0"
          >
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="e.g., pasta, tomato, onion"
              className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </form>
          <IngredientList
            ingredients={ingredients}
            onRemove={handleRemoveIngredient}
          />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={generateRecipe}
              disabled={isLoading || ingredients.length === 0}
              className={`w-full py-4 rounded-xl text-lg font-bold text-white shadow-lg transition-all               ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? "Searching Eras..." : "Generate a Historical Recipe"}
            </button>
            <button
              onClick={handleSaveRecipe}
              disabled={!recipe || isLoading}
              className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg transition-all               ${
                !recipe
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-500 text-white hover:bg-yellow-600"
              }`}
            >
              Save Recipe
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 rounded-xl text-lg font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 transition-colors shadow-md"
          >
            View Saved Recipes
          </button>
        </div>
        {/* Right Panel: Recipe Display */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center bg-gray-50 rounded-2xl p-6 sm:p-8 shadow-inner transition-all duration-500">
          <RecipeDisplay
            recipe={recipe}
            isLoading={isLoading}
            recipeImage={recipeImage}
            isImageLoading={isImageLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

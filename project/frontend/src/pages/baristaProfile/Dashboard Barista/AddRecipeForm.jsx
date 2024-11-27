import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import ProductPopup from "./ProductPopup";
import Swal from "sweetalert2";

const AddRecipeForm = () => {
  const [name, setName] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [categories, setCategories] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [preparationSteps, setPreparationSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [image, setImage] = useState(null);
  const [background, setBg] = useState(null);
  const [selectedSyrups, setSelectedSyrups] = useState([]);
  const [showSyrupPopup, setShowSyrupPopup] = useState(false);
  const [syrups, setSyrups] = useState([]);


  const fetchSyrups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/beverage/syrups",
        { withCredentials: true }
      );
      setSyrups(response.data);
    } catch (error) {
      console.error("Error fetching syrups:", error);
    }
  };

  useEffect(() => {
    fetchSyrups();
  }, []);

  const handleDrop = (acceptedFiles, type) => {
    const file = acceptedFiles[0];
    if (type === "image") {
      setImage(file);
    } else if (type === "background") {
      setBg(file);
    }
  };

  const handleAddPreparationStep = () => {
    setPreparationSteps([...preparationSteps, ""]);
  };

  const handlePreparationChange = (index, value) => {
    const steps = [...preparationSteps];
    steps[index] = value;
    setPreparationSteps(steps);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const handleSyrupSelect = (syrup) => {
    setSelectedSyrups([...selectedSyrups, syrup]);
    setShowSyrupPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const syrupsArray = selectedSyrups.map((syrup) => syrup._id);
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cookingTime", cookingTime);
    formData.append("categories", categories);
    formData.append("dietaryRestrictions", dietaryRestrictions);
    formData.append("preparationSteps", JSON.stringify(preparationSteps));
    formData.append("ingredients", JSON.stringify(ingredients));
    if (image) {
      formData.append("image", image);
    }
    if (background) {
      formData.append("background", background);
    }
    formData.append("syrups", JSON.stringify(syrupsArray));
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/recipe/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      // عرض SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'تم إضافة الوصفة بنجاح!',
        showConfirmButton: false,
        timer: 1500
      });
      
      // تفريغ الحقول
      setName("");
      setCookingTime("");
      setCategories("");
      setDietaryRestrictions("");
      setPreparationSteps([""]);
      setIngredients([""]);
      setImage(null);
      setBg(null);
      setSelectedSyrups([]);
    } catch (error) {
      console.error("Error adding Recipe:", error);
    }
  };
  


  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "image"),
    accept: "image/*",
  });

  const { getRootProps: getBgRootProps, getInputProps: getBgInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles, "background"),
    accept: "image/*",
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Categories */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter recipe name"
            />
          </div>
          <div>
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-700"
            >
              Categories
            </label>
            <input
              type="text"
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="e.g., Dessert, Main Course"
            />
          </div>
        </div>

        {/* Cooking Time and Dietary Restrictions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="cookingTime"
              className="block text-sm font-medium text-gray-700"
            >
              Cooking Time
            </label>
            <input
              type="text"
              id="cookingTime"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="e.g., 30 minutes"
            />
          </div>
          <div>
            <label
              htmlFor="dietaryRestrictions"
              className="block text-sm font-medium text-gray-700"
            >
              Dietary Restrictions
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="e.g., Gluten-Free, Vegan"
            />
          </div>
        </div>

        {/* Preparation Steps and Ingredients */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preparation Steps
            </label>
            {preparationSteps.map((step, index) => (
              <input
                key={index}
                type="text"
                value={step}
                onChange={(e) => handlePreparationChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mb-2"
                placeholder={`Step ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={handleAddPreparationStep}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 mt-2"
            >
              Add Preparation
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            {ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mb-2"
                placeholder={`Ingredient ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 mt-2"
            >
              Add Ingredient
            </button>
          </div>
        </div>

        {/* Syrups Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Syrups
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {selectedSyrups.map((syrup, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {syrup.name}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedSyrups(selectedSyrups.filter((_, i) => i !== index))
                  }
                  className="ml-2 text-red-500"
                >
                  &times;
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => setShowSyrupPopup(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-slate-400"
            >
              Select Syrups
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div
          {...getImageRootProps()}
          className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer"
        >
          <input {...getImageInputProps()} />
          <p className="text-gray-500">Drag 'n' drop image here, or click to select one</p>
        </div>
        {image && (
          <div className="mt-2">
            <p>Selected Image:</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
              className="w-32 h-32 object-cover mt-2"
            />
          </div>
        )}

        {/* Background Image Upload */}
        <div
          {...getBgRootProps()}
          className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer"
        >
          <input {...getBgInputProps()} />
          <p className="text-gray-500">Drag 'n' drop background image here, or click to select one</p>
        </div>
        {background && (
          <div className="mt-2">
            <p>Selected Background Image:</p>
            <img
              src={URL.createObjectURL(background)}
              alt="Selected"
              className="w-32 h-32 object-cover mt-2"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-slate-400"
        >
          Add Recipe
        </button>
      </form>

      {showSyrupPopup && (
        <ProductPopup
          syrups={syrups}
          onSelect={handleSyrupSelect}
          onClose={() => setShowSyrupPopup(false)}
        />
      )}
    </div>
  );
};

export default AddRecipeForm;

import React, { useEffect, useState } from "react";
import axios from "axios";

const BeveragesAndRecipesList = () => {
  const [beverages, setBeverages] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewOption, setViewOption] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    cookingTime: "",
    category: "",
    quantityAvailable: "",
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [beveragesResponse, recipesResponse, productsResponse] =
          await Promise.all([
            axios.get("http://localhost:3000/api/beverage/get", {
              withCredentials: true,
            }),
            axios.get("http://localhost:3000/api/recipe/get", {
              withCredentials: true,
            }),
            axios.get("http://localhost:3000/api/beverage/syrups", {
              withCredentials: true,
            }),
          ]);
        setBeverages(beveragesResponse.data);
        setRecipes(recipesResponse.data);
        setProducts(productsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteItem = async (id, type) => {
    try {
      if (type === "beverages") {
        await axios.delete(`http://localhost:3000/api/beverage/del/${id}`, {
          withCredentials: true,
        });
        setBeverages(beverages.filter((beverage) => beverage._id !== id));
      } else {
        await axios.delete(`http://localhost:3000/api/recipe/del/${id}`, {
          withCredentials: true,
        });
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price || "",
      cookingTime: item.cookingTime || "",
      category: item.category || "",
      quantityAvailable: item.quantityAvailable || "",
      products: item.products ? item.products.map((p) => p._id) : [],
    });
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const isChecked = e.target.checked;
    setEditForm((prevForm) => ({
      ...prevForm,
      products: isChecked
        ? [...prevForm.products, productId]
        : prevForm.products.filter((id) => id !== productId),
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const type = editingItem.price !== undefined ? "beverage" : "recipe";
      const formData = new FormData();
      Object.keys(editForm).forEach((key) => {
        if (key === "products") {
          formData.append(key, JSON.stringify(editForm[key]));
        } else {
          formData.append(key, editForm[key]);
        }
      });
      if (e.target.image.files[0]) {
        formData.append("image", e.target.image.files[0]);
      }

      const response = await axios.put(
        `http://localhost:3000/api/${type}/update/${editingItem._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (type === "beverage") {
        setBeverages(
          beverages.map((item) =>
            item._id === editingItem._id ? response.data : item
          )
        );
      } else {
        setRecipes(
          recipes.map((item) =>
            item._id === editingItem._id ? response.data : item
          )
        );
      }

      setEditingItem(null);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredItems =
    viewOption === "all"
      ? [...beverages, ...recipes]
      : viewOption === "beverages"
      ? beverages
      : recipes;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Manage Beverages and Recipes
      </h2>

      <select
        value={viewOption}
        onChange={(e) => setViewOption(e.target.value)}
        style={{
          marginBottom: "16px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="all">Show All</option>
        <option value="beverages">Show Beverages Only</option>
        <option value="recipes">Show Recipes Only</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {editingItem && editingItem._id === item._id ? (
              <form onSubmit={handleEditSubmit} style={{ padding: "16px" }}>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  placeholder="Name"
                  style={{ width: "100%", marginBottom: "8px", padding: "4px" }}
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  placeholder="Description"
                  style={{ width: "100%", marginBottom: "8px", padding: "4px" }}
                />
                {item.price !== undefined && (
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditFormChange}
                    placeholder="Price"
                    style={{
                      width: "100%",
                      marginBottom: "8px",
                      padding: "4px",
                    }}
                  />
                )}
                {item.cookingTime !== undefined && (
                  <input
                    type="text"
                    name="cookingTime"
                    value={editForm.cookingTime}
                    onChange={handleEditFormChange}
                    placeholder="Cooking Time"
                    style={{
                      width: "100%",
                      marginBottom: "8px",
                      padding: "4px",
                    }}
                  />
                )}
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditFormChange}
                  placeholder="Category"
                  style={{ width: "100%", marginBottom: "8px", padding: "4px" }}
                />
                {item.quantityAvailable !== undefined && (
                  <input
                    type="number"
                    name="quantityAvailable"
                    value={editForm.quantityAvailable}
                    onChange={handleEditFormChange}
                    placeholder="Quantity Available"
                    style={{
                      width: "100%",
                      marginBottom: "8px",
                      padding: "4px",
                    }}
                  />
                )}
                <div>
                  <p>Associated Products:</p>
                  {products.map((product) => (
                    <label
                      key={product._id}
                      style={{ display: "block", marginBottom: "4px" }}
                    >
                      <input
                        type="checkbox"
                        value={product._id}
                        checked={editForm.products.includes(product._id)}
                        onChange={handleProductChange}
                      />
                      {product.name}
                    </label>
                  ))}
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  style={{ marginBottom: "8px" }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginLeft: "8px",
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div style={{ position: "relative", paddingBottom: "56.25%" }}>
                  <img
                    src={`http://localhost:3000/${item.photos}`}
                    alt={item.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "semibold",
                      marginBottom: "8px",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginBottom: "8px",
                    }}
                  >
                    {item.description}
                  </p>
                  {item.price && (
                    <p style={{ fontWeight: "bold" }}>Price: ${item.price}</p>
                  )}
                  {item.cookingTime && <p>Cooking Time: {item.cookingTime}</p>}
                  {item.products && item.products.length > 0 && (
                    <div style={{ marginTop: "8px" }}>
                      <p style={{ fontWeight: "semibold" }}>
                        Associated Products:
                      </p>
                      <ul
                        style={{ listStyleType: "disc", paddingLeft: "20px" }}
                      >
                        {item.products.map((product) => (
                          <li key={product._id} style={{ fontSize: "14px" }}>
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "16px",
                  }}
                >
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      deleteItem(item._id, item.price ? "beverages" : "recipes")
                    }
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#ff4d4f",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeveragesAndRecipesList;

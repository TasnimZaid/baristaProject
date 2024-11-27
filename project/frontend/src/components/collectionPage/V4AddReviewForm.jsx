// import React, { useState } from "react";
// import axios from "axios";

// const V4AddReviewForm = ({ recipeId, userId, baristaId }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(`http://localhost:3000/api/recipes/${recipeId}/reviews`, {
//         userId,
//         baristaId,
//         rating,
//         comment
//       });

//       setSuccess("Review added successfully!");
//       setRating(0);
//       setComment("");
//     } catch (error) {
//       setError("Failed to add review.");
//     }
//   };

//   return (
//     <div>
//       <h2>Add a Review</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Rating (1-5):</label>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Comment:</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default V4AddReviewForm;
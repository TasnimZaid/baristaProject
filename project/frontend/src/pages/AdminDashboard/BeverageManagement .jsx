// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const BeverageManagement = () => {
//   const [beverages, setBeverages] = useState([]);

//   useEffect(() => {
//     const fetchBeverages = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/api/admin/beverages"
//         );
//         setBeverages(response.data);
//       } catch (error) {
//         console.error("Error fetching beverages:", error);
//       }
//     };

//     fetchBeverages();
//   }, []);

//   return (
//     <div className="beverage-management">
//       <h2>Beverage Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Barista</th>
//             <th>Price</th>
//             <th>Quantity Available</th>
//             <th>Rating</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {beverages.map((beverage) => (
//             <tr key={beverage._id}>
//               <td>{beverage.name}</td>
//               <td>{beverage.baristaId.username}</td>
//               <td>${beverage.price.toFixed(2)}</td>
//               <td>{beverage.quantityAvailable}</td>
//               <td>{beverage.rating.toFixed(1)}</td>
//               <td>
//                 {/* <button onClick={() => handleView(beverage._id)}>View</button> */}
//                 <button >View</button>
//                 {/* <button onClick={() => handleEdit(beverage._id)}>Edit</button> */}
//                 <button>Edit</button>
//                 {/* <button onClick={() => handleDelete(beverage._id)}> Delete</button> */}
//                 <button > Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BeverageManagement;
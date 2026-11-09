// import { useState } from "react"
// import { ProductType } from "@/components/buyer/Product";


// const CreateProduk = ({ onAdd }: { onAdd: (product: ProductType) => void }) => {
//     const [formData, setFormData] = useState({
//         title: "", description: "", category: "", price: 0
//     });
//     // Property 'thumbnail' is missing in type '{ title: string; description: string; category: string; price: number; id: number; }

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newProduct: ProductType = {
//             ...formData ,
//         }
//         onAdd(newProduct);
//         setFormData({ title: "", description: "", category: "", price: 0 });
//     }

//     return (
//         <form onSubmit={handleSubmit} className="flex flex-col gap-2">
//              {/* <input type="text" placeholder="Image URL" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} required /> */}
//             <input type="text" placeholder="Product Name" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
//             <textarea className="h-64" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
//             <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
//             <input
//                 type="number"
//                 placeholder="Price"
//                 value={formData.price}
//                 onChange={(e) => {
//                     const value = e.target.value;
//                     setFormData({
//                         ...formData,
//                         price: value === "" ? 0 : parseFloat(value)  // ← kalau kosong, set 0
//                     });
//                 }}
//                 required
//             />            
//             <button type="submit" className="bg-mypeken-brand text-white py-2 px-4 rounded">Add Product</button>
//         </form>
//     );

// }

// export default CreateProduk
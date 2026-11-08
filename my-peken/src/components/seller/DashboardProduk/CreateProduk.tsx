import { useState } from "react"
import { ProductType } from "@/components/buyer/types";

const CreateProduk = ({ onAdd }: { onAdd: (product: ProductType) => void }) => {
    const [formData, setFormData] = useState({
        name: "", description: "", category: "", price: 0, images: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: ProductType = {
            id: Date.now(), ...formData,
        }
        onAdd(newProduct);
        setFormData({ name: "", description: "", category: "", price: 0, images: "" });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
            <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => {
                    const value = e.target.value;
                    setFormData({
                        ...formData,
                        price: value === "" ? 0 : parseFloat(value)  // ← kalau kosong, set 0
                    });
                }}
                required
            />            <input type="text" placeholder="Image URL" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} required />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Product</button>
        </form>
    );

}

export default CreateProduk
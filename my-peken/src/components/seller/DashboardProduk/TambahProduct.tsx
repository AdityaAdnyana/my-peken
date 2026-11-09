"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/components/buyer/Product";
import { addProductToApi } from "@/services/ProductService";
import FormatRupiah from "@/components/FormatRupiah";

const DEFAULT_THUMBNAIL = "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/1.webp";

interface TambahProductProps {
    onSuccess?: (newProduct: ProductType) => void;
}

export default function TambahProduct({ onSuccess }: TambahProductProps) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: 0,
        discountPercentage: 0,
        stock: 1,
        tagsText: "",
        brand: "",
        sku: "",
        weight: 0,
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "In Stock",
        returnPolicy: "",
        minimumOrderQuantity: 1,
    });

    const [pesanSukses, setPesanSukses] = useState("");
    const [pesanError, setPesanError] = useState("");
    const [sedangMengirim, setSedangMengirim] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSedangMengirim(true);
        setPesanError("");
        setPesanSukses("");

        try {
            const tagsArray = formData.tagsText
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0);

            const productBaru: Omit<ProductType, "id"> = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                price: formData.price,
                discountPercentage: formData.discountPercentage,
                stock: formData.stock,
                tags: tagsArray,
                brand: formData.brand,
                sku: formData.sku,
                weight: formData.weight,
                warrantyInformation: formData.warrantyInformation,
                shippingInformation: formData.shippingInformation,
                availabilityStatus: formData.availabilityStatus,
                returnPolicy: formData.returnPolicy,
                minimumOrderQuantity: formData.minimumOrderQuantity,
                thumbnail: DEFAULT_THUMBNAIL,
                images: [DEFAULT_THUMBNAIL],
                isHidden: false,
            };

            const hasil = await addProductToApi(productBaru);

            if (onSuccess) {
                onSuccess(hasil);
            }

            setPesanSukses(`Produk "${hasil.title}" berhasil ditambahkan!`);
            setFormData({
                title: "",
                description: "",
                category: "",
                price: 0,
                discountPercentage: 0,
                stock: 1,
                tagsText: "",
                brand: "",
                sku: "",
                weight: 0,
                warrantyInformation: "",
                shippingInformation: "",
                availabilityStatus: "In Stock",
                returnPolicy: "",
                minimumOrderQuantity: 1,
            });

            setTimeout(() => {
                router.push("/DashboardProduk");
            }, 1200);
        } catch (err) {
            setPesanError(err instanceof Error ? err.message : "Gagal menambahkan produk.");
        } finally {
            setSedangMengirim(false);
        }
    };

    const idrPreview = formData.price < 1000 ? Math.round(formData.price * 18000) : Math.round(formData.price);

    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm max-w-3xl">
            <p className="font-bold text-xl text-mypeken-black mb-1">Tambah Produk Baru</p>
            <p className="text-sm text-mypeken-gray mb-4">
                Isi detail produk di bawah ini untuk menambahkan produk ke etalase.
            </p>

            {pesanSukses && (
                <div className="mb-4 p-3 bg-mypeken-brand/10 border border-mypeken-brand/30 rounded-lg text-sm text-mypeken-brand">
                    {pesanSukses}
                </div>
            )}

            {pesanError && (
                <div className="mb-4 p-3 bg-mypeken-highligh/10 border border-mypeken-highligh/30 rounded-lg text-sm text-mypeken-highligh">
                    {pesanError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Nama Produk (Title)</label>
                    <input
                        type="text"
                        placeholder="Contoh: Kopi Arabika Kintamani 250g"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Deskripsi</label>
                    <textarea
                        placeholder="Tulis deskripsi produk..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white h-28"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Harga (Rp)</label>
                        <input
                            type="number"
                            step="any"
                            placeholder="Contoh: 75000"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value === "" ? 0 : parseFloat(e.target.value),
                                })
                            }
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                            required
                        />
                        <p className="text-xs text-mypeken-gray">
                            Tampil: <FormatRupiah nilai={idrPreview} />
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Diskon (%)</label>
                        <input
                            type="number"
                            step="any"
                            value={formData.discountPercentage}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    discountPercentage: e.target.value === "" ? 0 : parseFloat(e.target.value),
                                })
                            }
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Stok</label>
                        <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    stock: e.target.value === "" ? 0 : parseInt(e.target.value),
                                })
                            }
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Kategori</label>
                        <input
                            type="text"
                            placeholder="Contoh: groceries"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Tags (pisahkan dengan koma)</label>
                        <input
                            type="text"
                            placeholder="Contoh: kopi, bali, organik"
                            value={formData.tagsText}
                            onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Brand</label>
                        <input
                            type="text"
                            placeholder="Contoh: MyPeken Lokal"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">SKU</label>
                        <input
                            type="text"
                            placeholder="Contoh: MPK-001"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Berat (gram/kg)</label>
                        <input
                            type="number"
                            step="any"
                            value={formData.weight}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    weight: e.target.value === "" ? 0 : parseFloat(e.target.value),
                                })
                            }
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Status Ketersediaan</label>
                        <input
                            type="text"
                            value={formData.availabilityStatus}
                            onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Minimum Order</label>
                        <input
                            type="number"
                            value={formData.minimumOrderQuantity}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    minimumOrderQuantity: e.target.value === "" ? 1 : parseInt(e.target.value),
                                })
                            }
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Info Garansi</label>
                        <input
                            type="text"
                            placeholder="Contoh: Garansi 7 hari"
                            value={formData.warrantyInformation}
                            onChange={(e) => setFormData({ ...formData, warrantyInformation: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Info Pengiriman</label>
                        <input
                            type="text"
                            placeholder="Contoh: Dikirim dalam 1 hari"
                            value={formData.shippingInformation}
                            onChange={(e) => setFormData({ ...formData, shippingInformation: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Kebijakan Retur</label>
                        <input
                            type="text"
                            placeholder="Contoh: 7 hari pengembalian"
                            value={formData.returnPolicy}
                            onChange={(e) => setFormData({ ...formData, returnPolicy: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={sedangMengirim}
                    className="bg-mypeken-brand text-white py-2 px-4 rounded-lg font-semibold text-sm hover:opacity-90 mt-2"
                >
                    {sedangMengirim ? "Menambahkan..." : "Tambah Produk"}
                </button>
            </form>
        </div>
    );
}

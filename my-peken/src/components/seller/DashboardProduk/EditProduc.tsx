"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/components/buyer/Product";
import {
    deleteProductFromApi,
    updateProductInApi,
    useProductDetail,
} from "@/services/ProductService";
import FormatRupiah from "@/components/FormatRupiah";

interface EditProducProps {
    productId?: string | number;
}

export default function EditProduc({ productId }: EditProducProps) {
    const router = useRouter();
    const { product, isLoading, isError, mutate } = useProductDetail(productId);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: 0,
        discountPercentage: 0,
        stock: 0,
        tagsText: "",
        brand: "",
        sku: "",
        weight: 0,
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "In Stock",
        returnPolicy: "",
        minimumOrderQuantity: 1,
        thumbnail: "",
        imagesText: "",
        isHidden: false,
    });

    const [pesanSukses, setPesanSukses] = useState("");
    const [pesanError, setPesanError] = useState("");
    const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || "",
                description: product.description || "",
                category: product.category || "",
                price: product.price || 0,
                discountPercentage: product.discountPercentage || 0,
                stock: product.stock || 0,
                tagsText: Array.isArray(product.tags) ? product.tags.join(", ") : "",
                brand: product.brand || "",
                sku: product.sku || "",
                weight: product.weight || 0,
                warrantyInformation: product.warrantyInformation || "",
                shippingInformation: product.shippingInformation || "",
                availabilityStatus: product.availabilityStatus || "In Stock",
                returnPolicy: product.returnPolicy || "",
                minimumOrderQuantity: product.minimumOrderQuantity || 1,
                thumbnail: product.thumbnail || "",
                imagesText: Array.isArray(product.images) ? product.images.join(", ") : "",
                isHidden: Boolean(product.isHidden),
            });
        }
    }, [product?.id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        setSedangMenyimpan(true);
        setPesanError("");
        setPesanSukses("");

        try {
            const tagsArray = formData.tagsText
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0);

            const imagesArray = formData.imagesText
                .split(",")
                .map((img) => img.trim())
                .filter((img) => img.length > 0);

            const payload: Partial<ProductType> = {
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
                thumbnail: formData.thumbnail,
                images: imagesArray.length > 0 ? imagesArray : [formData.thumbnail],
                isHidden: formData.isHidden,
            };

            await updateProductInApi(product.id, payload);
            await mutate();
            setPesanSukses("Data produk berhasil diperbarui!");
        } catch (err) {
            setPesanError(err instanceof Error ? err.message : "Gagal memperbarui produk.");
        } finally {
            setSedangMenyimpan(false);
        }
    };

    const handleToggleHide = async () => {
        if (!product) return;
        const statusBaru = !formData.isHidden;
        setFormData({ ...formData, isHidden: statusBaru });

        try {
            await updateProductInApi(product.id, { isHidden: statusBaru });
            await mutate();
            setPesanSukses(
                statusBaru
                    ? "Status produk diubah menjadi Hidden (Disembunyikan di etalase seller)."
                    : "Status produk diubah menjadi Ditampilkan."
            );
        } catch (err) {
            setPesanError(err instanceof Error ? err.message : "Gagal mengubah status hide produk.");
        }
    };

    const handleDelete = async () => {
        if (!product) return;
        setSedangMenyimpan(true);
        setPesanError("");

        try {
            await deleteProductFromApi(product.id);
            router.push("/DashboardProduk");
        } catch (err) {
            setPesanError(err instanceof Error ? err.message : "Gagal menghapus produk.");
            setSedangMenyimpan(false);
        }
    };

    if (isLoading) {
        return <p className="p-4 text-mypeken-gray">Memuat data produk...</p>;
    }

    if (isError || !product) {
        return <p className="p-4 text-mypeken-highligh">Produk tidak ditemukan.</p>;
    }

    const idrPreview = formData.price < 1000 ? Math.round(formData.price * 18000) : Math.round(formData.price);

    return (
        <div className="bg-mypeken-white border border-mypeken-light-gray rounded-xl p-5 shadow-sm max-w-3xl">
            <div className="flex flex-row justify-between items-center mb-4">
                <div>
                    <p className="font-bold text-xl text-mypeken-black">Edit Produk</p>
                    <p className="text-xs text-mypeken-gray">ID Produk: {product.id}</p>
                </div>

                <div className="flex flex-row gap-2">
                    <button
                        type="button"
                        onClick={handleToggleHide}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            formData.isHidden
                                ? "bg-mypeken-cta text-white border-mypeken-cta"
                                : "bg-white text-mypeken-black border-mypeken-light-gray hover:bg-mypeken-light-gray/40"
                        }`}
                    >
                        {formData.isHidden ? "Status: Hidden (Klik untuk Tampilkan)" : "Ubah ke Hide"}
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={sedangMenyimpan}
                        className="bg-mypeken-highligh text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90"
                    >
                        Hapus Produk
                    </button>
                </div>
            </div>

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

            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Nama Produk (Title)</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Deskripsi</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white h-28"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Harga</label>
                        <input
                            type="number"
                            step="any"
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
                            placeholder="Contoh: sayur, segar, organik"
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
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">SKU</label>
                        <input
                            type="text"
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
                            value={formData.warrantyInformation}
                            onChange={(e) => setFormData({ ...formData, warrantyInformation: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Info Pengiriman</label>
                        <input
                            type="text"
                            value={formData.shippingInformation}
                            onChange={(e) => setFormData({ ...formData, shippingInformation: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-mypeken-black">Kebijakan Retur</label>
                        <input
                            type="text"
                            value={formData.returnPolicy}
                            onChange={(e) => setFormData({ ...formData, returnPolicy: e.target.value })}
                            className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Link Gambar Utama (Thumbnail URL)</label>
                    <input
                        type="text"
                        value={formData.thumbnail}
                        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-mypeken-black">Link Gambar Tambahan (pisahkan dengan koma)</label>
                    <input
                        type="text"
                        value={formData.imagesText}
                        onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                        className="border border-mypeken-light-gray rounded-lg px-3 py-2 text-sm bg-white"
                    />
                </div>

                <button
                    type="submit"
                    disabled={sedangMenyimpan}
                    className="bg-mypeken-brand text-white py-2 px-4 rounded-lg font-semibold text-sm hover:opacity-90 mt-2"
                >
                    {sedangMenyimpan ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </form>
        </div>
    );
}

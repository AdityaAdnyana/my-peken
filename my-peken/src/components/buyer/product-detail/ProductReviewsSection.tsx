"use client";

import { useState, useMemo, type FormEvent } from "react";
import { CheckCircle2, PencilLine, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductReview } from "../Product";

interface ProductReviewsSectionProps {
    allReviews: ProductReview[];
    averageRating: number;
    activeVariantName?: string;
    onAddReview: (review: ProductReview) => void;
}

export function ProductReviewsSection({
    allReviews,
    averageRating,
    activeVariantName,
    onAddReview,
}: ProductReviewsSectionProps) {
    const [starFilter, setStarFilter] = useState<number | "all">("all");
    const [reviewSort, setReviewSort] = useState<"newest" | "highest" | "lowest">("newest");
    const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
    const [reviewerName, setReviewerName] = useState<string>("");
    const [reviewerEmail, setReviewerEmail] = useState<string>("");
    const [reviewRating, setReviewRating] = useState<number>(5);
    const [reviewComment, setReviewComment] = useState<string>("");
    const [reviewFormErrors, setReviewFormErrors] = useState<{
        name?: string;
        email?: string;
        rating?: string;
        comment?: string;
    }>({});
    const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string | null>(null);

    const filteredReviews = useMemo(() => {
        const filtered =
            starFilter === "all"
                ? [...allReviews]
                : allReviews.filter((r) => Math.round(r.rating) === starFilter);

        return filtered.sort((a, b) => {
            if (reviewSort === "highest") return b.rating - a.rating;
            if (reviewSort === "lowest") return a.rating - b.rating;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [allReviews, starFilter, reviewSort]);

    const satisfiedCount = useMemo(
        () => allReviews.filter((r) => Math.round(r.rating) >= 4).length,
        [allReviews]
    );
    const satisfiedPercentage =
        allReviews.length > 0
            ? Math.round((satisfiedCount / allReviews.length) * 100)
            : 98;

    const formattedRating = averageRating.toFixed(1).replace(".", ",");

    const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setReviewSuccessMessage(null);

        const errors: {
            name?: string;
            email?: string;
            rating?: string;
            comment?: string;
        } = {};

        const cleanName = reviewerName.trim();
        const cleanEmail = reviewerEmail.trim();
        const cleanComment = reviewComment.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (cleanName.length < 3) {
            errors.name = "Nama pengulas wajib diisi (minimal 3 karakter).";
        }
        if (!emailRegex.test(cleanEmail)) {
            errors.email = "Masukkan alamat email yang valid (contoh: nama@email.com).";
        }
        if (reviewRating < 1 || reviewRating > 5) {
            errors.rating = "Pilih rating antara 1 hingga 5 bintang.";
        }
        if (cleanComment.length < 10) {
            errors.comment =
                "Ulasan wajib diisi minimal 10 karakter agar bermanfaat bagi pembeli lain.";
        }

        if (Object.keys(errors).length > 0) {
            setReviewFormErrors(errors);
            return;
        }

        setReviewFormErrors({});
        onAddReview({
            reviewerName: cleanName,
            reviewerEmail: cleanEmail,
            rating: reviewRating,
            comment: cleanComment,
            date: new Date().toISOString(),
            variantName: activeVariantName,
        });

        setReviewerName("");
        setReviewerEmail("");
        setReviewRating(5);
        setReviewComment("");
        setShowReviewForm(false);
        setReviewSuccessMessage("Terima kasih! Ulasan Anda berhasil ditambahkan.");
    };

    return (
        <section
            id="ulasan-produk"
            aria-labelledby="reviews-heading"
            className="space-y-6 pt-4 border-t border-mypeken-light-gray"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h2
                        id="reviews-heading"
                        className="text-lg sm:text-xl font-bold text-mypeken-black"
                    >
                        Ulasan Pembeli
                    </h2>
                </div>
                <Button
                    type="button"
                    variant={showReviewForm ? "secondary" : "default"}
                    onClick={() => setShowReviewForm((prev) => !prev)}
                    className="cursor-pointer gap-2 self-start sm:self-auto"
                >
                    <PencilLine className="h-4 w-4" aria-hidden="true" />
                    {showReviewForm ? "Tutup Form Ulasan" : "Tulis Ulasan"}
                </Button>
            </div>

            {showReviewForm && (
                <form
                    noValidate
                    onSubmit={handleReviewSubmit}
                    aria-label="Formulir tambah ulasan produk"
                    className="rounded-xl border border-mypeken-light-gray bg-white p-4 sm:p-5 space-y-4"
                >
                    <h3 className="text-base font-bold text-mypeken-brand">
                        Bagikan Pengalaman Belanja Anda
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="reviewer-name">Nama Lengkap *</Label>
                            <Input
                                id="reviewer-name"
                                type="text"
                                placeholder="Contoh: Made Wirawan"
                                value={reviewerName}
                                onChange={(e) => setReviewerName(e.target.value)}
                                aria-invalid={Boolean(reviewFormErrors.name)}
                                className="border-mypeken-light-gray bg-white"
                            />
                            {reviewFormErrors.name && (
                                <p role="alert" className="text-xs text-mypeken-highligh">
                                    {reviewFormErrors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="reviewer-email">Alamat Email *</Label>
                            <Input
                                id="reviewer-email"
                                type="email"
                                placeholder="nama@email.com"
                                value={reviewerEmail}
                                onChange={(e) => setReviewerEmail(e.target.value)}
                                aria-invalid={Boolean(reviewFormErrors.email)}
                                className="border-mypeken-light-gray bg-white"
                            />
                            {reviewFormErrors.email && (
                                <p role="alert" className="text-xs text-mypeken-highligh">
                                    {reviewFormErrors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <fieldset className="space-y-1.5">
                        <legend className="text-sm font-medium">Pilih Rating Bintang *</legend>
                        <div className="flex items-center gap-2 pt-1">
                            {[1, 2, 3, 4, 5].map((starVal) => (
                                <button
                                    key={starVal}
                                    type="button"
                                    aria-label={`Beri ${starVal} bintang`}
                                    aria-pressed={reviewRating === starVal}
                                    onClick={() => setReviewRating(starVal)}
                                    className="p-1 rounded hover:scale-110 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand"
                                >
                                    <Star
                                        className={`h-6 w-6 ${
                                            starVal <= reviewRating
                                                ? "fill-mypeken-cta text-mypeken-cta"
                                                : "text-mypeken-light-gray"
                                        }`}
                                        aria-hidden="true"
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-xs font-semibold text-mypeken-black">
                                ({reviewRating} / 5 Bintang)
                            </span>
                        </div>
                        {reviewFormErrors.rating && (
                            <p role="alert" className="text-xs text-mypeken-highligh">
                                {reviewFormErrors.rating}
                            </p>
                        )}
                    </fieldset>

                    <div className="space-y-1.5">
                        <Label htmlFor="reviewer-comment">
                            Komentar Ulasan * (Min. 10 karakter)
                        </Label>
                        <textarea
                            id="reviewer-comment"
                            rows={3}
                            placeholder="Ceritakan kualitas produk, kesegaran, dan kecepatan pengiriman..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            aria-invalid={Boolean(reviewFormErrors.comment)}
                            className="w-full rounded-md border border-mypeken-light-gray bg-white px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        />
                        {reviewFormErrors.comment && (
                            <p role="alert" className="text-xs text-mypeken-highligh">
                                {reviewFormErrors.comment}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setShowReviewForm(false)}
                            className="cursor-pointer"
                        >
                            Batal
                        </Button>
                        <Button type="submit" className="bg-mypeken-brand text-white cursor-pointer">
                            Kirim Ulasan
                        </Button>
                    </div>
                </form>
            )}

            {reviewSuccessMessage && (
                <div
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-2 rounded-xl bg-mypeken-brand/10 p-3 text-sm font-medium text-mypeken-brand"
                >
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{reviewSuccessMessage}</span>
                </div>
            )}

            {/* 1. STATISTIK RATING DI ATAS KOMENTAR */}
            <div className="rounded-2xl border border-mypeken-light-gray bg-mypeken-white px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-5 space-y-2">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-5xl font-bold text-mypeken-black">
                                {formattedRating}
                            </span>
                            <span className="text-lg font-medium text-mypeken-gray">/ 5,0</span>
                        </div>
                        <div
                            className="flex items-center gap-1.5 py-0.5"
                            aria-label={`Rating ${averageRating} dari 5 bintang`}
                        >
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 ${
                                        star <= Math.round(averageRating)
                                            ? "fill-mypeken-cta text-mypeken-cta"
                                            : "text-mypeken-light-gray"
                                    }`}
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-mypeken-black">
                            {satisfiedPercentage}% Pembeli merasa puas
                        </p>
                        <p className="text-sm text-mypeken-gray">
                            {allReviews.length} penilaian · {allReviews.length} ulasan
                        </p>
                    </div>

                    <div className="md:col-span-7 space-y-2 text-sm">
                        {[5, 4, 3, 2, 1].map((starLevel) => {
                            const count = allReviews.filter(
                                (r) => Math.round(r.rating) === starLevel
                            ).length;
                            const pct =
                                allReviews.length > 0
                                    ? Math.round((count / allReviews.length) * 100)
                                    : 0;
                            return (
                                <div key={starLevel} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 w-8 shrink-0">
                                        <Star
                                            className="h-4 w-4 fill-mypeken-cta text-mypeken-cta"
                                            aria-hidden="true"
                                        />
                                        <span className="font-medium text-mypeken-black">
                                            {starLevel}
                                        </span>
                                    </div>
                                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-mypeken-light-gray">
                                        <div
                                            className="h-full rounded-full bg-mypeken-brand transition-all duration-300"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-right text-mypeken-gray">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 2. DAFTAR KOMENTAR / ULASAN DI BAWAH STATISTIK RATING */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div
                        role="group"
                        aria-label="Filter ulasan berdasarkan bintang"
                        className="flex flex-wrap items-center gap-1.5"
                    >
                        <button
                            type="button"
                            onClick={() => setStarFilter("all")}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                                starFilter === "all"
                                    ? "bg-mypeken-brand text-white"
                                    : "bg-white border border-mypeken-light-gray text-mypeken-black hover:bg-mypeken-light-gray/40"
                            }`}
                        >
                            Semua ({allReviews.length})
                        </button>
                        {[5, 4, 3, 2, 1].map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setStarFilter(s)}
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
                                    starFilter === s
                                        ? "bg-mypeken-brand text-white"
                                        : "bg-white border border-mypeken-light-gray text-mypeken-black hover:bg-mypeken-light-gray/40"
                                }`}
                            >
                                <span>{s}</span>
                                <Star
                                    className="h-3 w-3 fill-mypeken-cta text-mypeken-cta"
                                    aria-hidden="true"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                        <Label htmlFor="sort-reviews" className="text-mypeken-gray">
                            Urutkan:
                        </Label>
                        <select
                            id="sort-reviews"
                            value={reviewSort}
                            onChange={(e) =>
                                setReviewSort(
                                    e.target.value as "newest" | "highest" | "lowest"
                                )
                            }
                            className="rounded-md border border-mypeken-light-gray bg-white px-2.5 py-1 text-xs text-mypeken-black"
                        >
                            <option value="newest">Terbaru</option>
                            <option value="highest">Rating Tertinggi</option>
                            <option value="lowest">Rating Terendah</option>
                        </select>
                    </div>
                </div>

                {filteredReviews.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-mypeken-light-gray p-8 text-center text-sm text-mypeken-gray">
                        Belum ada ulasan untuk filter bintang ini.
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {filteredReviews.map((review, index) => {
                            const formattedDate = new Date(review.date).toLocaleDateString(
                                "id-ID",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            );
                            return (
                                <li
                                    key={`${review.reviewerEmail}-${index}`}
                                    className="rounded-xl border border-mypeken-light-gray bg-white p-4 space-y-2"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-mypeken-brand/15 font-bold text-xs text-mypeken-brand">
                                                {review.reviewerName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-mypeken-black">
                                                    {review.reviewerName}
                                                </p>
                                                <p className="text-[11px] text-mypeken-brand font-medium">
                                                    Pembeli Terverifikasi
                                                    {review.variantName
                                                        ? ` • Varian: ${review.variantName}`
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>
                                        <time
                                            dateTime={review.date}
                                            className="text-xs text-mypeken-gray"
                                        >
                                            {formattedDate}
                                        </time>
                                    </div>

                                    <div
                                        className="flex items-center gap-1"
                                        aria-label={`Rating ${review.rating} dari 5`}
                                    >
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                className={`h-3.5 w-3.5 ${
                                                    s <= Math.round(review.rating)
                                                        ? "fill-mypeken-cta text-mypeken-cta"
                                                        : "text-mypeken-light-gray"
                                                }`}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm text-mypeken-black leading-relaxed">
                                        {review.comment}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
}

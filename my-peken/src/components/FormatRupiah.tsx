interface FormatRupiahProps {
    nilai: number;
    prefix?: string; // contoh: "+ " atau "- "
    className?: string;
}

// fungsi helper bila butuh hasil berupa string (misal untuk console.log / alert)
export function formatRupiah(angka: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(angka);
}

export default function FormatRupiah({ nilai, prefix = "", className = "" }: FormatRupiahProps) {
    return (
        <span className={className}>
            {prefix}{formatRupiah(nilai)}
        </span>
    )
}

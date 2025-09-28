import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="text-lg font-semibold">KinoBadaxor</Link>
        <form action="/search" className="ml-auto flex items-center gap-2">
          <input
            type="text"
            name="q"
            placeholder="Qidirish..."
            className="px-3 py-2 rounded-md bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-white/20 min-w-[220px]"
          />
          <button type="submit" className="px-3 py-2 rounded-md border border-white/15 hover:bg-white/10">Izlash</button>
        </form>
      </div>
    </header>
  );
}


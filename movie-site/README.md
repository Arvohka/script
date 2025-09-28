KinoBadaxor — TMDB asosida oddiy kino sayti (Next.js + Tailwind CSS).

Xususiyatlar
- Trenddagi kinolar
- Qidiruv (TMDB)
- Kino tafsilotlari + YouTube treyleri
- Sitemap va robots

Tez start
1) Muhit sozlang
```bash
cp .env.example .env
# .env ichida TMDB_API_KEY (TMDB v4 Read Token) ni to'ldiring
```

2) Ishga tushiring
```bash
npm run dev
```

3) `http://localhost:3000`

Env o'zgaruvchilari
- TMDB_API_KEY — TMDB v4 bearer token
- NEXT_PUBLIC_SITE_URL — public URL (sitemap/robots uchun)

Litsenziya: MIT

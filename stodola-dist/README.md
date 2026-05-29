# STODOLA — band website

Web pro českou pop-rockovou kapelu STODOLA z Pardubic.

## Demo

Otevřete `index.html` v prohlížeči nebo nasaďte na GitHub Pages / Netlify / Vercel.

## Struktura

```
.
├── index.html          # hlavní stránka
├── stodola.js          # motion engine (preloader, cursor, parallax, reveal, audio, marquee)
├── image-slot.js       # custom element pro drag-drop fotografií se savováním do localStorage
└── assets/
    ├── logo-white.png  # logo STODOLA pro tmavé pozadí
    ├── vinyl.png       # vinylová deska (decorative)
    └── photos/         # fotografie: members (5), news (3), galerie (7), hero, merch
```

## GitHub Pages

1. Vytvořte repo, nahrajte celý obsah `dist/`
2. Settings → Pages → Source: `main` branch, root
3. Web bude dostupný na `https://<username>.github.io/<repo>/`

## Custom doména

`stodolaband.cz` je registrovaná. V Settings → Pages → Custom domain zadejte `stodolaband.cz`. DNS:

```
A     stodolaband.cz       → 185.199.108.153 (GitHub Pages IP)
CNAME www.stodolaband.cz   → <username>.github.io
```

## Editace fotografií

`image-slot.js` umožňuje drag-drop fotek přímo do stránky — uloží se do `localStorage` prohlížeče. Pro permanentní změnu nahraďte soubory v `assets/photos/`.

## Licence

© 2025 STODOLA

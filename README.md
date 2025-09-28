# Lillebælt Bouldering Website

Official website for Lillebælt Bouldering - Danmarks førende bouldering fællesskab i Middelfart og omegn.

🧗‍♀️ **Live Website**: [https://kinkio.github.io/lillebaeltboulderingWebsite](https://kinkio.github.io/lillebaeltboulderingWebsite)

## Om Projektet

Dette er den officielle hjemmeside for Lillebælt Bouldering, bygget med Jekyll og hostet på GitHub Pages. Siden indeholder information om vores klub, bouldering som sport, og hvordan man kan blive medlem.

## Teknologier

- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting og deployment
- **GitHub Actions** - Automatisk build og deployment
- **SCSS** - CSS preprocessor
- **Liquid** - Templating engine

## Sider

- **Hjem** (`/`) - Forside med velkommen og call-to-action
- **Om Os** (`/about/`) - Information om klubben og fællesskabet
- **Bouldering** (`/bouldering/`) - Hvad er bouldering og hvorfor det er fantastisk
- **Kontakt** (`/contact/`) - Kontaktoplysninger og mødesteder

## Brand Assets

### Logo
- **Location**: `assets/images/logo.jpg`
- **Usage**: Brugt i header navigation og på forsiden
- **Alt text**: "Lillebælt Bouldering Logo"
- **Dimensions**: 50px højde i header, 150px på hero sektion

### Color Palette

Hjemmesiden bruger et nøje udvalgt farveskema der afspejler den naturlige og varme atmosfære ved bouldering:

```css
:root {
    /* Primary Brand Colors */
    --lb-background: #f2e9da;      /* Baggrund + LOGO-tekst - Varm creme baggrund */
    --lb-yellow: #edae3e;          /* Gul i LOGO + grafik - Gylden gul til accenter */
    --lb-gray: #3d414c;            /* Grå i LOGO + grafik - Mørk grå til tekst */
    --lb-orange: #c16b45;          /* Orange til grafik - Primær orange til knapper */
    --lb-salmon: #ca7e61;          /* "Laks" til grafik - Laks til hover states */
    --lb-green: #75a286;           /* Grøn (optional) - Natur grøn */
    --lb-light-green: #a8aca1;     /* Lys grøn (optional) - Lys salvie grøn */
}
```

#### Color Usage Guidelines

- **Background (`#f2e9da`)**: Brugt til sidebaggrunde og logo tekst
- **Yellow (`#edae3e`)**: Brugt til aktive navigation links og accent elementer
- **Gray (`#3d414c`)**: Brugt til overskrifter, brødtekst og header baggrund
- **Orange (`#c16b45`)**: Brugt til call-to-action knapper og primære interaktioner
- **Salmon (`#ca7e61`)**: Brugt til hover states og sekundære interaktioner
- **Green nuancer**: Tilgængelige til fremtidig brug i grafik og specielle elementer

## Development

### File Structure

```
├── _layouts/
│   └── default.html
├── _includes/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── css/
│   │   ├── style.scss
│   │   └── styles.css
│   └── images/
│       └── logo.jpg
├── javascript/
│   └── burger-menu.js
├── pages/
│   ├── about.html
│   ├── bouldering.html
│   └── contact.html
├── _config.yml
├── Gemfile
└── index.html
```

### Kørsel Lokalt

1. **Install Ruby og Bundler** (hvis ikke allerede installeret)
2. **Install gems**: `bundle install`
3. **Start Jekyll server**: `bundle exec jekyll serve --livereload`
4. **Åbn browser**: `http://localhost:4000`

### GitHub Pages Deployment

Siden deployes automatisk via GitHub Actions når der pushes til `main` branch:

1. **Commit dine ændringer**: `git add . && git commit -m "Update website"`
2. **Push til GitHub**: `git push origin main`  
3. **Automatisk deployment**: GitHub Actions bygger og deployer automatisk
4. **Live på**: https://kinkio.github.io/lillebaeltboulderingWebsite

### Brand Consistency

- Alle sider inkluderer logoet i header navigation
- Farveskema er defineret med CSS custom properties for nem vedligeholdelse
- Logo skal vedligeholde konsistent størrelse og positionering på tværs af alle sider
- Responsivt design sikrer optimal visning på alle enheder

## Features

- ✅ **Responsivt Design** - Fungerer perfekt på desktop og mobile
- ✅ **Jekyll Templating** - Genbrug af komponenter og layouts
- ✅ **Live Reload** - Automatisk browser refresh under development
- ✅ **SEO Optimeret** - Meta tags og sitemap generation
- ✅ **Fast Loading** - Optimeret CSS og assets
- ✅ **GitHub Actions** - Automatisk build og deployment

## Kontakt

For spørgsmål om hjemmesiden eller tekniske problemer:

- **Email**: lillebaeltbouldering@gmail.com
- **GitHub Issues**: [Opret et issue](https://github.com/Kinkio/lillebaeltboulderingWebsite/issues)
- **Instagram**: @lillebaeltbouldering
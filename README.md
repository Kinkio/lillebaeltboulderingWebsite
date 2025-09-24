# Lillebælt Bouldering Website

Official website for Lillebælt Bouldering - Denmark's leading indoor and outdoor bouldering community.

## Brand Assets

### Logo
- **Location**: `assets/images/lillebaelt-bouldering-logo.svg`
- **Usage**: Used in the header navigation across all pages
- **Alt text**: "Lillebælt Bouldering Logo"
- **Dimensions**: 40px height in header, width auto-scales

### Color Palette

The website uses a carefully selected color palette that reflects the natural and warm atmosphere of bouldering:

```css
:root {
    /* Primary Brand Colors */
    --lb-background: #f2e9da;      /* Baggrund + LOGO-tekst - Warm cream background */
    --lb-yellow: #edae3e;          /* Gul i LOGO + grafik - Golden yellow for accents */
    --lb-gray: #3d414c;            /* Grå i LOGO + grafik - Dark gray for text and headers */
    --lb-orange: #c16b45;          /* Orange til grafik - Primary orange for CTAs */
    --lb-salmon: #ca7e61;          /* "Laks" til grafik - Salmon for hover states */
    --lb-green: #75a286;           /* Grøn (optional) - Nature green */
    --lb-light-green: #a8aca1;     /* Lys grøn (optional) - Light sage green */
}
```

#### Color Usage Guidelines

- **Background (`#f2e9da`)**: Used for page backgrounds and logo text
- **Yellow (`#edae3e`)**: Used for active navigation links and accent elements
- **Gray (`#3d414c`)**: Used for headings, body text, and header background
- **Orange (`#c16b45`)**: Used for call-to-action buttons and primary interactions
- **Salmon (`#ca7e61`)**: Used for hover states and secondary interactions
- **Green shades**: Available for future use in graphics and special elements

## Development

### File Structure
```
├── assets/
│   └── images/
│       └── lillebaelt-bouldering-logo.svg
├── styles.css (contains color palette variables)
├── index.html
├── about.html
├── bouldering.html
├── contact.html
├── events.html
└── membership.html
```

### Running Locally
1. Start a local server: `python3 -m http.server 8000`
2. Open browser to `http://localhost:8000`

### Brand Consistency
- All pages include the logo in the header navigation
- Color palette is defined using CSS custom properties for easy maintenance
- Logo should maintain consistent sizing and positioning across all pages
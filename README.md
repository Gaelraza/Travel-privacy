# Travel Privacy Toolkit

A fast, static, mobile-first utility website for travelers concerned about digital privacy. Built with vanilla JavaScript, HTML, and CSS—no frameworks, databases, or external APIs required.

## Features

- **Risk Checker**: Personalized privacy risk assessment based on destination, travel purpose, and digital habits
- **Security Checklist**: Interactive pre-travel checklist with progress tracking (saves to localStorage)
- **Country Notes**: Country-specific privacy guides with search functionality
- **Mobile-First Design**: Responsive design that works perfectly on all devices
- **Single Page App**: Fast navigation without page reloads using hash-based routing

## Pages

1. Home - Overview and quick access to tools
2. Risk Checker - Interactive risk assessment tool
3. Checklist - Pre-travel security checklist
4. Country Notes - Country-specific privacy information
5. About - Information about the toolkit
6. Privacy Policy - Comprehensive privacy policy
7. Terms of Service - Legal terms and disclaimers
8. Affiliate Disclosure - Transparent affiliate relationship disclosure

## Deployment

### GitHub Pages

1. Push this repository to GitHub
2. Go to Settings → Pages
3. Select your branch (main/master) as the source
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Cloudflare Pages

1. Log in to Cloudflare Dashboard
2. Go to Pages → Create a project
3. Connect your Git repository
4. Deploy with default settings (no build command needed)

## Customization

### NordVPN Affiliate Link

Replace `YOUR_AFFILIATE_ID` in `js/app.js` with your actual NordVPN affiliate ID:

```javascript
// Line ~170 in js/app.js
href="https://go.nordvpn.net/aff_c?offer_id=1&aff_id=YOUR_AFFILIATE_ID"
```

### Adding More Countries

Edit the country cards in `index.html` under the Country Notes section:

```html
<div class="country-card" data-country="country-name" data-region="region tags">
  <h3><span class="country-flag">🇺🇳</span> Country Name</h3>
  <!-- Content -->
</div>
```

### Styling

Modify CSS variables in `css/style.css` to change colors, spacing, and other design tokens:

```css
:root {
  --primary-color: #0066cc;
  --primary-dark: #004c99;
  /* ... more variables */
}
```

## File Structure

```
/
├── index.html          # Main HTML file (all pages in one SPA)
├── css/
│   └── style.css       # All styles (mobile-first, responsive)
├── js/
│   └── app.js          # All JavaScript functionality
├── assets/             # Images, favicon, etc.
└── README.md           # This file
```

## Technical Details

- **No Dependencies**: Pure vanilla JavaScript, no external libraries
- **LocalStorage**: Checklist progress saved locally (no server required)
- **SEO Optimized**: Meta tags, Open Graph, semantic HTML
- **Accessible**: ARIA labels, keyboard navigation support
- **Print Friendly**: Print styles included
- **Fast Loading**: Minimal CSS/JS, no render-blocking resources

## License

This project is provided as-is for personal and commercial use.

## Affiliate Disclosure

This website template includes affiliate link placeholders for NordVPN. Make sure to:
1. Replace with your actual affiliate ID
2. Maintain the disclosure statements for FTC compliance
3. Only recommend services you genuinely believe in

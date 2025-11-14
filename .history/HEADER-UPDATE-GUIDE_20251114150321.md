# Dubai Police Header Update Guide

## What Changed
✅ Homepage (`index.html`) - **DONE**
- New Dubai Police styled header with clean Government of Dubai + Dubai Police logos
- Navigation menu: Home, About Us, Information, Contact
- English/Arabic language toggle
- Search button
- Mobile responsive
- Full RTL support

## How to Apply to Other Pages

### Quick Method (Copy/Paste):

1. **Add Material Icons** (in `<head>` section):
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined|Material+Icons+Round" rel="stylesheet">
```

2. **Add Header HTML** (after `<body>` tag):
```html
<!-- Dubai Police Header Component -->
<header class="dubai-police-header">
    <div class="top-bar">
        <div class="container-fluid">
            <div class="head-logo">
                <div class="gov-logo">
                    <a href="https://www.dubai.ae/en" rel="noopener noreferrer" title="Government of Dubai" target="_blank">
                        <img src="/site/wp-content/uploads/2020/03/government-of-dubai-red.jpg" alt="Government of Dubai">
                    </a>
                </div>
                <div class="dp-logo">
                    <a href="/">
                        <img src="/site/wp-content/uploads/2025/02/images__8_-removebg-preview.png" alt="Dubai Police">
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <nav class="main-nav">
        <div class="container-fluid">
            <div class="nav-wrapper">
                <button class="menu-toggle" aria-label="Menu">
                    <span class="material-icons-outlined">menu</span>
                </button>
                
                <ul class="main-navigation-links">
                    <li class="nav-item active">
                        <a href="/" data-en="Home" data-ar="الرئيسية">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="/site/about/" data-en="About Us" data-ar="معلومات عنا">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a href="/site/information/" data-en="Information" data-ar="معلومات">Information</a>
                    </li>
                    <li class="nav-item">
                        <a href="/site/contact/" data-en="Contact" data-ar="اتصل بنا">Contact</a>
                    </li>
                </ul>
                
                <div class="nav-actions">
                    <button class="action-search" aria-label="Search">
                        <span class="material-icons-outlined">search</span>
                        <span class="search-text" data-en="Search..." data-ar="بحث...">Search...</span>
                    </button>
                    
                    <button class="lang-toggle" aria-label="Change Language">
                        <span class="lang-text">English</span>
                        <span class="material-icons-round">expand_more</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</header>
```

3. **Add CSS Styles** (in `<head>` or `<style>` section):
See the complete CSS in `index.html` lines 247-406

4. **Add JavaScript** (before `</body>`):
See the complete script in `index.html` lines 2378-2472

## Pages to Update:
- [ ] `/site/uae-pass-verification/index.html`
- [ ] `/site/bank-information/index.html`
- [ ] `/site/police-clearance-checking/index.html`
- [ ] `/site/about/index.html`
- [ ] `/site/contact/index.html`
- [ ] `/status/index.html`
- [ ] `/admin/index.html` (already has language toggle, just update header styling)

## Language Toggle Features:
- **Saves preference** in localStorage
- **Automatic RTL** for Arabic
- **Translates menu items** automatically
- **data-en and data-ar attributes** for any translatable element
- Works across all pages once implemented

## Testing:
1. Click language toggle - should switch to Arabic with RTL layout
2. Refresh page - language preference should persist
3. Mobile view - menu should collapse to hamburger icon
4. All navigation links should work

## Notes:
- Old Elementor headers can be hidden with CSS: `.elementor-location-header { display: none; }`
- Adjust image paths if page is in subfolder (use relative paths)
- The header is fixed, so add `padding-top: 122px` to body

// Shared Header with Language Toggle for all pages
// Dubai Police style header with English/Arabic support

class DubaiPoliceHeader {
    constructor() {
        this.currentLanguage = localStorage.getItem('siteLanguage') || 'en';
        this.init();
    }

    init() {
        this.applyLanguage();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Language toggle
        const langToggle = document.querySelector('.lang-sel-list');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Search functionality
        const searchIcon = document.querySelector('.action-search-icon');
        if (searchIcon) {
            searchIcon.addEventListener('click', () => this.toggleSearch());
        }

        // Mobile menu toggle (if needed)
        const menuIcon = document.querySelector('.menu-icon');
        if (menuIcon) {
            menuIcon.addEventListener('click', () => this.toggleMobileMenu());
        }
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        localStorage.setItem('siteLanguage', this.currentLanguage);
        this.applyLanguage();
    }

    applyLanguage() {
        // Set document direction and language
        document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLanguage;

        // Update language selector display
        const langDisplay = document.querySelector('.lang-sel-list span');
        if (langDisplay) {
            langDisplay.textContent = this.currentLanguage === 'en' ? 'English' : 'العربية';
        }

        // Translate all elements with data attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
                    element.value = text;
                    if (element.tagName === 'BUTTON') {
                        element.textContent = text;
                    }
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-en-placeholder]').forEach(element => {
            const placeholder = element.getAttribute(`data-${this.currentLanguage}-placeholder`);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });

        // Update navigation menu
        this.translateMenu();
    }

    translateMenu() {
        const translations = {
            en: {
                home: 'Home',
                about: 'About Us',
                information: 'Information',
                contact: 'Contact',
                search: 'Search...',
                uaePass: 'UAE Pass Verification',
                bankInfo: 'Bank Information',
                policeClearance: 'Police Clearance',
                status: 'Check Status'
            },
            ar: {
                home: 'الرئيسية',
                about: 'معلومات عنا',
                information: 'معلومات',
                contact: 'اتصل بنا',
                search: 'بحث...',
                uaePass: 'التحقق من الهوية الرقمية',
                bankInfo: 'معلومات البنك',
                policeClearance: 'شهادة الشرطة',
                status: 'تحقق من الحالة'
            }
        };

        const lang = this.currentLanguage;
        
        // Update menu items
        const menuItems = document.querySelectorAll('.main-navigation-links a');
        menuItems.forEach((item, index) => {
            const keys = ['home', 'about', 'information', 'contact'];
            if (keys[index] && translations[lang][keys[index]]) {
                item.textContent = translations[lang][keys[index]];
            }
        });

        // Update search placeholder
        const searchText = document.querySelector('.action-search-icon span');
        if (searchText) {
            searchText.textContent = translations[lang].search;
        }
    }

    toggleSearch() {
        // Implement search modal/dropdown if needed
        console.log('Search clicked');
    }

    toggleMobileMenu() {
        const menu = document.querySelector('.mega-menu');
        if (menu) {
            menu.classList.toggle('active');
        }
    }
}

// Initialize header when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dubaiPoliceHeader = new DubaiPoliceHeader();
});

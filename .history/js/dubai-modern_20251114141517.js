/**
 * Dubai Police Modern Website - JavaScript
 * Handles: Mobile menu, Language switching, Search functionality
 * Pure JavaScript - No dependencies
 */

(function() {
    'use strict';

    // ========== CONFIGURATION ==========
    const CONFIG = {
        currentLang: 'en',
        languages: {
            en: 'English',
            ar: 'العربية'
        }
    };

    // ========== TRANSLATION OBJECT ==========
    const translations = {
        // Navigation
        'nav.home': { en: 'Home', ar: 'الرئيسية' },
        'nav.about': { en: 'About Us', ar: 'من نحن' },
        'nav.services': { en: 'Services', ar: 'الخدمات' },
        'nav.information': { en: 'Information', ar: 'المعلومات' },
        'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
        
        // Hero Section
        'hero.title': { en: 'YOUR SAFETY', ar: 'سلامتك' },
        'hero.title2': { en: 'OUR PRIORITY', ar: 'أولويتنا' },
        'hero.subtitle': { en: 'Official Dubai Police Verification Service', ar: 'خدمة التحقق الرسمية لشرطة دبي' },
        'hero.search.placeholder': { en: 'Search for services...', ar: 'ابحث عن الخدمات...' },
        'hero.search.button': { en: 'Search', ar: 'بحث' },
        
        // Services Section
        'services.title': { en: 'Our Services', ar: 'خدماتنا' },
        'services.subtitle': { en: 'Fast, Secure, and Reliable Verification Services', ar: 'خدمات تحقق سريعة وآمنة وموثوقة' },
        
        'service.uaepass.title': { en: 'UAE Pass Verification', ar: 'التحقق من بطاقة الهوية الإماراتية' },
        'service.uaepass.desc': { en: 'Verify your identity instantly using UAE Pass digital authentication', ar: 'تحقق من هويتك فورًا باستخدام المصادقة الرقمية لبطاقة الإمارات' },
        
        'service.police.title': { en: 'Police Clearance', ar: 'شهادة حسن السيرة والسلوك' },
        'service.police.desc': { en: 'Get your official police clearance certificate with verified background check', ar: 'احصل على شهادة حسن السيرة والسلوك الرسمية مع فحص الخلفية المعتمد' },
        
        'service.bank.title': { en: 'Bank Verification', ar: 'التحقق من الحساب البنكي' },
        'service.bank.desc': { en: 'Secure verification of bank account information for legal purposes', ar: 'تحقق آمن من معلومات الحساب البنكي للأغراض القانونية' },
        
        'service.status.title': { en: 'Check Status', ar: 'تحقق من الحالة' },
        'service.status.desc': { en: 'Track your verification application status in real-time', ar: 'تتبع حالة طلب التحقق الخاص بك في الوقت الفعلي' },
        
        // UI Elements
        'ui.search': { en: 'Search', ar: 'بحث' },
        'ui.menu': { en: 'Menu', ar: 'القائمة' },
        'ui.close': { en: 'Close', ar: 'إغلاق' },
        'ui.language': { en: 'Language', ar: 'اللغة' }
    };

    // ========== DOM ELEMENTS ==========
    let DOM = {};

    function cacheDOMElements() {
        DOM = {
            html: document.documentElement,
            body: document.body,
            mobileToggle: document.querySelector('.dp-mobile-toggle'),
            sidebar: document.querySelector('.dp-sidebar'),
            sidebarOverlay: document.querySelector('.dp-sidebar-overlay'),
            sidebarClose: document.querySelector('.dp-sidebar-close'),
            langToggle: document.querySelectorAll('.dp-lang-toggle'),
            searchForm: document.querySelector('.dp-hero-search')
        };
    }

    // ========== MOBILE MENU ==========
    function initMobileMenu() {
        if (!DOM.mobileToggle || !DOM.sidebar) return;

        // Open sidebar
        DOM.mobileToggle.addEventListener('click', function() {
            openSidebar();
        });

        // Close sidebar via close button
        if (DOM.sidebarClose) {
            DOM.sidebarClose.addEventListener('click', function() {
                closeSidebar();
            });
        }

        // Close sidebar via overlay
        if (DOM.sidebarOverlay) {
            DOM.sidebarOverlay.addEventListener('click', function() {
                closeSidebar();
            });
        }

        // Close sidebar on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && DOM.sidebar.classList.contains('dp-active')) {
                closeSidebar();
            }
        });
    }

    function openSidebar() {
        if (DOM.sidebar && DOM.sidebarOverlay) {
            DOM.sidebar.classList.add('dp-active');
            DOM.sidebarOverlay.classList.add('dp-active');
            DOM.body.style.overflow = 'hidden';
        }
    }

    function closeSidebar() {
        if (DOM.sidebar && DOM.sidebarOverlay) {
            DOM.sidebar.classList.remove('dp-active');
            DOM.sidebarOverlay.classList.remove('dp-active');
            DOM.body.style.overflow = '';
        }
    }

    // ========== LANGUAGE SWITCHER ==========
    function initLanguageSwitcher() {
        // Get current language from localStorage or default to 'en'
        CONFIG.currentLang = localStorage.getItem('dp-lang') || 'en';
        
        // Set initial language
        setLanguage(CONFIG.currentLang);

        // Add event listeners to all language toggle buttons
        DOM.langToggle.forEach(function(btn) {
            btn.addEventListener('click', function() {
                toggleLanguage();
            });
        });
    }

    function toggleLanguage() {
        const newLang = CONFIG.currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    }

    function setLanguage(lang) {
        CONFIG.currentLang = lang;
        
        // Save to localStorage
        localStorage.setItem('dp-lang', lang);
        
        // Update HTML direction
        DOM.html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        DOM.html.setAttribute('lang', lang === 'ar' ? 'ar' : 'en-US');
        
        // Update all translatable elements
        updateTranslations();
        
        // Update language toggle button text
        updateLanguageButtons();
    }

    function updateTranslations() {
        document.querySelectorAll('[data-translate]').forEach(function(el) {
            const key = el.getAttribute('data-translate');
            if (translations[key] && translations[key][CONFIG.currentLang]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key][CONFIG.currentLang];
                } else {
                    el.textContent = translations[key][CONFIG.currentLang];
                }
            }
        });
    }

    function updateLanguageButtons() {
        const langText = CONFIG.languages[CONFIG.currentLang === 'en' ? 'ar' : 'en'];
        DOM.langToggle.forEach(function(btn) {
            const textSpan = btn.querySelector('span');
            if (textSpan) {
                textSpan.textContent = langText;
            }
        });
    }

    // ========== SEARCH FUNCTIONALITY ==========
    function initSearch() {
        if (!DOM.searchForm) return;

        DOM.searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = DOM.searchForm.querySelector('.dp-search-input');
            const searchQuery = searchInput ? searchInput.value.trim() : '';
            
            if (searchQuery) {
                // You can customize this to redirect to your search page
                // For now, we'll just show an alert
                console.log('Searching for:', searchQuery);
                
                // Example: Redirect to search page with query
                // window.location.href = '/search?q=' + encodeURIComponent(searchQuery);
                
                // For demo, show alert
                alert('Search functionality: ' + searchQuery + '\n\nThis can be connected to your search system.');
            }
        });
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if href is just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    closeSidebar();
                }
            });
        });
    }

    // ========== ACTIVE NAV HIGHLIGHT ==========
    function highlightActiveNav() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.dp-nav-menu a, .dp-sidebar-menu a');
        
        navLinks.forEach(function(link) {
            const linkPath = new URL(link.href).pathname;
            const parentLi = link.closest('li');
            
            if (linkPath === currentPath) {
                if (parentLi) {
                    parentLi.classList.add('dp-active');
                }
            }
        });
    }

    // ========== SCROLL TO TOP BUTTON ==========
    function initScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'dp-scroll-top';
        scrollBtn.innerHTML = '<i class="material-icons">arrow_upward</i>';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-green, #00a99d);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 999;
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'flex';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Hover effect
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        });
        
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
    }

    // ========== LAZY LOADING IMAGES ==========
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    // ========== INITIALIZATION ==========
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                startApp();
            });
        } else {
            startApp();
        }
    }

    function startApp() {
        cacheDOMElements();
        initMobileMenu();
        initLanguageSwitcher();
        initSearch();
        initSmoothScroll();
        highlightActiveNav();
        initScrollToTop();
        initLazyLoading();

        console.log('Dubai Police Modern Website initialized ✓');
    }

    // Start the application
    init();

    // ========== PUBLIC API ==========
    // Expose functions to global scope if needed
    window.DubaiPolice = {
        openSidebar: openSidebar,
        closeSidebar: closeSidebar,
        setLanguage: setLanguage,
        toggleLanguage: toggleLanguage,
        currentLang: function() { return CONFIG.currentLang; }
    };

})();

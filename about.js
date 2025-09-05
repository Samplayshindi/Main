const translations = {
    'en': {
        channelTitle: "Sam Plays",
        navHome: "Home",
        navRecentVideos: "Recent Videos",
        navChangelog: "Changelog",
        headingAccessibility: "Accessibility",
        optionReduceMotion: "Reduce Motion",
        headingCursorStyle: "Cursor Style",
        cursorAmbientDot: "Ambient Dot",
        cursorDefault: "Default",
        headingTheme: "Theme",
        themeSystem: "System",
        themeLight: "Light",
        themeDark: "Dark",
        headingLanguage: "Language",
        aboutPhilosophyTitle: "My Gaming Philosophy",
        aboutPhilosophyContent: `At Sam Plays, gaming isn't only about playing. it's about the vibes, the stories, and the memories that linger. Whether it's that rush of adrenaline from a boss battle, the joy of crafting something from nothing, or those unexpected twists. I'm in for all of it. If you're a games enthusiast, awkward moments, in depth content, or just here to chill, you're in the right community. Let's game, laugh, create, and get lost in the worlds we cherish, Together.`,
        aboutProcessTitle: "The Creation Process",
        aboutProcessContent: `Each video at Sam Plays is made for perfection. From planning content ideas and recording high quality gameplay, to the process of editing, sound design, and creating the eye catching thumbnails, I handle it all. It's a labor of love, ensuring that each video provides value and a unique perspective on the games I play. My goal is to deliver content that resonates with you long even after the video ends.`,
        aboutSpecsTitle: "My PC Specs",
        hotkeyTitle: "Keyboard Shortcuts",
        hotkeyHelp: "Show this help menu",
        hotkeyMenu: "Toggle menu",
        hotkeyScrollTop: "Scroll to top",
        hotkeyScrollBottom: "Scroll to bottom",
        hotkeyClose: "Close menu or dialog",
        cookieText: "This website uses cookies to enhance the user experience. By continuing to browse, you agree to our use of cookies.",
        cookieDecline: "Decline",
        cookieAccept: "Accept",
    },
    'de': {
        channelTitle: "Sam Spielt",
        navHome: "Startseite",
        navRecentVideos: "Neueste Videos",
        navChangelog: "Änderungsprotokoll",
        headingAccessibility: "Barrierefreiheit",
        optionReduceMotion: "Bewegung reduzieren",
        headingCursorStyle: "Cursor-Stil",
        cursorAmbientDot: "Umgebungs-Punkt",
        cursorDefault: "Standard",
        headingTheme: "Thema",
        themeSystem: "System",
        themeLight: "Hell",
        themeDark: "Dunkel",
        headingLanguage: "Sprache",
        aboutPhilosophyTitle: "Meine Gaming-Philosophie",
        aboutPhilosophyContent: `Bei Sam Spielt geht es nicht nur ums Spielen. Es geht um die Stimmung, die Geschichten und die Erinnerungen, die bleiben. Ob es der Adrenalinkick eines Bosskampfes ist, die Freude, etwas aus dem Nichts zu erschaffen, oder unerwartete Wendungen. Ich bin für alles dabei. Wenn du ein Gaming-Enthusiast bist, für peinliche Momente, tiefgehenden Inhalt oder einfach nur zum Entspannen hier bist, bist du in der richtigen Community. Let's game, lachen, kreieren und uns in den Welten verlieren, die wir schätzen, Gemeinsam.`,
        aboutProcessTitle: "Der Erstellungsprozess",
        aboutProcessContent: `Jedes Video bei Sam Spielt ist auf Perfektion ausgelegt. Von der Planung der Inhalte und der Aufnahme hochwertiger Gameplays bis hin zum Prozess des Bearbeitens, des Sounddesigns und des Erstellens der auffälligen Thumbnails – ich kümmere mich um alles. Es ist eine Herzensangelegenheit, um sicherzustellen, dass jedes Video einen Mehrwert und eine einzigartige Perspektive auf die Spiele bietet, die ich spiele. Mein Ziel ist es, Inhalte zu liefern, die Sie noch lange nach dem Ende des Videos ansprechen.`,
        aboutSpecsTitle: "Meine PC-Spezifikationen",
        hotkeyTitle: "Tastaturkürzel",
        hotkeyHelp: "Dieses Hilfemenü anzeigen",
        hotkeyMenu: "Menü umschalten",
        hotkeyScrollTop: "Nach oben scrollen",
        hotkeyScrollBottom: "Nach unten scrollen",
        hotkeyClose: "Menü oder Dialog schließen",
        cookieText: "Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern. Indem Sie weiter surfen, stimmen Sie der Verwendung von Cookies zu.",
        cookieDecline: "Ablehnen",
        cookieAccept: "Akzeptieren",
    }
};

/**
 * NEW: Triggers a short vibration on supported devices for haptic feedback.
 */
function triggerHapticFeedback() {
    if (navigator.vibrate) {
        // A short 50ms vibration provides a nice tap effect.
        navigator.vibrate(50);
    }
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
        const key = el.dataset.i18nKey;
        const translation = translations[lang] && translations[lang][key];
        if (translation) {
             if (el.tagName === 'LABEL') {
                const textNode = Array.from(el.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.textContent = ' ' + translation;
                } else {
                     el.textContent = translation;
                }
            } else {
                el.innerHTML = translation;
            }
        }
    });
    if (locoScroll) locoScroll.update();
}

const themeRadios = document.querySelectorAll('input[name="theme-style"]');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const faviconLink = document.getElementById('favicon');
const darkModeFavicon = 'https://raw.githubusercontent.com/SamarYT567/Test/refs/heads/main/Assets/FaviconDark.png';
const lightModeFavicon = 'https://raw.githubusercontent.com/SamarYT567/Test/refs/heads/main/Assets/FaviconLight.png';

function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    let currentFavicon = darkModeFavicon;

    if (theme === 'light') {
        document.body.classList.add('light-theme');
        currentFavicon = lightModeFavicon;
    } else if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        currentFavicon = darkModeFavicon;
    } else if (theme === 'system') {
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            currentFavicon = darkModeFavicon;
        } else {
            document.body.classList.add('light-theme');
            currentFavicon = lightModeFavicon;
        }
    }
    localStorage.setItem('theme', theme);
    if (faviconLink) {
        faviconLink.href = currentFavicon;
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
    const initialThemeRadio = document.querySelector(`input[name="theme-style"][value="${savedTheme}"]`);
    if (initialThemeRadio) {
        initialThemeRadio.checked = true;
    }
}

prefersDarkScheme.addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
    }
});

const reduceMotion = localStorage.getItem('reduceMotion') === 'true';

let locoScroll;

document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (!scrollContainer) return;

    initializeTheme();

    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 500);
    }
    
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');
    const declineBtn = document.getElementById('cookie-decline-btn');

    function showCookieBanner() {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            cookieBanner.classList.add('visible');
        }
    }

    function hideCookieBanner() {
        cookieBanner.classList.remove('visible');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        hideCookieBanner();
        triggerHapticFeedback();
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'declined');
        hideCookieBanner();
        triggerHapticFeedback();
    });

    showCookieBanner();

    locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: !reduceMotion,
        getDirection: true,
    });

    let lastScrollY = 0;
    const header = document.getElementById('mainHeader');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    locoScroll.on('scroll', (args) => {
        lastScrollY = args.scroll.y;
        if (args.scroll.y > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', args.scroll.y > window.innerHeight / 2);
        }
    });

    imagesLoaded(scrollContainer, { background: true }, () => {
        if (locoScroll) locoScroll.update();
    });
    
    new ResizeObserver(() => locoScroll.update()).observe(scrollContainer);

    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sideMenu = document.getElementById('sideMenu');
    
    function toggleMenu() {
        const isOpen = menuBtn.classList.contains('open');
        menuBtn.classList.toggle('open', !isOpen);
        sideMenu.classList.toggle('visible', !isOpen);

        if (!isOpen) {
            document.body.classList.add('no-scroll');
            if (locoScroll) {
                locoScroll.stop();
            }
        } else {
            document.body.classList.remove('no-scroll');
            if (locoScroll) {
                locoScroll.start();
            }
        }
    }

    if (menuBtn && sideMenu && closeMenuBtn) {
        menuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
            triggerHapticFeedback();
        });
        closeMenuBtn.addEventListener('click', () => {
            toggleMenu();
            triggerHapticFeedback();
        });
        
        document.addEventListener('click', (event) => {
            if (sideMenu.classList.contains('visible') && !sideMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                toggleMenu();
            }
        });
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            if (locoScroll) locoScroll.scrollTo('top');
            triggerHapticFeedback();
        });
    }

    const reduceMotionToggle = document.getElementById('reduceMotionToggle');
    const cursorRadios = document.querySelectorAll('input[name="cursor-style"]');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    if (cursorDot && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            if (document.body.classList.contains('cursor-ambient-dot')) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
                
                followerX += (mouseX - followerX) * 0.1;
                followerY += (mouseY - followerY) * 0.1;

                cursorFollower.style.left = `${followerX}px`;
                cursorFollower.style.top = `${followerY}px`;
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        document.querySelectorAll('a, button, .slider, select').forEach(el => {
            el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
        });
    }

    if (reduceMotionToggle) {
        reduceMotionToggle.checked = reduceMotion;
        applyReduceMotionSettings(reduceMotion);

        reduceMotionToggle.addEventListener('change', (e) => {
            localStorage.setItem('reduceMotion', e.target.checked);
            applyReduceMotionSettings(e.target.checked);
            triggerHapticFeedback();
            location.reload();
        });
    }

    function applyReduceMotionSettings(isReduced) {
        document.body.classList.toggle('reduce-motion', isReduced);
        checkCursorSupport();
    }

    function checkCursorSupport() {
        const isMobileOrTablet = window.innerWidth <= 1024 || ('ontouchstart' in window);
        const isReduceMotionActive = document.body.classList.contains('reduce-motion');

        if (isMobileOrTablet || isReduceMotionActive) {
            document.body.classList.add('no-custom-cursor');
            document.body.classList.remove('cursor-ambient-dot');
            document.body.style.cursor = 'default';
            if (cursorDot) cursorDot.style.display = 'none';
            if (cursorFollower) cursorFollower.style.display = 'none';

            cursorRadios.forEach(radio => {
                radio.disabled = true;
            });
            const defaultCursorRadio = document.querySelector('input[name="cursor-style"][value="default"]');
            if (defaultCursorRadio) defaultCursorRadio.checked = true;

        } else {
            document.body.classList.remove('no-custom-cursor');
            const savedCursorStyle = localStorage.getItem('cursorStyle') || 'ambient-dot';
            updateCursorStyle(savedCursorStyle, false);
            const activeCursorRadio = document.querySelector(`input[name="cursor-style"][value="${savedCursorStyle}"]`);
            if(activeCursorRadio) activeCursorRadio.checked = true;

            cursorRadios.forEach(radio => {
                radio.disabled = false;
            });
        }
    }
    
    function updateCursorStyle(style, checkSupport = true) {
        if (checkSupport) {
            checkCursorSupport();
            if (document.body.classList.contains('no-custom-cursor')) return;
        }

        document.body.classList.remove('cursor-ambient-dot');
        document.body.style.cursor = '';

        if (style === 'ambient-dot') {
            document.body.classList.add('cursor-ambient-dot');
        } else { 
            document.body.style.cursor = 'default';
        }
        localStorage.setItem('cursorStyle', style);
    }
    
    checkCursorSupport();
    window.addEventListener('resize', checkCursorSupport);

    document.querySelectorAll('.cursor-options .radio-option').forEach(option => {
        option.addEventListener('click', () => {
            triggerHapticFeedback();
            const radio = option.querySelector('input[type="radio"]');
            if (radio && !radio.disabled) {
                radio.checked = true;
                updateCursorStyle(radio.value);
            }
        });
    });
    
    document.querySelectorAll('.theme-options .radio-option').forEach(option => {
        option.addEventListener('click', () => {
            triggerHapticFeedback();
            const radio = option.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                applyTheme(radio.value);
            }
        });
    });

    const languageSelector = document.getElementById('languageSelector');
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelector.value = savedLanguage;
    setLanguage(savedLanguage);

    languageSelector.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        setLanguage(selectedLang);
        triggerHapticFeedback();
    });
    
    const hotkeyModal = document.getElementById('hotkeyHelpModal');
    const closeHelpModalBtn = document.getElementById('closeHelpModalBtn');

    function showHelpModal() { hotkeyModal.hidden = false; }
    function hideHelpModal() { hotkeyModal.hidden = true; }

    if(closeHelpModalBtn) {
        closeHelpModalBtn.addEventListener('click', () => {
            hideHelpModal();
            triggerHapticFeedback();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        
        const key = e.key.toLowerCase();

        if (e.key === '?' || key === 'h') showHelpModal();
        if (key === 'm') toggleMenu();
        if (key === 't') locoScroll.scrollTo('top');
        if (key === 'b') locoScroll.scrollTo('bottom');
        
        if (e.key === 'Escape') {
            if (!hotkeyModal.hidden) hideHelpModal();
            else if (sideMenu.classList.contains('visible')) toggleMenu();
        }
    });
});
// ==========================================================================
// 1. GESTION DU MODE SOMBRE (DARK MODE)
// ==========================================================================
const darkModeBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

// ==========================================================================
// 2. GESTION DU SCROLL (NAVBAR & RETOUR EN HAUT)
// ==========================================================================
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.getElementById('backToTop');

const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

    // Effet sur la Navbar au scroll
    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('navbar_scrolled');
        } else {
            navbar.classList.remove('navbar_scrolled');
        }
    }

    // Apparition du bouton Retour en Haut
    if (backToTopBtn) {
        if (scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
};

window.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('scroll', handleScroll, { passive: true });

// Clic pour remonter tout en haut
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
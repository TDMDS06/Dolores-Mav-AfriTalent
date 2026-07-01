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
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ANIMATION DES SECTIONS (FADE-IN)
    // ==========================================
    const sections = document.querySelectorAll('.fade-in-section');
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // On arrête d'observer une fois visible
            }
        });
    }, {
        threshold: 0.1 // Déclenche l'animation dès que 10% de la section est visible
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ==========================================
    // 2. ANIMATION DES COMPTEURS DE STATISTIQUES
    // ==========================================
    const counters = document.querySelectorAll('.counter'); // Ajoute la classe 'counter' à tes nombres (ex: 900, 500)
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target'); // On récupère la valeur cible (ex: 900)
        const count = +counter.innerText;
        const speed = 100; // Plus le chiffre est grand, plus c'est rapide
        
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 15);
        } else {
            counter.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // On anime une seule fois
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
// ==========================================================================
// FILTRAGE DYNAMIQUE DES FREELANCES - COMPATIBLE BOOTSTRAP GRID
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const freelanceCards = document.querySelectorAll('.freelance-card');

if (filterButtons.length > 0 && freelanceCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Gérer l'état actif des boutons
            filterButtons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');

            const filterValue = button.getAttribute('data-filter');

            // 2. Filtrer les cartes avec les classes Bootstrap
            freelanceCards.forEach(card => {
                // On réinitialise d'abord les styles inline s'il en restait
                card.style.removeProperty('display');

                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('d-none'); // On affiche la colonne proprement
                } else {
                    card.classList.add('d-none');    // On cache la colonne proprement
                }
            });
        });
    });
}
// ==========================================================================
// ANIMATION DE COMPTEUR DÉFILANT (DE 0 À LA VALEUR CIBLE)
// ==========================================================================
const counters = document.querySelectorAll('.display-counter');

counters.forEach(counter => {
    const updateCount = () => {
        // On récupère la valeur cible (ex: 2500)
        const target = parseInt(counter.getAttribute('data-target'));
        // On récupère la valeur actuelle (au début, 0)
        const count = parseInt(counter.innerText);

        // On définit la vitesse (plus le diviseur est grand, plus c'est lent)
        const speed = 100; 
        const increment = Math.ceil(target / speed);

        // Si la valeur actuelle est inférieure à la cible, on ajoute l'incrément
        if (count < target) {
            counter.innerText = count + increment;
            // On rappelle la fonction après un micro-délai (15ms) pour créer l'effet fluide
            setTimeout(updateCount, 15);
        } else {
            // Sécurité : si on dépasse un poil à cause de l'arrondi, on force la valeur exacte
            counter.innerText = target;
        }
    };

    updateCount();
});
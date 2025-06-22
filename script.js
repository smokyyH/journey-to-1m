document.addEventListener('DOMContentLoaded', function() {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah perilaku default tautan (loncat langsung)

            const targetId = this.getAttribute('href'); // Mendapatkan ID target dari atribut href
            const targetElement = document.querySelector(targetId); // Mendapatkan elemen target
            const navbarHeight = document.getElementById('navbar').offsetHeight; // Tinggi navbar

            // Menggulir ke elemen target dengan offset untuk navbar
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - navbarHeight - 20; // -20 untuk sedikit padding tambahan
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Membuat guliran menjadi halus
                });

                // Menambahkan kelas 'active' pada tautan navigasi yang sedang aktif
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // 2. Animate Elements on Scroll (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // Mengamati viewport sebagai root
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat, aktifkan callback
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jika elemen masuk ke dalam viewport
                entry.target.classList.add('is-visible'); // Tambahkan kelas untuk memicu animasi
                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi dipicu
            }
        });
    }, observerOptions);

    // Amati setiap elemen yang memiliki kelas 'animate-on-scroll'
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // 3. Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust for navbar height
            if (window.scrollY >= sectionTop - document.getElementById('navbar').offsetHeight - 50) { // Add extra offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Call on load and on scroll
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);
});
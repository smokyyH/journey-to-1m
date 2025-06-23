document.addEventListener('DOMContentLoaded', function() {

    // --- UTILITIES ---
    const getNavbarHeight = () => document.getElementById('navbar')?.offsetHeight || 0; // Mengambil tinggi navbar

    // --- 1. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - getNavbarHeight() - 20; // Offset untuk navbar dan padding
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Animate Elements on Scroll (Intersection Observer with Stagger) ---
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: '0px',
        threshold: 0.1 // Ketika 10% elemen terlihat, aktifkan callback
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan kelas 'is-visible' untuk memicu animasi
                entry.target.classList.add('is-visible');

                // Jika elemen adalah item grid, tambahkan delay untuk staggered effect
                if (entry.target.classList.contains('feature-item') || entry.target.classList.contains('testimonial-item')) {
                    const parentGrid = entry.target.parentElement;
                    const index = Array.from(parentGrid.children).indexOf(entry.target);
                    // Hitung delay berdasarkan index (0.1s, 0.2s, 0.3s, dst.)
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi dipicu
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- 3. Highlight Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        let currentSectionId = '';
        const scrollY = window.scrollY;
        const navbarHeight = getNavbarHeight();

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50; // Sesuaikan offset
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Panggil saat dimuat dan saat digulir
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);

    // --- 4. Scroll To Top Button Logic ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Tampilkan/sembunyikan tombol berdasarkan posisi scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Tampilkan tombol setelah menggulir 300px
            scrollToTopBtn.style.display = 'block';
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
            // Gunakan timeout untuk display: 'none' setelah transisi opacity selesai
            setTimeout(() => { scrollToTopBtn.style.display = 'none'; }, 300);
        }
    });

    // Gulir ke atas saat tombol diklik
    if (scrollToTopBtn) { // Pastikan tombol ada sebelum menambahkan event listener
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
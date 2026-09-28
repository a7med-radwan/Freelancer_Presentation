/**
 * HIRELAND PRESENTATION - INTERACTIVE PRESENTATION ENGINE
 * UCAS Freelancing Bootcamp 2026
 * Presenter: Ahmed Haitham Radwan (Backend Engineer)
 */

document.addEventListener('DOMContentLoaded', () => {
    // State Variables
    let currentSlide = 0;
    const totalSlides = 5;
    const slides = document.querySelectorAll('.slide-section');
    const dots = document.querySelectorAll('.dot-indicator');
    const progressBar = document.getElementById('deck-progress-bar');
    const slideCounter = document.getElementById('current-slide-num');

    // ==========================================
    // 1. SLIDE NAVIGATION LOGIC
    // ==========================================
    function updateSlide(newIndex) {
        if (newIndex < 0 || newIndex >= totalSlides) return;

        slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'slide-prev');
            if (idx === newIndex) {
                slide.classList.add('active');
            } else if (idx < newIndex) {
                slide.classList.add('slide-prev');
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === newIndex);
        });

        // Update top linear progress bar
        const progressPercent = ((newIndex + 1) / totalSlides) * 100;
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        // Update counter label
        if (slideCounter) {
            slideCounter.textContent = `0${newIndex + 1}`;
        }

        currentSlide = newIndex;

        // Trigger animations for specific slides
        if (currentSlide === 1) {
            animateCounters();
        }
    }

    window.goToSlide = function(index) {
        updateSlide(index);
    };

    window.nextSlide = function() {
        if (currentSlide < totalSlides - 1) {
            updateSlide(currentSlide + 1);
        }
    };

    window.prevSlide = function() {
        if (currentSlide > 0) {
            updateSlide(currentSlide - 1);
        }
    };

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        const activeModal = document.querySelector('.modal-overlay:not(.hidden)');
        if (activeModal && e.key !== 'Escape') return;

        if (e.key === 'ArrowLeft' || e.key === ' ' || e.key === 'PageDown') {
            e.preventDefault();
            window.nextSlide();
        } else if (e.key === 'ArrowRight' || e.key === 'PageUp') {
            e.preventDefault();
            window.prevSlide();
        } else if (e.key === 'Home') {
            e.preventDefault();
            window.goToSlide(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            window.goToSlide(totalSlides - 1);
        } else if (e.key === 'Escape') {
            closeAllModals();
        } else if (e.key.toLowerCase() === 'f') {
            toggleFullscreen();
        }
    });

    // ==========================================
    // 2. FULLSCREEN TOGGLE
    // ==========================================
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.log(`Fullscreen error: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // ==========================================
    // 3. MOBILE TOUCH SWIPE GESTURES
    // ==========================================
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 45;

    document.addEventListener('touchstart', (e) => {
        const activeModal = document.querySelector('.modal-overlay:not(.hidden)');
        if (activeModal) return;
        if (e.changedTouches && e.changedTouches.length > 0) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const activeModal = document.querySelector('.modal-overlay:not(.hidden)');
        if (activeModal) return;
        if (e.changedTouches && e.changedTouches.length > 0) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipeGesture();
        }
    }, { passive: true });

    function handleSwipeGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Ensure horizontal swipe is dominant over vertical scroll
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            // Swipe Left (deltaX < 0) -> Next slide
            // Swipe Right (deltaX > 0) -> Prev slide
            if (deltaX < 0) {
                window.nextSlide();
            } else {
                window.prevSlide();
            }
        }
    }

    // ==========================================
    // 4. ANIMATED STATS COUNTER (SLIDE 2)
    // ==========================================
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        const statElements = document.querySelectorAll('.counter-stat');
        statElements.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            let current = 0;
            const step = Math.max(1, Math.floor(target / 25));
            const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                    el.textContent = target === 100 ? '100%' : `+${target}`;
                } else {
                    el.textContent = target === 100 ? `${current}%` : `+${current}`;
                }
            }, 30);
        });
    }

    // ==========================================
    // 5. SLIDE 3: INTERACTIVE 4 PROBLEMS POSTERS SWITCHER
    // ==========================================
    const problemsData = [
        {
            title: "1. مشكلة التشتت بين المنصات",
            image: "image/المشكلة الاولى.jpg"
        },
        {
            title: "2. مشكلة عدم الفرز والتصفية",
            image: "image/المشكلة التانية.jpg"
        },
        {
            title: "3. مشكلة التأخر وضياع الفرصة",
            image: "image/المشكلة التالتة.jpg"
        },
        {
            title: "4. مشكلة الاستعداد وصياغة المقترح",
            image: "image/المشكلة الرابع.jpg"
        },
        {
            title: "بوستر المشاكل والحل المتكامل الرسمي",
            image: "image/اسماء المشاكل في صورة وحدة.jpg"
        }
    ];

    window.currentProblemImage = problemsData[0].image;

    window.switchProblem = function(index, btn) {
        const p = problemsData[index];
        if (!p) return;

        if (btn) {
            const parent = btn.parentElement;
            parent.querySelectorAll('.tab-pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        const titleEl = document.getElementById('problem-title');
        const imgEl = document.getElementById('problem-preview-img');

        if (titleEl) titleEl.textContent = p.title;
        if (imgEl) imgEl.src = p.image;

        window.currentProblemImage = p.image;
    };

    // ==========================================
    // 6. SLIDE 4: TEAMWORK TRACKS DATA & SWITCHER (MAIN FOCUS ⭐)
    // ==========================================
    const teamTracksData = [
        {
            badge: "مسار الهوية والتسويق",
            badgeColor: "bg-pink-100 text-pink-700",
            title: "الهوية البصرية وشعار Hireland الرسمي",
            image: "image/logo.png"
        },
        {
            badge: "مسار الـ UI/UX",
            badgeColor: "bg-purple-100 text-purple-700",
            title: "شاشة البداية وتجربة المستخدم (Intro Layout)",
            image: "image/Intro.png"
        },
        {
            badge: "مسار الـ Frontend",
            badgeColor: "bg-blue-100 text-blue-700",
            title: "شاشة التسجيل وفلترة الوظائف (Sign up & Filter)",
            image: "image/sign up.png"
        },
        {
            badge: "تطبيق الموبايل",
            badgeColor: "bg-amber-100 text-amber-800",
            title: "واجهة وتطبيق الموبايل المتجاوب (Mobile Responsive)",
            image: "image/A photo of a logo on an iPhone.png"
        }
    ];

    window.currentTrackImage = teamTracksData[0].image;

    window.switchTeamTrack = function(index, btn) {
        const track = teamTracksData[index];
        if (!track) return;

        if (btn) {
            const parent = btn.parentElement;
            parent.querySelectorAll('.tab-pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        const badgeEl = document.getElementById('track-badge');
        const titleEl = document.getElementById('track-title');
        const imgEl = document.getElementById('track-media-img');

        if (badgeEl) {
            badgeEl.className = `px-2 py-0.5 rounded text-[10px] font-bold ${track.badgeColor}`;
            badgeEl.textContent = track.badge;
        }
        if (titleEl) titleEl.textContent = track.title;
        if (imgEl) imgEl.src = track.image;

        window.currentTrackImage = track.image;
    };

    // ==========================================
    // 7. SLIDE 4: UI IMAGES SWITCHER
    // ==========================================
    const slide5Images = {
        intro: {
            title: "واجهة الموقع الرسمية - شاشة البداية (Intro)",
            image: "image/Intro.png"
        },
        signup: {
            title: "واجهة الموقع الرسمية - شاشة التسجيل والفلترة (Sign Up)",
            image: "image/sign up.png"
        },
        cv: {
            title: "واجهة إنشاء ورفع السيرة الذاتية (Create / Upload CV)",
            image: "image/Create a new cv or uplode.png"
        }
    };

    window.currentSlide5Image = slide5Images.intro.image;

    window.switchSlide5Image = function(type, btn) {
        const item = slide5Images[type];
        if (!item) return;

        if (btn) {
            const parent = btn.parentElement;
            parent.querySelectorAll('.tab-pill-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        const titleEl = document.getElementById('slide5-image-title');
        const imgEl = document.getElementById('slide5-preview-img');

        if (titleEl) titleEl.textContent = item.title;
        if (imgEl) imgEl.src = item.image;

        window.currentSlide5Image = item.image;
    };

    // ==========================================
    // 8. MODAL WINDOWS CONTROLS
    // ==========================================
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    };

    window.closeAllModals = function() {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(m => m.classList.add('hidden'));
    };

    window.openImageModal = function(imageSrc, caption = '') {
        const modal = document.getElementById('image-modal');
        const img = document.getElementById('image-modal-src');
        const cap = document.getElementById('image-modal-caption');

        if (modal && img) {
            img.src = imageSrc;
            if (cap) cap.textContent = caption || 'معاينة بدقة عالية - مشروع Hireland';
            modal.classList.remove('hidden');
        }
    };

    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.add('hidden');
            }
        });
    });

    // Initial setup
    updateSlide(0);
});

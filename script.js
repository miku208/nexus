// Countdown Timer
let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const endTime = new Date(tournamentConfig.endTime).getTime();
    const distance = endTime - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection) {
            countdownSection.innerHTML = `
                <p><i class="fas fa-check-circle"></i> Turnamen Sedang Berlangsung!</p>
                <a href="https://wa.me/${tournamentConfig.contact.whatsapp}?text=Halo%20Miku%20Store,%20saya%20mau%20daftar%20turnamen%20berikutnya" 
                   class="btn btn-primary" style="margin-top: 16px; display: inline-block;">
                    Daftar Turnamen Selanjutnya
                </a>
            `;
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (86400000)) / (3600000));
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Copy Nomor DANA
function copyDanaNumber() {
    const danaNumber = document.getElementById('danaNumber').innerText;
    
    navigator.clipboard.writeText(danaNumber).then(() => {
        const btn = document.getElementById('copyDanaBtn');
        const originalIcon = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = '#22c55e';
        
        showToast('Nomor DANA berhasil disalin!');
        
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.style.background = '#a855f7';
        }, 2000);
    }).catch(err => {
        console.error('Gagal copy: ', err);
        showToast('Gagal menyalin nomor', 'error');
    });
}

// Download QR - dengan ukuran lebih besar
function downloadQR() {
    const qrisImage = document.getElementById('qrisImage');
    if (qrisImage && qrisImage.src && !qrisImage.src.includes('demo') && qrisImage.src !== window.location.href) {
        const link = document.createElement('a');
        link.download = 'https://raw.githubusercontent.com/miku208/data-produk/refs/heads/main/IMG-20260416-WA0121.jpg';
        link.href = qrisImage.src;
        link.click();
        showToast('QR Code berhasil di download!');
    } else {
        showToast('Silakan upload QR code asli terlebih dahulu', 'info');
        
        // Create canvas untuk demo QR dengan ukuran lebih besar (600x600)
        const canvas = document.createElement('canvas');
        const size = 600; // Ukuran 2x lipat dari sebelumnya (300)
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Background putih
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        
        // Border ungu lebih tebal
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, size - 40, size - 40);
        
        // Kotak-kotak QR style (diperbesar)
        ctx.fillStyle = '#000000';
        // Pojok kiri atas
        ctx.fillRect(40, 40, 80, 80);
        ctx.fillRect(40, 140, 20, 20);
        ctx.fillRect(140, 40, 20, 20);
        
        // Pojok kanan atas
        ctx.fillRect(size - 120, 40, 80, 80);
        ctx.fillRect(size - 60, 40, 20, 20);
        ctx.fillRect(size - 120, 140, 20, 20);
        
        // Pojok kiri bawah
        ctx.fillRect(40, size - 120, 80, 80);
        ctx.fillRect(40, size - 60, 20, 20);
        ctx.fillRect(140, size - 120, 20, 20);
        
        // Text di tengah (lebih besar)
        ctx.fillStyle = '#8B5CF6';
        ctx.font = 'bold 32px Arial';
        ctx.fillText('NEXUS', size/2 - 70, size/2 - 15);
        ctx.font = 'bold 32px Arial';
        ctx.fillText('GAMES', size/2 - 65, size/2 + 35);
        
        // Random dots untuk efek QR (lebih banyak)
        ctx.fillStyle = '#333333';
        for(let i = 0; i < 500; i++) {
            const x = 200 + Math.random() * 200;
            const y = 200 + Math.random() * 200;
            ctx.fillRect(x, y, 4, 4);
        }
        
        const link = document.createElement('a');
        link.download = 'qris-nexusgames.png';
        link.href = canvas.toDataURL();
        link.click();
        showToast('Demo QR Code di download (gunakan QR asli untuk transaksi)', 'info');
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    let toast = document.querySelector('.custom-toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = type === 'success' ? '#a855f7' : '#ef4444';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '50px';
        toast.style.zIndex = '9999';
        toast.style.fontWeight = '600';
        toast.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        toast.style.backdropFilter = 'blur(10px)';
        toast.style.fontSize = '0.9rem';
        toast.style.whiteSpace = 'nowrap';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.backgroundColor = type === 'success' ? '#a855f7' : '#ef4444';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2500);
}

// Download QR
function downloadQR() {
    const qrisImage = document.getElementById('qrisImage');
    if (qrisImage && qrisImage.src && !qrisImage.src.includes('demo')) {
        const link = document.createElement('a');
        link.download = 'qris-mikustore.png';
        link.href = qrisImage.src;
        link.click();
        showToast('QR Code berhasil di download!');
    } else {
        showToast('Silakan upload QR code asli terlebih dahulu', 'info');
        
        // Create canvas untuk demo QR
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#8B5CF6';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('MIKU STORE', 70, 150);
        ctx.font = '14px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText('Scan untuk bayar', 95, 200);
        ctx.fillText('Turnamen FF', 105, 230);
        
        const link = document.createElement('a');
        link.download = 'qris-mikustore.png';
        link.href = canvas.toDataURL();
        link.click();
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.backdropFilter = 'blur(12px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    });
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.feature-card, .tournament-card, .payment-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Video Handler
function initVideoBackground() {
    const video = document.querySelector('.banner-video');
    if (video) {
        video.addEventListener('error', function() {
            console.log('Video background error, using fallback');
            const videoContainer = document.querySelector('.video-background-blur');
            if (videoContainer) {
                videoContainer.style.background = 'linear-gradient(135deg, #0a0a0f, #1a1a2e)';
            }
        });
    }
}

// Empty Links Handler
function initEmptyLinks() {
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Fitur akan segera hadir!', 'info');
        });
    });
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    if (typeof tournamentConfig !== 'undefined') {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    } else {
        console.error('tournamentConfig tidak ditemukan');
    }
    
    const copyBtn = document.getElementById('copyDanaBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyDanaNumber);
    }
    
    const downloadBtn = document.getElementById('downloadQRBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadQR);
    }
    
    initMobileMenu();
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimation();
    initVideoBackground();
    initEmptyLinks();
});
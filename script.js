// ===== CÀI ĐẶT QUAN TRỌNG =====
// Thay đổi ngày bắt đầu yêu nhau của bạn ở đây (định dạng: YYYY-MM-DD)
const START_DATE = '2024-01-20'; // Thay đổi ngày này theo ngày của bạn

// ===== WELCOME SCREEN & NHẠC NỀN =====
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');
const enterBtn = document.getElementById('enterBtn');
let isMusicPlaying = false;

// Xử lý khi click nút "Mở Quà Nhé Em"
enterBtn.addEventListener('click', () => {
    // Phát nhạc ngay khi click nút
    bgMusic.volume = 0.7;
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎶';
        console.log('🎵 Nhạc đang phát!');
    }).catch(err => {
        console.log('Cannot play music:', err);
    });

    // Ẩn welcome screen
    welcomeScreen.classList.add('hide');

    // Hiển thị nội dung chính sau 500ms
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';

        // Trigger animations
        document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    }, 500);
});

// Nút bật/tắt nhạc
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🎵';
    } else {
        bgMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🎶';
    }
    isMusicPlaying = !isMusicPlaying;
});

// ===== HIỆU ỨNG HOA RƠI =====
const canvas = document.getElementById('flowerCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Các emoji hoa và trái tim
const emojis = ['🌸', '🌺', '🌼', '🌻', '🌹', '💕', '💖', '💗', '💝', '🌷'];

class Flower {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50;
        this.speed = 1 + Math.random() * 2;
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.size = 20 + Math.random() * 20;
        this.swing = Math.random() * 2 - 1;
        this.swingSpeed = 0.01 + Math.random() * 0.02;
        this.angle = 0;
    }

    update() {
        this.y += this.speed;
        this.angle += this.swingSpeed;
        this.x += Math.sin(this.angle) * this.swing;

        if (this.y > canvas.height + 50) {
            this.reset();
        }
    }

    draw() {
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.emoji, this.x, this.y);
    }
}

const flowers = [];
for (let i = 0; i < 30; i++) {
    flowers.push(new Flower());
}

function animateFlowers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flowers.forEach(flower => {
        flower.update();
        flower.draw();
    });

    requestAnimationFrame(animateFlowers);
}

animateFlowers();

// Resize canvas khi thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== HỘP QUÀ BẤT NGỜ =====
const giftBox = document.getElementById('giftBox');
const surpriseMessage = document.getElementById('surpriseMessage');
let giftOpened = false;

giftBox.addEventListener('click', () => {
    if (!giftOpened) {
        giftBox.classList.add('opened');

        setTimeout(() => {
            surpriseMessage.classList.remove('hidden');
            surpriseMessage.classList.add('show');

            // Hiệu ứng pháo hoa
            createFireworks();
        }, 600);

        giftOpened = true;
    }
});

// ===== HIỆU ỨNG PHÁO HOA =====
function createFireworks() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💝', '✨', '⭐'][Math.floor(Math.random() * 6)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
            heart.style.fontSize = (20 + Math.random() * 30) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'firework 2s ease-out forwards';

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 2000);
        }, i * 30);
    }
}

// CSS cho animation pháo hoa
const style = document.createElement('style');
style.textContent = `
    @keyframes firework {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== BỘ ĐẾM THỜI GIAN =====
function updateCounter() {
    const startDate = new Date(START_DATE);
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

updateCounter();
setInterval(updateCounter, 1000);

// ===== HIỆU ỨNG TRÁI TIM BAY TỪ ĐÁY =====
const heartsContainer = document.getElementById('heartsContainer');

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['💕', '💖', '💗', '💝', '❤️', '💓'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Tạo trái tim mới mỗi 800ms
setInterval(createFloatingHeart, 800);

// ===== HIỆU ỨNG CLICK =====
document.addEventListener('click', (e) => {
    // Tạo hiệu ứng trái tim khi click
    const clickHeart = document.createElement('div');
    clickHeart.innerHTML = '💖';
    clickHeart.style.position = 'fixed';
    clickHeart.style.left = e.clientX + 'px';
    clickHeart.style.top = e.clientY + 'px';
    clickHeart.style.fontSize = '30px';
    clickHeart.style.pointerEvents = 'none';
    clickHeart.style.zIndex = '9999';
    clickHeart.style.animation = 'clickHeart 1s ease-out forwards';

    document.body.appendChild(clickHeart);

    setTimeout(() => clickHeart.remove(), 1000);
});

// CSS cho click animation
const clickStyle = document.createElement('style');
clickStyle.textContent = `
    @keyframes clickHeart {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -100px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(clickStyle);

// ===== GALLERY CLICK HANDLER =====
// Khi người dùng click vào placeholder, có thể thêm chức năng upload ảnh
const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
photoPlaceholders.forEach((placeholder, index) => {
    placeholder.addEventListener('click', () => {
        // Có thể thêm chức năng upload ảnh ở đây
        console.log(`Placeholder ${index + 1} clicked - Có thể thêm ảnh tại đây`);
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe các section để tạo hiệu ứng khi scroll
document.querySelectorAll('.gift-section, .counter-section, .gallery-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ===== THÔNG BÁO CHÀO MỪNG =====
window.addEventListener('load', () => {
    // Có thể thêm một popup chào mừng ở đây nếu muốn
    console.log('💖 Website 20/10 đã được tải! Chúc bạn và người yêu hạnh phúc! 💖');
});

// ===== PREVENT CONTEXT MENU (TÙY CHỌN) =====
// Bỏ comment dòng dưới nếu muốn vô hiệu hóa chuột phải
// document.addEventListener('contextmenu', (e) => e.preventDefault());

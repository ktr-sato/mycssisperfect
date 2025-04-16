const gallery = document.getElementById('gallery');
const background = document.querySelector('.gallery-background');
const galleryItems = document.querySelectorAll('.gallery-item');
const loader = document.getElementById('loading-screen');
const endMessage = document.querySelector('.end-message');

function setRealVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setRealVh);
window.addEventListener('load', setRealVh);

// --- 慣性スクロール（PC用） ---
let targetScroll = 0;
let currentScroll = 0;
let isAnimating = false;

if (!('ontouchstart' in window)) {
  gallery.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;

    targetScroll += delta;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    if (!isAnimating) {
      isAnimating = true;
      smoothScroll();
    }
  }, { passive: false });
}

function smoothScroll() {
  const easing = 0.05;
  const loop = () => {
    const diff = targetScroll - currentScroll;
    currentScroll += diff * easing;

    gallery.scrollLeft = currentScroll;

    if (Math.abs(diff) > 0.5) {
      requestAnimationFrame(loop);
    } else {
      currentScroll = targetScroll;
      gallery.scrollLeft = targetScroll;
      isAnimating = false;
    }
  };
  loop();
}

// --- スクロール処理最適化 ---
let ticking = false;

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      applyParallax();
      checkVisibility();
      ticking = false;
    });
    ticking = true;
  }
}

gallery.addEventListener('scroll', onScroll);

// --- パララックス効果 ---
function applyParallax() {
  const scrollPosition = gallery.scrollLeft;
  const parallaxSpeed = 0.3;
  const newBackgroundPosition = -scrollPosition * parallaxSpeed;
  background.style.backgroundPosition = `${newBackgroundPosition}px 0`;
}

// --- 画像のフェードイン ---
function checkVisibility() {
  galleryItems.forEach((item) => {
    const itemBounds = item.getBoundingClientRect();
    if (itemBounds.right >= 0 && itemBounds.left <= window.innerWidth) {
      item.classList.add('visible');
    }
  });
}

// --- ページ読み込み＆画像プリロード＆ローディング非表示 ---
window.addEventListener('load', () => {
  const imagesToPreload = [
    './img/DSC02015.JPG',
    './img/DSC02016.JPG',
    './img/DSC02017.JPG',
    './img/DSC02018.JPG',
    "./img/DSC02018.JPG",
    "./img/DSC02023.JPG",
    "./img/DSC02029.JPG",
    "./img/DSC02032.JPG",
    "./img/DSC02036.JPG",
    "./img/DSC02037.JPG",
    "./img/DSC02039~2.JPG",
    "./img/DSC02063.JPG",
    "./img/DSC02058.JPG",
    "./img/DSC02070.JPG",
    "./img/DSC02073~2.JPG",
    "./img/DSC02075.JPG",
    "./img/DSC02085.JPG",
    "./img/DSC02121.JPG",
    "./img/DSC02127.JPG",
    "./img/DSC02142.JPG",
    "./img/DSC02145.JPG",
    "./img/DSC02155.JPG",
    "./img/20250407_174736703.JPG",
  ];

  const promises = imagesToPreload.map((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject(`Failed to load image: ${src}`);
    });
  });

  // 最低2秒はローディングを表示
  const delay = new Promise(resolve => setTimeout(resolve, 2000));

  Promise.all([...promises, delay])
    .then(() => {
      loader.style.display = 'none'; // ローディング画面を非表示に
      applyParallax();
      checkVisibility();
    })
    .catch((error) => {
      console.error(error);
    });
});

// --- 最後の画像到達でメッセージ表示 ---
gallery.addEventListener('scroll', () => {
  const scrollLeft = gallery.scrollLeft;
  const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;

  if (scrollLeft >= maxScrollLeft - 10) {
    endMessage.classList.add('visible');
  } else {
    endMessage.classList.remove('visible');
  }
});

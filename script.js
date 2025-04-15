const gallery = document.getElementById('gallery');
const background = document.querySelector('.gallery-background');
const galleryItems = document.querySelectorAll('.gallery-item');

// --- 横スクロール制御（PCのみ） ---
if (!('ontouchstart' in window)) {
  let isScrolling = false;

  gallery.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (!isScrolling) {
      isScrolling = true;
      const scrollAmount = e.deltaY > 0 ? 1 : -1;
      const currentScroll = gallery.scrollLeft;
      const scrollWidth = gallery.scrollWidth;
      const galleryWidth = gallery.clientWidth;
      let newScrollPosition = currentScroll + scrollAmount * galleryWidth;

      newScrollPosition = Math.max(0, Math.min(newScrollPosition, scrollWidth - galleryWidth));

      gallery.scrollTo({ left: newScrollPosition, behavior: 'smooth' });

      setTimeout(() => {
        isScrolling = false;
      }, 150);
    }
  }, { passive: false });
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
  const galleryBounds = gallery.getBoundingClientRect();
  galleryItems.forEach((item) => {
    const itemBounds = item.getBoundingClientRect();
    if (itemBounds.right >= 0 && itemBounds.left <= window.innerWidth) {
      item.classList.add('visible');
    }
  });
}

const loader = document.getElementById('loading-screen');

// --- 初期表示時にチェック ---
// ページの読み込み完了後にローディング画面を非表示にする
window.addEventListener('load', () => {
    // // ローディング画面を非表示にする
    // setTimeout(() => {
    //     // ローディング画面を非表示にする
    //     const loadingScreen = document.getElementById('loading-screen');
    //     loadingScreen.classList.add('hidden');
    //   }, 2500);
      // 画像をプリロードするコード
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

  Promise.all(promises)
    .then(() => {
      loader.style.display = 'none'; // ローディング画面を非表示に
    })
    .catch((error) => {
      console.error(error);
    });
  
    // 既存の関数を実行（パララックスや画像の表示チェックなど）
    applyParallax();
    checkVisibility();
  });
  

const endMessage = document.querySelector('.end-message');

gallery.addEventListener('scroll', () => {
  // 既存の checkVisibility(); の下などに追記
  const scrollLeft = gallery.scrollLeft;
  const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;

  if (scrollLeft >= maxScrollLeft - 10) {
    endMessage.classList.add('visible');
  } else {
    endMessage.classList.remove('visible');
  }
});

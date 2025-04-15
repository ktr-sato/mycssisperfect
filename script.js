const gallery = document.getElementById('gallery');
let isScrolling = false;

// スクロールに応じてギャラリーの位置を調整
gallery.addEventListener('wheel', (e) => {
  e.preventDefault(); // デフォルトのスクロール動作を無効化

  if (!isScrolling) {
    isScrolling = true;
    const scrollAmount = e.deltaY > 0 ? 1 : -1; // 下方向にスクロールするか上方向かを判定
    const currentScroll = gallery.scrollLeft;
    const scrollWidth = gallery.scrollWidth;
    const galleryWidth = gallery.clientWidth;

    let newScrollPosition = currentScroll + (scrollAmount * galleryWidth);

    // ギャラリーの範囲を越えないように調整
    if (newScrollPosition < 0) newScrollPosition = 0;
    if (newScrollPosition > scrollWidth - galleryWidth) newScrollPosition = scrollWidth - galleryWidth;

    // ギャラリーをスムーズにスクロール
    gallery.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });

    // スクロールが終わったらフラグをリセット
    setTimeout(() => {
      isScrolling = false;
    }, 150); // スクロール終了後にフラグをリセット（150ms待つ）
  }
});

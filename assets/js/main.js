// Star banner close function
function closeBanner() {
  const banner = document.getElementById('starBanner');
  if (banner) {
    banner.classList.add('hidden');
    // Remember the user closed it (persist for 30 days)
    localStorage.setItem('starBannerClosed', 'true');
    localStorage.setItem('starBannerClosedTime', Date.now().toString());
  }
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check if star banner should be hidden
  const bannerClosed = localStorage.getItem('starBannerClosed');
  const closedTime = localStorage.getItem('starBannerClosedTime');
  const banner = document.getElementById('starBanner');

  if (banner && bannerClosed === 'true' && closedTime) {
    const daysSinceClosed = (Date.now() - parseInt(closedTime)) / (1000 * 60 * 60 * 24);
    if (daysSinceClosed < 30) {
      banner.classList.add('hidden');
    } else {
      // Reset after 30 days
      localStorage.removeItem('starBannerClosed');
      localStorage.removeItem('starBannerClosedTime');
    }
  }

  // Tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.querySelector(`[data-tab-content="${tabName}"]`).classList.add('active');
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
  }

  // Lightbox for screenshots
  initLightbox();
});

// Lightbox functionality
function initLightbox() {
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <div class="lightbox-content">
      <img class="lightbox-image" src="" alt="">
      <video class="lightbox-video" muted loop playsinline style="display: none;">
        <source src="" type="video/mp4">
      </video>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxVideo = lightbox.querySelector('.lightbox-video');
  const lightboxVideoSource = lightboxVideo.querySelector('source');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  // Add click handlers to screenshots
  document.querySelectorAll('.screenshot').forEach(img => {
    img.style.cursor = 'pointer';
    img.setAttribute('title', 'Click to enlarge');

    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxImage.style.display = 'block';
      lightboxVideo.style.display = 'none';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Add click handlers to demo videos
  document.querySelectorAll('.demo-video').forEach(video => {
    video.style.cursor = 'pointer';
    video.setAttribute('title', 'Click to enlarge');

    video.addEventListener('click', () => {
      const source = video.querySelector('source');
      if (source) {
        lightboxVideoSource.src = source.src;
        lightboxVideo.load();
        lightboxVideo.play();
        lightboxVideo.style.display = 'block';
        lightboxImage.style.display = 'none';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox handlers
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxVideo.pause();
  }
}

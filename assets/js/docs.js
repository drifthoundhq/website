// Documentation JavaScript - TOC generation and mobile navigation

document.addEventListener('DOMContentLoaded', function() {
  // Auto-generate table of contents
  generateTableOfContents();

  // Setup mobile sidebar toggle
  setupMobileSidebar();

  // Setup scroll spy for TOC
  setupScrollSpy();
});

/**
 * Generate table of contents from h2 headings only
 */
function generateTableOfContents() {
  const article = document.querySelector('.docs-article');
  const tocNav = document.getElementById('table-of-contents');

  if (!article || !tocNav) return;

  // Clear any existing content first
  tocNav.innerHTML = '';

  const headings = article.querySelectorAll('h2');

  // Filter out "Table of Contents" headings
  const filteredHeadings = Array.from(headings).filter(heading => {
    return !heading.textContent.toLowerCase().includes('table of contents');
  });

  if (filteredHeadings.length === 0) {
    const tocContainer = tocNav.parentElement;
    if (tocContainer) {
      tocContainer.style.display = 'none';
    }
    return;
  }

  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';

  filteredHeadings.forEach((heading, index) => {
    // Add ID if not present
    if (!heading.id) {
      heading.id = heading.textContent
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const li = document.createElement('li');
    li.className = 'toc-item';

    const a = document.createElement('a');
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    a.dataset.headingId = heading.id;

    // Smooth scroll on click
    a.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${heading.id}`);
    });

    li.appendChild(a);
    tocList.appendChild(li);
  });

  tocNav.appendChild(tocList);
}

/**
 * Setup mobile sidebar toggle functionality
 */
function setupMobileSidebar() {
  const sidebar = document.querySelector('.docs-sidebar');
  if (!sidebar) return;

  // Create toggle button if it doesn't exist
  let toggleBtn = document.querySelector('.docs-sidebar-toggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'docs-sidebar-toggle';
    toggleBtn.innerHTML = '☰ Menu';
    toggleBtn.setAttribute('aria-label', 'Toggle documentation navigation');
    document.body.appendChild(toggleBtn);
  }

  // Toggle sidebar
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });

  // Close sidebar when clicking a link on mobile
  const sidebarLinks = sidebar.querySelectorAll('.docs-nav-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });
}

/**
 * Setup scroll spy to highlight active TOC section
 */
function setupScrollSpy() {
  const article = document.querySelector('.docs-article');
  const tocNav = document.getElementById('table-of-contents');

  if (!article || !tocNav) return;

  const headings = article.querySelectorAll('h2');

  // Filter out "Table of Contents" headings
  const filteredHeadings = Array.from(headings).filter(heading => {
    return !heading.textContent.toLowerCase().includes('table of contents');
  });

  if (filteredHeadings.length === 0) return;

  // Intersection Observer for scroll spy
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const tocLink = tocNav.querySelector(`a[data-heading-id="${id}"]`);

        if (entry.isIntersecting) {
          // Remove active class from all links
          tocNav.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
          });

          // Add active class to current link
          if (tocLink) {
            tocLink.classList.add('active');
          }
        }
      });
    },
    {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    }
  );

  // Observe filtered headings
  filteredHeadings.forEach((heading) => {
    observer.observe(heading);
  });
}

// ==========================================
// 1. DOCK TAB SWITCHING LOGIC
// ==========================================
function switchTab(tab) {
  // Hide all sections
  document.querySelectorAll('.tab-section').forEach(sec => {
    sec.classList.remove('active-section');
  });

  // Deactivate all dock links
  document.querySelectorAll('.dock-link').forEach(link => {
    link.classList.remove('active');
  });

  // Activate selected section
  const activeSec = document.getElementById(tab + '-section');
  if (activeSec) {
    activeSec.classList.add('active-section');
  }

  // Activate matching dock item
  const activeDock = document.getElementById('dock-' + tab);
  if (activeDock) {
    activeDock.classList.add('active');
  }

  // Scroll cleanly to the top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 2. CONTACT FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]')?.value;
    const email = contactForm.querySelector('input[type="email"]')?.value;
    const message = contactForm.querySelector('textarea')?.value;

    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent to Suresh. I will get back to you shortly.`);
      contactForm.reset();
    } else {
      alert('Please fill out all fields before sending.');
    }
  });
}

// ==========================================
// 3. BADGE CARDS HOVER INTERACTION
// ==========================================
document.querySelectorAll('.badge-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.zIndex = '15';
  });

  card.addEventListener('mouseleave', function () {
    this.style.zIndex = '3';
  });
});

// ==========================================
// 4. SKILL TILES HOVER POP
// ==========================================
document.querySelectorAll('.skill-tile').forEach(tile => {
  tile.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-5px) scale(1.05)';
  });

  tile.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ==========================================
// 5. REVEAL ANIMATIONS ON LOAD
// ==========================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ==========================================
// 6. FORCE DIRECT PDF FILE DOWNLOAD
// ==========================================
document.querySelectorAll('.download-cv-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const pdfUrl = this.getAttribute('href');
    const fileName = this.getAttribute('download') || 'Jaggampudi_Suresh_Resume.pdf';

    fetch(pdfUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.blob();
      })
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.href = blobUrl;
        tempLink.download = fileName;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch(() => {
        // Safe fallback for local file:// protocol
        const fallbackLink = document.createElement('a');
        fallbackLink.href = pdfUrl;
        fallbackLink.setAttribute('download', fileName);
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
      });
  });
});
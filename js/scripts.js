/* FEM.ME Sip Society – Custom JavaScript
   Erstellt von: Katharina Gründel
   Kurs: Content Management Systeme
   IU Internationale Hochschule */

/* ================================
   1. COOKIE-BANNER
   Zeigt den Banner beim ersten Besuch.
   Merkt sich die Einwilligung per localStorage.
   ================================ */

if (!localStorage.getItem('cookieAccepted')) {
  document.getElementById('cookie-banner').style.display = 'flex';
}

document.getElementById('cookie-accept').addEventListener('click', function() {
  localStorage.setItem('cookieAccepted', 'true');
  document.getElementById('cookie-banner').style.display = 'none';
});


/* ================================
   2. COUNTDOWN-TIMER
   Zeigt die verbleibende Zeit bis zur
   nächsten Ladies Night (15. August 2026).
   Aktualisiert sich jede Sekunde.
   ================================ */

const zieldatum = new Date('2026-08-15T21:00:00');

function updateCountdown() {
  const jetzt = new Date();
  const diff = zieldatum - jetzt;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-minutes').textContent = '00';
    document.getElementById('cd-seconds').textContent = '00';
    return;
  }

  const tage = Math.floor(diff / (1000 * 60 * 60 * 24));
  const stunden = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minuten = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const sekunden = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(tage).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(stunden).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minuten).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(sekunden).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
/* ==========================================================
   NEWSLETTER JOURNAL — Lightbox-Funktion
   Erwartete HTML-Struktur auf der Seite:

   <div class="journal-pages">
     <div class="journal-page-item" data-full="BILD-URL">
       <img src="BILD-URL" alt="...">
     </div>
     ... (weitere Kacheln)
   </div>

   <div class="journal-lightbox-overlay" id="journalLightbox">
     <div class="journal-lightbox-content">
       <button class="journal-lightbox-close" id="journalLightboxClose">&times;</button>
       <img src="" alt="" id="journalLightboxImg">
     </div>
   </div>
   ========================================================== */

(function () {
  const items = document.querySelectorAll('.journal-page-item');
  const overlay = document.getElementById('journalLightbox');
  const overlayImg = document.getElementById('journalLightboxImg');
  const closeBtn = document.getElementById('journalLightboxClose');

  // Öffnet die Lightbox mit dem angeklickten Bild
  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // verhindert Scrollen im Hintergrund
  }

  // Schließt die Lightbox
  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Klick auf eine Kachel öffnet die Lightbox mit dem passenden Bild
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      const fullSrc = item.getAttribute('data-full');
      const alt = item.querySelector('img').getAttribute('alt');
      openLightbox(fullSrc, alt);
    });
  });

  // Schließen-Button
  closeBtn.addEventListener('click', closeLightbox);

  // Klick außerhalb des Bildes schließt die Lightbox
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  // ESC-Taste schließt die Lightbox
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
})();

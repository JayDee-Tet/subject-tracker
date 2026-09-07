// ── Subject modal registry ────────────────────────
const modals = {
  'automata': 'modal-automata',
  'arch':     'modal-arch',
  'mobile':   'modal-mobile',
  'softeng':  'modal-softeng',
};

// ── Deadlines ─────────────────────────────────────
// Format: new Date('YYYY-MM-DDTHH:MM:00')
// Set to null if deadline is not yet known.
const deadlines = {
  'automata': new Date('2026-09-09T14:30:00'),
  'arch':     null,
  'mobile':   new Date('2026-10-10T09:00:00'),
  'softeng':  null,
};

// ── Countdown logic ───────────────────────────────
function formatCountdown(deadline) {
  if (!deadline) return '—';

  const diff = deadline - new Date();
  if (diff <= 0) return '0d 0h left';

  if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / 1000 / 60);
    return `${minutes}m left`;
  }

  const totalHours = Math.floor(diff / 1000 / 60 / 60);
  const days  = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `${days}d ${hours}h left`;
}

function isUrgent(deadline) {
  if (!deadline) return false;
  const diff = deadline - new Date();
  return diff > 0 && diff < 12 * 60 * 60 * 1000;
}

function updateCountdowns() {
  Object.keys(deadlines).forEach(id => {
    const deadline = deadlines[id];
    const text     = formatCountdown(deadline);
    const urgent   = isUrgent(deadline);

    const cardEl  = document.getElementById(`card-countdown-${id}`);
    const modalEl = document.getElementById(`modal-countdown-${id}`);
    const dotEl   = document.getElementById(`modal-dot-${id}`);

    if (cardEl)  { cardEl.textContent  = text; cardEl.classList.toggle('countdown-urgent', urgent); }
    if (modalEl) { modalEl.textContent = text; modalEl.classList.toggle('countdown-urgent', urgent); }
    if (dotEl)   { dotEl.classList.toggle('countdown-urgent', urgent); }
  });
}

updateCountdowns();
setInterval(updateCountdowns, 1000);

// ── Modal controls ────────────────────────────────
let activeModal = null;

function openModal(id) {
  if (!modals[id]) return;
  if (activeModal) {
    document.getElementById(modals[activeModal]).style.display = 'none';
  }
  const overlay = document.getElementById('overlay');
  const modalEl = document.getElementById(modals[id]);
  modalEl.style.display = 'block';
  overlay.classList.add('active');
  activeModal = id;
  modalEl.querySelector('.modal-close').focus();
}

function closeModal() {
  if (!activeModal) return;
  document.getElementById(modals[activeModal]).style.display = 'none';
  document.getElementById('overlay').classList.remove('active');
  activeModal = null;
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

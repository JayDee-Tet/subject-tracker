// ── Register all modal IDs here ──────────────────
// Key: id passed to openModal()
// Value: the modal element's id attribute (minus "modal-")
const modals = {
  'automata': 'modal-automata',
  'arch':     'modal-arch',
  'mobile':   'modal-mobile',
};

let activeModal = null;

function openModal(id) {
  if (!modals[id]) return;

  // Hide any currently open modal
  if (activeModal) {
    document.getElementById(modals[activeModal]).style.display = 'none';
  }

  const overlay = document.getElementById('overlay');
  const modalEl = document.getElementById(modals[id]);

  modalEl.style.display = 'block';
  overlay.classList.add('active');
  activeModal = id;

  // Trap focus on close button
  modalEl.querySelector('.modal-close').focus();
}

function closeModal() {
  if (!activeModal) return;
  document.getElementById(modals[activeModal]).style.display = 'none';
  document.getElementById('overlay').classList.remove('active');
  activeModal = null;
}

function handleOverlayClick(e) {
  // Close only when clicking the overlay itself, not the modal
  if (e.target === document.getElementById('overlay')) closeModal();
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});// ── Register all modal IDs here ──────────────────
// Key: id passed to openModal()
// Value: the modal element's id attribute (minus "modal-")
const modals = {
  'automata': 'modal-automata',
  'arch':     'modal-arch',
  // 'YOURID': 'modal-YOURID',   ← add new entries here
};

let activeModal = null;

function openModal(id) {
  if (!modals[id]) return;

  // Hide any currently open modal
  if (activeModal) {
    document.getElementById(modals[activeModal]).style.display = 'none';
  }

  const overlay = document.getElementById('overlay');
  const modalEl = document.getElementById(modals[id]);

  modalEl.style.display = 'block';
  overlay.classList.add('active');
  activeModal = id;

  // Trap focus on close button
  modalEl.querySelector('.modal-close').focus();
}

function closeModal() {
  if (!activeModal) return;
  document.getElementById(modals[activeModal]).style.display = 'none';
  document.getElementById('overlay').classList.remove('active');
  activeModal = null;
}

function handleOverlayClick(e) {
  // Close only when clicking the overlay itself, not the modal
  if (e.target === document.getElementById('overlay')) closeModal();
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

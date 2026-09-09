//    id           — unique key, no spaces (e.g. 'softeng')
//    title        — subject name shown on card and modal
//    todo         — short task label
//    instructions — (optional) longer description below todo
//    links        — array of { label, url }; leave as [] if none
//    deadline     — new Date('YYYY-MM-DDTHH:MM:00'), or null if unknown
//    deadlineNote — (optional) extra note shown after the deadline date

const subjects = [
  {
    id:       'automata',
    title:    'Automata Theory & Formal Language',
    todo:     'Watch tutorials and read the PDF.',
    links: [
      { label: 'Lessong 4 Drive', url: 'https://drive.google.com/drive/folders/141R_Z9nFQBEBMRj67OcotndZXpBxiCTR?usp=sharing' },
      { label: 'Download Lesson 4 PPTX',    url: 'https://cdn.fbsbx.com/v/t59.2708-21/799404038_1412922734269100_6178142865651889244_n.pptx/Lesson-4_Non-Deterministic_Finite_Automata.pptx?_nc_cat=107&ccb=1-7&_nc_sid=2b0e22&_nc_eui2=AeGjauhJn_EweUm8f7DHrXKCxolcyjSjut_GiVzKNKO639vSWOXcM392tsQYjmFpHT3CnuvlZXfjSyFc8sZP8Ovj&_nc_ohc=FL-k8pw_5w8Q7kNvwFZqq73&_nc_oc=AdpcmDQm6Ya9-msLkNum00pMScKsXqwVjp_WAey1AtgEKHyiE32G2Yq1kEPRSLg3eeQ&_nc_ad=z-m&_nc_cid=0&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=C6qStObQD8VHWFnxrGvlTw&_nc_ss=7a22e&oh=03_Q7cD6QH-33Ya4YQXdolo_H2t_xwL_5VTLTwvbeHwHSQRueYwmw&oe=6AA2EFD8&dl=1' },
      { label: 'Lessong 5 Drive', url: 'https://drive.google.com/drive/folders/1AJDPS1TfpA_CiLLBE7NMrplt1vGQ6UiQ' },
      { label: 'Download Lesson 5 PPTX',    url: 'https://cdn.fbsbx.com/v/t59.2708-21/470400120_949093140480521_1049891345508830970_n.pptx/Lesson-5_Conversion.pptx?_nc_cat=103&ccb=1-7&_nc_sid=2b0e22&_nc_eui2=AeEVt06XE_7z8EqN9tsxo2Ph4_k-xyOcuUTj-T7HI5y5RM23c9RSYas2vWv3_CCeHsZuB2tgr6M-oWRoJASdtRZl&_nc_ohc=yZDDwlFU1qQQ7kNvwEtSF-C&_nc_oc=AdocIS1LI9GHjkYdZAnaXrLt7KBwUxe2qBS86v_VU4RAEG8lOzPi-PM6lNBUmsjQxFc&_nc_ad=z-m&_nc_cid=0&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=olWJ5V1iDrnZMVDQmntW_Q&_nc_ss=7a22e&oh=03_Q7cD6QFRM3zC1kpw826LQ-MgjCRj1ZIgNa4cXGeQW8AAv1lwSA&oe=6AA2CA76&dl=1' },
    ],
    deadline: null,
  },
  {
    id:    'arch',
    title: 'Architecture & Organization',
    todo:  'Read the PDF.',
    links: [
      { label: 'Open Drive Folder', url: 'https://drive.google.com/drive/folders/1qUFjcMu5_HGboLVOVrCGlvOXWKVDB3Yj?usp=drive_link' },
       { label: 'Download PDF File',    url: 'https://cdn.fbsbx.com/v/t59.2708-21/794188621_1606489610913420_6005196771968394705_n.pdf/2026-Module-4-Computer-Data-Representation.pdf?_nc_cat=111&ccb=1-7&_nc_sid=2b0e22&_nc_eui2=AeFISPPnmH2CUaXjXVQhugqR8vFDduCYnHzy8UN24JicfPG1Rv7sz2KJz32s2hdzi1e7dCajESsOfomitTyEv6As&_nc_ohc=L1L-5-jOI-cQ7kNvwER3_Gx&_nc_oc=Adp01WMei9ZqyInqVWAbsnF-mj_ogHDQDXv6h_08lmKQ0o0QFaDkxYUr1JUEvN6qL1k&_nc_ad=z-m&_nc_cid=0&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=iYuBluhjMqSooTGTR8dxSQ&_nc_ss=7a22e&oh=03_Q7cD6QGdywo0RmPS_7ZEfjz7NCyEmDpJAS8dkek3aOxbIVsTPw&oe=6AA2E05B&dl=1' },
    ],
    deadline: null,
  },
  {
    id:           'mobile',
    title:        'Mobile Computing',
    todo:         'Watch YouTube video.',
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/lWvLhwS3FAM' },
    ],
    deadline:     new Date('2026-09-10T23:59:00'),
    deadlineNote: 'presumably next class',
  },
  {
    id:           'softeng',
    title:        'Software Engineering',
    todo:         'Proposals',
    instructions: 'Your project proposal will cover everything we have learned from research gathering to technical and methodologies. You may also begin researching your titles in which you can conduct a proposal on. Focus on system development project and with a specific location/agency.',
    links:        [],
    deadline:     null,
  },
  {
    id:           'fds',
    title:        'Fundamenals of Data Science',
    todo:         'Topic 8 Activity',
    instructions: 'Read and execute all the codes in the file that I will send po for our asynchronous class today po and for your quiz next meeting.',
    links:        [{label: 'Download PDF', url: 'https://cdn.fbsbx.com/v/t59.2708-21/472549542_585864207581966_2801499332644280600_n.pdf/Topic-8.pdf?_nc_cat=111&ccb=1-7&_nc_sid=2b0e22&_nc_eui2=AeE3vH0qB0B4g4oNmCQkPfEHM2WtFx_xvH4zZa0XH_G8fm0SeOKZJ5037KccWQCGzFlpxJiB_1xYyEfBTBEUKh8b&_nc_ohc=OvnhnwNerakQ7kNvwFVglc_&_nc_oc=AdoDnAid3HrcWHDhZzgsW1HU2C8FsJKZGcM6BQ_7rllqz_X-N8LYXLbTm9Gi3C8tLMs&_nc_ad=z-m&_nc_cid=0&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=LIEEL9R_HZRJaD9quKuQJg&_nc_ss=7a22e&oh=03_Q7cD6QHX5eUs7PtYRtv6JYcvEHI5ZS6jF76LODiw0LGEQgTkbA&oe=6AA1D1F5&dl=1'},],
    deadline:     new Date('2026-09-09T23:59:00'),
  },
];

function buildCards() {
  const grid = document.getElementById('grid');

  subjects.forEach(s => {
    const deadlineText = s.deadline
      ? s.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';

    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', s.title);
    card.innerHTML = `
      <div class="card-tag">Subject</div>
      <div class="card-title">${s.title}</div>
      <div class="card-deadline">Due ${deadlineText}</div>
      <div class="card-countdown" id="card-countdown-${s.id}">—</div>
      <span class="card-hint">tap to open ↗</span>
    `;
    card.addEventListener('click', () => openModal(s.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(s.id);
    });
    grid.appendChild(card);
  });

  // Empty boilerplate card
  const empty = document.createElement('div');
  empty.className = 'card empty';
  empty.setAttribute('aria-label', 'Empty card placeholder');
  empty.innerHTML = `
    <div class="card-tag">Subject</div>
    <div class="card-title">Subject Name Here</div>
    <div class="card-deadline">Due —</div>
  `;
  grid.appendChild(empty);
}

function buildModals() {
  const overlay = document.getElementById('overlay');

  subjects.forEach(s => {
    const deadlineText = s.deadline
      ? s.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';

    const deadlineNote   = s.deadlineNote ? ` (${s.deadlineNote})` : '';
    const linksHTML      = s.links.length
      ? s.links.map(l => `<div class="modal-value"><a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a></div>`).join('')
      : '<div class="modal-value">N/A</div>';
    const instructHTML   = s.instructions
      ? `<div class="modal-section">
           <div class="modal-label">Instructions</div>
           <div class="modal-value">${s.instructions}</div>
         </div>`
      : '';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = `modal-${s.id}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', `title-${s.id}`);
    modal.style.display = 'none';
    modal.innerHTML = `
      <button class="modal-close" aria-label="Close">✕</button>
      <div class="modal-tag">Subject</div>
      <div class="modal-title" id="title-${s.id}">${s.title}</div>
      <div class="modal-section">
        <div class="modal-label">To Do</div>
        <div class="modal-value">${s.todo}</div>
      </div>
      ${instructHTML}
      <div class="modal-section">
        <div class="modal-label">Resources</div>
        ${linksHTML}
      </div>
      <hr class="divider" />
      <div class="modal-deadline-row">
        <span class="dot" id="modal-dot-${s.id}"></span>
        Deadline: <strong>${deadlineText}</strong>${deadlineNote}
        <span class="modal-countdown" id="modal-countdown-${s.id}">—</span>
      </div>
    `;
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    overlay.appendChild(modal);
  });
}

// ── Countdown
function formatCountdown(deadline) {
  if (!deadline) return '—';
  const diff = deadline - new Date();
  if (diff <= 0) return '0d 0h left';
  if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / 60000)}m left`;
  }
  const totalHours = Math.floor(diff / 3600000);
  return `${Math.floor(totalHours / 24)}d ${totalHours % 24}h left`;
}

function isUrgent(deadline) {
  if (!deadline) return false;
  const diff = deadline - new Date();
  return diff > 0 && diff < 12 * 3600000;
}

function updateCountdowns() {
  subjects.forEach(s => {
    const text   = formatCountdown(s.deadline);
    const urgent = isUrgent(s.deadline);

    const cardEl  = document.getElementById(`card-countdown-${s.id}`);
    const modalEl = document.getElementById(`modal-countdown-${s.id}`);
    const dotEl   = document.getElementById(`modal-dot-${s.id}`);

    if (cardEl)  { cardEl.textContent  = text; cardEl.classList.toggle('countdown-urgent', urgent); }
    if (modalEl) { modalEl.textContent = text; modalEl.classList.toggle('countdown-urgent', urgent); }
    if (dotEl)   { dotEl.classList.toggle('countdown-urgent', urgent); }
  });
}

let activeModal = null;


function openModal(id) {
  const target = document.getElementById(`modal-${id}`);
  if (!target) return;
  if (activeModal) document.getElementById(`modal-${activeModal}`).style.display = 'none';
  target.style.display = 'block';
  document.getElementById('overlay').classList.add('active');
  activeModal = id;
  target.querySelector('.modal-close').focus();
}

function closeModal() {
  if (!activeModal) return;
  document.getElementById(`modal-${activeModal}`).style.display = 'none';
  document.getElementById('overlay').classList.remove('active');
  activeModal = null;
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


buildCards();
buildModals();
updateCountdowns();
setInterval(updateCountdowns, 1000);

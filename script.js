/* ============================================================
   Поздравление с Днём учителя — интерактивные эффекты
   ============================================================ */

'use strict';

/* ===== ПОЯВЛЕНИЕ СЕКЦИЙ ===== */
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.querySelector('.greeting')) {
        startWriting();
      }
    }
  });
}, { threshold: 0.15 });
sections.forEach(s => observer.observe(s));

/* ===== РУКОПИСНОЕ ПИСЬМО ===== */
let writingStarted = false;
function startWriting() {
  if (writingStarted) return;
  writingStarted = true;

  const paragraphs = document.querySelectorAll('.greeting p.handwritten');
  let paragraphIndex = 0;

  function typeNext() {
    if (paragraphIndex >= paragraphs.length) return;
    const p = paragraphs[paragraphIndex];
    const text = p.getAttribute('data-text');
    p.classList.add('typing');

    const tokens = text.split(/(\s+)/).filter(t => t.length > 0);
    let tokenIndex = 0;
    const delay = 55;

    const interval = setInterval(() => {
      if (tokenIndex >= tokens.length) {
        clearInterval(interval);
        p.classList.remove('typing');
        paragraphIndex++;
        setTimeout(typeNext, 400);
        return;
      }
      const token = tokens[tokenIndex];
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = token;
      p.appendChild(span);
      tokenIndex++;
    }, delay);
  }
  setTimeout(typeNext, 500);
}

/* ===== ЛИСТЬЯ ===== */
const leafEmojis = ['🍁', '🍂'];
const leavesContainer = document.getElementById('leaves');

function createLeaf() {
  if (!leavesContainer) return;
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');
  leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.fontSize = (12 + Math.random() * 10) + 'px';
  leaf.style.animationDuration = (14 + Math.random() * 10) + 's';
  leaf.style.animationDelay = Math.random() * 6 + 's';
  leavesContainer.appendChild(leaf);
  setTimeout(() => leaf.remove(), 25000);
}
setInterval(createLeaf, 1800);
for (let i = 0; i < 4; i++) setTimeout(createLeaf, i * 600);

/* ===== БЛЁСТКИ ===== */
const sparklesContainer = document.getElementById('sparkles');
const sparkleChars = ['✦', '✧', '❋', '✺', '✹', '❈'];

function createSparkle() {
  if (!sparklesContainer) return;
  const s = document.createElement('div');
  s.classList.add('sparkle');
  s.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
  s.style.left = Math.random() * 100 + 'vw';
  s.style.fontSize = (8 + Math.random() * 10) + 'px';
  s.style.animationDuration = (10 + Math.random() * 12) + 's';
  s.style.animationDelay = Math.random() * 8 + 's';
  s.style.opacity = '0';
  sparklesContainer.appendChild(s);
  setTimeout(() => s.remove(), 25000);
}
for (let i = 0; i < 6; i++) setTimeout(createSparkle, i * 1500);
setInterval(createSparkle, 2500);

/* ===== МОДАЛЬНОЕ ОКНО ===== */
function openModal()  { document.getElementById('modal').classList.add('open'); }
function closeModal() { document.getElementById('modal').classList.remove('open'); }

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
const bars = Array.from(document.querySelectorAll('.fill'));
const rings = Array.from(document.querySelectorAll('.circle-progress'));

function animateSkills() {
  bars.forEach((bar, index) => {
    const value = bar.style.getPropertyValue('--value') || '0%';
    const percent = parseInt(value, 10);
    window.setTimeout(() => {
      bar.style.width = value;
    }, 120 + index * 80);
  });

  rings.forEach((ring, index) => {
    const value = [94, 92][index] || 0;
    const offset = 276 - (276 * value) / 100;
    window.setTimeout(() => {
      ring.style.strokeDashoffset = offset;
    }, 180 + index * 120);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateSkills);
} else {
  animateSkills();
}

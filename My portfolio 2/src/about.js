// About section reveal animations for timeline
const timeline = document.getElementById('cinematic-timeline');
if (timeline) {
  const nodes = Array.from(timeline.querySelectorAll('.timeline-node'));
  function reveal() {
    nodes.forEach((n,i) => {
      setTimeout(()=>{
        n.classList.add('visible');
        const dot = n.querySelector('.node-dot');
        if (dot) dot.classList.add('pulse');
      }, i * 220);
    });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', reveal);
  else reveal();
}

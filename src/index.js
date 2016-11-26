import { Shine } from './assets/libs/shine.min';
import videoList from './data.json';

require('./styles/main.less');

/**
 * initialize Shine.js
 */
(() => {
  const shinejs = window.shinejs;
  const shine = new Shine(document.querySelector('header span'), new shinejs.Config({
    opacity: 0.8,
  }));

  document.querySelector('header').addEventListener('mousemove', (event) => {
    shine.light.position.x = event.clientX;
    shine.light.position.y = event.clientY;
    shine.draw();
  }, false);
})();


/**
 * render video list
 */
(() => {
  const originalTimeline = document.querySelector('.timeline');
  const timeline = originalTimeline.cloneNode();

  videoList.forEach((item) => {
    const section = document.createElement('section');
    const series = document.createElement('div');
    const content = document.createElement('div');
    const roles = document.createElement('div');

    series.classList.add('series');
    series.innerHTML = item.series.iqiyi;

    content.classList.add('content');
    content.innerHTML = item.title;

    roles.classList.add('roles-group');

    section.appendChild(series);
    section.appendChild(content);
    section.appendChild(roles);
    timeline.appendChild(section);
  });

  originalTimeline.parentNode.replaceChild(timeline, originalTimeline);
})();

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

    item.plots.forEach((plot) => {
      const role = document.createElement('span');
      role.classList.add('role', plot);
      section.classList.add(plot);
      roles.appendChild(role);
    });

    content.appendChild(roles);
    section.appendChild(series);
    section.appendChild(content);
    timeline.appendChild(section);
  });

  originalTimeline.parentNode.replaceChild(timeline, originalTimeline);
})();


/**
 * screen feature
 */
(() => {
  const screen = document.querySelector('.screen-bar');
  const timeline = document.querySelector('.timeline');
  const filtered = [];
  const classNames = {
    selected: 'selected',
    filtering: 'filtering',
  };

  screen.addEventListener('click', (ev) => {
    if (ev.target && ev.target.nodeName === 'BUTTON') {
      if (ev.target.classList.toggle(classNames.selected)) {
        filtered.push(ev.target.getAttribute('data-key'));
        timeline.classList.add(ev.target.getAttribute('data-key'));
      } else {
        filtered.splice(filtered.indexOf(ev.target.getAttribute('data-key')), 1);
        timeline.classList.remove(ev.target.getAttribute('data-key'));
      }

      if (filtered.length === 0) {
        timeline.classList.remove(classNames.filtering);
      } else if (!timeline.classList.contains(classNames.filtering)) {
        timeline.classList.add(classNames.filtering);
      }
    }
  });
})();

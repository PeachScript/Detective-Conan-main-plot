import { Shine } from './assets/libs/shine.min';

require('./styles/main.less');

const shinejs = window.shinejs;
const shine = new Shine(document.querySelector('header span'), new shinejs.Config({
  opacity: 0.8,
}));

document.querySelector('header').addEventListener('mousemove', (event) => {
  shine.light.position.x = event.clientX;
  shine.light.position.y = event.clientY;
  shine.draw();
}, false);

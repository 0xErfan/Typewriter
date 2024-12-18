import Typewriter from '../classes/Typewriter.js';
const myTypewriter = new Typewriter(document.querySelector('.main_line_typewriter'));
myTypewriter
    .setTypingSpeed(100)
    .startTyping(['i do not <strong>know</strong>', 'isovisit, a good place', 'isovisti, i bad place.'], 'title');

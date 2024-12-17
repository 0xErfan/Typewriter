import Typewriter from '../classes/Typewriter.js'

const myTypewriter = new Typewriter({ element: document.querySelector('.main_line_typewriter')! })

myTypewriter
    .setTypingSpeed(100)
    .startTyping(['isovisit, i don not know', 'isovisit, a good place', 'isovisti, i bad place.'], 'title')
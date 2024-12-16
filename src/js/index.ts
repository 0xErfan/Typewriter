import Typewriter from '../../dist/classes/Typewriter'

const myTypewriter = new Typewriter({ element: document.querySelector('.main_line_typewriter')! })
myTypewriter.startTyping(['ایزو ویزیت خوب', 'ایزو ویزیت بد', 'ایزو ویزیت خیلی بد'], 'title')
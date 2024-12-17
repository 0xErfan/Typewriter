export default class Typewriter {
    constructor(element, configs) {
        this.activeTypings = {};
        this.isFreezed = false;
        if (!element)
            throw new Error('provided element not found btw.');
        const { typingSpeed = 200, cursorBlinking = true, cursorCharacter = '|', pauseDuration = 1000 } = configs || {};
        this.element = element;
        this.typingSpeed = typingSpeed;
        this.cursorBlinking = cursorBlinking;
        this.cursorCharacter = cursorCharacter;
        this.pauseDuration = pauseDuration;
    }
    setTypingSpeed(val) {
        this.typingSpeed = val;
        return this;
    }
    startTyping(text, ref, callback) {
        if (typeof text !== 'string' && !Array.isArray(text))
            throw new Error('only string & array of strings are acceptable buddy');
        let speedTimer;
        let callbackAfterInterval = (callback && typeof callback === 'function') ? callback : () => { };
        let is_ref_exist;
        if (ref) {
            is_ref_exist = this.activeTypings.hasOwnProperty(String(ref));
            if (is_ref_exist)
                throw new Error(`"${String(ref)}" ref name already exist`);
        }
        let textsArray = Array.isArray(text) ? text : null;
        let currentArrayIndex = 0;
        const startTimer = (current_word) => {
            clearInterval(speedTimer);
            let active_word_index = 0;
            let timeout;
            speedTimer = setInterval(() => {
                if (this.isFreezed)
                    return;
                // update the interval id on every iteration
                if (String(ref))
                    this.activeTypings[String(ref)] = speedTimer;
                this.element.innerText = current_word.slice(0, active_word_index); // .concat(this.cursorCharacter)
                if (active_word_index === current_word.length) {
                    let nextWord = text;
                    if (textsArray) { // if the given tex prop is array, we update the array current index for next typing iteration btw
                        if (currentArrayIndex + 1 === text.length) {
                            currentArrayIndex = 0;
                        }
                        else {
                            currentArrayIndex += 1;
                        }
                        nextWord = text[currentArrayIndex];
                    }
                    clearInterval(speedTimer);
                    clearTimeout(timeout);
                    active_word_index = 0;
                    setTimeout(() => {
                        startTimer(nextWord);
                        callbackAfterInterval();
                    }, this.pauseDuration); // wait for pauseDuration & start;
                }
                else {
                    active_word_index++;
                }
            }, this.typingSpeed);
        };
        startTimer(textsArray ? textsArray[currentArrayIndex] : text);
        return this;
    }
    waitUntil(val) {
        if (typeof val !== 'number')
            throw new Error('not a valid prop');
        clearTimeout(this.freezeTimer);
        this.isFreezed = true;
        setTimeout(() => this.isFreezed = false, val);
        return this;
    }
    clearTyping(ref) {
        if (!this.activeTypings.hasOwnProperty(String(ref)))
            throw new Error(`"${String(ref)}" not found`);
        clearInterval(this.activeTypings[String(ref)]);
        delete this.activeTypings[String(ref)];
        return this;
    }
}

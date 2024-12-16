type InitTypewriterProps = {
    element: HTMLElement
    typingSpeed?: number
    cursorBlinking?: boolean
    cursorCharacter?: string
    onCompleteCallback?: () => void | null
    pauseDuration?: number
}

export default class Typewriter {

    element: HTMLElement;
    typingSpeed: number;
    cursorBlinking: boolean;
    cursorCharacter: string;
    pauseDuration: number;

    activeTypings: Record<string, number> = {}

    constructor({
        element,
        typingSpeed = 200,
        cursorBlinking = true,
        cursorCharacter = '|',
        pauseDuration = 1000
    }: InitTypewriterProps) {
        this.element = element;
        this.typingSpeed = typingSpeed;
        this.cursorBlinking = cursorBlinking;
        this.cursorCharacter = cursorCharacter;
        this.pauseDuration = pauseDuration;
    }

    startTyping(text: string | string[], ref: string) {

        if (typeof text !== 'string' && !Array.isArray(text)) throw new Error('only string & array of strings are acceptable buddy')

        let speedTimer: number;
        let is_ref_exist;

        if (ref) {
            is_ref_exist = this.activeTypings.hasOwnProperty(String(ref))
            if (is_ref_exist) throw new Error(`"${String(ref)}" ref name already exist`)
        }

        let textsArray = Array.isArray(text) ? text : null
        let currentArrayIndex = 0

        const startTimer = (current_word: string | string[]) => {

            let active_word_index = 0
            let timeout;

            speedTimer = setInterval(() => {

                if (String(ref)) this.activeTypings[String(ref)] = speedTimer // update the interval id on every iteration

                this.element.innerText = (current_word as string).slice(0, active_word_index) // .concat(this.cursorCharacter)

                if (active_word_index === current_word.length) {

                    let nextWord = text;

                    if (textsArray) { // if the given tex prop is array, we update the array current index for next typing iteration btw
                        if (currentArrayIndex + 1 === text.length) {
                            currentArrayIndex = 0
                        } else {
                            currentArrayIndex += 1
                        }
                        nextWord = text[currentArrayIndex]
                    }

                    clearInterval(speedTimer)
                    clearTimeout(timeout)
                    active_word_index = 0

                    setTimeout(() => startTimer(nextWord), this.pauseDuration) // wait for pauseDuration & start;

                } else {
                    active_word_index++
                }

            }, this.typingSpeed)

        }

        startTimer(textsArray ? textsArray[currentArrayIndex] : text)
        return this;
    }

    clearTyping(ref: string) {
        if (!this.activeTypings.hasOwnProperty(String(ref))) throw new Error(`"${String(ref)}" not found`)
        clearInterval(this.activeTypings[String(ref)])
        delete this.activeTypings[String(ref)]
        return this;
    }

}
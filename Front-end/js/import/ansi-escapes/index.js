/* eslint-disable no-param-reassign */
const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';
const isTerminalApp = true;

let ansiEscapes = {
  cursorTo(x, y) {
    if (typeof x !== 'number') {
      throw new TypeError('The `x` argument is required');
    }

    if (typeof y !== 'number') {
      return ESC + (x + 1) + 'G';
    }

    return ESC + (y + 1) + ';' + (x + 1) + 'H';
  },

  cursorMove(x, y) {
    if (typeof x !== 'number') {
      throw new TypeError('The `x` argument is required');
    }

    let ret = '';

    if (x < 0) {
      ret += ESC + -x + 'D';
    } else if (x > 0) {
      ret += ESC + x + 'C';
    }

    if (y < 0) {
      ret += ESC + -y + 'A';
    } else if (y > 0) {
      ret += ESC + y + 'B';
    }

    return ret;
  },

  cursorUp(count = 1) {
    return ESC + count + 'A';
  },
  cursorDown(count = 1) {
    return ESC + count + 'B';
  },
  cursorForward(count = 1) {
    return ESC + count + 'C';
  },
  cursorBackward(count = 1) {
    return ESC + count + 'D';
  },

  cursorLeft: ESC + 'G',
  cursorSavePosition: isTerminalApp ? '\u001B7' : ESC + 's',
  cursorRestorePosition: isTerminalApp ? '\u001B8' : ESC + 'u',
  cursorGetPosition: ESC + '6n',
  cursorNextLine: ESC + 'E',
  cursorPrevLine: ESC + 'F',
  cursorHide: ESC + '?25l',
  cursorShow: ESC + '?25h',

  eraseLines(count) {
    let clear = '';

    for (let i = 0; i < count; i++) {
      clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
    }

    if (count) {
      clear += ansiEscapes.cursorLeft;
    }

    return clear;
  },

  eraseEndLine: ESC + 'K',
  eraseStartLine: ESC + '1K',
  eraseLine: ESC + '2K',
  eraseDown: ESC + 'J',
  eraseUp: ESC + '1J',
  eraseScreen: ESC + '2J',
  scrollUp: ESC + 'S',
  scrollDown: ESC + 'T',

  clearScreen: '\u001Bc',

  beep: BEL,

  link(text, url) {
    return [OSC, '8', SEP, SEP, url, BEL, text, OSC, '8', SEP, SEP, BEL].join('');
  },

  image(buffer, options = {}) {
    let ret = `${OSC}1337;File=inline=1`;

    if (options.width) {
      ret += `;width=${options.width}`;
    }

    if (options.height) {
      ret += `;height=${options.height}`;
    }

    if (options.preserveAspectRatio === false) {
      ret += ';preserveAspectRatio=0';
    }

    return ret + ':' + buffer.toString('base64') + BEL;
  },

  iTerm: {
    setCwd: (cwd = process.cwd()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

    annotation: (message, options = {}) => {
      let ret = `${OSC}1337;`;

      const hasX = typeof options.x !== 'undefined';
      const hasY = typeof options.y !== 'undefined';

      if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
        throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
      }

      message = message.replace(/\|/g, '');

      ret += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

      if (options.length > 0) {
        ret += (hasX ? [message, options.length, options.x, options.y] : [options.length, message]).join('|');
      } else {
        ret += message;
      }

      return ret + BEL;
    }
  }
};

export { ansiEscapes };

const termJS = new Terminal({ cursorBlink: true });

/**
 * Initialize terminal.
 *
 * @author Guilherme da Silva Martin
 */
function initTerminal() {
  termJS.open(document.getElementById('terminal'));
  termJS.writeln('Welcome to RTCode');
  termJS.writeln('Connecting to server...');

  termJS.onKey((e) => {
    const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;

    if (e.domEvent.keyCode === 13) {
      termJS.write('\r\n$ ');
    } else if (e.domEvent.keyCode === 8) {
      if (termJS._core.buffer.x > 2) {
        termJS.write('\b \b');
      }
    } else if (printable) {
      termJS.write(e.key);
    }
  });

  socketTerminal.on('connect', () => {
    termJS.write('\r\n*** Connected to server***\r\n');

    termJS.on('data', (data) => {
      socketTerminal.emit('data', data);
    });

    socketTerminal.on('data', (data) => {
      termJS.write(data);
    });

    socketTerminal.on('disconnect', () => {
      termJS.write('\r\n*** Disconnected from server***\r\n');
    });
  });
}

/**
 * Runs as soon as the page is ready.
 *
 * @author Guilherme da Silva Martin
 */
$(document).ready(() => {
  initTerminal();
});

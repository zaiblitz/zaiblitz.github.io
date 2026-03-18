/* ============================================
   INTERACTIVE TERMINAL
   ============================================ */
(function () {
  var input = document.getElementById('terminal-input');
  var output = document.getElementById('terminal-output');

  var commands = {
    help: function () {
      return [
        'AVAILABLE COMMANDS:',
        '  help      — Show this help menu',
        '  about     — Who am I?',
        '  skills    — List core skills',
        '  projects  — List active projects',
        '  contact   — Get in touch',
        '  status    — System status report',
        '  clear     — Clear terminal',
        '  date      — Current date/time',
        '  quote     — Random quote',
      ].join('\n');
    },

    about: function () {
      return [
        'IDENTITY FILE:',
        '  Name     : Merwin',
        '  Role     : Software Engineer',
        '  Location : Philippines',
        '  Mission  : Building elegant, high-performance systems.',
      ].join('\n');
    },

    skills: function () {
      return [
        'CORE CAPABILITIES:',
        '  ▸ JavaScript / TypeScript  [████████░░] 88%',
        '  ▸ Python                   [████████░░] 85%',
        '  ▸ React / Node.js          [████████░░] 82%',
        '  ▸ SQL / Databases          [███████░░░] 75%',
        '  ▸ Docker / DevOps          [███████░░░] 70%',
        '  ▸ Rust                     [█████░░░░░] 55%',
      ].join('\n');
    },

    projects: function () {
      return [
        'PROJECT DATABASE:',
        '  #001  PROJECT ATLAS   — Data viz dashboard      [ACTIVE]',
        '  #002  PROJECT NEXUS   — API gateway platform     [ACTIVE]',
        '  #003  PROJECT CIPHER  — E2E encrypted messaging  [ARCHIVED]',
        '  #004  PROJECT HORIZON — ML analytics pipeline    [ACTIVE]',
      ].join('\n');
    },

    contact: function () {
      return [
        'COMMUNICATION CHANNELS:',
        '  ▸ GitHub   : github.com/zaiblitz',
        '  ▸ LinkedIn : linkedin.com/in/',
        '  ▸ Email    : merwin@example.com',
      ].join('\n');
    },

    status: function () {
      var now = new Date();
      return [
        'SYSTEM STATUS REPORT:',
        '  Uptime      : ' + formatUptime(),
        '  Memory      : 42% utilized',
        '  CPU Load    : 17%',
        '  Encryption  : AES-256-GCM ACTIVE',
        '  Connections : SECURE',
        '  Timestamp   : ' + now.toISOString(),
      ].join('\n');
    },

    clear: function () {
      output.innerHTML = '';
      return null;
    },

    date: function () {
      return new Date().toString();
    },

    quote: function () {
      var quotes = [
        '"Any sufficiently advanced technology is indistinguishable from magic." — Arthur C. Clarke',
        '"Talk is cheap. Show me the code." — Linus Torvalds',
        '"The best way to predict the future is to invent it." — Alan Kay',
        '"First, solve the problem. Then, write the code." — John Johnson',
        '"Simplicity is the soul of efficiency." — Austin Freeman',
        '"Sometimes it is the people no one can imagine anything of who do the things no one can imagine." — Alan Turing',
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
  };

  var startTime = Date.now();

  function formatUptime() {
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var h = Math.floor(elapsed / 3600);
    var m = Math.floor((elapsed % 3600) / 60);
    var s = elapsed % 60;
    return (
      String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0')
    );
  }

  function addLine(text, isCommand) {
    var line = document.createElement('div');
    line.className = 'terminal__line';

    if (isCommand) {
      var prompt = document.createElement('span');
      prompt.className = 'terminal__prompt';
      prompt.textContent = 'JARVIS>';
      line.appendChild(prompt);
      line.appendChild(document.createTextNode(' ' + text));
    } else {
      line.style.whiteSpace = 'pre';
      line.textContent = text;
    }

    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function processCommand(raw) {
    var cmd = raw.trim().toLowerCase();
    addLine(raw, true);

    if (!cmd) return;

    if (commands[cmd]) {
      var result = commands[cmd]();
      if (result !== null && result !== undefined) {
        addLine(result, false);
      }
    } else {
      addLine('ERROR: Unknown command "' + sanitize(cmd) + '". Type "help" for available commands.', false);
    }
  }

  function sanitize(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.textContent;
  }

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      processCommand(input.value);
      input.value = '';
    }
  });

  // Focus terminal on click
  document.querySelector('.terminal').addEventListener('click', function () {
    input.focus();
  });
})();

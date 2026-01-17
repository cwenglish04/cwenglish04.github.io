// Get DOM elements
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
let commandHistory = [];
let historyIndex = -1;

// Portfolio data
const portfolioData = {
  about: {
    name: "Connor English",
    description: "I am a Cybersecurity student at Augusta University with hands-on experience supporting enterprise IT systems. I have a strong foundation in troubleshooting, system security, and user support. I am motivated to continue developing my skills in cybersecurity operations and risk management."
  },
  education: [
    {
      degree: "Bachelor of Science in Cybersecurity",
      school: "Augusta University",
      graduation: "Expected May 2027",
      achievements: "VICEROY Scholar, Hope Scholarship Recipient, Deans List (Spring 26'), Presidents List (Fall 26')",
      details: "I am a Cybersecurity student at Augusta University with hands-on experience in securing systems, analyzing threats, and supporting real-world IT environments. My coursework and practical experience focus on cyber defense, incident response, and applying industry best practices."
    }
  ],
  experience: [
    {
      title: "IT Support Technician",
      company: "Augusta University",
      period: "April 2025 - Current",
      responsibilities: [
        "Respond to and resolve tickets in ServiceNow within an enterprise environment",
        "Diagnose and troubleshoot hardware, software, and networking issues",
        "Maintain high level of customer service while consistently meeting SLA targets"
      ]
    },
    {
      title: "IT Deployment Technician",
      company: "Augusta University",
      period: "December 2025 - Current",
      responsibilities: [
        "Implement, configure, and upgrade computer systems in an enterprise environment",
        "Manage data migrations, hardware installations, and software configurations",
        "Facilitate transitions with minimal user disruption"
      ]
    }
  ],
  projects: [
    {
      name: "Penetration Test Report",
      description: "A simulated professional grey-box penetration test report conducted in Augusta University's virtual lab environment.",
      details: "This assessment evaluated the security posture of designated systems with limited internal knowledge, identifying vulnerabilities and providing actionable remediation recommendations.",
      tags: ["Security", "Testing", "Analysis"]
    }
  ],
  certifications: [
    {
      name: "CompTIA Security+",
      description: "Industry-recognized certification validating foundational cybersecurity skills including threat analysis, risk management, cryptography, and network security."
    }
  ],
  skills: [
    "Network Security",
    "Penetration Testing",
    "System Administration",
    "ServiceNow",
    "Hardware/Software Troubleshooting",
    "Data Migration",
    "Cybersecurity Analysis",
    "IT Support"
  ],
  contact: {
    email: "cwenglish04@example.com",
    linkedin: "https://www.linkedin.com/in/connor-english-a6877232a/",
    handshake: "https://app.joinhandshake.com/profiles/connorenglish"
  }
};

// Available commands
const commands = {
  help: () => {
    return `
<span class="highlight">Available Commands:</span>
<div class="command-list">
  <span class="command-item"><span class="success">help</span>           - Show this help message</span>
  <span class="command-item"><span class="success">about</span>          - About Connor</span>
  <span class="command-item"><span class="success">education</span>      - Educational background</span>
  <span class="command-item"><span class="success">experience</span>     - Work experience</span>
  <span class="command-item"><span class="success">projects</span>       - View projects</span>
  <span class="command-item"><span class="success">certifications</span> - Professional certs</span>
  <span class="command-item"><span class="success">skills</span>         - Technical skills</span>
  <span class="command-item"><span class="success">contact</span>        - Contact information</span>
  <span class="command-item"><span class="success">resume</span>         - Download resume</span>
  <span class="command-item"><span class="success">social</span>         - Social media links</span>
  <span class="command-item"><span class="success">whoami</span>         - User information</span>
  <span class="command-item"><span class="success">clear</span>          - Clear terminal</span>
  <span class="command-item"><span class="success">history</span>        - Command history</span>
  <span class="command-item"><span class="success">ls</span>             - List files</span>
  <span class="command-item"><span class="success">exit</span>           - Exit terminal</span>
  <span class="command-item"><span class="success">sudo</span>           - Try it ;)</span>
</div>
<span class="warning">Tip:</span> Use TAB for autocomplete, UP/DOWN arrows for history
`;
  },

  about: () => {
    return `
<span class="highlight">About ${portfolioData.about.name}</span>
${'='.repeat(50)}
${portfolioData.about.description}

<span class="warning">Type 'experience' to see my work history</span>
<span class="warning">Type 'projects' to see my projects</span>
<span class="warning">Type 'certifications' to see my certifications</span>
`;
  },

  education: () => {
    let output = '<span class="highlight">Education</span>\n' + '='.repeat(50) + '\n';
    portfolioData.education.forEach(edu => {
      output += `<div class="job-entry">
<span class="success">${edu.degree}</span>
<span class="prompt">${edu.school}</span> | ${edu.graduation}

<span class="warning">Achievements:</span> ${edu.achievements}

${edu.details}
</div>`;
    });
    return output;
  },

  experience: () => {
    let output = '<span class="highlight">Work Experience</span>\n' + '='.repeat(50) + '\n';
    portfolioData.experience.forEach(job => {
      output += `<div class="job-entry">
<span class="success">${job.title}</span>
<span class="prompt">${job.company}</span> | ${job.period}

${job.responsibilities.map(r => `  • ${r}`).join('\n')}
</div>`;
    });
    return output;
  },

  projects: () => {
    let output = '<span class="highlight">Projects</span>\n' + '='.repeat(50) + '\n';
    portfolioData.projects.forEach(project => {
      output += `<div class="project-entry">
<span class="success">${project.name}</span>
${project.tags.map(t => `<span class="warning">[${t}]</span>`).join(' ')}

${project.description}
${project.details}
</div>`;
    });
    return output;
  },

  certifications: () => {
    let output = '<span class="highlight">Professional Certifications</span>\n' + '='.repeat(50) + '\n';
    portfolioData.certifications.forEach(cert => {
      output += `<div class="cert-entry">
<span class="success">✓ ${cert.name}</span>

${cert.description}
</div>`;
    });
    return output;
  },

  skills: () => {
    let output = '<span class="highlight">Technical Skills</span>\n' + '='.repeat(50) + '\n\n';
    output += '<div class="command-list">';
    portfolioData.skills.forEach(skill => {
      output += `<span class="success">▸ ${skill}</span>\n`;
    });
    output += '</div>';
    return output;
  },

  contact: () => {
    return `
<span class="highlight">Contact Information</span>
${'='.repeat(50)}

<span class="success">Email:</span> <a href="mailto:${portfolioData.contact.email}">${portfolioData.contact.email}</a>
<span class="success">LinkedIn:</span> <a href="${portfolioData.contact.linkedin}" target="_blank">${portfolioData.contact.linkedin}</a>
<span class="success">Handshake:</span> <a href="${portfolioData.contact.handshake}" target="_blank">${portfolioData.contact.handshake}</a>

<span class="warning">Feel free to reach out for opportunities or just to connect!</span>
`;
  },

  resume: () => {
    return '<span class="warning">Resume download functionality would be implemented here.</span>\n<span class="prompt">Tip: Upload your resume PDF and link it here!</span>';
  },

  social: () => {
    return `
<span class="highlight">Social Links</span>
${'='.repeat(50)}

<span class="success">LinkedIn:</span> <a href="${portfolioData.contact.linkedin}" target="_blank">Connect with me</a>
<span class="success">Handshake:</span> <a href="${portfolioData.contact.handshake}" target="_blank">View my profile</a>

<span class="warning">Type 'contact' for more ways to reach me</span>
`;
  },

  whoami: () => {
    return `<span class="success">guest</span>\n\n<span class="prompt">You are currently browsing Connor English's portfolio</span>\n<span class="warning">Access level: visitor</span>`;
  },

  clear: () => {
    // Remove all output lines but keep input line
    const lines = terminalOutput.querySelectorAll('.output-line');
    lines.forEach(line => line.remove());
    init();
    return null;
  },

  history: () => {
    if (commandHistory.length === 0) {
      return '<span class="warning">No command history yet</span>';
    }
    return '<span class="highlight">Command History:</span>\n\n' +
      commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
  },

  sudo: () => {
    const responses = [
      '<span class="error">Nice try! But you\'re not getting root access 😄</span>',
      '<span class="error">sudo: permission denied. This is a portfolio, not a server!</span>',
      '<span class="error">Access Denied. Did you really think that would work?</span>',
      '<span class="warning">guest is not in the sudoers file. This incident will be reported... to nobody 😂</span>'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  },

  ls: () => {
    return `<span class="success">about.txt</span>  <span class="success">education.txt</span>  <span class="success">experience.txt</span>  <span class="success">projects.txt</span>  <span class="success">certifications.txt</span>  <span class="success">skills.txt</span>  <span class="success">contact.txt</span>`;
  },

  exit: () => {
    return `<span class="warning">Closing terminal session...</span>  <span class="prompt">Goodbye!</span>`;
  }
};

// Initialize terminal with welcome message
function init() {
  const welcomeMessage = `
<pre class="ascii-art">
  ██████╗ ██████╗ ███╗   ██╗███╗   ██╗ ██████╗ ██████╗
 ██╔════╝██╔═══██╗████╗  ██║████╗  ██║██╔═══██╗██╔══██╗
 ██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║██║   ██║██████╔╝
 ██║     ██║   ██║██║╚██╗██║██║╚██╗██║██║   ██║██╔══██╗
 ╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║╚██████╔╝██║  ██║
  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝
</pre>

<span class="highlight">Welcome to Connor English's Terminal Portfolio</span>
<span class="prompt">Viceroy Scholar | Cybersecurity Student | Augusta University</span>

Type <span class="success">'help'</span> to see available commands
Type <span class="success">'about'</span> to learn more about me

${'─'.repeat(70)}
`;
  addOutput(welcomeMessage);
}

// Add output to terminal
function addOutput(text, isCommand = false, userCommand = '') {
  if (text === null) return; // For clear command

  const line = document.createElement('div');
  line.className = 'output-line';

  if (isCommand) {
    line.innerHTML = `<span class="prompt">guest@connor-portfolio:~$</span> <span class="user-input">${userCommand}</span>`;
  } else {
    line.innerHTML = text;
  }

  // Insert before the input line
  const inputLine = terminalOutput.querySelector('.input-line');
  terminalOutput.insertBefore(line, inputLine);

  // Aggressive scroll to bottom
  setTimeout(() => {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }, 10);
}

// Update cursor position
function updateCursor() {
  const input = terminalInput;
  let cursor = document.getElementById('cursor');
  const inputLine = document.querySelector('.input-line');
  const prompt = inputLine.querySelector('.prompt');

  if (!cursor) {
    cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.id = 'cursor';
    inputLine.appendChild(cursor);
  }

  // Calculate position
  const promptWidth = prompt.offsetWidth;

  // Get text width
  const tempSpan = document.createElement('span');
  tempSpan.style.visibility = 'hidden';
  tempSpan.style.position = 'absolute';
  tempSpan.style.font = window.getComputedStyle(input).font;
  tempSpan.textContent = input.value;
  document.body.appendChild(tempSpan);
  const textWidth = tempSpan.offsetWidth;
  document.body.removeChild(tempSpan);

  // Position cursor
  cursor.style.left = `${promptWidth + textWidth + 10}px`;
  cursor.style.top = '0px';

  // Force visibility
  cursor.style.display = 'inline-block';
  cursor.style.visibility = 'visible';
  cursor.style.animation = 'none';

  setTimeout(() => {
    cursor.style.animation = 'blink 1s infinite';
  }, 10);
}



// Process command
function processCommand(input) {
  const cmd = input.trim().toLowerCase();

  if (!cmd) return;

  // Add to history
  commandHistory.push(input);
  historyIndex = commandHistory.length;

  // Show command
  addOutput('', true, input);

  // Check if command was exit
if (cmd === 'exit') {
  setTimeout(() => {
    window.close(); // Try to close the window
    // If that doesn't work (most browsers block it), redirect or show message
    if (!window.closed) {
      addOutput('<span class="error">Cannot close this window. Please close the tab manually.</span>');
    }
  }, 1500);
}

  // Execute command
  if (commands[cmd]) {
    const output = commands[cmd]();
    if (output !== null) {
      addOutput(output);
    }
  } else {
    addOutput(`<span class="error">Command not found: ${input}</span>\n<span class="prompt">Type 'help' to see available commands</span>`);
  }

  // Ensure input is focused and cursor is visible
  setTimeout(() => {
    terminalInput.focus();
    updateCursor();

    // Force scroll to bottom of terminal container
    terminalOutput.scrollTop = terminalOutput.scrollHeight;

    // Also scroll input into view
    const inputLine = document.querySelector('.input-line');
    if (inputLine) {
      inputLine.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    }
  }, 100);
}

// Autocomplete
function autocomplete(partial) {
  const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
  if (matches.length === 1) {
    return matches[0];
  }
  return partial;
}

// Event listeners
terminalInput.addEventListener('input', updateCursor);

terminalInput.addEventListener('keydown', (e) => {
  // Enter key
  if (e.key === 'Enter') {
    const input = terminalInput.value;
    processCommand(input);
    terminalInput.value = '';
    setTimeout(updateCursor, 0);
  }

  // Tab key - autocomplete
  else if (e.key === 'Tab') {
    e.preventDefault();
    const completed = autocomplete(terminalInput.value.toLowerCase());
    terminalInput.value = completed;
    updateCursor();
  }

  // Up arrow - previous command
  else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
      updateCursor();
    }
  }

  // Down arrow - next command
  else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = '';
    }
    updateCursor();
  }
});

// Keep input focused
document.addEventListener('click', () => {
  terminalInput.focus();
});

// Initialize
init();
updateCursor();

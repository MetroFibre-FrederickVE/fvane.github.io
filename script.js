document.addEventListener('DOMContentLoaded', () => {
    const term = new Terminal({
        cursorBlink: true, // Native blink for cursor
        cursorStyle: 'underline', // Matches faux '_' 
        theme: {
            foreground: '#00ff00', // Green text
            background: '#000000', // Black bg
            cursor: '#00ff00' // Green cursor
        }
    });
    term.open(document.getElementById('terminal'));
    term.focus(); // Auto-focus on load for immediate interaction (best practice for single-element apps)

    // Your personal data (customize from LinkedIn)
    const userData = {
        name: 'Your Full Name',
        bio: 'Backend engineer with 5+ years in Python services, scalable architectures, and cloud infra. Passionate about clean code and automation.',
        skills: ['Python', 'Flask/Django', 'SQL/NoSQL', 'Docker/Kubernetes', 'AWS/GCP', 'CI/CD'],
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourprofile'
    };

    let prompt = 'yourname@portfolio:~$ '; // Custom prompt
    let currentInput = '';

    // Simulate Flask-style header and welcome (printed as text)
    term.writeln('\x1b[7m yourname@portfolio - Terminal Portfolio \x1b[0m'); // Inverted text for "header" look (ANSI escape)
    term.writeln(''); // Spacer
    term.writeln('Welcome to my portfolio. Type "help" for commands.');
    term.writeln('');
    term.write(prompt);

    // Handle key input (robust with printable check)
    term.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.key === 'Enter') {
            term.writeln(''); // New line after input
            processCommand(currentInput.trim());
            currentInput = '';
            term.write(prompt);
        } else if (domEvent.key === 'Backspace') {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                term.write('\b \b'); // Backspace erase
            }
        } else if (printable) {
            currentInput += key;
            term.write(key);
        }
    });

    function processCommand(cmd) {
        switch (cmd) {
            case 'help':
                term.writeln('Available commands:');
                term.writeln('  help     - Show this list');
                term.writeln('  about    - Display profile info (like neofetch)');
                term.writeln('  contact  - Get in touch via LinkedIn');
                term.writeln('  clear    - Clear the terminal');
                break;
            case 'about':
                // Neofetch-style
                term.writeln('  /\\_/\\   ');
                term.writeln(' ( o.o )  ' + userData.name);
                term.writeln('  > ^ <   ');
                term.writeln('');
                term.writeln('Bio: ' + userData.bio);
                term.writeln('Skills: ' + userData.skills.join(', '));
                term.writeln('GitHub: ' + userData.github);
                term.writeln('LinkedIn: ' + userData.linkedin);
                break;
            case 'contact':
                term.writeln('Reach out on LinkedIn: ' + userData.linkedin);
                term.writeln('Or email: your.email@example.com'); // Customize
                break;
            case 'clear':
                term.clear();
                term.writeln('\x1b[7m yourname@portfolio - Terminal Portfolio \x1b[0m'); // Re-add header
                term.writeln('');
                term.write(prompt);
                break;
            default:
                term.writeln('Command not found. Try "help".');
        }
        term.writeln(''); // Spacer for readability
    }

    // Debugging tip: Log errors
    window.onerror = (msg) => term.writeln(`Error: ${msg}`);
});
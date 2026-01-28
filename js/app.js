const statusMessages = [
    { text: 'Initializing update process...', progress: 5 },
    { text: 'Verifying system requirements...', progress: 12 },
    { text: 'Downloading update packages...', progress: 25 },
    { text: 'Extracting files...', progress: 45 },
    { text: 'Installing components...', progress: 60 },
    { text: 'Configuring system settings...', progress: 75 },
    { text: 'Optimizing performance...', progress: 85 },
    { text: 'Finalizing installation...', progress: 95 },
    { text: 'Update completed successfully!', progress: 100, isSuccess: true }
];

let currentStep = 0;

function handleLater() {
    // In a real system, this would close the modal
    // For this demo, we'll just shake the button
    const btn = event.target;
    btn.style.animation = 'none';
    setTimeout(() => {
        btn.style.animation = '';
    }, 10);
}

function startUpdate() {
    // Hide update screen, show loading screen
    document.querySelector('.update-screen').classList.remove('active');
    document.querySelector('.loading-screen').classList.add('active');
    document.getElementById('modalTitle').textContent = 'Installing Update';

    // Start the update process
    processUpdate();
}

function processUpdate() {
    if (currentStep >= statusMessages.length) {
        // Update complete, show invitation
        setTimeout(() => {
            showInvitation();
        }, 800);
        return;
    }

    const message = statusMessages[currentStep];

    // Update progress bar
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = message.progress + '%';

    // Update percentage text
    document.getElementById('percentage').textContent = message.progress + '%';

    // Update status text
    document.getElementById('statusText').textContent = message.text;

    // Add to log
    addLogLine(message.text, message.isSuccess);

    // Calculate dynamic delay based on progress intervals
    let delay = 600;
    if (message.progress >= 25 && message.progress < 60) {
        delay = 800; // Slower during download/install
    } else if (message.progress >= 85) {
        delay = 700; // Final steps
    }

    currentStep++;
    setTimeout(processUpdate, delay);
}

function addLogLine(text, isSuccess = false) {
    const logContainer = document.getElementById('statusLog');
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const line = document.createElement('div');
    line.className = 'status-log-line' + (isSuccess ? ' success' : '');
    line.textContent = `[${timestamp}] ${text}`;
    logContainer.appendChild(line);

    // Auto scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
}

function showInvitation() {
    const modal = document.querySelector('.modal');
    modal.classList.add('is-invitation');

    document.querySelector('.loading-screen').classList.remove('active');
    document.querySelector('.invite-screen').classList.add('active');

    // Create celebration effects
    createFireworks();
    createParticles();
}

function createFireworks() {
    const container = document.getElementById('fireworkContainer');
    const rayCount = 12;

    for (let i = 0; i < rayCount; i++) {
        const ray = document.createElement('div');
        ray.className = 'firework-ray';
        const angle = (360 / rayCount) * i;
        ray.style.transform = `rotate(${angle}deg)`;
        ray.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(ray);
    }
}

function createParticles() {
    const content = document.getElementById('inviteContent');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const x = Math.random() * 100;
        particle.style.left = x + '%';
        particle.style.bottom = '0';

        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--float-x', drift + 'px');

        // Random delay and duration
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';

        content.appendChild(particle);
    }
}

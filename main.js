// Array of job titles to cycle through
const titles = [
  'Software Engineer',
  'Full-Stack Developer',
  'Master Code Wizard',
  'Backend Engineer',
  'Vibe code cleanup Specialist '
];

// Get elements
const titleElement = document.getElementById('job-title');
const profileContainer = document.getElementById('profile-pic-container');
const profileImg = profileContainer.querySelector('img');

// Settings for animation speeds (in ms)
const typeSpeed = 100;
const deleteSpeed = 50;
const pauseDuration = 1000;

// State flags
let isAnimated = false;  // Tracks if typewriter and GIF are active
let animationLoop = null;  // To store the setTimeout chain for stopping

// Set initial static title (no cursor or animation)
titleElement.innerText = titles[0];  // Starts with 'Software Engineer'
titleElement.style.setProperty('--after-display', 'none');  // Hide cursor initially (add this to CSS if not there)

// Helper: Type text
function typeText(text) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      titleElement.innerText = text.substring(0, i + 1);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, typeSpeed);
  });
}

// Helper: Delete text
function deleteText(length) {
  return new Promise((resolve) => {
    let i = length;
    const interval = setInterval(() => {
      titleElement.innerText = titleElement.innerText.substring(0, i - 1);
      i--;
      if (i === 0) {
        clearInterval(interval);
        resolve();
      }
    }, deleteSpeed);
  });
}

// Helper: Pause
function pause(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// Main typewriter loop (recursive with setTimeout for stoppability)
async function startTypewriter() {
  for (const title of titles) {
    if (!isAnimated) return;  // Early exit if toggled off
    await typeText(title);
    await pause(pauseDuration);
    await deleteText(title.length);
    await pause(500);
  }
  // Recurse to loop forever, but use setTimeout to allow interruption
  if (isAnimated) {
    animationLoop = setTimeout(startTypewriter, 0);
  }
}

// Click handler to toggle animation and GIF
profileContainer.addEventListener('click', async () => {
  isAnimated = !isAnimated;

  if (isAnimated) {
    // Start mode: Show cursor, start typewriter, switch to GIF
    titleElement.style.setProperty('--after-display', 'inline-block');  // Show cursor
    profileImg.src = 'assets/images/avatar.gif';
    profileImg.alt = "Frederick van Eeden's avatar animated - click to stop";
    // Clear static text if needed, then start
    await deleteText(titleElement.innerText.length);  // Optional: Delete initial text smoothly
    startTypewriter();
  } else {
    // Stop mode: Hide cursor, stop typewriter, revert to static and JPG
    titleElement.style.setProperty('--after-display', 'none');
    if (animationLoop) clearTimeout(animationLoop);  // Stop any pending loop
    titleElement.innerText = titles[0];  // Reset to static 'Software Engineer'
    profileImg.src = 'assets/images/avatar.jpg';
    profileImg.alt = "Frederick van Eeden's avatar - click for a surprise";
  }
});

// Add Konami code!

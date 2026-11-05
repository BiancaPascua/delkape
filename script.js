/**
 * DEL KAPE — Basic JavaScript Functions
 * 1. Interactive Image Gallery (Next / Previous)
 * 2. Countdown Timer with Expired State
 * 3. Sign Up Form Validation (5 Test Scenarios)
 */

/* ===================================================
   1. INTERACTIVE IMAGE GALLERY (Our Story)
   =================================================== */
const galleryImages = [
  {
    src: 'assets/DEL_KAPE_DESIGN__2__4687ddc2.png',
    alt: 'Signature Del Kape Iced Specialty Drinks on Bamboo Bilao',
    title: 'Our Signature Heritage Drinks'
  },
  {
    src: 'assets/DEL_KAPE_DESIGN__1__eaf2117b.png',
    alt: 'Traditional Cloth Filter Pour-Over Coffee Brewing',
    title: 'Traditional Cloth Filter (Salaan) Brew'
  },
  {
    src: 'assets/DEL_KAPE_DESIGN_fc097cf9.png',
    alt: 'Filipino Kakanin Rice Delicacies in Handwoven Bilao',
    title: 'Authentic Filipino Delicacies & Kakanin'
  }
];

let currentImageIndex = 0;

function showGalleryImage(index) {
  const imageElement = document.getElementById('gallery-img');
  const titleElement = document.getElementById('gallery-title');
  const counterElement = document.getElementById('gallery-counter');

  if (imageElement && titleElement && counterElement) {
    imageElement.src = galleryImages[index].src;
    imageElement.alt = galleryImages[index].alt;
    titleElement.textContent = galleryImages[index].title;
    counterElement.textContent = (index + 1) + ' / ' + galleryImages.length;
  }
}

function nextImage() {
  currentImageIndex++;
  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  }
  showGalleryImage(currentImageIndex);
}

function prevImage() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }
  showGalleryImage(currentImageIndex);
}


/* ===================================================
   2. COUNTDOWN TIMER & EXPIRED STATE
   =================================================== */
// Target promo end date: December 24, 2026 at 23:59:59 PST
const promoEndDate = new Date('2026-12-24T23:59:59+08:00').getTime();
let isCountdownExpired = false;

function updateCountdown() {
  if (isCountdownExpired) {
    displayExpiredMessage();
    return;
  }

  const now = new Date().getTime();
  const timeDifference = promoEndDate - now;

  if (timeDifference <= 0) {
    isCountdownExpired = true;
    displayExpiredMessage();
  } else {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
}

function displayExpiredMessage() {
  const timerBox = document.getElementById('timer-box');
  const expiredBox = document.getElementById('expired-box');
  if (timerBox && expiredBox) {
    timerBox.style.display = 'none';
    expiredBox.style.display = 'block';
  }
}

function displayActiveTimer() {
  const timerBox = document.getElementById('timer-box');
  const expiredBox = document.getElementById('expired-box');
  if (timerBox && expiredBox) {
    timerBox.style.display = 'block';
    expiredBox.style.display = 'none';
  }
}

// Toggle button for testing expired state manually
function toggleCountdownState() {
  isCountdownExpired = !isCountdownExpired;
  const stateBtn = document.getElementById('countdown-toggle-btn');

  if (isCountdownExpired) {
    displayExpiredMessage();
    if (stateBtn) {
      stateBtn.textContent = 'Simulating Expired (State: Expired)';
      stateBtn.style.backgroundColor = '#DC2626';
      stateBtn.style.color = '#FFFFFF';
    }
  } else {
    displayActiveTimer();
    updateCountdown();
    if (stateBtn) {
      stateBtn.textContent = 'Live Countdown (State: Active)';
      stateBtn.style.backgroundColor = '#919F53';
      stateBtn.style.color = '#45250E';
    }
  }
}


/* ===================================================
   3. SIGN UP FORM VALIDATION (5 TEST SCENARIOS)
   =================================================== */
function validateEmail(email) {
  // Checks for valid format: name@email.com
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email.trim());
}

function validateName(name) {
  // Must have at least 2 characters, only letters and spaces (NO numbers, NO symbols)
  const namePattern = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]+$/;
  return name.trim().length >= 2 && namePattern.test(name.trim());
}

function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const consentCheckbox = document.getElementById('user-consent');
  const feedbackMessage = document.getElementById('form-feedback');

  const nameValue = nameInput ? nameInput.value.trim() : '';
  const emailValue = emailInput ? emailInput.value.trim() : '';
  const isConsentChecked = consentCheckbox ? consentCheckbox.checked : false;

  // Clear previous errors
  if (feedbackMessage) {
    feedbackMessage.style.display = 'none';
    feedbackMessage.className = 'feedback-box';
  }

  // TEST 4: Expired countdown check
  if (isCountdownExpired) {
    showFeedback('error', 'Sorry, this promotion has expired! The Buy 1 Take 1 offer ended on December 24, 2026.');
    return;
  }

  // TEST 1: No input check (both fields empty)
  if (nameValue === '' && emailValue === '') {
    showFeedback('error', 'Please enter your Name and Email address.');
    return;
  }

  // TEST 5: Invalid input checks
  // Check Name: no numbers or special symbols
  if (nameValue === '') {
    showFeedback('error', 'Please enter your name.');
    return;
  } else if (!validateName(nameValue)) {
    showFeedback('error', 'Name must only contain letters and spaces (no numbers or symbols allowed).');
    return;
  }

  // Check Email: valid format [name@email.com]
  if (emailValue === '') {
    showFeedback('error', 'Please enter your email address.');
    return;
  } else if (!validateEmail(emailValue)) {
    showFeedback('error', 'Please enter a valid email format [name@email.com].');
    return;
  }

  // TEST 3: Unchecked consent box
  if (!isConsentChecked) {
    showFeedback('error', 'You must check the box to agree to our Privacy Policy.');
    return;
  }

  // TEST 2: Valid input passed all checks!
  showFeedback('success', 'Thank you for signing up, ' + nameValue + '! Your exclusive Buy 1 Take 1 voucher has been emailed to ' + emailValue + '.');
}

function showFeedback(type, message) {
  const feedbackElement = document.getElementById('form-feedback');
  if (feedbackElement) {
    feedbackElement.style.display = 'block';
    feedbackElement.textContent = message;

    if (type === 'success') {
      feedbackElement.style.backgroundColor = '#ECFDF5';
      feedbackElement.style.color = '#065F46';
      feedbackElement.style.border = '2px solid #059669';
    } else {
      feedbackElement.style.backgroundColor = '#FEF2F2';
      feedbackElement.style.color = '#991B1B';
      feedbackElement.style.border = '2px solid #DC2626';
    }
  }
}

// Start timer on page load
setInterval(updateCountdown, 1000);
updateCountdown();

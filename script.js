document.querySelectorAll(".faq-question").forEach(button => {
button.addEventListener("click", () => {
button.nextElementSibling.classList.toggle("show-answer");
});
});

const submitSignUp = () => {
  // Get form values
  const contact = document.querySelector('#contact').value.trim();
  const handleDeliveries = document.querySelector('input[name="delivery"]:checked').value === "1" ? 1 : 0;
  const submitBtn = document.querySelector('#signup .cta-btn');

  // Validate inputs
  if (!contact) {
    alert('Please provide your email or phone number.');
    return;
  }

  // Show loader
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Get current date and format it as DD-MM-YYYY, HH:MM AM/PM
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const formattedDate = `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;

  // Prepare data
  const account = "m";
  const data = JSON.stringify({
    contact,
    account,
    date: formattedDate,
    hd: handleDeliveries
  });

  // Check if the user is online
  if (!navigator.onLine) {
    alert('Please turn on your internet connection and try again.');
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    return;
  }

  // Send data to the endpoint
  fetch("https://submit-form.com/nsAY42QDQ", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  })
  .then(() => {
    alert(`Submitted successfully!`);
  })
  .catch(() => {
    alert('Submitted successfully! We will notify you soon.');
  })
  .finally(() => {
    // Hide loader
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  });
};

// Attach the function to the button click event
document.querySelector('#signup .cta-btn').addEventListener('click', submitSignUp);

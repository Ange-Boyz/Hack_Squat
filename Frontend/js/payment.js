document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("paymentForm");
  const phoneInput = document.getElementById("phone");

  const stepForm = document.getElementById("stepForm");
  const stepPending = document.getElementById("stepPending");
  const checkStatus = document.getElementById("checkStatus");

  const pages = {
    success: document.getElementById("stepSuccess"),
    succeed: document.getElementById("stepSucceed"),
    canceled: document.getElementById("stepCanceled")
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const phone = phoneInput.value.trim();
    if (!/^[0-9]{6,15}$/.test(phone)) {
      alert("Enter a valid phone number.");
      return;
    }

    stepForm.classList.add("hidden");
    stepPending.classList.remove("hidden");
    stepPending.classList.add("show");
  });

  checkStatus.addEventListener("click", () => {
    stepPending.classList.remove("show");
    stepPending.classList.add("hidden");

    // Simulate random result
    const keys = Object.keys(pages);
    const selected = keys[Math.floor(Math.random() * keys.length)];
    const nextPage = pages[selected];

    nextPage.classList.remove("hidden");
    nextPage.classList.add("show");
  });

  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, '');
  });
});

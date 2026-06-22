document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  const enquiryForm = document.querySelector(".enquiry-form");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      sendEnquiryToWhatsApp(enquiryForm);
    });
  }
});

function sendEnquiryToWhatsApp(form) {
  if (!form) return;

  const name = form.querySelector('[name="name"]')?.value.trim() || "";
  const studentClass = form.querySelector('[name="class"]')?.value.trim() || "";
  const phone = form.querySelector('[name="phone"]')?.value.replace(/\D/g, "") || "";
  const message = form.querySelector('[name="message"]')?.value.trim() || "";

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  if (!/^[A-Za-z .'-]{2,60}$/.test(name)) {
    alert("Please enter a valid name using letters and spaces.");
    return;
  }

  if (!studentClass) {
    alert("Please select a class or course.");
    return;
  }

  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit Indian mobile number.");
    return;
  }

  if (!message) {
    alert("Please enter your message.");
    return;
  }

  const text = [
    "Hello Uttar Classes,",
    "",
    "I want admission details.",
    "",
    `Name: ${name}`,
    `Class/Course: ${studentClass}`,
    `Phone: ${phone}`,
    `Message: ${message}`,
  ].join("\n");

  window.open(`https://wa.me/918840199491?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

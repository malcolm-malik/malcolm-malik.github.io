document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggle.textContent = "Light mode";
  } else {
    toggle.textContent = "Dark mode";
  }

  toggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggle.textContent = "Light mode";
    } else {
      localStorage.setItem("theme", "light");
      toggle.textContent = "Dark mode";
    }
  });
});

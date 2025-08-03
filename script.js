 const passwordOutput = document.getElementById("passwordOutput");
const strengthText = document.getElementById("strengthText");
const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

function generatePassword() {
  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;
  const length = parseInt(lengthSlider.value);

  let characters = "";
  let password = "";

  if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) characters += "0123456789";
  if (symbols) characters += "!@#$%^&*()_+[]{}<>?";

  if (characters.length === 0) {
    alert("Please select at least one option!");
    return;
  }

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  passwordOutput.value = password;
  updateStrength(password);
}

function updateStrength(pwd) {
  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (/[A-Z]/.test(pwd)) strength++;
  if (/[a-z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;

  let status = "Weak";
  if (strength >= 4) status = "Strong";
  else if (strength >= 3) status = "Medium";

  strengthText.textContent = "Strength: " + status;
}

function copyPassword() {
  navigator.clipboard.writeText(passwordOutput.value);
  alert("Password copied to clipboard!");
}

function togglePassword() {
  const inputType = passwordOutput.getAttribute("type");
  passwordOutput.setAttribute("type", inputType === "password" ? "text" : "password");
}

function toggleMode() {
  document.body.classList.toggle("dark");
}

// Update slider value text
lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});
const getById = (id) => document.getElementById(id);

const password = getById('password');
const confirmPassword = getById('confirm-password');
const form = getById('form');
const container = getById('container');
const submit = getById('submit');
const loader = getById('loader');
const error = getById('error');
const success = getById('success');

container.style.display = 'none';
error.style.display = 'none';
success.style.display = 'none';

let token, userId;
const passRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/;

window.addEventListener('DOMContentLoaded', async () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  token = params.token;
  userId = params.userId;

  const res = await fetch('/auth/verify-password-reset-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, userId }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    loader.innerText = error;
    return;
  }

  loader.style.display = 'none';
  container.style.display = 'block';
});

const displayError = (errorMessage) => {
  success.style.display = 'none';
  error.innerText = errorMessage;
  error.style.display = 'block';
};

const displaySuccess = (successMessage) => {
  error.style.display = 'none';
  success.innerText = successMessage;
  success.style.display = 'block';
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!password.value.trim()) displayError('Password is missing!');
  if (!passRegex.test(password.value))
    displayError(
      'Password is too simple, use alphanumeric with special characters!'
    );
  if (password.value !== confirmPassword.value)
    displayError('Passwords do not match!');

  submit.disabled = true;
  submit.innerText = 'Resetting passowrd...';

  const res = await fetch('/auth/update-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, userId, password: password.value }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    displayError(error);
    return;
  }

  displaySuccess('Password reset succesfully!');

  password.value = '';
  confirmPassword.value = '';

  submit.disabled = false;
  submit.innerText = 'Reset Password';
};

form.addEventListener('submit', handleSubmit);

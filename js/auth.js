import {
  auth,
  db,
  set,
  ref,
  get,
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  browserLocalPersistence,
  browserSessionPersistence
} from '../firebaseConfig.js'

const signUpPassword = document.getElementById('signup-password')
const loginPassword = document.getElementById('login-password')

export function initStyle() {
  const loginBtn = document.querySelector('#login');
  const signupBtn = document.querySelector('#signup');
  const signUpToggleBtn = document.getElementById('toggle-signup-password');
  const loginToggleBtn = document.getElementById('toggle-login-password');

  window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formToShow = urlParams.get('form');
    if (formToShow === 'login') {
      document.getElementById('login').click();
    } else if (formToShow === 'signup') {
      document.getElementById('signup').click();
    }
  }

  auth.onAuthStateChanged(user => {
    if (user) {
      window.location.href = './index.html';
    }
  });

  loginBtn.addEventListener('click', toggleSlideUp);
  signupBtn.addEventListener('click', toggleSlideUp);

  addTogglePasswordEventListener(loginToggleBtn, loginPassword, 'eye-icon-login');
  addTogglePasswordEventListener(signUpToggleBtn, signUpPassword, 'eye-icon-signup');
}

function toggleSlideUp(e) {
  let parent = e.target.parentNode;
  Array.from(e.target.parentNode.classList).find(element => {
    if (element !== 'slide-up' && !parent.classList.contains('slide-up')) {
      parent.classList.add('slide-up');
    } else if (element === 'slide-up') {
      parent.classList.remove('slide-up');
    }
  });
}

function addTogglePasswordEventListener(button, input, eyeIconId) {
  var eyeIcon = document.getElementById(eyeIconId)

  button.addEventListener('click', function() {
    if (input.type === 'password') {
      input.type = 'text'
      eyeIcon.className = 'fas fa-eye-slash'
    } else {
      input.type = 'password'
      eyeIcon.className = 'fas fa-eye'
    }
  })
}

export function initAuth() {
  const signUpForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const signUpEmail = document.getElementById('signup-email');
  const loginEmail = document.getElementById('login-email');
  const forgotPassword = document.getElementById('forgot-password');
  const checkBox = document.getElementById('remember-me');

  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    setPersistence(auth, checkBox.checked ? browserLocalPersis);
  });
}

}
// export { auth };
// export { db };

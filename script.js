// Инициализация Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);

// Аутентификация пользователя
const auth = firebase.auth();
const authContainer = document.getElementById('auth-container');
const contentContainer = document.getElementById('content-container');
const authForm = document.getElementById('auth-form');
const authButton = document.getElementById('auth-button');
const authTitle = document.getElementById('auth-title');
const toggleAuth = document.getElementById('toggle-auth');
const logoutLink = document.getElementById('logout-link');

let isLogin = true; // Отслеживаем, находимся ли мы на странице входа или регистрации

authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                authContainer.classList.add('hidden');
                contentContainer.classList.remove('hidden');
            })
            .catch((error) => {
                alert('Ошибка при входе: ' + error.message);
            });
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Регистрация успешна!');
                isLogin = true;
                authTitle.innerText = 'Вход в систему';
                authButton.innerText = 'Войти';
                toggleAuth.innerHTML = 'Нет аккаунта? <span>Зарегистрироваться</span>';
            })
            .catch((error) => {
                alert('Ошибка при регистрации: ' + error.message);
            });
    }
});

toggleAuth.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? 'Вход в систему' : 'Регистрация';
    authButton.innerText = isLogin ? 'Войти' : 'Зарегистрироваться';
    toggleAuth.innerHTML = isLogin ? 'Нет аккаунта? <span>Зарегистрироваться</span>' : 'Уже есть аккаунт? <span>Войти</span>';
});

logoutLink.addEventListener('click', () => {
    auth.signOut().then(() => {
        authContainer.classList.remove('hidden');
        contentContainer.classList.add('hidden');
    });
});

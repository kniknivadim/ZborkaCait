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
const auth = firebase.auth();

// Регистрация пользователя
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert('Регистрация успешна!');
            window.location.href = 'dashboard.html'; // Переход в панель управления
        })
        .catch((error) => {
            alert('Ошибка при регистрации: ' + error.message);
        });
});

// Вход пользователя
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'dashboard.html'; // Переход в панель управления
        })
        .catch((error) => {
            alert('Ошибка при входе: ' + error.message);
        });
});

// Выход пользователя
document.getElementById('logout-link').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'login.html'; // Возврат на страницу входа
    });
});

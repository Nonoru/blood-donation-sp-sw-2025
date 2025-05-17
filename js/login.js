let iconPassword = document.getElementById('showpass');
let pass = document.getElementById('password');
iconPassword.addEventListener('click', () => {
    let type = pass.type === 'password' ? 'text' : 'password';
    pass.type = type;
});
document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("telaInicial-form");
    // Verifica se o token JWT está presente no localStorage
    var token = localStorage.getItem("tokenJWT");
    // Se o token existir, você pode fazer qualquer coisa que precisar com ele
    if (token) {
        alert("Token JWT recuperado.");
        console.log("Token JWT recuperado:", token);
        // Aqui você pode adicionar lógica adicional, como fazer solicitações autenticadas à sua API
    } else {
        alert("Token JWT não encontrado no armazenamento local.", token);
        console.log("Token JWT não encontrado no armazenamento local.");
        // Se não houver token, você pode redirecionar o usuário de volta para a tela de login
        window.location.href = "http://192.168.15.153:8081/telaLogin/telaLogin.html";
    }
});

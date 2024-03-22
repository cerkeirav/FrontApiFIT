document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            
            // Obtém os valores de login e senha do formulário
            var login = document.getElementById("login").value;
            var senha = document.getElementById("senha").value;
            console.log(senha);
            // Constrói o objeto com os dados de login
            var data = {
                login: login,
                senha: senha
            };

            // Faz a solicitação POST para o servidor com os dados em JSON
            fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "http://127.0.0.1:5500",
                    "Access-Control-Request-Method":"POST"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao fazer login: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Verifica se o tokenJWT JWT foi retornado
                if (!data.tokenJWT) {
                    alert("tokenJWT de autenticação não encontrado na resposta.");
                }
                
                // Armazena o tokenJWT no localStorage
                localStorage.setItem("tokenJWT", data.tokenJWT);
        
                // Redireciona para a tela inicial
                window.location.href = "http://192.168.15.153:8081/telaInicial/telaInicial.html";
              // window.location.href = "http://192.168.15.153:8081/telaConsultar/telaConsultar.html";
            })
            .catch(error => {
                console.error(error.message);
                // Exibe mensagem de erro para o usuário, se necessário
                alert("Erro ao fazer login. Por favor, tente novamente.");
            });
        });
    }
});

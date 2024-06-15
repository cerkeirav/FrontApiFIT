document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("telaInicial-form");
   
    var token = localStorage.getItem("tokenJWT");
    
    if (token) {
        console.log("Token JWT recuperado:", token);
        
    } else {
        alert("Token JWT não encontrado no armazenamento local.", token);
        console.log("Token JWT não encontrado no armazenamento local.");
        window.location.href = "http://192.168.15.153:8081/telaLogin/telaLogin.html";
    }

    document.getElementById('listarMedicos').addEventListener('click', function(event) {
        event.preventDefault();
    
        fetch('http://localhost:8080/medicos') // Substitua pela URL da sua API
            .then(response => response.json())
            .then(data => {
                let content = data.content.map(medico => `
                    <p>
                        <strong>Nome:</strong> ${medico.nome}<br>
                        <strong>Email:</strong> ${medico.email}<br>
                        <strong>CRM:</strong> ${medico.crm}<br>
                        <strong>Especialidade:</strong> ${medico.especialidade}
                    </p>
                `).join('');
    
                let popup = document.createElement('div');
                popup.id = 'popup';
                popup.innerHTML = `
                    <div id="popupContent">
                        <h2>Médicos Ativos</h2>
                        ${content}
                        <button id="closePopup">Fechar</button>
                    </div>
                `;
                document.body.appendChild(popup);
    
                document.getElementById('closePopup').addEventListener('click', function() {
                    document.body.removeChild(popup);
                });
            })
            .catch(error => console.error('Erro ao listar médicos:', error));
    });
    
});

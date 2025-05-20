document.getElementById('cadastrarBtn').addEventListener('click', async function () {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
    let hasError = false;

    document.getElementById('nomeError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('senhaError').textContent = '';
    document.getElementById('confirmarSenhaError').textContent = '';
    document.getElementById('successMessage').textContent = '';

    if (!nome || !email || !senha || !confirmarSenha) {
        document.getElementById('nomeError').textContent = !nome ? 'Preencha todos os campos obrigatórios.' : '';
        document.getElementById('emailError').textContent = !email ? 'Preencha todos os campos obrigatórios.' : '';
        document.getElementById('senhaError').textContent = !senha ? 'Preencha todos os campos obrigatórios.' : '';
        document.getElementById('confirmarSenhaError').textContent = !confirmarSenha ? 'Preencha todos os campos obrigatórios.' : '';
        hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Formato de e-mail inválido.';
        hasError = true;
    }

    if (senha !== confirmarSenha) {
        document.getElementById('confirmarSenhaError').textContent = 'As senhas não coincidem.';
        hasError = true;
    }

    if (!hasError) {
        console.log("Dados enviados:", JSON.stringify({ name: nome, email: email, password: senha }));

        try {
            const response = await fetch("https://comparadorapi-cfegcpfyc2grbhbk.brazilsouth-01.azurewebsites.net/accounts/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: nome, email: email, password: senha })
            });

            const data = await response.json();
            console.log("Resposta do servidor:", data);

            if (response.ok) {
                document.getElementById('successMessage').textContent = 'Cadastro realizado com sucesso!';
                setTimeout(() => window.location.href = 'index.html', 2000);
            } else {
                if (response.status === 409) {
                    document.getElementById('emailError').textContent = `Erro: ${data.error}`; // Mostra erro de e-mail já cadastrado
                } else {
                    document.getElementById('successMessage').textContent = `Erro ao cadastrar. Tente novamente!`;
                }
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            document.getElementById('successMessage').textContent = 'Erro na conexão. Verifique sua internet!';
        }
    }
});

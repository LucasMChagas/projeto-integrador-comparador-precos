document.addEventListener("DOMContentLoaded", () => {
  const entrarBtn = document.getElementById("entrarBtn");

  if (entrarBtn) {
    entrarBtn.addEventListener("click", async () => {
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const loginError = document.getElementById("loginError");

      loginError.textContent = "";

      // 📌 Validação atualizada: senha precisa ter pelo menos 8 caracteres!
      if (!email || !senha) {
        loginError.textContent = "Preencha todos os campos.";
        return;
      }

      if (senha.length < 8) {
        loginError.textContent = "A senha deve ter no mínimo 8 caracteres.";
        return;
      }

      try {
        const response = await fetch("https://comparadorapi-cfegcpfyc2grbhbk.brazilsouth-01.azurewebsites.net/accounts/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email, password: senha })
        });

        if (response.status === 401) {
          loginError.textContent = "Senha incorreta. Tente novamente.";
          return;
        }

        const data = await response.json();
        console.log("Resposta da API:", data);

        if (response.ok) {
          localStorage.setItem("usuarioLogado", JSON.stringify(data));
          window.location.href = "comparador_precos.html";
        } else {
          loginError.textContent = data.detail || "Erro ao fazer login. Tente novamente.";
        }
      } catch (erro) {
        console.error("Erro ao fazer login:", erro);
        loginError.textContent = "Erro de conexão. Verifique sua internet.";
      }
    });
  } else {
    console.error("Botão 'entrarBtn' não encontrado no DOM.");
  }
});




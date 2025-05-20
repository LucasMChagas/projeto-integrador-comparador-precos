const SUPABASE_URL = 'https://azwmadwdlpokwpbyrcip.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6d21hZHdkbHBva3dwYnlyY2lwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MjI5ODcsImV4cCI6MjA2MzA5ODk4N30.Xr380ElUxEC4-f2roZXWkI6IKnO-CgEwzAfSplc3BkE';

// Correta inicialização usando Supabase via CDN
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", function () {
    // Verifica se Supabase foi carregado corretamente
    if (!window.supabase) {
        console.error("Erro: Supabase não foi carregado via CDN!");
        return;
    }

    console.log("Supabase inicializado corretamente!");

    // Função para testar conexão com Supabase
    async function testarConexao() {
        const { data, error } = await supabase.from('produtos').select('*').limit(1);

        if (error) {
            console.error("Erro ao conectar com Supabase:", error.message);
        } else {
            console.log("Conexão com Supabase funcionando! Dados de teste:", data);
        }
    }

    testarConexao();

    const form = document.getElementById("productForm");
    const mensagemStatus = document.getElementById("mensagem-status");
    const localizacaoSelect = document.getElementById("localizacao");
    const camposOnline = document.getElementById("campos-online");
    const camposPresencial = document.getElementById("campos-presencial");

    function atualizarCamposLocalizacao() {
        camposOnline.style.display = localizacaoSelect.value === "online" ? "block" : "none";
        camposPresencial.style.display = localizacaoSelect.value === "presencial" ? "block" : "none";
    }

    localizacaoSelect.addEventListener("change", atualizarCamposLocalizacao);
    atualizarCamposLocalizacao();

    async function enviarImagem(file) {
    const nomeArquivo = file.name; // Usa o nome original do arquivo

    const { data, error } = await supabase.storage
        .from("imagens") // Nome do bucket no Supabase
        .upload(nomeArquivo, file, {
            contentType: file.type,
            cacheControl: "3600",
            upsert: true
        });

    if (error) {
        console.error("❌ Erro ao enviar imagem:", error.message);
        return null;
    }

    console.log("✅ Imagem enviada com sucesso:", data);
    return data.path;
}


    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        mensagemStatus.innerHTML = "<p style='color: blue;'>⏳ Enviando produto...</p>";

        const produto = {
            id: Date.now(), // Gera um ID único baseado na hora atual
            nome: document.getElementById("nome").value.trim(),
            tipo_produto: document.getElementById("tipo_produto").value,
            marca: document.getElementById("marca").value.trim(),
            preco: parseFloat(document.getElementById("valor").value),
            quantidade: Number(document.getElementById("quantidade").value),
            unidade: document.getElementById("unidade").value,
            descricao: document.getElementById("descricao").value.trim() || null,
            origem: document.getElementById("origem").value,
            localizacao: localizacaoSelect.value,
            link: localizacaoSelect.value === "online" ? document.getElementById("link").value.trim() : null,
            endereco: localizacaoSelect.value === "presencial" ? document.getElementById("endereco").value.trim() : null,
            imagem_url: document.getElementById("imagem").value.trim() || null // Adicionando suporte para imagem_url
        };

        if (produto.localizacao === "online" && !produto.link) {
            mensagemStatus.innerHTML = "<p style='color: red;'>❌ O link do produto é obrigatório para localização 'Online'.</p>";
            return;
        }

        if (produto.localizacao === "presencial" && !produto.endereco) {
            mensagemStatus.innerHTML = "<p style='color: red;'>❌ O endereço do produto é obrigatório para localização 'Presencial'.</p>";
            return;
        }

        try {
            const { data, error } = await supabase.from('produtos').insert([produto]);

            if (error) {
                mensagemStatus.innerHTML = `<p style='color: red;'>❌ Erro ao cadastrar produto: ${error.message}</p>`;
                return;
            }

            mensagemStatus.innerHTML = `<p style='color: green;'>✅ Produto "${produto.nome}" cadastrado com sucesso!</p>`;
            form.reset();
            atualizarCamposLocalizacao();
        } catch (error) {
            mensagemStatus.innerHTML = `<p style='color: red;'>❌ Erro ao conectar com o Supabase: ${error.message}</p>`;
        }
    });
});

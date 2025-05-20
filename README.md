# Projeto Integrador: Comparador de Preços

## 📌 Descrição

Este projeto tem como objetivo desenvolver um **comparador de preços** eficiente, permitindo aos usuários analisar valores de produtos em diferentes lojas e tomar decisões de compra de forma mais assertiva e economica.

## 📝 Prova de Conceito

A prova de conceito aplicada neste projeto teve como foco a **jornada de conversão do usuário Carlos Mendes**: 

"Decidido a integrar a ferramenta em sua rotina, Carlos cria uma conta na plataforma. Ele configura alertas para promoções em itens que compra regularmente, personalizando sua experiência para atender tanto as necessidades de casa quanto de negócio".

Carlos, tem 40 anos é um pequeno empresário na cidade de Recife-PE e busca otimizar suas compras tanto para uso pessoal quanto para abastecimento de seu negócio. Prefere mercados que oferecem bons preços e facilidade na compra online.

Os resultados obtidos nesta prova de conceito são fundamentais para aprimorar as funcionalidades do sistema e garantir uma experiência fluida e eficaz para os usuários.

## 🚀 Funcionalidades

- Busca de produtos em diferentes lojas
- Comparação automática de preços
- Exibição das melhores ofertas disponíveis
- Alerta para produtos selecionados
- Opção de favoritar produtos

## 🛠️ Tecnologias Utilizadas

- **Linguagem Frontend:** HTML, CSS, Javascript
- **Linguagem Backend:** Python, Dockerfile
- **Banco de dados:** PostgreSQL via SUPABASE
- **API:** FastAPI

## 🎥 Demonstração do Projeto

Confira o vídeo de demonstração e veja como ele funciona na prática!

🔗 [Assista ao vídeo aqui](https://youtu.be/3hyq3V__64E)

## 📖 Como Executar

### Pré-requisitos
- [Visual Studio Code](https://code.visualstudio.com/) instalado
- Extensão **Live Server** (ou similar) instalada no VS Code
- Navegador

### Passo a passo
1. **Abra o projeto no VS Code**
2. Clique com o **botão direito no arquivo `index.html`**
3. Selecione **"Open with Live Server"**
4. O navegador abrirá automaticamente no navegador

## ⚠️ Observações sobre a funcionalidade de busca de produtos

Durante o desenvolvimento da funcionalidade de **busca automática de produtos em sites de terceiros**, o backend enfrentou **dificuldades técnicas com scraping**, devido a:
- Mudanças frequentes na estrutura dos sites
- Proteções contra bots e scraping (como CAPTCHAs e requisições bloqueadas)
- Instabilidade e limitações de tempo de resposta

Para contornar esse desafio, o backend criou um **arquivo JSON com uma base de produtos simulada**, permitindo que a aplicação fosse testada e demonstrada sem depender da coleta em tempo real.

Entretanto, o frontend enfrentou **dificuldades para consumir e manipular esse JSON de forma eficiente**, especialmente para funcionalidades como filtro, busca e favoritos. Como solução alternativa e mais escalável, o frontend optou por **migrar os dados para um banco de dados no Supabase**, o que facilitou a integração, a persistência de dados e a implementação de funcionalidades interativas na aplicação.

> **Resumo:** A busca em sites reais não está ativa nesta versão por limitações técnicas. Em vez disso, utilizamos dados simulados carregados no Supabase para demonstrar a experiência do usuário.

## 💡 Autores

- Aline Santos Silva
- Isabelle Lopes Barbosa Fontenele de Andrade
- Karen Monique Zordan
- Letícia Simões Rodrigues
- Lucas Miranda das Chagas
- Tairan de Abreu Freitas

## Outras informações

**Faculdade:**  Centro Universitário SENAC SANTO AMARO (modalidade EAD)
**Curso:**  Tecnólogo em Análise e Desenvolvimento de Sistemas

**Disciplina:**  
Projeto Integrador: Desenvolvimento de sistemas orientado a dispositivos móveis e baseados na web

**Professor Coordenador e Orientador da disciplina:**  
Gustavo Calixto

**Professor Orientador:**  
Carlos William Ferreira de Lima

**Tutora:**  
Ruth Del Raso Gracia


console.log("header.js carregado");

function createHeader() {
  console.log("Criando header...");
  const header = document.createElement('header');
  header.style.cssText = `
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #007bff;
    padding: 10px 20px;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);
    z-index: 1000;
  `;

  const logo = document.createElement('img');
  logo.src = '../assets/logo.png';
  logo.alt = 'EconomizAí';
  logo.style.width = '50px';
  logo.style.height = 'auto';
  logo.style.marginRight = '15px';

  const title = document.createElement('h1');
  title.textContent = 'EconomizAí';
  title.style.margin = '0';
  title.style.fontSize = '24px';

  header.appendChild(logo);
  header.appendChild(title);

  document.body.insertBefore(header, document.body.firstChild);

  document.body.style.paddingTop = header.offsetHeight + 'px';
}

createHeader();

const dscc = require('@google/dscc');

// Função que desenha o ranking toda vez que os dados mudam
function drawViz(data) {
  // Limpa o que tinha antes
  document.body.innerHTML = '<div id="ranking-container"></div>';
  const container = document.getElementById('ranking-container');

  // Estilização das animações (CSS)
  const style = document.createElement('style');
  style.innerHTML = `
    #ranking-container { font-family: sans-serif; display: flex; flex-direction: column; gap: 10px; }
    .vendedor-card { 
      display: flex; align-items: center; 
      background: #f4f4f4; border-radius: 50px; 
      padding: 10px; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
      animation: float 3s ease-in-out infinite; /* Efeito flutuar */
    }
    .foto-vendedor { width: 50px; height: 50px; border-radius: 50%; margin-right: 15px; border: 2px solid #007bff; }
    .nome { font-weight: bold; flex-grow: 1; }
    .vendas { font-weight: bold; color: #28a745; margin-right: 20px; }
    
    /* Keyframes da animação de flutuar */
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(style);

  // Pega os dados da sua planilha
  data.tables.DEFAULT.forEach((row, index) => {
    const nome = row.mainMetric; // Ajuste conforme sua coluna
    const fotoUrl = row.mainMetric; // Link da imagem
    const vendas = row.mainMetric; // Valor vendido

    const card = document.createElement('div');
    card.className = 'vendedor-card';
    card.style.animationDelay = `${index * 0.5}s`; // Dá um atraso para não subirem todos juntos

    card.innerHTML = `
      <img src="${fotoUrl}" class="foto-vendedor">
      <span class="nome">${nome}</span>
      <span class="vendas">R$ ${vendas}</span>
    `;
    
    container.appendChild(card);
  });
}

// Escuta as atualizações do Looker Studio
dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});

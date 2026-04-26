dscc.subscribeToData(draw, { transform: dscc.objectTransform });

function draw(data) {
  const container = document.body;
  container.innerHTML = "";

  const rows = data.tables.DEFAULT.map(row => ({
    avatar: row[data.fields.dimensions[0].name]?.[0] || "",
    vendedor: row[data.fields.dimensions[1].name]?.[0] || "",
    cidade: row[data.fields.dimensions[2].name]?.[0] || "",
    pontuacao: row[data.fields.metrics[0].name]?.[0] || 0,
    clientes: row[data.fields.metrics[1].name]?.[0] || 0
  }));

  rows.sort((a, b) => b.pontuacao - a.pontuacao);

  rows.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div style="display:flex;align-items:center;padding:12px;border-bottom:1px solid #333;">
        <span style="width:40px;">${index + 1}º</span>
        <img src="${item.avatar}" width="50" height="50" style="border-radius:50%;margin-right:10px;">
        <div>
          <strong>${item.vendedor}</strong><br>
          ${item.cidade}<br>
          Pontuação: ${item.pontuacao} | Clientes: ${item.clientes}
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

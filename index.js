input

function converter() {
  const input = document.getElementById("input").value;
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const trs = Array.from(doc.querySelectorAll("tr"));

  const output = trs.map(tr => {
    const tds = Array.from(tr.querySelectorAll("td"));
    const tdHTML = tds.map(td => {
      const img = td.querySelector("img");
      if (!img) return "";
      const width = img.getAttribute("width");
      const height = img.getAttribute("height");
      const src = img.getAttribute("src");
      return `
<td>
  <a href="" title="">
    <img src="${src}" width="${width}" height="${height}" alt="" border="0" style="display: block;">
  </a>
</td>`;
    }).join("");

    return `<table align="center" border="0" cellpadding="0" cellspacing="0">
<tr>${tdHTML}
</tr>
</table>`;
  }).join("\n");

  document.getElementById("outputResult").textContent = output;
  document.getElementById("msg").textContent = "";
}

async function copiarResultado() {
  const text = document.getElementById("outputResult").textContent;
  
  try {
    if (text != '') {
      await navigator.clipboard.writeText(text);
      document.getElementById("msg").textContent = "Copiado com sucesso!";
    } else {
      document.getElementById("msg").textContent = "Output vazio!";
    }
  } catch (err) {
    document.getElementById("msg").textContent = "Erro ao copiar (tente HTTPS ou use manualmente)";
    console.error("Erro ao copiar:", err);
  }
  
  setTimeout(() => {
    document.getElementById("msg").textContent = "";
  }, 3500);
}

function apagarInput() {
  input.value = ''
  document.getElementById("outputResult").textContent = ''
}

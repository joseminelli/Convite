var modal = document.getElementById("modal");
var btn = document.getElementById("confirmarPresenca");
var span = document.getElementsByClassName("close")[0];
var modalAberto = false;
var ingressoGerado = false;
var nomeInserido = "";
const webhookUrl =
  "https://discord.com/api/webhooks/1209177185320177755/cs8vbW6AJvAPSV7iwHFLqncZIi-48PtxjmLFE0qiEtHEaiPvQPC4IYL8QkC69EpjwJ0u";

btn.onclick = function () {
  if (!modalAberto) {
    
  document.getElementById("overlay3").style.display = "flex";
    console.log("Abrir modal");
    modalAberto = true;
    modal.style.display = "block";
    modal.style.animation = "fadeIn .5s";
  }
};

span.onclick = function () {
  fecharModal(modal);
};

function fecharModal(modal) {
  document.getElementById("overlay3").style.display = "none";
  modal.style.animation = "fadeOut .5s";
  setTimeout(function () {
    modalAberto = false;
    modal.style.display = "none";
  }, 500);
}

function exibirAlerta(mensagem) {
  const alerta = document.createElement("div");
  alerta.classList.add("alerta");
  alerta.textContent = mensagem;
  document.body.appendChild(alerta);
  setTimeout(function () {
    alerta.style.animation = "fadeOut .5s";
    setTimeout(function () {
      alerta.remove();
    }, 500);
  }, 5000);
}
function createCanvas(width, height, set2dTransform = true) {
  const ratio = Math.ceil(window.devicePixelRatio);
  const canvas = document.createElement("canvas");
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  if (set2dTransform) {
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  return canvas;
}

function gerarIngresso(nome) {
  if (ingressoGerado) return;

  nomeInserido = nome;

  var canvas = createCanvas(4146, 1517, false);
  var maxWidth = 1500;
  var proporcao = 4146 / 1517;

  canvas.width = 4146;
  canvas.height = 4146 / proporcao;

  var ctx = canvas.getContext("2d");

  var background = new Image();
  background.src = "img/ticket.png";

  background.onload = function () {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = "bold " + canvas.width * 0.04 + "px 'Montserrat', sans-serif";
    ctx.fillStyle = "#000000";

    var textWidth = ctx.measureText(nome).width;

    var textX = canvas.width * 0.83 - textWidth / 2;

    var textY = canvas.height / 2;

    ctx.fillText(nome, textX, textY);

    var ingressoImg = document.createElement("img");
    ingressoImg.src = canvas.toDataURL("image/jpeg");
    ingressoImg.classList.add("ingresso-img");
    document.getElementById("modal-ingresso").appendChild(ingressoImg);

    var downloadBtn = document.createElement("a");
    downloadBtn.href = ingressoImg.src;
    downloadBtn.download = "ingresso.jpg";
    downloadBtn.textContent = "Baixar Ingresso";
    downloadBtn.classList.add("btn");

    var downloadBtnDiv = document.createElement("div");
    downloadBtnDiv.classList.add("download-btn");
    document.getElementById("modal-ingresso").appendChild(downloadBtnDiv);
    downloadBtnDiv.appendChild(downloadBtn);

    ingressoGerado = true;
  };
}
document
  .getElementById("formulario")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("input").value;

    const payload = {
      content: `> **Presença Confirmada** :white_check_mark:
      - ${nome}
      `,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o Discord.");
      }

      exibirAlerta("Sua presença foi confirmada!");

      gerarIngresso(nome);

      abrirModalIngresso();
    } catch (error) {
      console.error("Erro:", error);

      exibirAlerta(
        "Ocorreu um erro ao confirmar a presença. Por favor, tente novamente mais tarde."
      );
    }
  });

function abrirModalIngresso() {
  document.getElementById("overlay2").style.display = "flex";
  fecharModal(modal);
  var modalIngresso = document.getElementById("modal-ingresso");
  modalIngresso.style.display = "flex";
  modalIngresso.style.justifyContent = "center";
  modalIngresso.style.animation = "fadeIn .5s";

  document.getElementById("modal-ingresso").innerHTML = "";
}

document
  .querySelector("#modal-ingresso .close")
  .addEventListener("click", function () {
    fecharModal(document.getElementById("modal-ingresso"));
  });

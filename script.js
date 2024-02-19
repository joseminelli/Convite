var modal = document.getElementById("modal");
var btn = document.getElementById("confirmarPresenca");
var span = document.getElementsByClassName("close")[0];
var modalAberto = false;

btn.onclick = function () {
  if (!modalAberto) {
    console.log("abrir modal");
    modalAberto = true;
    modal.style.display = "block";
    modal.style.animation = "fadeIn .5s";
  }
};

function fecharModal() {
  if (modalAberto) {
    modal.style.animation = "fadeOut .5s";
    setTimeout(function () {
      modalAberto = false;
      modal.style.display = "none";
    }, 500);
  }
}

span.onclick = function () {
  fecharModal();
};
function exibirAlerta(mensagem) {
  const alerta = document.createElement("div");
  alerta.classList.add("alerta");
  alerta.textContent = mensagem;
  document.body.appendChild(alerta);
  fecharModal();
  setTimeout(function () {
    alerta.style.animation = "fadeOut .5s";
    setTimeout(function () {
      alerta.remove();
    }, 500);
  }, 5000);
}

const webhookUrl =
  "https://discord.com/api/webhooks/1209177185320177755/cs8vbW6AJvAPSV7iwHFLqncZIi-48PtxjmLFE0qiEtHEaiPvQPC4IYL8QkC69EpjwJ0u";

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
    } catch (error) {
      console.error("Erro:", error);

      exibirAlerta(
        "Ocorreu um erro ao confirmar a presença. Por favor, tente novamente mais tarde."
      );
    }
  });

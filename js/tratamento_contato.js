  // Funções utilitárias
  function limparNumeros(valor) {
    return valor.replace(/\D/g, "");
  }

  function limparLetrasComEspaco(valor) {
    return valor.replace(/[^ a-zA-ZáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ]/g, "");
  }

  function temLetras(valor) {
    return /[a-zA-ZáéíóúãõâêîôûçÁÉÍÓÚÃÕÂÊÎÔÛÇ]/.test(valor);
  }

  function letrasCaixaAlta(valor) {
    return valor
      .toLowerCase()
      .replace(/\b\w/g, letra => letra.toUpperCase())
      .replace(/\s+/g, " ");
  }

  // Exibir erro
  function mostrarErro(input, erroElement, mensagem) {
    erroElement.textContent = mensagem;
    erroElement.style.color = "red";
    input.style.border = "3px solid red";
  }

  // Esconder erro
  function esconderErro(input, erroElement) {
    erroElement.textContent = "";
    input.style.border = "3px solid green";
  }

  // ===================== CAMPOS ======================== //

  // Nome
  function preencherNome() {
    const input = document.getElementById("iformNome");
    const erro = document.getElementById("ierro");
    const nomeOriginal = input.value;
    const nomeLimpo = limparLetrasComEspaco(nomeOriginal);

    if (!temLetras(nomeLimpo)) {
      mostrarErro(input, erro, "Digite apenas letras.");
      input.value = "";
      return;
    }

    input.value = nomeLimpo;
    esconderErro(input, erro);
  }

  function validarNome() {
    const input = document.getElementById("iformNome");
    const erro = document.getElementById("ierro");
    let nome = input.value.trim();

    if (nome.length < 4) {
      mostrarErro(input, erro, "Digite pelo menos 4 letras.");
      return false;
    }

    if (!nome.includes(" ")) {
      mostrarErro(input, erro, "Inclua o sobrenome.");
      return false;
    }

    const nomeFormatado = letrasCaixaAlta(limparLetrasComEspaco(nome));
    input.value = nomeFormatado;
    esconderErro(input, erro);
    return true;
  }

  // Telefone
  function preencherTelefone() {
    const input = document.getElementById("iformTelefone");
    const erro = document.getElementById("ierro");
    let tel = limparNumeros(input.value);

    if (tel.length > 11) tel = tel.slice(0, 11);

    if (tel.length === 11) {
      tel = tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (tel.length === 10) {
      tel = tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    input.value = tel;
    esconderErro(input, erro);
  }

  function validarTelefone() {
    const input = document.getElementById("iformTelefone");
    const erro = document.getElementById("ierro");

    if (input.value.length < 14) {
      mostrarErro(input, erro, "Telefone incompleto.");
      return false;
    }

    esconderErro(input, erro);
    return true;
  }

  // Email
  function preencherEmail() {
    const input = document.getElementById("iformEmail");
    input.value = input.value.trim().toLowerCase();
  }

  function validarEmail() {
    const input = document.getElementById("iformEmail");
    const erro = document.getElementById("ierro");
    const email = input.value;
    const regex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

    if (!regex.test(email)) {
      mostrarErro(input, erro, "Email inválido.");
      return false;
    }

    esconderErro(input, erro);
    return true;
  }

  // Mensagem
  function validarMensagem() {
    const input = document.getElementById("mensagem");
    const erro = document.getElementById("ierro");

    if (input.value.trim().length === 0) {
      mostrarErro(input, erro, "Mensagem não pode estar vazia.");
      return false;
    }

    esconderErro(input, erro);
    return true;
  }

  // ===================== ENVIO FINAL ======================== //

  function enviarFormulario() {
    const nomeOk = validarNome();
    const telefoneOk = validarTelefone();
    const emailOk = validarEmail();
    const mensagemOk = validarMensagem();

    if (!nomeOk || !telefoneOk || !emailOk || !mensagemOk) {
      return;
    }

    document.getElementById("meuFormulario").submit();
  }

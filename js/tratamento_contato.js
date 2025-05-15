  function mostrarErro(texto, campo) {
    document.getElementById("mensagemErro").textContent = texto;
    campo.classList.add("erro");
    //campo.focus();
  }

  function limparErro(campo) {
    document.getElementById("iformErro").textContent = "";
    campo.classList.remove("erro");
  }

  function formatarNome() {
    const nomeInput = document.getElementById("iformNome");
    let nome = nomeInput.value.trim();

    if (nome === "") {
      mostrarErro("O campo nome não pode estar vazio.", nomeInput);
      return false;
    }

    nome = nome.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    nomeInput.value = nome;

    if (nome.length < 3) {
      mostrarErro("Nome deve ter pelo menos 3 letras.", nomeInput);
      return false;
    }

    limparErro(nomeInput);
    return true;
  }

  function formatarTelefone() {
    const telInput = document.getElementById("iformTelefone");
    let tel = telInput.value.replace(/\D/g, "");

    if (tel.length > 11) tel = tel.slice(0, 11);

    if (tel.length === 11) {
      tel = tel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (tel.length === 10) {
      tel = tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    telInput.value = tel;

    if (telInput.value.length < 14) {
      mostrarErro("Telefone incompleto.", telInput);
      return false;
    }

    limparErro(telInput);
    return true;
  }

  function validarEmail() {
    const emailInput = document.getElementById("iformEmail");
    const email = emailInput.value.trim().toLowerCase();
    const regex = /^[\w.-]+@[\w.-]+\.\w+$/;

    emailInput.value = email;

    if (!regex.test(email)) {
      mostrarErro("Email inválido.", emailInput);
      return false;
    }

    limparErro(emailInput);
    return true;
  }

  function validarMensagem() {
    const msgInput = document.getElementById("mensagem");

    if (msgInput.value.trim().length === 0) {
      mostrarErro("Mensagem não pode estar vazia.", msgInput);
      return false;
    }

    limparErro(msgInput);
    return true;
  }

  function enviarFormulario() {
    const nomeOk = formatarNome();
    const telefoneOk = formatarTelefone();
    const emailOk = validarEmail();
    const mensagemOk = validarMensagem();

    if (!nomeOk || !telefoneOk || !emailOk || !mensagemOk) {
      return;
    }

    document.getElementById("meuFormulario").submit();
  }
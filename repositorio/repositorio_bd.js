const bd = require('../bd/bd_utils.js');

function recuperar_todas_perguntas() {
  return bd.queryAll('SELECT * FROM perguntas', []);
}

function recuperar_num_respostas(id_pergunta) {
  const resultado = bd.query('SELECT count(*) FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
  return resultado['count(*)'];
}

function recuperar_pergunta(id_pergunta) {
  return bd.query('SELECT * FROM perguntas WHERE id_pergunta = ?', [id_pergunta]);
}

function recuperar_todas_respostas(id_pergunta) {
  return bd.queryAll('SELECT * FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
}

function criar_pergunta(texto, id_usuario) {
  bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?)', [texto, id_usuario]);
}

function criar_resposta(id_pergunta, texto) {
  bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES(?, ?)', [id_pergunta, texto]);
}

module.exports = {
  recuperar_todas_perguntas,
  recuperar_num_respostas,
  recuperar_pergunta,
  recuperar_todas_respostas,
  criar_pergunta,
  criar_resposta
};

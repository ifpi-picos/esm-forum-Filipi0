const modelo = require('../modelo.js');

// Criamos um mock do módulo 'bd' com os métodos necessários
const mock_bd = {};

// Mock da função queryAll() → retorna 3 perguntas fixas
mock_bd.queryAll = jest.fn().mockReturnValue([
  {
    id_pergunta: 1,
    texto: 'Qual a capital de MG?',
    id_usuario: 1,
  },
  {
    id_pergunta: 2,
    texto: 'Qual a capital de RJ?',
    id_usuario: 1,
  },
  {
    id_pergunta: 3,
    texto: 'Qual a capital de SP?',
    id_usuario: 1,
  }
]);

// Mock da função query(), chamada dentro de get_num_respostas()
// Vai retornar: 5, depois 10, depois 15 → uma para cada pergunta
mock_bd.query = jest.fn()
  .mockReturnValue({ 'count(*)': 0 })       // valor padrão (fallback)
  .mockReturnValueOnce({ 'count(*)': 5 })   // 1ª chamada
  .mockReturnValueOnce({ 'count(*)': 10 })  // 2ª chamada
  .mockReturnValueOnce({ 'count(*)': 15 }); // 3ª chamada

// Substituímos o acesso real ao BD pelo mock
modelo.reconfig_bd(mock_bd);

test('Testando listar três perguntas com seus respectivos números de respostas', () => {
  const perguntas = modelo.listar_perguntas();

  // Verificações de conteúdo
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('Qual a capital de MG?');
  expect(perguntas[1].texto).toBe('Qual a capital de RJ?');
  expect(perguntas[2].texto).toBe('Qual a capital de SP?');

  // Verificações do número de respostas (que vem da query mockada)
  expect(perguntas[0].num_respostas).toBe(5);
  expect(perguntas[1].num_respostas).toBe(10);
  expect(perguntas[2].num_respostas).toBe(15);

  // (Opcional) Verifica se as funções mockadas foram chamadas corretamente
  expect(mock_bd.queryAll).toHaveBeenCalledTimes(1);
  expect(mock_bd.query).toHaveBeenCalledTimes(3);
});

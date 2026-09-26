export const respostasFordinho: string[] = [
  'Pelo que vi no painel, está tudo dentro do esperado por aqui.',
  'Recomendo agendar uma revisão preventiva nos próximos dias.',
  'Verifiquei os sensores e não encontrei nada fora do normal.',
  'Fico de olho nisso e te aviso se notar alguma alteração.',
  'Você pode conferir esse dado direto no painel inicial do app.',
];

export const respostasPorPalavraChave: { palavras: string[]; resposta: string }[] = [
  { palavras: ['óleo', 'oleo'], resposta: 'O nível de óleo está em 64%, dentro da faixa recomendada.' },
  { palavras: ['pneu'], resposta: 'A pressão dos pneus está normal, exceto o dianteiro direito, que está um pouco abaixo do ideal.' },
  { palavras: ['combustível', 'combustivel', 'gasolina'], resposta: 'O nível de combustível está sendo monitorado e te aviso se ficar baixo.' },
  { palavras: ['agend'], resposta: 'Você pode marcar uma revisão na aba de Agendamento, é rapidinho!' },
  { palavras: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite'], resposta: 'Olá! Como posso ajudar com o seu veículo hoje?' },
];

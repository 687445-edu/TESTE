# Controle Financeiro Pessoal

Aplicativo web simples para controle financeiro pessoal, funcionando 100% no navegador (sem backend), com persistência em `localStorage`.

## Funcionalidades

- Cadastro de lançamentos de **receita** e **despesa**
- Categorias personalizadas
- Cálculo automático de:
  - Saldo atual
  - Total de receitas
  - Total de despesas
- Filtro por tipo de lançamento
- Exclusão de lançamentos
- Persistência local dos dados

## Como executar

### Opção 1: abrir direto no navegador

Basta abrir o arquivo `index.html` no navegador.

### Opção 2: servidor local (recomendado)

```bash
python3 -m http.server 8000
```

Depois acesse: `http://localhost:8000`

## Como testar

### 1) Teste rápido de sintaxe JavaScript

```bash
node --check app.js
```

### 2) Teste básico de carregamento da aplicação

1. Inicie o servidor local:

   ```bash
   python3 -m http.server 8000
   ```

2. Acesse `http://localhost:8000`.
3. Verifique se a tela inicial aparece com:
   - Cards de **Saldo**, **Receitas** e **Despesas** em `R$ 0,00`
   - Formulário “Novo lançamento”
   - Lista “Lançamentos” vazia

### 3) Teste funcional manual (cenário completo)

1. Adicione uma **receita**:
   - Descrição: `Salário`
   - Valor: `5000`
   - Tipo: `Receita`
   - Categoria: `Trabalho`

2. Adicione uma **despesa**:
   - Descrição: `Aluguel`
   - Valor: `1500`
   - Tipo: `Despesa`
   - Categoria: `Moradia`

3. Resultado esperado:
   - Receitas: `R$ 5.000,00`
   - Despesas: `R$ 1.500,00`
   - Saldo: `R$ 3.500,00`

4. Teste o filtro:
   - “Somente receitas” mostra só `Salário`
   - “Somente despesas” mostra só `Aluguel`

5. Teste remoção:
   - Clique em **Excluir** em um item
   - Valores do resumo devem ser recalculados automaticamente

### 4) Teste de persistência (`localStorage`)

1. Com lançamentos criados, recarregue a página (`F5`).
2. Confirme que os lançamentos continuam visíveis.
3. Feche e abra o navegador novamente, acesse a página e confirme persistência.

## Estrutura

- `index.html`: layout da aplicação
- `styles.css`: estilos da interface
- `app.js`: lógica da aplicação

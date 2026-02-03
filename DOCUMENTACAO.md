# 📱 Fitness AI - Documentação do Projeto

## 🎯 Visão Geral

**Fitness AI** é um aplicativo inovador que utiliza Inteligência Artificial para criar treinos personalizados baseados em estudos científicos renomados. O app combina tecnologia de IA, gamificação através de sistema de pontos, rede social integrada e parcerias comerciais para resolver o problema de **manter a constância e a motivação na vida saudável**.

---

## 🎯 Problema a Resolver

**Manter a constância e a motivação na vida saudável**

Muitas pessoas enfrentam dificuldades para manter uma rotina de exercícios consistente. O Fitness AI resolve isso através de:
- Treinos personalizados e científicos
- Sistema de gamificação com recompensas reais
- Comunidade engajada
- Eventos e desafios

---

## 🎯 Componentes Principais do App

O app é estruturado em **5 componentes principais** que trabalham de forma integrada:

1. **🏋️ Treinos** - Sistema de IA que gera treinos personalizados
2. **💰 Pontos/Saldos** - Sistema de gamificação e recompensas
3. **📱 Rede Social** - Comunidade e engajamento
4. **🎯 Desafios** - Integrados dentro da rede social
5. **🛒 Loja/Resgate** - Troca de pontos por benefícios

---

## 🚀 Funcionalidades Principais

### 1. Sistema de Treinos com IA ⭐ FUNCIONALIDADE PRINCIPAL

#### Características:
- **Base Científica**: A IA utiliza apenas estudos e artigos renomados da área, fornecidos pelo produtor/administrador
- **Personalização Total**: Treinos gerados especificamente para cada usuário baseado em suas informações e objetivos
- **Modalidades Disponíveis**:
  - **Corrida**:
    - 5km
    - 10km
  - **Musculação**:
    - Emagrecimento
    - Hipertrofia

#### Fluxo Detalhado de Geração de Treino:

1. **Usuário clica em "Treinos"** → Acesso direto à seleção de modalidade

2. **Seleção de Modalidade e Objetivo**:
   - **Opção 1: Corrida**
     - Escolhe entre: **5km** ou **10km**
     - IA gera treino de corrida baseado na distância escolhida
   
   - **Opção 2: Musculação**
     - Escolhe entre: **Emagrecimento** ou **Hipertrofia**
     - Se escolher **Hipertrofia**, prossegue para questionário detalhado

3. **Questionário para Hipertrofia** (apenas se escolher esta opção):
   A IA faz perguntas básicas essenciais:
   - **Altura** (cm)
   - **Peso** (kg)
   - **Idade** (anos)
   - **Gênero** (masculino/feminino/outro)
   - **Quantas vezes por semana planeja treinar** (frequência semanal)
   - *Outras informações relevantes podem ser coletadas conforme necessário*

4. **Geração do Treino Personalizado**:
   - IA analisa todas as informações coletadas
   - Consulta base de conhecimento com estudos científicos renomados
   - Gera treino específico e personalizado para o usuário
   - Considera: objetivos, características físicas, disponibilidade, nível de experiência

5. **Apresentação do Treino**:
   - Treino completo exibido ao usuário
   - Exercícios, séries, repetições, descansos
   - Orientações e dicas baseadas em ciência

6. **Execução e Registro**:
   - Usuário executa o treino
   - Registra a atividade completada
   - Ganha pontos automaticamente

---

### 2. Sistema de Pontos e Gamificação

#### Como Funciona:
- Usuário **cadastra sua atividade física** ou **exercício realizado**
- Ganha **pontos** por cada atividade completada
- Pontos podem ser trocados por:
  - **Descontos em produtos esportivos** (parcerias com marcas)
  - **Descontos em comidas fitness** (parcerias com restaurantes/lojas)
  - **Saque em dinheiro** (3 vezes ao ano, em datas estabelecidas)

#### Benefícios:
- Motivação através de recompensas tangíveis
- Engajamento contínuo
- Parcerias comerciais estratégicas

---

### 3. Rede Social Integrada

#### Funcionalidades:
- **Publicação de atividades**: Usuários podem compartilhar seus treinos
- **Marcação de amigos**: Marcar amigos em posts gera pontos adicionais
- **Ranking**: Sistema de classificação semanal e mensal
- **Premiações**: Top colocados ganham pontos extras
- **Desafios**: Desafios comunitários integrados dentro da rede social para aumentar engajamento
- **Fotos de treinos**: Galeria de fotos estimulando a comunidade
- **Feed interativo**: Curtidas, comentários, compartilhamentos

#### Desafios na Rede Social:
- **Desafios Comunitários**: Criados e gerenciados dentro da própria rede social
- **Participação**: Usuários podem participar de desafios e compartilhar progresso
- **Ranking de Desafios**: Classificação específica para cada desafio
- **Recompensas**: Pontos extras para participantes e vencedores
- **Engajamento**: Desafios incentivam interação e competição saudável

#### Engajamento:
- Interação entre usuários
- Competição saudável
- Senso de comunidade
- Motivação através de comparação positiva
- Desafios como elemento central de engajamento

---

### 4. Eventos e Experiências

#### Conceito:
- **Eventos mensais** reunindo a comunidade
- Exemplo: Aulão funcional + corrida
- **Uso de pontos no evento**: Usuários podem usar pontos para participar ou adquirir produtos das lojas parceiras
- **Experiências novas**: Conexões pessoais, networking, vivências únicas

#### Benefícios:
- Fortalecimento da comunidade
- Experiências offline
- Oportunidades de usar pontos de forma especial
- Marketing e engajamento

---

## 📱 Estrutura de Telas/Fluxo do App

### 1. Página de Login
- Autenticação de usuário
- Opções de cadastro
- Recuperação de senha

### 2. Tela Principal - Menu
- **Treinos** (acesso direto)
- **Pontos/Saldos** (visualização de saldo de pontos)
- **Rede Social** (feed, desafios, ranking)
- **Loja/Resgate** (troca de pontos)

### 3. Tela de Treinos (Ao clicar em "Treinos")
**Fluxo Direto de Seleção:**

#### Passo 1: Escolha da Modalidade
- **Corrida**
  - Opção: **5km**
  - Opção: **10km**
  - *IA gera treino imediatamente após seleção*

- **Musculação**
  - Opção: **Emagrecimento**
    - *IA gera treino imediatamente após seleção*
  - Opção: **Hipertrofia**
    - *Prossegue para questionário detalhado*

#### Passo 2: Questionário para Hipertrofia (se selecionado)
Formulário com perguntas básicas:
- Altura (cm)
- Peso (kg)
- Idade (anos)
- Gênero
- Quantas vezes por semana planeja treinar
- *Outras informações relevantes conforme necessário*

#### Passo 3: Geração e Exibição do Treino
- IA processa todas as informações
- Gera treino personalizado baseado em estudos científicos
- Exibe treino completo ao usuário
- Opção de salvar/começar treino

### 4. Tela de Pontos/Saldos
- **Saldo atual de pontos**: Exibição em destaque
- **Pontos ganhos**: Após cada atividade realizada
- **Histórico de atividades**: Lista de atividades e pontos ganhos
- **Progresso do usuário**: Gráficos e estatísticas
- **Estatísticas pessoais**: Total de pontos, atividades, etc.

### 5. Loja de Pontos / Resgate
- **Descontos em produtos esportivos**:
  - Exibição de marcas parceiras (ilustrativas)
  - Catálogo de produtos disponíveis
  - Sistema de resgate
- **Descontos em comida fitness**:
  - Parceiros de alimentação saudável
  - Ofertas disponíveis
- **Saque em dinheiro**:
  - Informações sobre as 3 datas anuais para saque
  - Calendário de saques
  - Processo de solicitação

### 6. Rede Social
- **Feed de atividades**: Posts dos usuários sobre treinos
- **Desafios**: Seção dedicada a desafios comunitários
  - Lista de desafios ativos
  - Participação em desafios
  - Progresso nos desafios
  - Ranking de desafios
- **Ranking**: 
  - Semanal
  - Mensal
  - Premiações para top colocados
- **Galeria de fotos**: Fotos de treinos
- **Perfis de usuários**: Visualização de perfil e progresso
- **Interações**: Curtidas, comentários, marcações

---

## 💰 Modelo de Negócio

### 1. Freemium (Gratuito + Premium)

#### Plano Gratuito:
- **Características**:
  - Acesso básico ao app
  - Treinos limitados
  - Sistema de pontos
  - Acesso à rede social
  - **Monetização**: Publicidade (banners e emails)

#### Planos Premium:
- **Plano Básico**: ~U$5/mês
  - Treinos ilimitados
  - Sem publicidade
  - Recursos adicionais
  
- **Plano Avançado**: ~U$15/mês
  - Todos os recursos do Básico
  - Prioridade no suporte
  - Acesso a eventos exclusivos
  - Recursos premium da IA
  - Análises avançadas

### 2. Receita de Patrocínio

#### Conceito:
- Marcas fitness/esportivas patrocinam seções do app
- Exemplo: "Painel pessoal patrocinado pela Adidas"
- Patrocinadores podem:
  - Ter seções dedicadas
  - Enviar boletins informativos
  - Criar conteúdo educativo
  - Participar de eventos

#### Benefícios para Patrocinadores:
- Alcance direto ao público-alvo
- Branding em ambiente relevante
- Engajamento com usuários engajados
- Oportunidades de co-marketing

### 3. Venda de Publicidade

#### Para Usuários Gratuitos:
- **Banners publicitários**: Exibidos no app
- **Marketing direto por email**: Campanhas segmentadas
- **Segmentação**: Anúncios relevantes baseados no perfil do usuário

#### Benefícios:
- Monetização de usuários gratuitos
- Receita contínua
- Oportunidade para anunciantes alcançarem público fitness

---

## 🤝 Parcerias Estratégicas

### Tipos de Parceiros:

1. **Marcas Esportivas**
   - Produtos esportivos
   - Equipamentos de treino
   - Roupas e acessórios

2. **Alimentação Fitness**
   - Restaurantes saudáveis
   - Lojas de suplementos
   - Delivery de comida fitness

3. **Patrocinadores**
   - Marcas que patrocinam seções do app
   - Apoio em eventos
   - Co-marketing

---

## 🎯 Diferenciais Competitivos

1. **IA Baseada em Ciência**: Não usa conteúdo aleatório, apenas estudos renomados
2. **Gamificação Real**: Pontos convertíveis em descontos reais ou dinheiro
3. **Comunidade Engajada**: Rede social integrada com ranking e desafios
4. **Eventos Presenciais**: Conexão offline da comunidade
5. **Modelo Sustentável**: Múltiplas fontes de receita (freemium, patrocínios, publicidade)

---

## 📊 Métricas de Sucesso

### Engajamento:
- Taxa de retenção mensal
- Frequência de uso
- Atividades registradas por usuário
- Interações na rede social

### Monetização:
- Taxa de conversão para premium
- Receita por usuário (ARPU)
- Valor médio de resgate de pontos
- Receita de patrocínios e publicidade

### Comunidade:
- Crescimento de usuários
- Taxa de participação em eventos
- Engajamento em desafios
- Posts e interações na rede social

---

## 🔄 Fluxo de Experiência do Usuário

### Fluxo Principal - Geração de Treino:

1. **Cadastro/Login** → Usuário acessa o app

2. **Tela Principal** → Menu com opções: Treinos, Pontos, Rede Social, Loja

3. **Clica em "Treinos"** → Acesso direto à seleção

4. **Escolha da Modalidade**:
   - **Corrida**: Escolhe 5km ou 10km → IA gera treino imediatamente
   - **Musculação**: 
     - **Emagrecimento** → IA gera treino imediatamente
     - **Hipertrofia** → Prossegue para questionário

5. **Questionário (apenas Hipertrofia)**:
   - Preenche: Altura, Peso, Idade, Gênero, Frequência semanal
   - Submete informações

6. **Geração do Treino**:
   - IA processa informações + estudos científicos
   - Gera treino personalizado
   - Exibe treino completo

7. **Execução** → Usuário realiza o treino

8. **Registro e Pontos**:
   - Cadastra atividade completada
   - Ganha pontos automaticamente
   - Saldo atualizado

9. **Compartilhamento (Opcional)**:
   - Compartilha na rede social
   - Marca amigos (ganha pontos extras)

10. **Engajamento na Rede Social**:
    - Participa de desafios
    - Interage com outros usuários
    - Visualiza ranking

11. **Resgate de Pontos**:
    - Usa pontos para descontos
    - Ou acumula para saque em dinheiro (3x/ano)

---

## 🛠️ Tecnologias e Requisitos Técnicos

### Backend:
- **Sistema de IA para geração de treinos**:
  - Processamento de informações do usuário (altura, peso, idade, gênero, frequência)
  - Análise de objetivos (hipertrofia, emagrecimento, corrida 5km/10km)
  - Geração de treinos personalizados baseados em estudos científicos
  - Base de conhecimento com estudos e artigos renomados
- **Sistema de pontos e gamificação**:
  - Cálculo de pontos por atividade
  - Gerenciamento de saldos
  - Histórico de atividades
- **API para rede social**:
  - Feed de posts
  - Sistema de desafios integrado
  - Ranking e premiações
  - Interações (curtidas, comentários, marcações)
- **Integração com parceiros**:
  - APIs de produtos/descontos
  - Sistema de resgate

### Frontend:
- App mobile (iOS/Android)
- Interface intuitiva e moderna
- Sistema de notificações push

### Integrações:
- Pagamentos (para planos premium)
- Parceiros (APIs de produtos/descontos)
- Sistema de saque (integração bancária)
- Analytics e métricas

---

## 📅 Roadmap Sugerido

### Fase 1 - MVP (Mínimo Produto Viável)
- [ ] Sistema de login/cadastro
- [ ] **Sistema de IA de treinos**:
  - [ ] Tela de seleção (Corrida 5km/10km, Musculação Emagrecimento/Hipertrofia)
  - [ ] Questionário para Hipertrofia (altura, peso, idade, gênero, frequência)
  - [ ] Geração de treinos personalizados baseados em estudos científicos
- [ ] **Sistema de pontos e saldos**:
  - [ ] Cálculo de pontos por atividade
  - [ ] Visualização de saldo
  - [ ] Histórico de atividades
- [ ] Tela de resgate de pontos
- [ ] **Rede social básica**:
  - [ ] Feed de posts
  - [ ] Sistema de desafios integrado
  - [ ] Ranking básico

### Fase 2 - Expansão
- [ ] Sistema completo de IA com base científica
- [ ] Ranking e premiações
- [ ] Desafios comunitários
- [ ] Integração com parceiros
- [ ] Sistema de saque

### Fase 3 - Monetização
- [ ] Planos premium
- [ ] Sistema de publicidade
- [ ] Patrocínios
- [ ] Eventos presenciais

### Fase 4 - Escala
- [ ] Expansão de modalidades
- [ ] Melhorias na IA
- [ ] Novos tipos de parcerias
- [ ] Internacionalização

---

## 📝 Notas Importantes

### ⭐ Prioridade: Sistema de IA de Treinos
- **Funcionalidade Principal**: A geração de treinos personalizados pela IA é o coração do aplicativo
- **Base Científica**: É fundamental que a IA use apenas conteúdo validado e renomado fornecido pelo produtor
- **Fluxo Otimizado**: O acesso direto aos treinos e o questionário simplificado (apenas para Hipertrofia) garantem experiência fluida
- **Personalização Real**: Cada treino deve ser único, considerando todas as variáveis coletadas (altura, peso, idade, gênero, frequência, objetivo)

### Outras Considerações:
- **Sustentabilidade**: O modelo de pontos precisa ser equilibrado para ser sustentável
- **Comunidade**: O sucesso do app depende muito do engajamento da comunidade
- **Desafios Integrados**: Os desafios fazem parte da rede social, não são uma funcionalidade separada
- **Parcerias**: Parcerias estratégicas são essenciais para o modelo de negócio
- **Eventos**: Eventos presenciais fortalecem a marca e a comunidade

---

## 🎨 Considerações de Design

- Interface moderna e intuitiva
- Gamificação visual (badges, progresso, rankings)
- Feed social atrativo
- Sistema de pontos visível e motivador
- Design que inspire movimento e saúde

---

**Documento criado em:** 26 de Janeiro de 2026  
**Versão:** 1.0  
**Status:** Conceito Inicial

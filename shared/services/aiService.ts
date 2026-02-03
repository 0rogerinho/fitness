// Serviço de IA para geração de treinos baseados em estudos científicos

interface UserInfo {
  height?: number; // cm
  weight?: number; // kg
  age?: number;
  gender?: 'masculino' | 'feminino' | 'outro';
  frequency?: number; // vezes por semana
  injuryOrComorbidity?: string; // lesão ou comorbidade informada pelo usuário
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
  videoUrl?: string;
}

interface Workout {
  title: string;
  description: string;
  exercises: Exercise[];
  duration: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  tips: string[];
}

// Base de conhecimento científica (simulada - em produção viria de estudos reais)
const scientificKnowledge = {
  hipertrofia: {
    volume:
      'Para hipertrofia, recomenda-se 10-20 séries por grupo muscular por semana (Schoenfeld, 2016)',
    intensidade: 'Intensidade de 60-80% de 1RM é ideal para hipertrofia',
    frequencia: 'Treinar cada grupo muscular 2-3x por semana é mais eficaz',
    descanso: 'Descanso de 60-90 segundos entre séries para hipertrofia',
  },
  emagrecimento: {
    volume:
      'Treinos de alta intensidade com circuito são eficazes para emagrecimento',
    intensidade: 'Combinação de exercícios aeróbicos e de força',
    frequencia: '4-5x por semana para resultados otimizados',
    descanso:
      'Descanso reduzido (30-60s) para manter frequência cardíaca elevada',
  },
  corrida5km: {
    volume: 'Programa progressivo de 8-12 semanas para correr 5km',
    intensidade: 'Alternância entre corrida e caminhada inicialmente',
    frequencia: '3-4x por semana',
    descanso: 'Dias de descanso são essenciais para recuperação',
  },
  corrida10km: {
    volume: 'Programa progressivo de 12-16 semanas para correr 10km',
    intensidade: 'Treinos variados: longos, intervalados e de ritmo',
    frequencia: '4-5x por semana',
    descanso: 'Recuperação adequada entre treinos intensos',
  },
};

export async function generateWorkout(
  modality: 'corrida' | 'musculacao',
  objective: '5km' | '10km' | 'emagrecimento' | 'hipertrofia',
  userInfo?: UserInfo,
): Promise<Workout> {
  // Simulação de processamento de IA
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (modality === 'corrida') {
    return generateRunningWorkout(objective as '5km' | '10km', userInfo);
  } else {
    return generateMuscleWorkout(
      objective as 'emagrecimento' | 'hipertrofia',
      userInfo,
    );
  }
}

function generateRunningWorkout(
  distance: '5km' | '10km',
  userInfo?: UserInfo,
): Workout {
  const knowledge =
    distance === '5km'
      ? scientificKnowledge.corrida5km
      : scientificKnowledge.corrida10km;

  if (distance === '5km') {
    return {
      title: 'Treino para Corrida de 5km',
      description: `Programa baseado em estudos científicos para alcançar a distância de 5km. ${knowledge.volume}`,
      duration: '30-45 minutos',
      difficulty: 'Iniciante',
      exercises: [
        {
          name: 'Aquecimento',
          sets: 1,
          reps: '5-10 minutos de caminhada leve',
          rest: 'Sem descanso',
          notes: 'Preparação do corpo para o exercício',
        },
        {
          name: 'Corrida Intervalada',
          sets: 5,
          reps: '2 minutos correndo / 1 minuto caminhando',
          rest: '1 minuto caminhando',
          notes: 'Alternar entre corrida e caminhada',
        },
        {
          name: 'Corrida Contínua',
          sets: 1,
          reps: '10-15 minutos em ritmo confortável',
          rest: '2 minutos caminhando',
          notes: 'Manter ritmo constante e confortável',
        },
        {
          name: 'Desaquecimento',
          sets: 1,
          reps: '5 minutos de caminhada leve + alongamento',
          rest: 'Sem descanso',
          notes: 'Recuperação gradual',
        },
      ],
      tips: [
        'Mantenha a hidratação durante o treino',
        'Use tênis adequados para corrida',
        'Respeite os dias de descanso',
        'Aumente a distância gradualmente',
        'Ouça seu corpo e ajuste a intensidade',
        ...(userInfo?.injuryOrComorbidity &&
        userInfo.injuryOrComorbidity !== 'None'
          ? [
              'Respeite suas limitações. Consulte um profissional de saúde em caso de lesão ou comorbidade.',
            ]
          : []),
      ],
    };
  } else {
    return {
      title: 'Treino para Corrida de 10km',
      description: `Programa progressivo baseado em estudos para alcançar 10km. ${knowledge.volume}`,
      duration: '45-60 minutos',
      difficulty: 'Intermediário',
      exercises: [
        {
          name: 'Aquecimento',
          sets: 1,
          reps: '10 minutos de caminhada/corrida leve',
          rest: 'Sem descanso',
        },
        {
          name: 'Corrida Longa',
          sets: 1,
          reps: '20-30 minutos em ritmo confortável',
          rest: '3 minutos caminhando',
          notes: 'Desenvolver resistência aeróbica',
        },
        {
          name: 'Intervalos de Velocidade',
          sets: 4,
          reps: '3 minutos rápido / 2 minutos recuperação',
          rest: '2 minutos caminhando',
          notes: 'Melhorar velocidade e VO2 max',
        },
        {
          name: 'Corrida de Ritmo',
          sets: 1,
          reps: '15 minutos em ritmo de prova',
          rest: '3 minutos caminhando',
          notes: 'Simular ritmo de corrida',
        },
        {
          name: 'Desaquecimento',
          sets: 1,
          reps: '10 minutos caminhada + alongamento',
          rest: 'Sem descanso',
        },
      ],
      tips: [
        'Treine 4-5x por semana',
        'Varie os tipos de treino',
        'Inclua dias de descanso ativo',
        'Monitore frequência cardíaca',
        'Alimentação adequada é essencial',
        ...(userInfo?.injuryOrComorbidity &&
        userInfo.injuryOrComorbidity !== 'None'
          ? [
              'Respeite suas limitações. Consulte um profissional de saúde em caso de lesão ou comorbidade.',
            ]
          : []),
      ],
    };
  }
}

function generateMuscleWorkout(
  objective: 'emagrecimento' | 'hipertrofia',
  userInfo?: UserInfo,
): Workout {
  const knowledge =
    objective === 'hipertrofia'
      ? scientificKnowledge.hipertrofia
      : scientificKnowledge.emagrecimento;

  if (objective === 'emagrecimento') {
    return {
      title: 'Treino de Musculação para Emagrecimento',
      description: `Treino em circuito baseado em estudos científicos para emagrecimento. ${knowledge.volume}`,
      duration: '40-50 minutos',
      difficulty: 'Intermediário',
      exercises: [
        {
          name: 'Aquecimento',
          sets: 1,
          reps: '5 minutos de esteira/bike',
          rest: 'Sem descanso',
        },
        {
          name: 'Agachamento',
          sets: 3,
          reps: '15-20 repetições',
          rest: '30 segundos',
          notes: 'Foco em movimento completo',
        },
        {
          name: 'Supino Reto',
          sets: 3,
          reps: '12-15 repetições',
          rest: '30 segundos',
        },
        {
          name: 'Remada Curvada',
          sets: 3,
          reps: '12-15 repetições',
          rest: '30 segundos',
        },
        {
          name: 'Leg Press',
          sets: 3,
          reps: '15-20 repetições',
          rest: '30 segundos',
        },
        {
          name: 'Desenvolvimento com Halteres',
          sets: 3,
          reps: '12-15 repetições',
          rest: '30 segundos',
        },
        {
          name: 'Abdominais',
          sets: 3,
          reps: '20-25 repetições',
          rest: '30 segundos',
        },
        {
          name: 'Cardio Final',
          sets: 1,
          reps: '10-15 minutos de esteira/bike',
          rest: 'Sem descanso',
        },
      ],
      tips: [
        'Mantenha alta intensidade durante todo o treino',
        'Pouco descanso entre exercícios',
        'Foque em movimento completo e controlado',
        'Hidrate-se adequadamente',
        'Combine com alimentação balanceada',
        ...(userInfo?.injuryOrComorbidity &&
        userInfo.injuryOrComorbidity !== 'None'
          ? [
              'Respeite suas limitações. Consulte um profissional de saúde em caso de lesão ou comorbidade.',
            ]
          : []),
      ],
    };
  } else {
    // Hipertrofia - personalizado com base nas informações do usuário
    const frequency = userInfo?.frequency || 3;
    const isBeginner =
      !userInfo || (userInfo.age && userInfo.age < 25 && !userInfo.frequency);

    const exercises: Exercise[] = [
      {
        name: 'Agachamento Livre',
        sets: frequency >= 4 ? 4 : 3,
        reps: '8-12 repetições',
        rest: '90 segundos',
        notes: 'Exercício fundamental para pernas',
        videoUrl:
          'https://www.youtube.com/results?search_query=agachamento+livre+execução+correta',
      },
      {
        name: 'Supino Reto',
        sets: frequency >= 4 ? 4 : 3,
        reps: '8-12 repetições',
        rest: '90 segundos',
        notes: 'Desenvolve peitoral, tríceps e deltoides',
        videoUrl:
          'https://www.youtube.com/results?search_query=supino+reto+execução',
      },
      {
        name: 'Remada Curvada',
        sets: 3,
        reps: '8-12 repetições',
        rest: '90 segundos',
        notes: 'Fortalecimento das costas',
        videoUrl:
          'https://www.youtube.com/results?search_query=remada+curvada+execução',
      },
      {
        name: 'Desenvolvimento com Halteres',
        sets: 3,
        reps: '8-12 repetições',
        rest: '90 segundos',
        notes: 'Desenvolve ombros',
        videoUrl:
          'https://www.youtube.com/results?search_query=desenvolvimento+com+halteres+execução',
      },
      {
        name: 'Rosca Direta',
        sets: 3,
        reps: '10-12 repetições',
        rest: '60 segundos',
        notes: 'Isolamento de bíceps',
        videoUrl:
          'https://www.youtube.com/results?search_query=rosca+direta+execução',
      },
      {
        name: 'Tríceps Pulley',
        sets: 3,
        reps: '10-12 repetições',
        rest: '60 segundos',
        notes: 'Isolamento de tríceps',
        videoUrl:
          'https://www.youtube.com/results?search_query=tríceps+pulley+execução',
      },
      {
        name: 'Elevação de Panturrilhas',
        sets: 3,
        reps: '15-20 repetições',
        rest: '60 segundos',
        videoUrl:
          'https://www.youtube.com/results?search_query=elevação+panturrilhas+execução',
      },
    ];

    return {
      title: 'Treino de Hipertrofia Personalizado',
      description: `Treino baseado em estudos científicos (Schoenfeld, 2016) para hipertrofia. ${knowledge.volume} Personalizado para ${frequency}x por semana.`,
      duration: '60-75 minutos',
      difficulty: isBeginner ? 'Iniciante' : 'Intermediário',
      exercises,
      tips: [
        `Treine ${frequency}x por semana para resultados otimizados`,
        'Mantenha intensidade de 60-80% de 1RM',
        'Descanso adequado entre séries (60-90s)',
        'Progressão gradual de carga',
        'Alimentação rica em proteínas é essencial',
        'Durma pelo menos 7-8 horas por noite',
        ...(userInfo?.injuryOrComorbidity &&
        userInfo.injuryOrComorbidity !== 'None'
          ? [
              'Respeite suas limitações. Consulte um profissional de saúde em caso de lesão ou comorbidade.',
            ]
          : []),
      ],
    };
  }
}

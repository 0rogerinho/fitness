// Model - Tipos e interfaces para Questionário
export interface UserInfo {
  height: number; // cm
  weight: number; // kg
  age: number;
  gender: 'masculino' | 'feminino' | 'outro';
  frequency: number; // vezes por semana
  injuryOrComorbidity?: string; // lesão ou comorbidade (opcional)
}

export interface QuestionarioFormData {
  height: string;
  weight: string;
  age: string;
  gender: 'masculino' | 'feminino' | 'outro' | '';
  frequency: string;
  injuryOrComorbidity: string; // opcional
}

export class QuestionarioModel {
  static validateForm(data: QuestionarioFormData): string | null {
    if (
      !data.height ||
      !data.weight ||
      !data.age ||
      !data.gender ||
      !data.frequency
    ) {
      return 'Please fill in all fields';
    }

    const heightNum = parseFloat(data.height);
    const weightNum = parseFloat(data.weight);
    const ageNum = parseInt(data.age);
    const frequencyNum = parseInt(data.frequency);

    if (
      isNaN(heightNum) ||
      isNaN(weightNum) ||
      isNaN(ageNum) ||
      isNaN(frequencyNum)
    ) {
      return 'Please enter valid numeric values';
    }

    if (heightNum < 100 || heightNum > 250) {
      return 'Height must be between 100 and 250 cm';
    }

    if (weightNum < 30 || weightNum > 300) {
      return 'Weight must be between 30 and 300 kg';
    }

    if (ageNum < 12 || ageNum > 100) {
      return 'Idade deve estar entre 12 e 100 anos';
    }

    if (frequencyNum < 1 || frequencyNum > 7) {
      return 'Frequency must be between 1 and 7 times per week';
    }

    return null;
  }

  static parseFormData(data: QuestionarioFormData): UserInfo {
    return {
      height: parseFloat(data.height),
      weight: parseFloat(data.weight),
      age: parseInt(data.age),
      gender: data.gender as 'masculino' | 'feminino' | 'outro',
      frequency: parseInt(data.frequency),
      ...(data.injuryOrComorbidity?.trim()
        ? { injuryOrComorbidity: data.injuryOrComorbidity.trim() }
        : {}),
    };
  }
}

export interface SurveyAnswers {
  [key: string]: string;
}

export interface ShadeResult {
  undertone: 'C' | 'W' | 'N';
  coverage: 'PRO FILTR' | 'EAZE DROP' | "SOFT'LIT";
  shadeNumber: string;
  skinDepth: 'LIGHT-MEDIUM' | 'MEDIUM-DEEP';
  seasonalRecommendation?: boolean;
  formulaType?: 'moisturizing' | 'oil-control' | 'adaptive';
} 
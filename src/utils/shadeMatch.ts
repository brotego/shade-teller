export type Undertone = 'C' | 'W' | 'N';
export type Coverage = 'PRO FILTR' | 'EAZE DROP' | "SOFT'LIT";
export type SkinDepth = 'LIGHT-MEDIUM' | 'MEDIUM-DEEP';

export interface ShadeResult {
  undertone: Undertone;
  coverage: Coverage;
  shadeNumber: string;
  skinDepth: SkinDepth;
  seasonalRecommendation?: boolean;
  formulaType?: 'moisturizing' | 'oil-control' | 'adaptive';
}

export interface SurveyAnswers {
  [key: number]: string;
}

function determineUndertone(answers: SurveyAnswers): Undertone {
  let coolPoints = 0;
  let warmPoints = 0;
  let neutralPoints = 0;

  // Hair color
  if (answers['1'] === 'A') warmPoints += 2; // Black
  if (answers['1'] === 'B') warmPoints += 1; // Dark Brown
  if (answers['1'] === 'C') neutralPoints += 1; // Light Brown
  if (answers['1'] === 'D') coolPoints += 1; // Blonde
  if (answers['1'] === 'E') warmPoints += 2; // Red

  // Jewelry preference
  if (answers['7'] === 'A') warmPoints += 2; // Gold
  if (answers['7'] === 'B') coolPoints += 2; // Silver
  if (answers['7'] === 'C') neutralPoints += 2; // Both

  // Veins
  if (answers['8'] === 'A') warmPoints += 2; // Green
  if (answers['8'] === 'B') coolPoints += 2; // Blue
  if (answers['8'] === 'C') neutralPoints += 2; // Both

  // Foundation issues
  if (answers['9'] === 'A') warmPoints += 1; // Too Orange
  if (answers['9'] === 'B') coolPoints += 1; // Too Pink

  // Redness factor
  if (answers['4'] === 'A') coolPoints += 1; // Yes to redness

  const max = Math.max(coolPoints, warmPoints, neutralPoints);
  if (max === coolPoints) return 'C';
  if (max === warmPoints) return 'W';
  return 'N';
}

function determineCoverage(answers: SurveyAnswers): Coverage {
  // Based on coverage preference and makeup look
  if (answers['6'] === 'A' || answers['10'] === 'B') return 'PRO FILTR'; // Full coverage or Glam look
  if (answers['6'] === 'C' || answers['10'] === 'A') return "SOFT'LIT"; // Light coverage or Natural look
  return 'EAZE DROP'; // Medium coverage or default
}

function determineSkinDepth(answers: SurveyAnswers): SkinDepth {
  let depthScore = 0;

  // Hair color contribution
  if (answers['1'] === 'A') depthScore += 3; // Black
  if (answers['1'] === 'B') depthScore += 2; // Dark Brown
  if (answers['1'] === 'C') depthScore += 1; // Light Brown
  // Blonde and Red don't contribute to depth score

  // Summer darkening
  if (answers['5'] === 'A') depthScore += 3; // Significantly
  if (answers['5'] === 'B') depthScore += 2; // Somewhat
  if (answers['5'] === 'C') depthScore += 1; // Barely

  // Foundation issues
  if (answers['9'] === 'D') depthScore += 1; // Too Dark

  return depthScore >= 4 ? 'MEDIUM-DEEP' : 'LIGHT-MEDIUM';
}

function determineFormulaType(answers: SurveyAnswers): 'moisturizing' | 'oil-control' | 'adaptive' {
  if (answers['3'] === 'A' || answers['2'] === 'A') {
    return 'moisturizing'; // Dry skin or dry climate
  } else if (answers['3'] === 'C' || answers['2'] === 'C') {
    return 'oil-control'; // Oily skin or humid climate
  } else {
    return 'adaptive'; // Normal/combination skin or normal climate
  }
}

function determineSeasonalRecommendation(answers: SurveyAnswers): boolean {
  return answers['5'] === 'A'; // Yes to summer darkening
}

function getShadeNumber(undertone: Undertone, skinDepth: SkinDepth): string {
  // Define shade number mappings
  const shadeMap = {
    'C': {
      'LIGHT-MEDIUM': '200',
      'MEDIUM-DEEP': '420'
    },
    'W': {
      'LIGHT-MEDIUM': '210',
      'MEDIUM-DEEP': '430'
    },
    'N': {
      'LIGHT-MEDIUM': '220',
      'MEDIUM-DEEP': '440'
    }
  };

  return shadeMap[undertone][skinDepth];
}

export function determineShade(answers: SurveyAnswers): ShadeResult {
  const undertone = determineUndertone(answers);
  const coverage = determineCoverage(answers);
  const skinDepth = determineSkinDepth(answers);
  const formulaType = determineFormulaType(answers);
  const seasonalRecommendation = determineSeasonalRecommendation(answers);
  const shadeNumber = getShadeNumber(undertone, skinDepth);
  
  return {
    shadeNumber,
    undertone,
    coverage,
    skinDepth,
    formulaType,
    seasonalRecommendation
  };
} 
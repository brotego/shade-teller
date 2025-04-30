import Airtable from 'airtable';
import { ShadeRecommendation } from './shadeService';

// Initialize Airtable
const airtable = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
});

const base = airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');
const table = base('Shade Recommendations');

export type FeedbackValue = 'yes' | 'somewhat' | 'no';

// Map our values to Airtable's allowed options
const undertoneMap: Record<string, string> = {
  'C': 'Cool',
  'W': 'Warm',
  'N': 'Neutral'
};

const formulaTypeMap: Record<string, string> = {
  'PRO FILTR': 'Pro Filtr',
  'EAZE DROP': 'Eaze Drop',
  "SOFT'LIT": 'Soft Lit'
};

export interface AirtableRecord {
  survey_answers: Record<string, string>;
  recommended_shade: string;
  undertone: string;
  skin_depth: string;
  formula_type: string;
  feedback_value: FeedbackValue;
}

export async function saveToAirtable(
  surveyAnswers: Record<string, string>,
  recommendation: ShadeRecommendation,
  feedback: FeedbackValue
): Promise<void> {
  try {
    const fields = {
      'Natural Hair Color': surveyAnswers['1'] === 'A' ? 'Black' : 
                          surveyAnswers['1'] === 'B' ? 'Dark Brown' :
                          surveyAnswers['1'] === 'C' ? 'Light Brown' :
                          surveyAnswers['1'] === 'D' ? 'Blonde' : 'Red',
      'Climate': surveyAnswers['2'] === 'A' ? 'Dry' :
                surveyAnswers['2'] === 'B' ? 'Normal' : 'Humid',
      'Skin Type': surveyAnswers['3'] === 'A' ? 'Dry' :
                  surveyAnswers['3'] === 'B' ? 'Normal' :
                  surveyAnswers['3'] === 'C' ? 'Oily' : 'Combination',
      'Redness': surveyAnswers['4'] === 'A' ? 'Yes' : 'No',
      'Summer Darkening': surveyAnswers['5'] === 'A' ? 'Significantly' :
                         surveyAnswers['5'] === 'B' ? 'Somewhat' : 'Barely',
      'Desired Coverage': surveyAnswers['6'] === 'A' ? 'Full' :
                         surveyAnswers['6'] === 'B' ? 'Medium' : 'Light',
      'Jewelry Preference': surveyAnswers['7'] === 'A' ? 'Gold' :
                           surveyAnswers['7'] === 'B' ? 'Silver' : 'Both',
      'Vein Color': surveyAnswers['8'] === 'A' ? 'Green' :
                    surveyAnswers['8'] === 'B' ? 'Blue' : 'Both',
      'Foundation Issues': surveyAnswers['9'] === 'A' ? 'Too Orange' :
                          surveyAnswers['9'] === 'B' ? 'Too Pink' :
                          surveyAnswers['9'] === 'C' ? 'Too Light' :
                          surveyAnswers['9'] === 'D' ? 'Too Dark' : 'None',
      'Makeup Look': surveyAnswers['10'] === 'A' ? 'Natural' :
                    surveyAnswers['10'] === 'B' ? 'Glam' : 'Matte',
          'Recommended Shade': recommendation.recommended_shade,
      'Undertone': undertoneMap[recommendation.undertone] || 'Neutral',
          'Skin Depth': recommendation.skin_depth,
      'Formula Type': formulaTypeMap[recommendation.formula_type] || 'Pro Filtr',
      'Feedback': feedback,
      'Created At': new Date().toISOString()
    };

    console.log('Saving to Airtable:', {
      answers: surveyAnswers,
      fields: fields
    });

    await table.create([{ fields }]);
  } catch (error) {
    console.error('Error saving to Airtable:', error);
    throw error;
  }
} 
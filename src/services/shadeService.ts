import { supabase } from '@/lib/supabase';
import { SurveyAnswers, ShadeResult } from '@/types/survey';
import { questions } from '@/components/Survey';

export interface ShadeRecommendation {
  recommended_shade: string;
  undertone: string;
  skin_depth: string;
  formula_type: string;
}

export async function saveToSupabase(
  answers: SurveyAnswers,
  result: ShadeResult,
  feedbackHelpful: boolean | null = null
) {
  // If Supabase isn't available, return early
  if (!supabase) {
    console.warn('Supabase client not available');
    return { success: false, error: new Error('Supabase client not available') };
  }

  try {
    const recommendation: ShadeRecommendation = {
      recommended_shade: result.shadeNumber,
      undertone: result.undertone,
      skin_depth: result.skinDepth,
      formula_type: result.coverage
    };

    // Map the numeric answers to question-answer pairs
    const formattedAnswers = Object.entries(answers).reduce((acc, [key, value]) => {
      const questionIndex = parseInt(key) - 1;
      const question = questions[questionIndex];
      if (question) {
        acc[question.text] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    const data = {
      survey_answers: formattedAnswers,
      recommended_shade: recommendation.recommended_shade,
      undertone: recommendation.undertone,
      skin_depth: recommendation.skin_depth,
      formula_type: recommendation.formula_type,
      seasonal_recommendation: result.seasonalRecommendation,
      feedback_value: feedbackHelpful !== null ? (feedbackHelpful ? 'yes' : 'no') : null,
      feedback_submitted_at: feedbackHelpful !== null ? new Date().toISOString() : null
    };

    console.log('Attempting to save data:', JSON.stringify(data, null, 2));

    const { data: responseData, error } = await supabase
      .from('shade_recommendations')
      .insert([data])
      .select();

    if (error) {
      console.error('Error saving to Supabase:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return { success: false, error };
    }

    console.log('Successfully saved data:', responseData);
    return { success: true, data: responseData };
  } catch (error) {
    console.error('Unexpected error in saveToSupabase:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return { success: false, error };
  }
}
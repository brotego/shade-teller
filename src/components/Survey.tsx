'use client';
import React, { useState } from 'react';
import styles from './Survey.module.css';
import { determineShade } from '@/utils/shadeMatch';
import { saveToSupabase } from '@/services/shadeService';
import { saveToAirtable } from '@/services/airtableService';
import { SurveyAnswers, ShadeResult } from '@/types/survey';
import ProductRecommendation from './ProductRecommendation';

interface Option {
  label: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 0,
    text: "What is your natural hair color?",
    options: [
      { label: "A", text: "Black" },
      { label: "B", text: "Dark Brown" },
      { label: "C", text: "Light Brown" },
      { label: "D", text: "Blonde" },
      { label: "E", text: "Red" }
    ]
  },
  {
    id: 1,
    text: "What climate do you live in?",
    options: [
      { label: "A", text: "Dry" },
      { label: "B", text: "Normal" },
      { label: "C", text: "Humid" }
    ]
  },
  {
    id: 2,
    text: "What is your skin type?",
    options: [
      { label: "A", text: "Dry" },
      { label: "B", text: "Normal" },
      { label: "C", text: "Oily" },
      { label: "D", text: "Combination" }
    ]
  },
  {
    id: 3,
    text: "Do you have redness in your skin?",
    options: [
      { label: "A", text: "Yes" },
      { label: "B", text: "No" }
    ]
  },
  {
    id: 4,
    text: "How much does your skin darken in the summer?",
    options: [
      { label: "A", text: "Significantly" },
      { label: "B", text: "Somewhat" },
      { label: "C", text: "Barely" }
    ]
  },
  {
    id: 5,
    text: "What coverage level do you prefer?",
    options: [
      { label: "A", text: "Full" },
      { label: "B", text: "Medium" },
      { label: "C", text: "Light" }
    ]
  },
  {
    id: 6,
    text: "What jewelry looks best on you?",
    options: [
      { label: "A", text: "Gold" },
      { label: "B", text: "Silver" },
      { label: "C", text: "Both" }
    ]
  },
  {
    id: 7,
    text: "What color are your veins?",
    options: [
      { label: "A", text: "Green" },
      { label: "B", text: "Blue" },
      { label: "C", text: "Both" }
    ]
  },
  {
    id: 8,
    text: "What issues do you have with your current foundation?",
    options: [
      { label: "A", text: "Too Orange" },
      { label: "B", text: "Too Pink" },
      { label: "C", text: "Too Light" },
      { label: "D", text: "Too Dark" },
      { label: "E", text: "None" }
    ]
  },
  {
    id: 9,
    text: "What makeup look do you prefer?",
    options: [
      { label: "A", text: "Natural" },
      { label: "B", text: "Glam" },
      { label: "C", text: "Matte" }
    ]
  }
];

export const Survey: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SurveyAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shadeResult, setShadeResult] = useState<ShadeResult | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleAnswerSelect = (questionId: number, optionText: string) => {
    // Find the option with matching text to get its label
    const question = questions[questionId];
    const selectedOption = question.options.find(opt => opt.text === optionText);
    
    setSelectedAnswers((prev: SurveyAnswers) => ({
      ...prev,
      [questionId + 1]: selectedOption?.label || '' // Store the label (A, B, C, etc.)
    }));
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const result = determineShade(selectedAnswers);
      setShadeResult(result);
      setShowFeedback(true);
    }
  };

  const handleFeedback = async (helpful: boolean) => {
    if (shadeResult && !feedbackSubmitted) {
      // Save to both services with the feedback
      await Promise.all([
        saveToSupabase(selectedAnswers, shadeResult, helpful),
        saveToAirtable(selectedAnswers, {
          recommended_shade: shadeResult.shadeNumber,
          undertone: shadeResult.undertone,
          skin_depth: shadeResult.skinDepth,
          formula_type: shadeResult.coverage
        }, helpful ? 'yes' : 'no')
      ]);
      setFeedbackSubmitted(true);
      setShowResults(true);
    }
  };

  if (showResults && shadeResult) {
    return (
      <div className={styles.results}>
        <ProductRecommendation 
          shadeNumber={shadeResult.shadeNumber}
        />
        
        <div className={styles.shadeDetails}>
          <h3>Your Perfect Match Details</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Undertone:</span>
              <span className={styles.detailValue}>{
                shadeResult.undertone === 'W' ? 'Warm' :
                shadeResult.undertone === 'C' ? 'Cool' : 'Neutral'
              }</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Formula:</span>
              <span className={styles.detailValue}>{shadeResult.coverage}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Skin Depth:</span>
              <span className={styles.detailValue}>{shadeResult.skinDepth}</span>
            </div>
            {shadeResult.formulaType && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Formula Type:</span>
                <span className={styles.detailValue}>{
                  shadeResult.formulaType.charAt(0).toUpperCase() + 
                  shadeResult.formulaType.slice(1)
                }</span>
              </div>
            )}
          </div>
          
          {shadeResult.seasonalRecommendation && (
            <div className={styles.seasonalNote}>
              <p>💡 Consider getting a darker shade for summer use.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showFeedback && shadeResult) {
    return (
      <div className={styles.survey}>
        <h2>How satisfied are you with your current foundation shade?</h2>
        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => handleFeedback(true)}
          >
            <span className={styles.optionKey}>A</span>
            <span className={styles.optionText}>Very satisfied - I loved the questions.</span>
          </button>
          <button
            className={styles.option}
            onClick={() => handleFeedback(false)}
          >
            <span className={styles.optionKey}>B</span>
            <span className={styles.optionText}>Not satisfied - Fix the questions.</span>
          </button>
          </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className={styles.survey}>
      <h2>{currentQuestionData.text}</h2>
      <div className={styles.options}>
        {currentQuestionData.options.map((option) => (
          <button
            key={option.label}
            className={`${styles.option} ${selectedAnswers[currentQuestion + 1] === option.label ? styles.selected : ''}`}
            onClick={() => handleAnswerSelect(currentQuestion, option.text)}
          >
            <span className={styles.optionKey}>{option.label}</span>
            <span className={styles.optionText}>{option.text}</span>
          </button>
        ))}
      </div>
      <button
        className="bg-brand-purple text-brand-cream border-2 border-brand-purple rounded-lg font-bold px-6 py-3 mt-8 transition-colors hover:bg-brand-burgundy hover:border-brand-burgundy disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={!selectedAnswers[currentQuestion + 1]}
      >
        {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
      </button>
    </div>
  );
}; 
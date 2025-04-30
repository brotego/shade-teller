'use client';
import React, { useState } from 'react';
import styles from './TextStepper.module.css';
import { Survey } from './Survey';

const steps = [
  "Welcome to SHADE TELLER",
  "We’ll help you choose your shade color, pick the right brand, and work within your wants, needs, and budget.",
  "Lets Begin"
];

export default function TextStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSurvey, setShowSurvey] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStartSurvey = () => {
    setShowSurvey(true);
  };

  if (showSurvey) {
    return <Survey />;
  }

  return (
    <div className={styles.stepper}>
      <h1 className={styles.text}>{steps[currentStep]}</h1>
      {currentStep < steps.length - 1 ? (
        <div className={styles.buttonContainer}>
          <button onClick={handleNext} className={styles.button}>
            Next
          </button>
        </div>
      ) : (
        <button onClick={handleStartSurvey} className={styles.button2}>
          Start the Survey
        </button>
      )}
    </div>
  );
} 
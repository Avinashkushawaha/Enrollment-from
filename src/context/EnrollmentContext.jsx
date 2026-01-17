import React, { createContext, useState, useEffect } from 'react';

export const EnrollmentContext = createContext(null);

export const EnrollmentProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    step1: null,
    step2: null,
    step3: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  // Load saved data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('enrollmentDraft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) {
          setFormData(parsed.formData);
        }
        if (parsed.completedSteps) {
          setCompletedSteps(new Set(parsed.completedSteps));
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Auto-save to localStorage with debounce (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          'enrollmentDraft',
          JSON.stringify({
            formData,
            completedSteps: Array.from(completedSteps),
          })
        );
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData, completedSteps]);

  const updateStepData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [`step${step}`]: data,
    }));
    setCompletedSteps((prev) => new Set([...prev, step]));
  };

  const canAccessStep = (step) => {
    if (step === 1) return true;
    return completedSteps.has(step - 1);
  };

  const clearAllData = () => {
    setFormData({
      step1: null,
      step2: null,
      step3: null,
    });
    setCompletedSteps(new Set());
    setCurrentStep(1);
    localStorage.removeItem('enrollmentDraft');
  };

  const value = {
    formData,
    currentStep,
    setCurrentStep,
    updateStepData,
    completedSteps,
    canAccessStep,
    clearAllData,
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};
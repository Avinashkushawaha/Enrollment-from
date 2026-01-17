import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnrollment } from '../../hooks/useEnrollment';
import { ReviewSection } from '../form/ReviewSection';
import { Button } from '../ui/Button';
import { Alert, AlertDescription } from '../ui/Alert';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

export const Step4Review = () => {
  const navigate = useNavigate();
  const { formData, clearAllData } = useEnrollment();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form Submission:', formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleStartNew = () => {
    clearAllData();
    setSubmitted(false);
    navigate('/enroll/step-1');
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6">
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <AlertDescription className="text-green-800 font-medium text-base">
            Enrollment submitted successfully!
          </AlertDescription>
        </Alert>

        <div className="py-8 space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-700">Thank You!</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Your enrollment application has been received successfully. Our team
            will review your application and contact you shortly.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => setShowJson(!showJson)} variant="outline">
            {showJson ? 'Hide' : 'Show'} Submission Data
          </Button>

          {showJson && (
            <pre className="bg-gray-100 p-4 rounded-md text-left text-xs overflow-auto max-h-96 border">
              {JSON.stringify(formData, null, 2)}
            </pre>
          )}

          <div className="pt-4">
            <Button onClick={handleStartNew}>Start New Enrollment</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Review Your Information
        </h2>
        <p className="text-gray-600 mt-1">
          Please review all the details before submitting your enrollment
        </p>
      </div>

      {formData.step1 && (
        <ReviewSection
          title="Student Details"
          data={formData.step1}
          onEdit={() => navigate('/enroll/step-1')}
        />
      )}

      {formData.step2 && (
        <ReviewSection
          title="Academic Details"
          data={formData.step2}
          onEdit={() => navigate('/enroll/step-2')}
        />
      )}

      {formData.step3 && (
        <ReviewSection
          title="Address & Guardian Information"
          data={formData.step3}
          onEdit={() => navigate('/enroll/step-3')}
        />
      )}

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/enroll/step-3')}
          disabled={submitting}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Submitting...
            </>
          ) : (
            'Submit Enrollment'
          )}
        </Button>
      </div>
    </div>
  );
};
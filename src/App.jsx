import React from 'react';
import {Routes,Route,Navigate,} from 'react-router-dom';
import { EnrollmentProvider } from './context/EnrollmentContext';
import { ProgressBar } from './components/form/ProgressBar';
import { Step1StudentDetails } from './components/steps/Step1StudentDetails';
import { Step2AcademicDetails } from './components/steps/Step2AcademicDetails';
import { Step3AddressGuardian } from './components/steps/Step3AddressGuardian';
import { Step4Review } from './components/steps/Step4Review';
import { useEnrollment } from './hooks/useEnrollment';

// Layout wrapper for enrollment pages
const EnrollmentLayout = ({ children, step }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Enrollment
          </h1>
          <p className="text-gray-600 mt-2">
            Complete all steps to submit your enrollment
          </p>
        </div>

        <ProgressBar current={step} total={4} />

        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {children}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>All progress is automatically saved</p>
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  return (
    
      <EnrollmentProvider>
        <Routes>
          {/* Redirect root to step 1 */}
          <Route path="/" element={<Navigate to="/enroll/step-1" replace />} />

          {/* Enrollment routes */}
          <Route
            path="/enroll/step-1"
            element={
              <EnrollmentLayout step={1}>
                <Step1StudentDetails />
              </EnrollmentLayout>
            }
          />
          <Route
            path="/enroll/step-2"
            element={
              <EnrollmentLayout step={2}>
                <Step2AcademicDetails />
              </EnrollmentLayout>
            }
          />
          <Route
            path="/enroll/step-3"
            element={
              <EnrollmentLayout step={3}>
                <Step3AddressGuardian />
              </EnrollmentLayout>
            }
          />
          <Route
            path="/enroll/review"
            element={
              <EnrollmentLayout step={4}>
                <Step4Review />
              </EnrollmentLayout>
            }
          />

          {/* Catch all - redirect to step 1 */}
          <Route path="*" element={<Navigate to="/enroll/step-1" replace />} />
        </Routes>
      </EnrollmentProvider>
  
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { step2Schema } from '../../lib/schemas';
import { useEnrollment } from '../../hooks/useEnrollment';
import { SUBJECTS_BY_CLASS } from '../../lib/utils/constants';
import { FormField } from '../form/FormField';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Label } from '../ui/Label';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Alert, AlertDescription } from '../ui/Alert';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Step2AcademicDetails = () => {
  const navigate = useNavigate();
  const { formData, updateStepData, canAccessStep } = useEnrollment();

  const [selectedSubjects, setSelectedSubjects] = useState(
    formData.step2?.subjects || []
  );
  const [showScholarship, setShowScholarship] = useState(
    formData.step2?.scholarshipApplication || false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: formData.step2 || {
      subjects: [],
      examGoal: '',
      weeklyStudyHours: '',
      scholarshipApplication: false,
      lastExamPercentage: null,
      achievements: '',
    },
    mode: 'onBlur',
  });

  const selectedClass = formData.step1?.class;
  const availableSubjects = SUBJECTS_BY_CLASS[selectedClass] || [];

  useEffect(() => {
    setValue('subjects', selectedSubjects, { shouldValidate: true });
  }, [selectedSubjects, setValue]);

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const onSubmit = (data) => {
    const submitData = {
      ...data,
      subjects: selectedSubjects,
      lastExamPercentage: showScholarship ? data.lastExamPercentage : null,
      achievements: showScholarship ? data.achievements : '',
    };
    updateStepData(2, submitData);
    navigate('/enroll/step-3');
  };

  if (!canAccessStep(2)) {
    return (
      <Alert>
        <AlertDescription>
          Please complete Step 1 first before proceeding to Academic Details.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            label="Select Subjects"
            error={errors.subjects?.message}
            required
          >
            <div className="flex flex-wrap gap-2">
              {availableSubjects.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    selectedSubjects.includes(subject)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            {selectedSubjects.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {selectedSubjects.join(', ')}
              </p>
            )}
          </FormField>

          <FormField
            label="Exam Goal"
            error={errors.examGoal?.message}
            required
            htmlFor="examGoal"
          >
            <select
              id="examGoal"
              {...register('examGoal')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select your goal</option>
              <option value="Board Excellence">Board Excellence</option>
              <option value="Concept Mastery">Concept Mastery</option>
              <option value="Competitive Prep">
                Competitive Exam Preparation
              </option>
            </select>
          </FormField>

          <FormField
            label="Weekly Study Hours"
            error={errors.weeklyStudyHours?.message}
            required
            htmlFor="weeklyStudyHours"
          >
            <Input
              id="weeklyStudyHours"
              type="number"
              {...register('weeklyStudyHours', { valueAsNumber: true })}
              placeholder="Enter hours (1-40)"
              min="1"
              max="40"
            />
          </FormField>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="scholarshipApplication"
              checked={showScholarship}
              onCheckedChange={(checked) => {
                setShowScholarship(checked);
                setValue('scholarshipApplication', checked);
              }}
            />
            <Label
              htmlFor="scholarshipApplication"
              className="text-sm font-medium cursor-pointer"
            >
              Apply for Scholarship
            </Label>
          </div>

          {showScholarship && (
            <div className="space-y-4 pl-6 border-l-2 border-blue-200 ml-2">
              <FormField
                label="Last Exam Percentage"
                error={errors.lastExamPercentage?.message}
                required
                htmlFor="lastExamPercentage"
              >
                <Input
                  id="lastExamPercentage"
                  type="number"
                  {...register('lastExamPercentage', {
                    valueAsNumber: true,
                  })}
                  placeholder="Enter percentage (0-100)"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </FormField>

              <FormField
                label="Achievements (Optional)"
                error={errors.achievements?.message}
                htmlFor="achievements"
              >
                <textarea
                  id="achievements"
                  {...register('achievements')}
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="List your academic achievements, awards, competitions, etc."
                />
              </FormField>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/enroll/step-1')}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
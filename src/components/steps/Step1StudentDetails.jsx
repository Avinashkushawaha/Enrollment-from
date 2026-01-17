import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { step1Schema } from '../../lib/schemas';
import { useEnrollment } from '../../hooks/useEnrollment';
import { FormField } from '../form/FormField';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ChevronRight } from 'lucide-react';

export const Step1StudentDetails = () => {
  const navigate = useNavigate();
  const { formData, updateStepData } = useEnrollment();
//  const { register, handleSubmit } = useForm(
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: formData.step1 || {
      fullName: '',
      email: '',
      mobile: '',
      class: '',
      board: '',
      preferredLanguage: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    updateStepData(1, data);
    navigate('/enroll/step-2');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            label="Full Name"
            error={errors.fullName?.message}
            required
            htmlFor="fullName"
          >
            <Input
              id="fullName"
              {...register('fullName')}
              placeholder="Enter your full name"
            />
          </FormField>

          <FormField
            label="Email Address"
            error={errors.email?.message}
            required
            htmlFor="email"
          >
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@example.com"
            />
          </FormField>

          <FormField
            label="Mobile Number"
            error={errors.mobile?.message}
            required
            htmlFor="mobile"
          >
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md text-sm text-gray-600">
                +91
              </span>
              <Input
                id="mobile"
                {...register('mobile')}
                placeholder="9876543210"
                className="rounded-l-none"
                maxLength={10}
              />
            </div>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Class"
              error={errors.class?.message}
              required
              htmlFor="class"
            >
              <select
                id="class"
                {...register('class')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select class</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </FormField>

            <FormField
              label="Board"
              error={errors.board?.message}
              required
              htmlFor="board"
            >
              <select
                id="board"
                {...register('board')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
              </select>
            </FormField>
          </div>

          <FormField
            label="Preferred Language"
            error={errors.preferredLanguage?.message}
            required
            htmlFor="preferredLanguage"
          >
            <select
              id="preferredLanguage"
              {...register('preferredLanguage')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish (Hindi + English)</option>
            </select>
          </FormField>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
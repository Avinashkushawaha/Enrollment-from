import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { step3Schema } from '../../lib/schemas';
import { useEnrollment } from '../../hooks/useEnrollment';
import { PIN_TO_LOCATION, STATES } from '../../lib/utils/constants';
import { FormField } from '../form/FormField';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Alert, AlertDescription } from '../ui/Alert';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Step3AddressGuardian = () => {
  const navigate = useNavigate();
  const { formData, updateStepData, canAccessStep } = useEnrollment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: formData.step3 || {
      pinCode: '',
      state: '',
      city: '',
      addressLine: '',
      guardianName: '',
      guardianMobile: '',
      paymentPlan: '',
      paymentMode: '',
    },
    mode: 'onBlur',
  });

  const pinCode = watch('pinCode');

  // PIN code auto-fill
  useEffect(() => {
    if (pinCode && /^\d{6}$/.test(pinCode)) {
      const location = PIN_TO_LOCATION[pinCode];
      if (location) {
        setValue('state', location.state);
        setValue('city', location.city);
      }
    }
  }, [pinCode, setValue]);

  const onSubmit = (data) => {
    updateStepData(3, data);
    navigate('/enroll/review');
  };

  if (!canAccessStep(3)) {
    return (
      <Alert>
        <AlertDescription>
          Please complete previous steps before proceeding to Address & Guardian
          Details.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              label="PIN Code"
              error={errors.pinCode?.message}
              required
              htmlFor="pinCode"
            >
              <Input
                id="pinCode"
                {...register('pinCode')}
                placeholder="110001"
                maxLength={6}
              />
            </FormField>

            <FormField
              label="State"
              error={errors.state?.message}
              required
              htmlFor="state"
            >
              <Input
                id="state"
                {...register('state')}
                placeholder="State"
                list="states-list"
              />
              <datalist id="states-list">
                {STATES.map((state) => (
                  <option key={state} value={state} />
                ))}
              </datalist>
            </FormField>

            <FormField
              label="City"
              error={errors.city?.message}
              required
              htmlFor="city"
            >
              <Input id="city" {...register('city')} placeholder="City" />
            </FormField>
          </div>

          <FormField
            label="Address Line"
            error={errors.addressLine?.message}
            required
            htmlFor="addressLine"
          >
            <Input
              id="addressLine"
              {...register('addressLine')}
              placeholder="House no., Street, Area, Landmark"
            />
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Guardian Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            label="Guardian Name"
            error={errors.guardianName?.message}
            required
            htmlFor="guardianName"
          >
            <Input
              id="guardianName"
              {...register('guardianName')}
              placeholder="Enter guardian's full name"
            />
          </FormField>

          <FormField
            label="Guardian Mobile Number"
            error={errors.guardianMobile?.message}
            required
            htmlFor="guardianMobile"
          >
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-md text-sm text-gray-600">
                +91
              </span>
              <Input
                id="guardianMobile"
                {...register('guardianMobile')}
                placeholder="9876543210"
                className="rounded-l-none"
                maxLength={10}
              />
            </div>
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Payment Plan"
              error={errors.paymentPlan?.message}
              required
              htmlFor="paymentPlan"
            >
              <select
                id="paymentPlan"
                {...register('paymentPlan')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select payment plan</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Annual">Annual</option>
              </select>
            </FormField>

            <FormField
              label="Payment Mode"
              error={errors.paymentMode?.message}
              required
              htmlFor="paymentMode"
            >
              <select
                id="paymentMode"
                {...register('paymentMode')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select payment mode</option>
                <option value="UPI">UPI</option>
                <option value="Card">Debit/Credit Card</option>
                <option value="NetBanking">Net Banking</option>
              </select>
            </FormField>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/enroll/step-2')}
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
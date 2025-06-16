'use client';

import { Steps } from './steps';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import Input from './input';
import { Sex } from '@/lib/valibot';
import Message from './message';
import { WywiadSchema, Photo } from '@/lib/valibot';
import { Label } from './label';
import { Button } from './button';
import { cn } from '@/lib/utils';
import Select from './select';
import { FileInput } from './file';

const defaultValues = {
  name: '',
  sex: Sex.Empty,
  photos: [] as Photo[],
};

type FormFields = keyof typeof defaultValues;

const questionFieldMap: Record<string, Record<string, FormFields>> = {
  '1': {
    '1': 'name',
    '2': 'sex',
    '3': 'photos',
  },
};

export function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleFileChange =
    (
      field: {
        state: { value: Photo[] };
        handleChange: (value: Photo[]) => void;
      },
      type: 'front' | 'side' | 'back'
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const currentPhotos = field.state.value || [];
      const newPhotos = currentPhotos.filter((p: Photo) => p.type !== type);
      if (file) {
        newPhotos.push({ type, file });
      }
      field.handleChange(newPhotos);
    };

  const form = useForm({
    defaultValues,
    onSubmit: async ({}) => {},
  });

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
      return;
    }

    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      const questions = questionFieldMap[prevStep.toString()] || {};
      const lastQuestion = Object.keys(questions).length || 1;
      setCurrentQuestion(lastQuestion);
    }
  };

  const handleNextQuestion = async () => {
    const fieldKey =
      questionFieldMap[currentStep.toString()]?.[currentQuestion.toString()];

    if (fieldKey) {
      const errors = await form.validateField(fieldKey, 'submit');
      if (!errors.length) {
        setCurrentQuestion((prev) => prev + 1);
      }
    }
  };

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-8 py-32'>
      <div className='grid grid-cols-[auto_1fr] gap-10'>
        <Steps
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          setCurrentQuestion={setCurrentQuestion}
        />
        <form>
          <div
            className={cn(
              'hidden',
              currentStep === 1 && currentQuestion === 1 && 'block'
            )}
          >
            <h2 className='text-3xl text-neutral-950 font-bold mb-4'>
              Jak się nazywasz?
            </h2>
            <form.Field
              name='name'
              validators={{
                onSubmit: WywiadSchema.entries.name,
              }}
            >
              {(field) => (
                <>
                  <Label
                    htmlFor='name'
                    hasError={field.state.meta.errors.length > 0}
                  >
                    Imię i nazwisko
                  </Label>
                  <Input
                    type='text'
                    id='name'
                    placeholder='Imię i nazwisko'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    hasError={field.state.meta.errors.length > 0}
                  />
                  <Message
                    message={field.state.meta.errors[0]?.message}
                    type='error'
                  />
                </>
              )}
            </form.Field>
          </div>
          <div
            className={cn(
              'hidden',
              currentStep === 1 && currentQuestion === 2 && 'block'
            )}
          >
            <h2 className='text-3xl text-neutral-950 font-bold mb-4'>
              Twoja płeć
            </h2>
            <form.Field
              name='sex'
              validators={{
                onSubmit: WywiadSchema.entries.sex,
              }}
            >
              {(field) => (
                <>
                  <Label
                    htmlFor='sex'
                    hasError={field.state.meta.errors.length > 0}
                  >
                    Płeć
                  </Label>
                  <Select
                    id='sex'
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value as Sex)}
                    hasError={field.state.meta.errors.length > 0}
                  >
                    <option value={Sex.Empty}>Wybierz płeć</option>
                    <option value={Sex.Male}>Mężczyzna</option>
                    <option value={Sex.Female}>Kobieta</option>
                    <option value={Sex.Other}>Inne</option>
                  </Select>
                  <Message
                    message={field.state.meta.errors[0]?.message}
                    type='error'
                  />
                </>
              )}
            </form.Field>
          </div>
          <div
            className={cn(
              'hidden',
              currentStep === 1 && currentQuestion === 3 && 'block'
            )}
          >
            <h2 className='text-3xl text-neutral-950 font-bold mb-4'>
              Zdjęcia
            </h2>
            <form.Field
              name='photos'
              validators={{
                onSubmit: WywiadSchema.entries.photos,
              }}
            >
              {(field) => (
                <>
                  <div className='grid grid-cols-3 gap-4'>
                    {(['front', 'side', 'back'] as const).map((type) => (
                      <div key={type} className='flex flex-col'>
                        <Label
                          htmlFor={`${type}_photo`}
                          hasError={field.state.meta.errors.length > 0}
                        >
                          Zdjęcie{' '}
                          {type === 'front'
                            ? 'z przodu'
                            : type === 'side'
                            ? 'z boku'
                            : 'z tyłu'}
                        </Label>
                        <FileInput
                          accept='image/jpeg, image/png, image/webp'
                          id={`${type}_photo`}
                          name={`${type}_photo`}
                          hasError={field.state.meta.errors.length > 0}
                          onChange={handleFileChange(field, type)}
                        />
                        {field.state.value?.find(
                          (p: Photo) => p.type === type
                        ) && (
                          <Message message='Zdjęcie dodane' type='success' />
                        )}
                      </div>
                    ))}
                  </div>
                  {field.state.meta.errors && (
                    <Message
                      message={field.state.meta.errors[0]?.message}
                      type='error'
                    />
                  )}
                </>
              )}
            </form.Field>
          </div>
          <div className='flex justify-between items-center mt-10'>
            {(currentQuestion > 1 || currentStep > 1) && (
              <Button type='button' onClick={handlePreviousQuestion}>
                Wstecz
              </Button>
            )}
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type='button'
                  disabled={!canSubmit || isSubmitting}
                  onClick={handleNextQuestion}
                  className='ml-auto'
                >
                  Następne pytanie
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </section>
  );
}

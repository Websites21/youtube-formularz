'use client';

import { Steps } from './steps';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import Input from './input';
import { Sex } from '@/lib/valibot';
import Message from './message';
import { WywiadSchema } from '@/lib/valibot';
import { Label } from './label';
import { Button } from './button';
import { cn } from '@/lib/utils';
import Select from './select';

const defaultValues = {
  name: '',
  sex: Sex.Empty,
  number: '',
  goal: '',
};

type FormFields = keyof typeof defaultValues;

const questionFieldMap: Record<string, Record<string, FormFields>> = {
  '1': {
    '1': 'name',
    '5': 'sex',
    '6': 'number',
    '7': 'goal',
  },
};

export function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const form = useForm({
    defaultValues,
    onSubmit: async ({}) => {},
  });

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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type='button'
                className='mt-10 cursor-pointer ml-auto text-white py-3 px-6 font-bold flex rounded-full bg-neutral-950 gap-2 items-center justify-center'
                disabled={!canSubmit || isSubmitting}
                onClick={async () => {
                  const fieldKey =
                    questionFieldMap[currentStep.toString()][
                      currentQuestion.toString()
                    ];

                  const errors = await form.validateField(fieldKey, 'submit');
                  console.log(errors);
                  if (!errors.length) setCurrentQuestion((prev) => prev + 1);
                }}
              >
                Następne pytanie
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </section>
  );
}

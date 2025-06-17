'use client';

import { Steps } from './steps';
import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import Input from './input';
import { Commitment } from '@/lib/valibot';
import Message from './message';
import { WywiadSchema, Photo } from '@/lib/valibot';
import { Label } from './label';
import { Button } from './button';
import { cn } from '@/lib/utils';
import Select from './select';
import { FileInput } from './file';
import Textarea from './textarea';
import { ProgressIndicator } from './progress-indicator';
import Link from 'next/link';
import { compressImage } from '@/lib/utils';
import { wywiadAction } from '@/lib/actions';
import { formularz } from './sonner';
import { Loading } from './icons';

const defaultValues = {
  name: '',
  about: '',
  commitment: Commitment.Empty,
  photos: [] as Photo[],
};

type FormFields = keyof typeof defaultValues;

const questionFieldMap: Record<string, Record<string, FormFields>> = {
  '1': {
    '1': 'name',
    '2': 'about',
    '3': 'commitment',
  },
  '2': {
    '1': 'photos',
  },
};

export function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

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
      const currentPhotos = field.state.value ;
      const newPhotos = currentPhotos.filter((p: Photo) => p.type !== type);
      if (file) {
        newPhotos.push({ type, file });
      }
      field.handleChange(newPhotos);
    };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        if (value.photos.length > 0) {
          const compressedPhotos = await Promise.all(
            value.photos.map(async (photo) => ({
              type: photo.type,
              file: await compressImage(photo.file),
            }))
          );
          value.photos = compressedPhotos;
        }

        const result = await wywiadAction(value);

        if (!result.success) {
          formularz({
            title: '❌ Błąd w wysyłaniu formularza!',
            description: result.message,
          });
        } else {
          formularz({
            title: '✅ Formularz został wysłany!',
            description: 'Dziękujemy za wysłanie formularza.',
          });
        }
      } catch (error) {
        formularz({
          title: '❌ Błąd w wysyłaniu formularza!',
          description: 'Wystąpił nieznany błąd.',
        });
      }
    },
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

  const getCurrentStepQuestions = () =>
    questionFieldMap[currentStep.toString()];
  const isLastQuestionInStep =
    currentQuestion === Object.keys(getCurrentStepQuestions()).length;
  const isLastStep = currentStep === Object.keys(questionFieldMap).length;

  const handleNextQuestion = async () => {
    const currentStepQuestions = getCurrentStepQuestions();
    const fieldToValidate = currentStepQuestions[currentQuestion.toString()];

    if (fieldToValidate) {
      const errors = await form.validateField(fieldToValidate, 'submit');
      if (!errors.length) {
        if (isLastQuestionInStep && isLastStep) {
          if (!privacyAccepted) {
            formularz({
              title: '❌ Błąd w wysyłaniu formularza!',
              description: 'Musisz zaakceptować politykę prywatności.',
            });
          } else {
            await form.handleSubmit();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } else if (isLastQuestionInStep) {
          setCurrentStep((prev) => prev + 1);
          setCurrentQuestion(1);
        } else {
          setCurrentQuestion((prev) => prev + 1);
        }
      }
    }
  };

  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-8 py-32'>
      <div className='grid md:grid-cols-[auto_1fr] gap-10'>
        <div className='relative self-start'>
          <Steps
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            setCurrentQuestion={setCurrentQuestion}
          />
          <ProgressIndicator currentStep={currentStep} totalSteps={2} />
        </div>
        <form>
          <div
            className={cn(
              'hidden',
              currentStep === 1 && currentQuestion === 1 && 'block'
            )}
          >
            <h2 className='text-center md:text-left text-3xl text-white font-bold mb-4'>
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
            <h2 className='text-center md:text-left text-3xl text-white font-bold mb-4'>
              Chciałbym Cię lepiej poznać
            </h2>
            <form.Field
              name='about'
              validators={{
                onSubmit: WywiadSchema.entries.about,
              }}
            >
              {(field) => (
                <>
                  <Label
                    htmlFor='about'
                    hasError={field.state.meta.errors.length > 0}
                  >
                    Kilka słów o sobie
                  </Label>
                  <Textarea
                    id='about'
                    placeholder='Twoja odpowiedź'
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
              currentStep === 1 && currentQuestion === 3 && 'block'
            )}
          >
            <h2 className='text-center md:text-left text-3xl text-white font-bold mb-4'>
              Wybierz poziom zaangażowania
            </h2>
            <form.Field
              name='commitment'
              validators={{
                onSubmit: WywiadSchema.entries.commitment,
              }}
            >
              {(field) => (
                <>
                  <Label
                    htmlFor='commitment'
                    hasError={field.state.meta.errors.length > 0}
                  >
                    Twoje zaangażowanie
                  </Label>
                  <Select
                    id='commitment'
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value as Commitment)
                    }
                    hasError={field.state.meta.errors.length > 0}
                  >
                    <option value={Commitment.Empty}>
                      Poziom zaangażowania
                    </option>
                    <option value={Commitment.Low}>Niski</option>
                    <option value={Commitment.Medium}>Średni</option>
                    <option value={Commitment.High}>Wysoki</option>
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
              currentStep === 2 && currentQuestion === 1 && 'block'
            )}
          >
            <h2 className='text-center md:text-left text-3xl text-white font-bold mb-4'>
              Zdjęcia sylwetki
            </h2>
            <form.Field
              name='photos'
              validators={{
                onSubmit: WywiadSchema.entries.photos,
              }}
            >
              {(field) => (
                <>
                  <div className='grid md:grid-cols-3 gap-4'>
                    {(['front', 'side', 'back'] as const).map((type) => (
                      <div key={type} className='flex flex-col'>
                        <Label
                          htmlFor={`${type}_photo`}
                          hasError={field.state.meta.errors.length > 0}
                        >
                          Zdjęcie{' '}
                          {
                            {
                              front: 'z przodu',
                              side: 'z boku',
                              back: 'z tyłu',
                            }[type]
                          }
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
            <div className='flex items-start gap-2 mt-8 max-w-2xl'>
              <input
                className='mt-1'
                type='checkbox'
                id='privacy'
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
              />
              <Label htmlFor='privacy'>
                Akceptuję{' '}
                <Link
                  href='/'
                  target='_blank'
                  className='text-green-200 underline'
                >
                  politykę prywatności
                </Link>
                . Twoje zdjęcia i dokumenty z ankiety nie będą udostępniane bez
                Twojej zgody. Służą jedynie do opracowania strategii dopasowanej
                do naszej współpracy.
              </Label>
            </div>
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
                  {isSubmitting ? (
                    <Loading className='size-5 stroke-2 stroke-black animate-spin' />
                  ) : isLastQuestionInStep && isLastStep ? (
                    'Wyślij formularz'
                  ) : (
                    'Następne pytanie'
                  )}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </section>
  );
}

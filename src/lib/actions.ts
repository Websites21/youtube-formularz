'use server';

import { sendFormEmail } from './resend';
import { WywiadSchema } from './valibot';
import * as v from 'valibot';

export async function wywiadAction(data: unknown) {
  const result = v.safeParse(WywiadSchema, data);

  if (!result.success) {
    return {
      success: false,
      message: 'Coś poszło nie tak.',
    };
  }

  try {
    await sendFormEmail(result.output);

    return {
      success: true,
      message: 'Formularz został wysłany.',
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: 'Wystąpił nieznany błąd.',
    };
  }
}

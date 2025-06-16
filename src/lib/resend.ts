import 'server-only';
import { Resend } from 'resend';
import { type WywiadSchema } from './valibot';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendFormEmail(data: WywiadSchema) {
  const attachments = [];

  for (const photo of data.photos) {
    const originalFilename = photo.file.name;
    const fileExtension = originalFilename.split('.').pop() || 'jpg';
    const contentType = photo.file.type;
    const buffer = await photo.file.arrayBuffer();
    attachments.push({
      filename: `${photo.type}.${fileExtension}`,
      content: Buffer.from(buffer).toString('base64'),
      contentType,
    });
  }

  await resend.emails.send({
    from: 'Formularz <hello@websites21.com>',
    to: 'hello@websites21.com',
    subject: 'Wywiad wstępny',
    html: `<p>Imię i nazwisko: ${data.name}</p>
    <p>Opis: ${data.about}</p>
    <p>Zaangażowanie: ${data.commitment}</p>`,
    attachments,
  });
}

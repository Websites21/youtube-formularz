import * as v from 'valibot';

export enum Sex {
  Empty = '',
  Male = 'mężczyzna',
  Female = 'kobieta',
  Other = 'inne',
}

export const WywiadSchema = v.object({
  name: v.pipe(
    v.string('Imię i nazwisko musi być stringiem.'),
    v.nonEmpty('Proszę wprowadzić imię i nazwisko.'),
    v.maxLength(50, 'Imię i nazwisko może zawierać co najwyżej 50 znaków.')
  ),
  sex: v.pipe(
    v.enum(Sex, 'Proszę wybrać płeć.'),
    v.custom((value) => value !== Sex.Empty, 'Proszę wybrać płeć.')
  ),
  number: v.pipe(
    v.string('Numer musi być stringiem.'),
    v.nonEmpty('Proszę wprowadzić numer.'),
    v.maxLength(50, 'Numer może zawierać co najwyżej 50 znaków.')
  ),
  goal: v.pipe(
    v.string('Cel musi być stringiem.'),
    v.nonEmpty('Proszę wprowadzić cel.'),
    v.maxLength(500, 'Cel może zawierać co najwyżej 500 znaków.')
  ),
});

import * as v from 'valibot';

export enum Sex {
  Empty = '',
  Male = 'mężczyzna',
  Female = 'kobieta',
  Other = 'inne',
}

export type PhotoTypeEnum = 'front' | 'side' | 'back';
export const PhotoType = v.union([
  v.literal('front'),
  v.literal('side'),
  v.literal('back'),
]);

export const ImageSchema = v.pipe(
  v.file('Proszę wybrać plik ze zdjęciem.'),
  v.mimeType(
    ['image/jpeg', 'image/png', 'image/webp'],
    'Obraz musi być w formacie JPEG, PNG lub WEBP.'
  ),
  v.maxSize(1024 * 1000 * 5, 'Obraz może zawierać maksymalnie 5 MB.')
);

export type Photo = {
  type: PhotoTypeEnum;
  file: File;
};

export const PhotoSchema = v.object({
  type: PhotoType,
  file: ImageSchema,
});

export const PhotosSchema = v.array(PhotoSchema);

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
  photos: v.pipe(
    PhotosSchema,
    v.length(3, 'Wymagane są 3 zdjęcia.'),
    v.custom((photos) => {
      const photoArray = photos as Photo[];
      const types = photoArray.map((p) => p.type);
      return (
        types.includes('front') &&
        types.includes('side') &&
        types.includes('back')
      );
    }, 'Wymagane są zdjęcia z przodu, boku i tyłu.')
  ),
});

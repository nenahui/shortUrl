import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { selectShortenedUrl } from '@/featrues/home/homeSlice';
import { shortUrl } from '@/featrues/home/homeThunks';
import type { IShortMutation } from '@/types';
import React, { useState } from 'react';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const shortenedUrl = useAppSelector(selectShortenedUrl);
  const [url, setUrl] = useState<IShortMutation>({ originalUrl: '' });
  const placeholders = [
    'Shorten your link in seconds.',
    'https://youtube.com',
    'https://google.com',
    'Enter your link here.',
    'https://github.com.',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl({ originalUrl: e.target.value });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url.originalUrl.length > 0) {
      dispatch(shortUrl(url));
    }
  };

  return (
    <div className={'grid place-items-center gap-6'}>
      <h2 className='text-4xl max-sm:text-2xl text-center dark:text-white text-black'>Shorten your link in seconds.</h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />

      <TextGenerateEffect words={'Your link look like this:'} />

      {shortenedUrl !== null ? (
        <TypewriterEffect
          onCompleteBorder
          words={`http://localhost:8000/short/${shortenedUrl}`}
          cursorClassName={'bg-transparent'}
        />
      ) : (
        <div>
          <p className={'text-muted-foreground text-black'}>Enter the link and get a shortened link</p>
          <div className={'h-[0.3rem] w-full rounded-xl bg-gray-100 bg-transparent'} />
        </div>
      )}
    </div>
  );
};

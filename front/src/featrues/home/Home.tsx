import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import React, { useState } from 'react';

export const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const placeholders = [
    'Shorten your link in seconds.',
    'https://youtube.com',
    'https://google.com',
    'Enter your link here.',
    'https://github.com.',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(url);
  };

  return (
    <div className={'grid place-items-center gap-6'}>
      <h2 className='text-4xl max-sm:text-2xl text-center dark:text-white text-black'>Shorten your link in seconds.</h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />

      <TextGenerateEffect words={'Your link look like this:'} />

      <TypewriterEffect onCompleteBorder words={'https://localhost:8000/fkwFwFF'} cursorClassName={'bg-transparent'} />
    </div>
  );
};

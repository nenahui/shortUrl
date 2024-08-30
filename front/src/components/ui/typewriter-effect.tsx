import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ClipboardIcon, CheckIcon } from '@radix-ui/react-icons';
import ClipboardJS from 'clipboard';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  onCompleteBorder = false,
}: {
  words: string;
  className?: string;
  cursorClassName?: string;
  onCompleteBorder?: boolean;
}) => {
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false); // Состояние для отслеживания копирования
  const wordsArr = words.split(' ');
  const wordsArray = wordsArr.map((word) => ({
    word,
    text: word.split(''),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) {
      const animationPromises = wordsArray.map((_, idx) =>
        animate(
          `span.char-${idx}`,
          {
            display: 'inline-block',
            opacity: 1,
            width: 'fit-content',
          },
          {
            duration: 0.3,
            delay: stagger(0.1),
            ease: 'easeInOut',
          }
        )
      );

      if (onCompleteBorder) {
        Promise.all(animationPromises).then(() => {
          setCompleted(true);
        });
      }
    }
  }, [isInView, animate, wordsArray, onCompleteBorder]);

  const clipboard = new ClipboardJS('.btn');

  clipboard.on('success', () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  });

  const renderWords = () => (
    <motion.div ref={scope} className='inline-block'>
      <div ref={textRef} className='inline-block'>
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className={cn('inline-block')}>
            {word.text.map((char, index) => (
              <motion.span
                initial={{}}
                key={`char-${index}`}
                className={cn(`char-${idx}`, 'dark:text-white max-sm:text-xl text-black opacity-0 hidden', word)}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className={cn('text-xl font-normal text-center', className)}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn('rounded-sm w-[4px] h-4 bg-blue-500', cursorClassName)}
      />
      {completed && (
        <motion.div
          className={'h-[0.095rem] rounded-xl bg-gray-100 relative'}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ transformOrigin: 'center' }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    data-clipboard-text={words}
                    style={{ transform: 'translateY(-85%)' }}
                    className='p-2 btn absolute top-1/2 -right-10 rounded-md border border-black bg-white text-black text-sm transition duration-200'
                  >
                    <motion.div
                      key={copied ? 'check' : 'clipboard'}
                      initial={{ opacity: 0, scale: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {copied ? <CheckIcon /> : <ClipboardIcon />}
                    </motion.div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? 'Text copied' : 'Copy link to clipboard'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </motion.div>
      )}
      {!completed && <div className={'bg-transparent w-96 h-[0.095rem]'} />}
    </div>
  );
};

'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className='sticky top-0 z-10 px-5 border-b-3'>
      <div className='container mx-auto flex justify-between px-4 py-2'>
        <Link href={'/'} className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-black dark:border-white'>
            <span className='font-bold'>EVA</span>
          </div>
          <h1 className='font-bold'>
            Evaria
          </h1>
        </Link>
        <div className='flex items-center gap-8'>
          <Button
            variant='outline'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Moon className='h-5 w-5' />
            ) : (
              <Sun className='h-5 w-5' />
            )}
            <span className='sr-only'>Toggle Theme</span>
          </Button>
          <Link
            href='/'
            className='hidden text-lg font-medium md:block hover:underline decoration-2 underline-offset-4'
          >
            Login
          </Link>
          <Link
            href='/about'
            className='hidden text-lg font-medium md:block hover:underline decoration-2 underline-offset-4'
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

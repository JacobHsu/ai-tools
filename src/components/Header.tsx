import { Github } from 'lucide-react';
import packageJSON from '../../package.json';

export function Header() {
  const { homepage } = packageJSON;

  return (
    <header className="fixed top-4 right-6 z-[100]">
      <a
        href={homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 transition-colors"
        title="GitHub"
      >
        <Github size={22} />
      </a>
    </header>
  );
}

import packageJSON from '../../package.json';

export function Footer() {
  const { name, version, author, homepage } = packageJSON;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-4">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-500">
        <a
          href={`${homepage}/blob/main/LICENSE`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          MIT LICENSE
        </a>

        <div className="flex items-center gap-1">
          <span>{name} © {currentYear} By</span>
          <a
            href={author.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            {author.name}
          </a>
          <a
            href={`${homepage}/releases/tag/v${version}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            v{version}
          </a>
        </div>
      </div>
    </footer>
  );
}

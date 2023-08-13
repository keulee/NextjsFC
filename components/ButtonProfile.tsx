import Link from "next/link";

interface FloatingBtn {
  children: React.ReactNode;
  href: string;
}

export default function ButtonProfile({ children, href }: FloatingBtn) {
  return (
    <Link legacyBehavior href={href}>
      <a className="fixed hover:bg-sky-500 border-0 aspect-square border-transparent transition-colors cursor-pointer rounded-full bottom-40 sm:right-5 xl:right-20 shadow-xl bg-sky-400 w-14 flex items-center justify-center text-white">
        {children}
      </a>
    </Link>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router.asPath]);

  return (
    <header className="text-sm text-gray-600 dark:text-gray-400">
      Current path: {currentPath}
    </header>
  );
}

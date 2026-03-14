import Link from "next/link";

import type { BreadcrumbItem } from "@/types/domain";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href}>
              {isLast ? <span>{item.name}</span> : <Link href={item.href}>{item.name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

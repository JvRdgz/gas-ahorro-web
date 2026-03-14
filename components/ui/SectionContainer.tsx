import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type SectionContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function SectionContainer<T extends ElementType = "section">({
  as,
  className,
  children,
  ...props
}: SectionContainerProps<T>) {
  const Tag = as ?? "section";

  return (
    <Tag className={["section", className].filter(Boolean).join(" ")} {...props}>
      <div className="shell">{children}</div>
    </Tag>
  );
}

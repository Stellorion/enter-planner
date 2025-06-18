// components/ui/card.tsx
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 bg-gray-100/50 dark:bg-gray-900 shadow-md ${className}`}
      {...props}
    />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className = "", ...props }: CardContentProps) {
  return (
    <div className={`p-4 ${className}`} {...props} />
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className = "", ...props }: CardHeaderProps) {
  return (
    <div className={`p-4 border-b border-gray-200 dark:border-gray-800 ${className}`} {...props} />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className = "", ...props }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props} />
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = "", ...props }: CardFooterProps) {
  return (
    <div className={`p-4 border-t border-gray-200 dark:border-gray-800 ${className}`} {...props} />
  );
}
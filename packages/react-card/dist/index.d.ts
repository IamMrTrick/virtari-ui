import * as react_jsx_runtime from 'react/jsx-runtime';
import { Ref } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function Card({ className, ref, ...props }: CardProps): react_jsx_runtime.JSX.Element;
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function CardHeader({ className, ref, ...props }: CardHeaderProps): react_jsx_runtime.JSX.Element;
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    ref?: Ref<HTMLHeadingElement>;
}
declare function CardTitle({ className, ref, ...props }: CardTitleProps): react_jsx_runtime.JSX.Element;
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    ref?: Ref<HTMLParagraphElement>;
}
declare function CardDescription({ className, ref, ...props }: CardDescriptionProps): react_jsx_runtime.JSX.Element;
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function CardContent({ className, ref, ...props }: CardContentProps): react_jsx_runtime.JSX.Element;
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>;
}
declare function CardFooter({ className, ref, ...props }: CardFooterProps): react_jsx_runtime.JSX.Element;

export { Card, CardContent, type CardContentProps, CardDescription, type CardDescriptionProps, CardFooter, type CardFooterProps, CardHeader, type CardHeaderProps, type CardProps, CardTitle, type CardTitleProps };

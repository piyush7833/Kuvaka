import * as React from 'react';
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from 'react-hook-form';
import { ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormProps<TFormValues extends FieldValues, Schema extends ZodSchema> {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: Omit<UseFormProps<TFormValues>, 'resolver'>;
  schema?: Schema;
  className?: string;
}

export function Form<
  TFormValues extends FieldValues,
  Schema extends ZodSchema
>({
  onSubmit,
  children,
  options,
  schema,
  className,
}: FormProps<TFormValues, Schema>) {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  return (
    <form
      className={className}
      onSubmit={methods.handleSubmit(onSubmit)}
      noValidate
    >
      {children(methods)}
    </form>
  );
} 
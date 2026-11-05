'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/api/supabase/session/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .pipe(z.email('Please enter a valid email address')),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters.')
        .max(32, 'Password must be at most 32 characters.'),
    confirmPassword: z
        .string()
        .optional(),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        path: ['confirmPassword'],
        message: 'Passwords don\'t match',
    }
);

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = form.handleSubmit(
        async (data) => {
            const res = await signUp(data);
            if (res?.error) {
                form.setError('root', { message: res.error });
            };
        },
    );

    const errorMessage = form.formState.errors.root?.message;
    const isSubmitting = form.formState.isSubmitting;

    return (
        <form
            className="
                flex flex-col gap-4
                w-80
            "
            onSubmit={ onSubmit }
        >
            <Controller
                name="email"
                control={ form.control }
                render={ ({ field, fieldState }) => (
                    <Field data-invalid={ fieldState.invalid }>
                        <FieldLabel htmlFor={ field.name }>Email</FieldLabel>
                        <Input
                            { ...field }
                            id={ field.name }
                            aria-invalid={ fieldState.invalid }
                            placeholder="user@gmail.com"
                            autoComplete="off"
                        />
                        { fieldState.invalid && <FieldError errors={ [fieldState.error] } /> }
                    </Field>
                ) }
            />
            <Controller
                name="password"
                control={ form.control }
                render={ ({ field, fieldState }) => (
                    <Field data-invalid={ fieldState.invalid }>
                        <FieldLabel htmlFor={ field.name }>Password</FieldLabel>
                        <Input
                            { ...field }
                            id={ field.name }
                            aria-invalid={ fieldState.invalid }
                            placeholder="******"
                            autoComplete="off"
                            type="password"
                        />
                        { fieldState.invalid && <FieldError errors={ [fieldState.error] } /> }
                    </Field>
                ) }
            />
            <Controller
                name="confirmPassword"
                control={ form.control }
                render={ ({ field, fieldState }) => (
                    <Field data-invalid={ fieldState.invalid }>
                        <FieldLabel htmlFor={ field.name }>Confirm password</FieldLabel>
                        <Input
                            { ...field }
                            id={ field.name }
                            aria-invalid={ fieldState.invalid }
                            autoComplete="off"
                            type="password"
                        />
                        { fieldState.invalid && <FieldError errors={ [fieldState.error] } /> }
                    </Field>
                ) }
            />

            { errorMessage && <p className="text-destructive text-sm">{ errorMessage }</p> }

            <Button
                className="h-9 w-full"
                variant="blue"
                disabled={ isSubmitting }
                type="submit"
            >
                { isSubmitting ? 'Signing Up...' : 'Sign Up' }
            </Button>
        </form>
    )
};

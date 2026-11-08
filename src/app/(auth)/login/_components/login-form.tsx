'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/api/supabase/session/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { VerifyOtpForm } from "../../_components/verify-otp-form";
import { useAuthStep } from "../../_hooks/use-auth-step";

const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .pipe(z.email('Please enter a valid email address')),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters.')
        .max(32, 'Password must be at most 32 characters.'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [otpEmail, setOtpEmail] = useState<string | null>(null);
    const { changeAuthStep } = useAuthStep();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onResetPassword = () => { changeAuthStep('pass-recovery', '/reset-password') };

    const onSubmit = form.handleSubmit(
        async (data) => {
            const { email, error } = await login(data);

            if (error || !email) {
                setOtpEmail(null);
                form.setError('root', { message: error ?? 'Failed to log in' });
                return;
            };

            setOtpEmail(email);
        },
    );

    const errorMessage = form.formState.errors.root?.message;
    const isSubmitting = form.formState.isSubmitting;

    return (
        !errorMessage && otpEmail
            ? (
                <VerifyOtpForm
                    email={ otpEmail }
                    type="email"
                />
            )
            : (
                <form
                    className="
                        flex flex-col gap-4
                        w-90
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
                                <div
                                    className="flex justify-between"
                                >
                                    <FieldLabel htmlFor={ field.name }>Password</FieldLabel>
                                    <button
                                        className="
                                            text-sm text-muted-foreground
                                            hover:text-primary cursor-pointer
                                            transition-colors duration-200
                                        "
                                        type="button"
                                        onClick={ onResetPassword }
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
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

                    { errorMessage && <p className="text-destructive text-sm">{ errorMessage }</p> }

                    <Button
                        className="h-11 w-full"
                        variant="blue"
                        disabled={ isSubmitting }
                        type="submit"
                    >
                        {
                            isSubmitting ? 'Logging In...' : 'Log In'
                        }
                    </Button>
                </form>
            )
    )
};

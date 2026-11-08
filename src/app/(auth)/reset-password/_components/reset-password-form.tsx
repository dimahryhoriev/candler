'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/api/supabase/session/password/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { VerifyOtpForm } from "../../_components/verify-otp-form";

const resetPasswordFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .pipe(z.email('Please enter a valid email address')),
});

export function ResetPasswordForm() {
    const [otpEmail, setOtpEmail] = useState<string | null>(null);

    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = form.handleSubmit(
        async ({ email }) => {
            const { error } = await resetPassword(email);

            if (error) {
                setOtpEmail(null);
                form.setError('root', { message: error });
                return;
            };

            setOtpEmail(email);
        },
    );

    const errorMessage = form.formState.errors.root?.message;
    const isSubmitting = form.formState.isSubmitting;

    return (
        <div
            className="
                flex flex-col gap-4 w-90
            "
        >
            {
                !otpEmail && (
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
                )
            }

            { errorMessage && <p className="text-destructive text-sm">{ errorMessage }</p> }

            {
                !errorMessage && otpEmail
                    ? (
                        <VerifyOtpForm
                            email={ otpEmail }
                            type='recovery'
                        />
                    )
                    : (
                        <form onSubmit={ onSubmit }>
                            <Button
                                className="h-11 w-full"
                                variant="blue"
                                disabled={ isSubmitting }
                                type="submit"
                            >
                                { isSubmitting ? 'Resetting Password...' : 'Reset Password' }
                            </Button>
                        </form>
                    )
            }
        </div>
    );
}

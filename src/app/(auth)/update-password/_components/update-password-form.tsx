'use client'

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/lib/api/supabase/session/password/update-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const updatePasswordFormSchema = z.object({
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

export function UpdatePasswordForm() {
    const form = useForm({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = form.handleSubmit(
        async ({ password }) => {
            const { error } = await updatePassword(password);

            if (error) {
                form.setError('root', { message: error });
                return;
            };
        },
    );

    const errorMessage = form.formState.errors.root?.message;
    const isSubmitting = form.formState.isSubmitting;

    return (
        <form
            className="flex flex-col gap-4 w-90"
            onSubmit={ onSubmit }
        >
            <Controller
                name="password"
                control={ form.control }
                render={ ({ field, fieldState }) => (
                    <Field data-invalid={ fieldState.invalid }>
                        <FieldLabel htmlFor={ field.name }>New Password</FieldLabel>
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
                        <FieldLabel htmlFor={ field.name }>Confirm new password</FieldLabel>
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
                className="h-11 w-full"
                variant="blue"
                disabled={ isSubmitting }
                type="submit"
            >
                { isSubmitting ? 'Updating Password...' : 'Update Password' }
            </Button>
        </form>
    )
};

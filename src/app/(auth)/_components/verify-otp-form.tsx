import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { OtpType, verifyOtp } from "@/lib/api/supabase/session/verify-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    OTPInput,
    REGEXP_ONLY_DIGITS,
    SlotProps
} from 'input-otp';
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const verifyOtpSchema = z.object({
    token: z
        .string()
        .min(1, 'Code is required')
        .length(6, 'Code must be an 8-digit number')
});

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

type VerifyOtpFormProps = {
    email: string;
    type: OtpType;
};

export function VerifyOtpForm({
    email,
    type,
}: VerifyOtpFormProps) {
    const form = useForm<VerifyOtpFormValues>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            token: '',
        },
    });

    const onSubmit = form.handleSubmit(
        (data) => {
            verifyOtp({
                email,
                token: data.token.trim(),
                type,
            });
        },
    );

    const errorMessage = form.formState.errors.root?.message;
    const isSubmitting = form.formState.isSubmitting;

    return (
        <form
            className="flex flex-col gap-10 w-90"
            onSubmit={ onSubmit }
        >
            <div
                className="flex flex-col gap-5"
            >
                {
                    type === 'email'
                    &&
                    (
                        <p className="text-sm text-muted-foreground">
                            We sent a verification code to:{ " " }
                            <span className="font-semibold text-foreground">
                                { email }
                            </span>
                        </p>
                    )
                }
                <Controller
                    name="token"
                    control={ form.control }
                    render={ ({ field, fieldState }) => (
                        <Field
                            data-invalid={ fieldState.invalid }
                            className="gap-6"
                        >
                            <FieldLabel htmlFor={ field.name }>Your Verification Code: </FieldLabel>
                            <OTPInput
                                maxLength={ 6 }
                                value={ field.value }
                                onChange={ field.onChange }
                                pattern={ REGEXP_ONLY_DIGITS }
                                containerClassName="flex justify-between w-full gap-1 sm:gap-2"
                                render={
                                    ({
                                        slots
                                    }) => (
                                        <>
                                            {
                                                slots.map((slot, i) => (
                                                    <OtpSlot
                                                        key={ i }
                                                        { ...slot }
                                                    />
                                                ))
                                            }
                                        </>
                                    )
                                }
                            />
                            { fieldState.invalid && <FieldError errors={ [fieldState.error] } /> }
                        </Field>
                    ) }
                />

                { errorMessage && <p className="text-destructive text-sm">{ errorMessage }</p> }
            </div>
            <Button
                className="h-12 w-full"
                variant="blue"
                disabled={ isSubmitting }
                type="submit"
            >
                {
                    isSubmitting ? "Verifying..." : "Verify Code"
                }
            </Button>
        </form>
    );
};

export function OtpSlot(
    props: SlotProps,
) {
    return (
        <div
            className="
                flex flex-col w-8 h-12 items-center
                justify-center relative pb-1
            "
        >
            <span className="text-2xl font-extrabold">
                { props.char }
            </span>
            <div
                className="
                    absolute bottom-0 w-full h-[2px]
                    bg-zinc-300
                "
            />
        </div>
    );
}

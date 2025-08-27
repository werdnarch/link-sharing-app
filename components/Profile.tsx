import React, { use, useEffect, useRef, useState } from "react";
import Container from "./Container";
import Wrapper from "./ui/Wrapper";
import CustomInput from "./CustomInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Loader2, Plus } from "lucide-react";
import { ProfileType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfileDetails } from "@/app/dashboard/actions";
import { toast } from "sonner";

const userSchema = z.object({
  name: z.string().min(1, "Can't be empty"),
  lastname: z.string().min(1, "Can't be empty"),
  email: z.email(),
});

export type UserType = z.infer<typeof userSchema>;

interface ProfileProps {
  active: boolean;
  user: ProfileType;
}

export default function Profile({ active, user }: ProfileProps) {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.firstName,
      lastname: user.lastName,
      email: user.email,
    },
  });

  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement | null>(null);

  const editProfileMutation = useMutation({
    mutationFn: editProfileDetails,
    onSuccess: async (data) => {
      toast.success("Your changes have been sucessfuly saved!");

      const updatedUser = data.data.user;
      console.log(updatedUser);

      reset({
        name:
          updatedUser.name.trim().split(" ").slice(0, -1).join(" ") ||
          updatedUser.name,
        lastname: updatedUser.name.trim().split(" ").slice(-1)[0] || "",
        email: updatedUser.email,
      });

      await queryClient.invalidateQueries({ queryKey: ["get-profile-detail"] });
    },
    onError: (error) => {
      toast.error("Failed to update profile," + error);
    },
  });

  const { isPending } = editProfileMutation;

  const onSubmit: SubmitHandler<UserType> = (data) => {
    const updatedDetails = {
      name: data.name + " " + data.lastname,
      image: user.image,
    };

    editProfileMutation.mutate(updatedDetails);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        clearErrors();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearErrors]);

  return (
    <Container active={active} className="flex-1 ">
      <div className="flex flex-col gap-2 md:gap-4">
        <h1 className="font-bold text-[1.3rem] md:text-3xl">Profile Details</h1>

        <p className="text-sm">
          Add your details to create a personal touch to your profile.
        </p>
      </div>

      <Wrapper>
        <div className="w-full p-4 flex flex-col gap-4 items-center justify-between md:flex-row md:justify-end">
          <p className="md:mr-auto font-bold">Profile Picture</p>

          <div className="w-full aspect-square max-w-[180px] rounded-lg bg-[#928f9c] flex flex-col items-center justify-center gap-3 text-[#633bff]">
            <Image />
            <p className="flex items-center text-sm font-bold gap-1">
              <Plus className="size-4" strokeWidth={3} />
              Upload Image
            </p>
          </div>

          <p className="text-[0.7rem] w-[80%] md:max-w-[150px] md:text-left text-center">
            Image must be below 1024x1024px. Use PNG or JPG format.
          </p>
        </div>
      </Wrapper>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Wrapper>
          <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
            <label htmlFor="name" className="text-sm">
              First Name *
            </label>
            <CustomInput
              error={errors.name}
              register={register}
              id="name"
              placeholder="e.g Andrew"
            />
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
            <label htmlFor="lastname" className="text-sm">
              Last Name *
            </label>
            <CustomInput
              error={errors.lastname}
              register={register}
              id="lastname"
              placeholder="e.g Muyeghu"
            />
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-center">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <CustomInput
              disabled={true}
              register={register}
              id="email"
              placeholder="e.g example@email.com"
            />
          </div>
        </Wrapper>
        <div className="w-full pt-3 border-t-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending || !isDirty}
            className="p-3 px-6 rounded-sm text-sm bg-[#633bff] text-white font-bold hover:bg-[#928f9c] cursor-pointer transition-all duration-200 ease-in-out"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <p>Save</p>
            )}
          </button>
        </div>
      </form>
    </Container>
  );
}

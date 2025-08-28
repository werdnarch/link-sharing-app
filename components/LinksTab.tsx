import React from "react";
import Container from "./Container";
import BlueButton from "./BlueButton";
import { Plus } from "lucide-react";
import Wrapper from "./ui/Wrapper";
import Image from "next/image";
import { LinkType } from "@/types";
import NewLink from "./NewLink";
import { useData } from "@/context/DataContext";
import { toast } from "sonner";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";

interface LinkProps {
  active: boolean;
}

export type LinkFormType = {
  [key: string]: string;
};

export default function LinksTab({ active }: LinkProps) {
  const { links, addLink } = useData();

  const methods = useForm<LinkFormType>({
    defaultValues: links.reduce(
      (acc, link) => ({ ...acc, [link.id]: link.link }),
      {}
    ),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<LinkFormType> = (data) => {
    console.log("Links data:", data);
  };

  const handleLinkAdd = () => {
    if (links.length >= 6) {
      toast.error("Maximum number of links reached");
      return;
    }
    const defaultLink: LinkType = {
      id: crypto.randomUUID(),
      platform: "Youtube",
      link: "",
    };
    addLink(defaultLink);
  };

  return (
    <Container active={active} className="flex-1 flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-2 md:gap-6">
        <h1 className="font-bold text-[1.3rem] md:text-3xl">
          Customise your links
        </h1>
        <p className="text-sm">
          Add/edit/remove links below and then share all your profiles with the
          world
        </p>
      </div>

      <BlueButton onClick={handleLinkAdd}>
        <Plus className="size-4" />
        <p>Add new link</p>
      </BlueButton>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3"
        >
          {links.length > 0 ? (
            links.map((link, index) => (
              <NewLink
                key={link.id}
                id={link.id}
                index={index + 1}
                platform={link.platform}
                link={link.link}
                register={register}
                error={errors[link.id]}
              />
            ))
          ) : (
            <Wrapper>
              <div className="w-full flex flex-col items-center gap-4 md:gap-6 text-center py-6">
                <Image
                  src="/illustration-empty.svg"
                  alt="empty-illustration"
                  width={0}
                  height={0}
                  className="w-[90%] max-w-[300px]"
                />
                <h1 className="text-lg md:text-2xl font-bold">
                  Let's get you started
                </h1>
                <p className="text-sm w-[90%] max-w-[500px]">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </Wrapper>
          )}
          <div className="w-full pt-3 border-t-2 flex items-center justify-end">
            <button
              type="submit"
              className="p-3 px-6 rounded-sm text-sm bg-[#633bff] text-white font-bold hover:bg-[#928f9c] cursor-pointer transition-all duration-200 ease-in-out"
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}

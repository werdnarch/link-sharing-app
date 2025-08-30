import { notFound } from "next/navigation";

export const getUser = async (id: string) => {
  const res = await fetch(`/api/user/${id}`);

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();

  const { message, user } = data;

  return { message, user };
};

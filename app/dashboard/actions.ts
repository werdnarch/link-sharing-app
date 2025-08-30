import { notFound } from "next/navigation";
import { LinkType, ProfileType } from "@/types";

export const getProfileDetails = async () => {
  const res = await fetch("/api/user/me");

  if (!res.ok) {
    return notFound();
  }

  const data: ProfileType = await res.json();

  return data;
};

export const editProfileDetails = async ({
  image,
  name,
}: {
  image: string;
  name: string;
}) => {
  try {
    const res = await fetch("/api/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image, name }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        errorData?.message || `HTTP error! status: ${res.status}`
      );
    }

    const updatedUser = await res.json();

    return {
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
};

export const addLinks = async (data: LinkType[]) => {
  try {
    const res = await fetch("/api/user/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return {
        success: false,
        message: `Request failed with status ${res.status}`,
      };
    }

    const result = await res.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Error updating/adding links:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update/add links",
    };
  }
};

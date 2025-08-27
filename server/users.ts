"use server";
import { auth } from "@/lib/auth";
import { user as userTable } from "@/db/schema";
import { db } from "@/db/drizzle";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknow error occured",
    };
  }
};

export const signUp = async (
  email: string,
  password: string,
  name: string,
  lastName: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: [name, lastName].filter(Boolean).join(" "),
      },
    });

    return {
      success: true,
      message: "Signed Up successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "An unknow error occured",
    };
  }
};

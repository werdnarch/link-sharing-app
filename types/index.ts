export type WelcomeMessage = {
  message: string;
};

export type ProfileType = {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type LinkType = {
  id: string;
  platform: "Github" | "Youtube";
  link: string;
};

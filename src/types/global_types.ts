export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  originalPrice: number;
  images: Record<string, string[]>;
  shades: { name: string; color: string }[];
  details: {
    description: string;
    ingredients: string;
    howToUse: string[];
  };
  category?: string;
  isNewArrival?: boolean;
  rating?: number;
};

export type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  rating: number;
  description: string;
  images: Record<string, string[]>;
  shades: { name: string; color: string }[];
};

export type SampleRequestForm = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
};

export type PinCodeResponse = {
  Status: string;
  PostOffice?: Array<{
    State: string;
    District: string;
  }>;
};

export type VideoGallery = {
  thumbnail: string;
  videoId: string;
  title: string;
};

export type Blog = {
  id: string;
  title: string;
  shortContent: string;
  img: string;
  DateTime?: { _seconds: number; _nanoseconds: number };
};

export type QuizOption = {
  img: string;
  name: string;
  description?: string;
  nextLevel?: QuizOption[];
};

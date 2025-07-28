export interface ContentFormData {
  title: string;
  corePrompt: string;
  subPrompts: {
    linkedin: string;
    instagram: string;
    threads: string;
    twitter: string;
    newsletter: string;
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: ContentFormData;
}
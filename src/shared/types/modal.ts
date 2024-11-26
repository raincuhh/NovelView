export type Modal = {
   id: string;
   content: React.ReactNode;
   closable?: boolean;
   size?: "small" | "medium" | "large" | "custom";
};

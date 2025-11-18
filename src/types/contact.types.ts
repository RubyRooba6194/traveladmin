export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "read" | "responded";
  createdAt: Date;
}

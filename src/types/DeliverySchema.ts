import { z } from "zod";

export const DeliveryPartnerSchema = z.object({
  logo: z.string().refine((value) => !value.includes("https://via.placeholder.com/120"), {
    message: "Veuillez ajouter une image de logo",
  }),
  cover: z.string().refine((value) => !value.includes("https://via.placeholder.com/740"), {
    message: "Veuillez ajouter une image de couverture",
  }),
  companyName: z.string().min(3),
  companyType: z.array(z.string()).min(1),
  responsibleId: z.string().min(3),
  solutions: z.array(z.string()).min(1),
  phone: z
    .string()
    .min(9, "Le numéro de téléphone doit contenir au moins 9 chiffres")
    .refine((value) => /^\d+$/.test(value), {
      message: "Le numéro de téléphone ne doit contenir que des chiffres",
    }),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  siege: z.string().min(3),
  region: z.string().min(3),
  address: z.string().min(3),
  associationType: z.string().min(3),
});

export const defaultDeliveryPartnerData = {
  logo: "https://via.placeholder.com/120",
  cover: "https://via.placeholder.com/740x223",
  companyName: "",
  companyType: [],
  responsibleId: "",
  solutions: [],
  phone: "",
  email: "",
  siege: "",
  region: "",
  address: "",
  associationType: "",
};

export const DeliveryPartnerSolutionSchema = z.object({
  solutions: z.array(z.string()).min(1, "selectionner au moins une solution"),
  documents: z.array(z.string()).min(1, "selectionner au moins un document"),
  deliveryCost: z.number().min(1, "le cout de livraison doit etre superieur a 0"),
  commission: z.number().min(1, "le cout de commution doit etre superieur a 0"),
});

export const defaultDeliveryPartnerSolutionData = {
  solutions: [],
  documents: [],
  deliveryCost: 0,
  commission: 0,
};

export interface DeliveryPartnerSchemaType extends z.infer<typeof DeliveryPartnerSchema>, z.infer<typeof DeliveryPartnerSolutionSchema>  {}
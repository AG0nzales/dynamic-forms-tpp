import { z } from "zod";

// dynamic union conditionals
// when two types are mutually exclusive
// and one of them is a literal
// use discriminated union
// example in Typescript:
// type Laptop = {variant: 'laptop', cpu: string}
// type Phone = {variant: 'phone', camera: string}
// type Product = {price: number} & (Laptop | Phone )
// const laptopExample: Product = {price: 1000, variant: 'laptop', cpu: 'i7'}
const workExperienceSchema = z.discriminatedUnion("hasWorkExperience", [
  z.object({
    hasWorkExperience: z.literal(true),
    companyName: z.string().min(1).max(255),
  }),
  z.object({
    hasWorkExperience: z.literal(false),
  }),
]);

// dynamic union conditionals
// when two types are mutually exclusive
// and one of them is a literal
const languageKnowledgeSchema = z.discriminatedUnion("knowsOtherLanguages", [
  z.object({
    knowsOtherLanguages: z.literal(true),
    languages: z.array(
      z.object({
        name: z.string().min(1).max(255),
      })
    ),
  }),
  z.object({
    knowsOtherLanguages: z.literal(false),
  }),
]);

const educationKnowledgeSchema = z.discriminatedUnion("educationLevel", [
  z.object({
    educationLevel: z.literal("noFormalEducation"),
  }),
  z.object({
    educationLevel: z.literal("highSchoolDiploma"),
    schoolName: z.string().min(1).max(255),
  }),
  z.object({
    educationLevel: z.literal("bachelorsDegree"),
    universityName: z.string().min(1).max(255),
  }),
]);

// whole schema/structure/logic of the dynamic form
const formSchema = z
  .object({
    fullName: z.string().min(1).max(255),
  })
  .and(workExperienceSchema)
  .and(languageKnowledgeSchema)
  .and(educationKnowledgeSchema);

// infer the type of the formSchema
// to use it in the useForm hook
type FormSchema = z.infer<typeof formSchema>;

// default values for the form
// to be used in the useForm hook
const formDefaultValues: FormSchema = {
  fullName: "",
  hasWorkExperience: false,
  knowsOtherLanguages: false,
  educationLevel: "noFormalEducation",
};

export { formSchema, formDefaultValues, type FormSchema };

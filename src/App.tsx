import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Container from "./Container";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formDefaultValues, formSchema, FormSchema } from "./formSchema";
import { AddCircleRounded, DeleteForeverRounded } from "@mui/icons-material";
import { useEffect } from "react";

const App = () => {
  // useForm hook from react-hook-form
  // to handle the form state and validation
  // zodResolver for the form validation
  // formDefaultValues for the default values of the form
  // formSchema for the schema of the
  // form to be used in the zodResolver
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormSchema>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  // useFieldArray hook to handle the array of languages
  // to be added, removed, replaced
  // related to react-hook-form
  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  // since the errors object is not typed correctly
  // we need to cast it to the correct type
  // so this is the correct type
  // using Extract method from Typescript
  // specifying the type of the formSchema to be used
  // in the FieldErrors generic type
  const fullErorrs: FieldErrors<
    Extract<FormSchema, { hasWorkExperience: true }>
  > &
    FieldErrors<Extract<FormSchema, { knowsOtherLanguages: true }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: "noFormalEducation" }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: "highSchoolDiploma" }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: "bachelorsDegree" }>> =
    errors;

  // useWatch hook to watch the value of the hasWorkExperience field
  // and conditionally render the companyName field
  const hasWorkExperience = useWatch({ control, name: "hasWorkExperience" });
  const knowsOtherLanguages = useWatch({
    control,
    name: "knowsOtherLanguages",
  });
  const educationLevel = useWatch({ control, name: "educationLevel" });

  // onSubmit function to handle the form submission
  // using the SubmitHandler generic type
  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  useEffect(() => {
    if (knowsOtherLanguages) {
      replace([{ name: "" }]);
    }
  }, [knowsOtherLanguages, replace]);
  return (
    <Container>
      <TextField
        {...register("fullName")}
        label="Full Name"
        helperText={fullErorrs.fullName?.message}
        error={!!fullErorrs.fullName}
      />
      <FormControlLabel
        {...register("hasWorkExperience")}
        label="Work Experience"
        control={<Checkbox />}
      />
      {hasWorkExperience && (
        <TextField
          {...register("companyName")}
          label="Company Name"
          helperText={fullErorrs.companyName?.message}
          error={!!fullErorrs.companyName}
        />
      )}
      <FormControlLabel
        {...register("knowsOtherLanguages")}
        label="Know Other Languages?"
        control={<Checkbox />}
      />
      {knowsOtherLanguages && (
        <>
          {fields.map((field, index) => (
            <div key={field.id}>
              <TextField
                sx={{ width: "100%" }}
                {...register(`languages.${index}.name` as const)}
                label="Language Name"
                helperText={fullErorrs.languages?.[index]?.name?.message}
                error={!!fullErorrs.languages?.[index]?.name?.message}
              />
              <IconButton
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                color="error"
              >
                <DeleteForeverRounded />
              </IconButton>
            </div>
          ))}
          <IconButton
            sx={{ width: "fit-content" }}
            onClick={() => append({ name: "" })}
            color="success"
          >
            <AddCircleRounded />
          </IconButton>
        </>
      )}
      <FormControl>
        <FormLabel>Education Level</FormLabel>
        <Controller
          control={control}
          name="educationLevel"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="noFormalEducation"
                control={<Radio />}
                label="No Formal Education"
              />
              <FormControlLabel
                value="highSchoolDiploma"
                control={<Radio />}
                label="High School Diploma"
              />
              <FormControlLabel
                value="bachelorsDegree"
                control={<Radio />}
                label="Bachelor's Degree"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      {educationLevel === "highSchoolDiploma" && (
        <TextField
          {...register("schoolName")}
          label="School Name"
          helperText={fullErorrs.schoolName?.message}
          error={!!fullErorrs.schoolName?.message}
        />
      )}

      {educationLevel === "bachelorsDegree" && (
        <TextField
          {...register("universityName")}
          label="University Name"
          helperText={fullErorrs.universityName?.message}
          error={!!fullErorrs.universityName?.message}
        />
      )}
      <Button onClick={handleSubmit(onSubmit)} variant="contained">
        Submit
      </Button>
    </Container>
  );
};

export default App;

import * as FormRadix from "@radix-ui/react-form";
import { FormSubmitProps } from "@radix-ui/react-form";
import ButtonCore from "../ButtonCore/ButtonCore";

const BtnSubmitForm = ({
  className,
  label = "Enviar",
}: FormSubmitProps &
  React.RefAttributes<HTMLButtonElement> & {
    className?: string;
    label?: string;
  }) => (
  <FormRadix.Submit
    asChild
    className={`w-full hover:cursor-pointer ${className}`}
  >
    <ButtonCore size={"3"} className={`w-full hover:cursor-pointer`}>
      {label}
    </ButtonCore>
  </FormRadix.Submit>
);

export default BtnSubmitForm;

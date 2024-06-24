import * as FormRadix from "@radix-ui/react-form";

const Form = ({
  children,
  onSubmit,
  className,
}: FormRadix.FormProps & { className?: string }) => (
  <FormRadix.Root onSubmit={onSubmit} className={`w-[260px] ${className}`}>
    {children}
  </FormRadix.Root>
);

export default Form;

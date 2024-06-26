import * as FormRadix from "@radix-ui/react-form";

const Form = ({
  children,
  onSubmit,
  className,
}: FormRadix.FormProps & { className?: string }) => (
  <FormRadix.Root onSubmit={onSubmit} className={`grid ${className}`}>
    {children}
  </FormRadix.Root>
);

export default Form;

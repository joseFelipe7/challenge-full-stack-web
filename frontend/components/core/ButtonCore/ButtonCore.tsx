import { Button, ButtonProps } from "@radix-ui/themes";

const ButtonCore = ({
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) => (
  <Button
    size={"3"}
    className={`w-full hover:cursor-pointer font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px] ${props.className}`}
    {...props}
  >
    {props?.children}
  </Button>
);

export default ButtonCore;

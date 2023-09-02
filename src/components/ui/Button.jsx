/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils";

const Button = ({ children, ...atributes }) => {
  return <button className={cn("black_btn", atributes)}>{children}</button>;
};

export default Button;

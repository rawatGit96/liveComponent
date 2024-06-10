import FormWrapper from "../index";
import ForgotForm from "./form";
import ForgotFormEmail from "./emailForm";

export default function ForgotPassword() {
  return (
    <FormWrapper>
      <ForgotForm />
    </FormWrapper>
  );
}

export const ForgotPasswordEmail = () => {
  return (
    <FormWrapper>
      <ForgotFormEmail />
    </FormWrapper>
  );
};

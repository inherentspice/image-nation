import { ErrorMessageProps } from "../types/types";
const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorMessage;

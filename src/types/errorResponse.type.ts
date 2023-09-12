import MessageResponse from "./messageResponse.type";

type ErrorResponse = MessageResponse & {
    stack?: string;
};

export default ErrorResponse;

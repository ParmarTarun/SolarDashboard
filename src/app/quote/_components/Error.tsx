import React, { FC } from "react";

interface ErrorProps {
  error: string;
}

const Error: FC<ErrorProps> = ({ error }) => {
  return <p>{error}</p>;
};

export default Error;

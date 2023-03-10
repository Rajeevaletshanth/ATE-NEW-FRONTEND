import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading = "Stays in Tokyo",
  subHeading,
}) => {
  return (
    <div className={`mb-4 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-medium">{heading}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          No items
        </span>
      )}
    </div>
  );
};

export default Heading2;

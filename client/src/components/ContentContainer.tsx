import { ReactNode } from "react";

function ContentContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6 p-4 bg-white rounded shadow">{children}</div>
  );
}

export default ContentContainer;

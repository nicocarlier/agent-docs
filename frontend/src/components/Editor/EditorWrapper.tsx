import React from "react";

const EditorWrapper: React.FC<{
  children: React.ReactNode;
  isLoading?: boolean;
}> = ({ children, isLoading }) => (
  <div className="document-page-wrapper w-full h-full pt-8 overflow-y-auto">
    <div
      className={`document-page-container w-full h-full flex flex-col items-center ${
        isLoading ? "overflow-hidden" : ""
      }`}
    >
      <div className="editor-container w-full max-w-[8.5in] min-h-[11in] flex h-fit shadow-md mx-auto relative ">
        <div className="min-w-[818px]">{children}</div>
      </div>
    </div>
  </div>
);

export default EditorWrapper;

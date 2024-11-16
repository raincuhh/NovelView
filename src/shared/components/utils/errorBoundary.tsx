import React, { ReactNode } from "react";

type ErrorBoundaryProps = {
   fallback: ReactNode;
   children?: ReactNode;
   onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
};

type ErrorBoundaryState = {
   hasError: boolean;
   error?: Error | null;
   errorInfo?: React.ErrorInfo | null;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
   state: ErrorBoundaryState = { hasError: false, error: null, errorInfo: null };

   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error };
   }

   componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      console.error("ErrorBoundary caught an error: ", error, errorInfo);
   }

   render() {
      const { fallback, children } = this.props;
      const { hasError, error, errorInfo } = this.state;

      // todo, create a modal for the error details if its a development environment. as in like:
      // <p>{error.toString()}<p/>
      // <pre>{errorInfo?.componentStack}<pre/>
      if (hasError) {
         return (
            <>
               <div id="ErrorOccured">{fallback}</div>
            </>
         );
      }

      return children;
   }
}

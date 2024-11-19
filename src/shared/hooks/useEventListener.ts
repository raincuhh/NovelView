import { useEffect, useRef } from "react";

type UseEventListenerProps = {
   element: EventTarget | null;
   callback: Function;
   eventType: string;
};

export default function useEventListener({
   element,
   callback,
   eventType,
}: UseEventListenerProps) {
   const callbackRef = useRef(callback);

   useEffect(() => {
      callbackRef.current = callback;
   }, [callback]);

   useEffect(() => {
      if (element == null) return;
      const handler = (e: Event) => callbackRef.current(e);
      element.addEventListener(eventType, handler);

      return () => element.removeEventListener(eventType, handler);
   }, [eventType, element]);
}

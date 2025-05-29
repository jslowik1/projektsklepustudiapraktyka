import { useFloating, useClick, useInteractions } from "@floating-ui/react";
import { ReactNode, useState } from "react";

interface ICalloutProps {
  children: ReactNode;
}

const Callout: React.FC<ICalloutProps> = ({ children }) => {
  const [showCallout, setShowCallout] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: showCallout,
    onOpenChange: setShowCallout,
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);
  return (
    <di>
      <div ref={refs.setReference} {...getReferenceProps()}></div>\
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
      >
        {children}
      </div>
    </di>
  );
};

export default Callout;

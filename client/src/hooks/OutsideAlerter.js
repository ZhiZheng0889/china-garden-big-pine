import React, { useRef, useEffect } from 'react';

/**
 * An array that is used to allow state change based on target id
 */
const allowedTargets = ['modal-toggle-btn'];
function useOutsideAlerter(ref, setState) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !allowedTargets.includes(event.target.id)
      ) {
        setState(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter(props) {
  const { setState } = props;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setState);
  return <div ref={wrapperRef}>{props.children}</div>;
}

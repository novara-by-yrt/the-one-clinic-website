'use client';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function BookConsultationButton({ className, children }: Props) {
  function open() {
    window.dispatchEvent(new CustomEvent('openCallbackModal'));
  }

  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

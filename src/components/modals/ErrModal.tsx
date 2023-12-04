type ErrModalProps = {
  message: string;
};
export const ErrModal = ({ message }: ErrModalProps) => {
  return (
    <div className="">
      <p>{message}</p>
    </div>
  );
};

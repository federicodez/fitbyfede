type SuccessModalProps = {
  message: string;
};
export const SuccessModal = ({ message }: SuccessModalProps) => {
  return (
    <div className="">
      <p>{message}</p>
    </div>
  );
};

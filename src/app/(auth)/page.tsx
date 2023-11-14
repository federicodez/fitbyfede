import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-20 
        sm:px-6 
        lg:px-8 
      "
    >
      <AuthForm />
    </div>
  );
};

export default Auth;

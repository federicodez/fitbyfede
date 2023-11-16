import dynamic from "next/dynamic";
const AuthForm = dynamic(() => import("./components/AuthForm"), {
  loading: () => <p className="animate-bounce">Loading...</p>,
});

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

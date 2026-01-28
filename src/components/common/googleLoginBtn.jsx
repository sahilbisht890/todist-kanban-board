import googleIcon from "../../assets/google.svg";

const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="
        w-full flex items-center justify-center gap-3
        border border-gray-300 rounded-lg
        py-2.5 px-4
        bg-white text-gray-700
        transition-all duration-200 ease-in-out
        hover:bg-gray-50 hover:scale-[1.02]
        active:scale-[0.98]
        focus:outline-none
      "
    >
      <img
        src={googleIcon}
        alt="Google"
        className="w-5 h-5"
      />
      <span className="font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;

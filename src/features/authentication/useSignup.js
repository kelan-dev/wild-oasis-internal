import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success(
        "Account created successfully.  Please verify email address."
      );
    },

    onError: (err) => {
      console.error(err.message);
    },
  });

  return { signup, isLoading };
}

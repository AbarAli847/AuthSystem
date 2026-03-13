
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProtectedRoute(WrappedComponent) {
  return function Wrapper(props) {
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) router.push("/login");
    }, []);
    return <WrappedComponent {...props} />;
  };
}

 

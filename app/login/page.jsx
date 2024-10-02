
import dynamic from "next/dynamic";
import { redirect} from "next/navigation";
import { getAuthStatus } from "@/utils/authStatus";
import LogIn from "@/components/pages-menu/login";


export const metadata = {
  title: 'Login || Future Coder',
  description:
    'Future Coder',
}

const index = () => {

  const isLoggedIn = getAuthStatus()

  if (isLoggedIn) {
    redirect("/")
  }

  return (
    <>
      <LogIn/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

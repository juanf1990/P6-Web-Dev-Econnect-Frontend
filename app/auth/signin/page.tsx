import { getProviders } from "next-auth/react";
import Image from "next/image";
import SigninComponent from "./SignInComponent";

async function SigninPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Profile Picture"
        />
      </div>

      <SigninComponent providers={providers} />
    </div>
  );
}

export default SigninPage;

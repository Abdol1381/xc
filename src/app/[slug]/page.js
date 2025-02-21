import Login from "@/components/Login";
import RootLayout from "../layout";

export default async function Page({ params }) {
  return (
    <>
      <RootLayout>
        <Login />
      </RootLayout>
    </>
  );
}

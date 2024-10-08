import Loading from "@/components/shop/loading";
import UpdateAddressForm from "@/components/shop/profile/update-address-form";
import { cookies as nextCookies } from "next/headers";
import { Suspense } from "react";

const Address = async ({ id }: { id: string }) => {
  const cookieStore = nextCookies();
  const token = cookieStore.get("authToken")?.value || "";

  const res = await fetch(`http://localhost:5000/api/Address/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // header Authorization
    },
    next: { tags: ["addressDetail"] },
  });

  const address: ApiResponse<IAddress> = await res.json();

  return <UpdateAddressForm address={address.data} />;
};

const UpdateAddressPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <Suspense fallback={<Loading />}>
      <Address id={id} />
    </Suspense>
  );
};
export default UpdateAddressPage;

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOAD_STRIPE } from "../utils/mutations";
import { QUERY_SEED_PACKAGES } from "../utils/queries";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutButton = ({ seedPackageId }) => {
  const [checkout] = useMutation(LOAD_STRIPE);

  const handleCheckout = async () => {
    console.log("clicked");
    const { data } = await checkout({ variables: { seedPackageId } });
    console.log("hello hello", data);
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: data.checkout.session,
    });

    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  return <button onClick={handleCheckout}>Buy Seeds</button>;
};

export default function BuyGoldenSeeds() {
  const { data } = useQuery(QUERY_SEED_PACKAGES);
  const [seedPackages, setSeedPackages] = useState([]);
  useEffect(() => {
    if (data && data.seedPackages) {
      setSeedPackages(data.seedPackages);
    }
  }, [data]);
  return (
    <div className="dark:text-white flex md:flex-row flex-col justify-center items-center h-screen">
      {seedPackages.map((seedPackage) => (
        <div
          key={seedPackage._id}
          className="p-4 border-2 dark:border-white m-2 hover:cursor-pointer"
        >
          <h1>{seedPackage.quantity.toLocaleString()} Seeds</h1>
          <h3>${seedPackage.price.toFixed(2)}</h3>
          <CheckoutButton seedPackageId={seedPackage._id} />
        </div>
      ))}
    </div>
  );
}

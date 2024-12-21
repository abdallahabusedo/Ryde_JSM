import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import CustomButton from "./CustomButton";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
    // Make a request to your own server.
    const { paymentIntent, customer } = await fetchAPI(
      "/(api)/(stripe)/create+api",
      {
        method: "POST",
        body: JSON.stringify({
          amount,
          email,
          name: fullName || email.split("@")[0],
          paymentMethodId: paymentMethod.id,
        }),
      }
    );

    if (paymentIntent.client_secret) {
      const { result } = await fetchAPI("/(api)/(stripe)/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_intent_id: paymentIntent.id,
          payment_method_id: paymentMethod.id,
          customer_id: customer.id,
        }),
      });
      if (result.client_secret) {
      }
    }

    // Call the `intentCreationCallback` with your server response's client secret or error
    const { client_secret, error } = await response.json();
    if (client_secret) {
      intentCreationCallback({ clientSecret: client_secret });
    } else {
      intentCreationCallback({ error });
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        // Customer canceled - you should probably do nothing.
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        setSuccess(true);
      }
    }
  };
  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;

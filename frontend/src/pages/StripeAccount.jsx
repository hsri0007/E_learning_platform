import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const StripeAccount = () => {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const handleClick = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.post(
        "http://localhost:5000/api/users/stripeaccountstatus",
        {},
        config
      );
      console.log(res);

      //   window.location.href = res.data;
    };

    handleClick();
  }, []);
  return <div>StripeAccount</div>;
};

export default StripeAccount;

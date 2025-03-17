import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );
    const { amount, keyId, currency, notes, orderId } = order.data;
    // Get the payment Dialog
    // VERY IMPORTANT STEPS
    const options = {
      key: keyId,
      amount:amount,
      currency:currency,
      name:"Dev Tinder",
      description: "Connect to other developers !!",
      order_id:orderId,
      prefill:{
        name:notes.firstName + " " + notes.lastName,
        email:notes.emailId
      },
      theme:{
         color:"#F37254",
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="m-10">
      <div className="flex w-full  ">
        <div className="card bg-base-300 rounded-box grid h-80 p-10 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue tick</li>
            <li> - 3 Months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("silver")}
          >
            {" "}
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 p-10 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinte connection Requests per day</li>
            <li> - Blue tick</li>
            <li> - 6 Months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleBuyClick("gold")}
          >
            {" "}
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

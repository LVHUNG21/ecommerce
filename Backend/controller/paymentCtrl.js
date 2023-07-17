const Razorpay=require('razorpay');
 const instance=new Razorpay({ key_id:"rzp_test_y60i3RUCXRRuEt",key_secret:"tlrkYKqr1twDD1oZDL3nsGkY"
})
const checkout=async (req,res)=>{

  const {amount}=req.body;
  try {
    const option={
      amount:amount*100,
      currency:"INR",
    }
    const order=await instance.orders.create(option);
    res.json({
      success:true,
      order
    })
  } catch (error) {
    console.log(error);
  }

}
const paymentVerification=async (req,res)=>{
 const {razorpayOrderId,razorPaymentId}=req.body;
 res.json({
  razorpayOrderId,razorPaymentId
 })

}


// import axios from "axios";
// import {
//   PAYPAL_API,
//   HOST,
//   PAYPAL_API_CLIENT,
//   PAYPAL_API_SECRET,
// } from "../config";

// export const createOrder = async (req, res) => {
//   try {
//     const order = {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: "105.70",
//           },
//         },
//       ],
//       application_context: {
//         brand_name: "mycompany.com",
//         landing_page: "NO_PREFERENCE",
//         user_action: "PAY_NOW",
//         return_url: `${HOST}/capture-order`,
//         cancel_url: `${HOST}/cancel-payment`,
//       },
//     };


//     // format the body
//     const params = new URLSearchParams();
//     params.append("grant_type", "client_credentials");

//     // Generate an access token
//     const {
//       data: { access_token },
//     } = await axios.post(
//       "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//       params,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     console.log(access_token);

//     // make a request
//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders`,
//       order,
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     console.log(response.data);

//     return res.json(response.data);
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json("Something goes wrong");
//   }
// };

// export const captureOrder = async (req, res) => {
//   const { token } = req.query;

//   try {
//     const response = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
//       {},
//       {
//         auth: {
//           username: PAYPAL_API_CLIENT,
//           password: PAYPAL_API_SECRET,
//         },
//       }
//     );

//     console.log(response.data);

//     res.redirect("/payed.html");
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "Internal Server error" });
//   }
// };

// export const cancelPayment = (req, res) => {
//   res.redirect("/");
// };
module.exports={
  checkout,paymentVerification
}

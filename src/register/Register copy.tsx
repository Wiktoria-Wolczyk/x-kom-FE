// import React, { useState, useEffect } from "react";
// import "./Register.css";
// import Navbar from "../navbar/Navbar";
// import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";

// interface IFormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// function Register() {
//   const [show, setShow] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userLastName, setUserLastName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userPassword, setUserPassword] = useState("");
//   // const [isRegistered, setIsRegistered] = useState(false);

//   const handleClick = () => setShow(!show);
//   const registerClick = () => {
//     setIsClicked(!isClicked);
//   };
//   const toasterRegister = () =>
//     toast("account created!", {
//       icon: "👏",
//     });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormValues>();

//   const onSubmit: SubmitHandler<IFormValues> = (data) => {
//     alert(JSON.stringify(data));
//   };

//   useEffect(() => {
//     const fetchRegister = async () => {
//       await axios
//         .post("http://localhost:3000/auth/register", {
//           firstName: userName,
//           lastName: userLastName,
//           email: userEmail,
//           password: userPassword,
//         })
//         .then(function (response) {
//           console.log("response", response);
//         })
//         .catch(function (error) {
//           console.log("error", error);
//         });
//     };
//     fetchRegister();
//   }, [isClicked]);

//   return (
//     <div className="containerForRegister">
//       <Navbar />

//       <div className="registerText">Register</div>
//       <div className="divForRegisterInputs">
//         <div className="userRegisterInputs">
//           <Input
//             className="firstName"
//             placeholder="FirstName"
//             size="lg"
//             bgColor={"white"}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <Input
//             className="lastName"
//             placeholder="LastName"
//             size="lg"
//             bgColor={"white"}
//             onChange={(e) => setUserLastName(e.target.value)}
//           />
//           <Input
//             className="email"
//             placeholder="Email"
//             size="lg"
//             bgColor={"white"}
//             onChange={(e) => setUserEmail(e.target.value)}
//           />
//         </div>
//         <div className="InputGroupForPassword">
//           <div className="containerForPasswordInputs">
//             <InputGroup size="ml">
//               <Input
//                 size="lg"
//                 bgColor={"white"}
//                 className="inputRegisterPassword"
//                 type={show ? "text" : "password"}
//                 placeholder="Password"
//                 onChange={(e) => setUserPassword(e.target.value)}
//               />
//               <InputRightElement></InputRightElement>
//             </InputGroup>
//             <InputGroup size="ml">
//               <Input
//                 size="lg"
//                 bgColor={"white"}
//                 className="inputConfirmPassword"
//                 type={show ? "text" : "password"}
//                 placeholder="Confirm password"
//               />
//             </InputGroup>
//           </div>
//           <div className="ContainerForButtonHideShow">
//             <Button
//               colorScheme="teal"
//               className="showOrHidePasswordInRegister"
//               size="sm"
//               onClick={handleClick}
//             >
//               {show ? "Hide" : "Show"}
//             </Button>
//           </div>
//         </div>
//         <div className="divForAcceptTermsConatiner">
//           <div className="containerForAcceptTerms">
//             <input
//               className="checkboxTerms"
//               type="checkbox"
//               name="acceptTerms"
//             />
//             <span>I Accept</span>
//             <a className="termsHref" href="">
//               Terms
//             </a>
//           </div>
//         </div>

//         <div className="containerForButtonAcceptRegister">
//           <input
//             className="buttonAcceptRegister"
//             type="submit"
//             value="Register"
//             onClick={() => {
//               registerClick();
//               toasterRegister();
//             }}
//             style={{ color: isClicked ? "green" : "red" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React from "react";

const RegisterCopy = () => {
  return <div>Register copy</div>;
};

export default RegisterCopy;

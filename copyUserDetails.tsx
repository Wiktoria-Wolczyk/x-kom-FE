// import React, { useContext, useState } from "react";
// import { LoginContext } from "../context/loginContext/LoginContext";
// import "./UserDetails.css";
// import { useNavigate } from "react-router";
// import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Input } from "@chakra-ui/react";

// interface IFormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// function UserDetailsCopy() {
//   const navigate = useNavigate();
//   const { actualUser, setActualUser } = useContext(LoginContext);

//   const [editNameIsClicked, setEditNameIsClicked] = useState(false);
//   const [changeEmailIsClicked, setChangeEmailIsClicked] = useState(false);
//   const [changePasswordIsClicked, setChangePasswordIsClicked] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       firstName: actualUser?.firstName,
//       lastName: actualUser?.lastName,
//       email: actualUser?.email,
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit: SubmitHandler<IFormValues> = async (data) => {
//     try {
//       setEditNameIsClicked(false);

//       const updateUser = async () =>
//         axios.put(
//           `http://localhost:3000/users/${actualUser?.id}`,
//           {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             password: data.password,
//             // confirmPassword: data.confirmPassword,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           },
//         );

//       await updateUser();

//       const updatedUser = {
//         ...actualUser!,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         password: data.password,
//       };
//       setActualUser(updatedUser);

//       localStorage.getItem("token");
//       // reset();
//       toast("account updated!", {
//         icon: "👏",
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("server error - try again later");
//     }
//   };

//   const onChangePicture = (e: any) => {
//     setFile(e.target.files[0]);
//     const path = URL.createObjectURL(e.target.files[0]);
//     setImageUrl(path);
//     console.log("imageURL", imageUrl);
//   };

//   console.log("fileName", file);
//   console.log("aaaacct", actualUser?.id);

//   const sendAvatar = async () => {
//     const formData = new FormData();
//     formData.append("avatar", file!);
//     formData.append("userID", `${actualUser!.id}`);

//     const element: any = document.getElementById("avatar");

//     console.log("elel", element!.value);

//     // const timeout = () => new Promise((resolve, reject) => setTimeout(() => resolve, 1000))

//     try {
//       // setTimeout(() => {}, 1000);
//       // await timeout();
//       const response = await axios.post(
//         "http://localhost:3000/files/fs/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log("response", response);
//       element!.value = "";
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // const updateAvatar = async (data: IUserAvatar) => {
//   //   try {
//   //     setSaveAvatarIsClicked(true);

//   //     const updateUserAvatar = async () =>
//   //       axios.put(
//   //         `http://localhost:3000/users/files/fs/upload`,
//   //         {
//   //           avatar: ,
//   //         },
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //           },
//   //         }
//   //       );

//   //     await updateUserAvatar();

//   //     let updatedUser = {
//   //       ...actualUser!,
//   //       avatar: ,
//   //     };
//   //     setActualUser(updatedUser);

//   //     localStorage.getItem("token");
//   //     // reset();
//   //     toast("avatar updated!", {
//   //       icon: "👏",
//   //     });
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error("server error - try again later");
//   //   }
//   // };
//   console.log("file", file);

//   return (
//     <>
//       {editNameIsClicked ? (
//         <div className="containerForChangeUserNameComponent">
//           <div className="divForReturnButtonInChangeUserName">
//             <button
//               className="returnButtonInChangeUserName"
//               onClick={() => setEditNameIsClicked(false)}
//             >
//               <i className="fa-solid fa-chevron-left "></i>
//             </button>
//             <p onClick={() => navigate("/user_details")}>Your details</p>
//           </div>
//           <div className="containerForForm">
//             <form
//               className="informationsAboutUser"
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <div>
//                 <label className="informationsFirstName">FirstName: </label>
//                 <Controller
//                   name="firstName"
//                   control={control}
//                   render={({ field }) => (
//                     <Input
//                       className="firstName"
//                       placeholder="FirstName"
//                       size="lg"
//                       bgColor={"white"}
//                       {...field}
//                     />
//                   )}
//                 />
//                 <label className="informationsLastName">LastName: </label>
//                 <Controller
//                   name="lastName"
//                   control={control}
//                   render={({ field }) => (
//                     <Input
//                       className="lastName"
//                       placeholder="LastName"
//                       size="lg"
//                       bgColor={"white"}
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//               <input
//                 className="buttonAcceptNameChanges"
//                 type="submit"
//                 value="Save"
//               />
//             </form>
//           </div>
//         </div>
//       ) : changeEmailIsClicked ? (
//         <div className="containerForChangeUserNameComponent">
//           <div className="divForReturnButtonInChangeUserName">
//             <button
//               className="returnButtonInChangeUserName"
//               onClick={() => setChangeEmailIsClicked(false)}
//             >
//               <i className="fa-solid fa-chevron-left "></i>
//             </button>
//             <p onClick={() => navigate("/user_details")}>Your details</p>
//           </div>
//           <div className="containerForForm">
//             <form
//               className="informationsAboutUser"
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <div>
//                 <label className="informationsFirstName">Email: </label>
//                 <Controller
//                   name="email"
//                   control={control}
//                   render={({ field }) => (
//                     <Input
//                       className="loginEmail"
//                       placeholder="Email"
//                       size="lg"
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//               <input
//                 className="buttonAcceptNameChanges"
//                 type="submit"
//                 value="Save"
//               />
//             </form>
//           </div>
//         </div>
//       ) : changePasswordIsClicked ? (
//         <div className="containerForChangeUserNameComponent">
//           <div className="divForReturnButtonInChangeUserName">
//             <button
//               className="returnButtonInChangeUserName"
//               onClick={() => setChangePasswordIsClicked(false)}
//             >
//               <i className="fa-solid fa-chevron-left "></i>
//             </button>
//             <p onClick={() => navigate("/user_details")}>Your details</p>
//           </div>
//           <div className="containerForForm">
//             <form
//               className="informationsAboutUser"
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <div>
//                 <label className="informationsFirstName">Password: </label>
//                 <Controller
//                   name="password"
//                   control={control}
//                   render={({ field }) => (
//                     <Input
//                       className="passwordToChange"
//                       placeholder="Password"
//                       size="lg"
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//               <input
//                 className="buttonAcceptNameChanges"
//                 type="submit"
//                 value="Save"
//               />
//             </form>
//           </div>
//         </div>
//       ) : (
//         <>
//           <button
//             className="returnButtonInUserDetails"
//             onClick={() => navigate("/list")}
//           >
//             <i className="fa-solid fa-chevron-left "></i>
//             <p>Return</p>
//           </button>
//           <p className="textAccountSettings">Account Settings</p>
//           <div className="yourDetailsText">Your details</div>
//           <div className="containerForUserNameAndEdit">
//             <div className="containerForUserName">
//               <p className="pUserFirstName">{actualUser?.firstName}</p>
//               <p>{actualUser?.lastName}</p>
//             </div>
//             <div className="editUserName">
//               <button
//                 className="editNameText"
//                 onClick={() => setEditNameIsClicked(true)}
//               >
//                 Edit
//               </button>
//             </div>
//           </div>

//           <div className="userEmailText">E-mail</div>
//           <div className="containerForEmailAndEdit">
//             <div className="containerForEmail">
//               <p className="pUserEmail">{actualUser?.email}</p>
//             </div>
//             <div className="changeEmail">
//               <button
//                 className="editEmailText"
//                 onClick={() => setChangeEmailIsClicked(true)}
//               >
//                 Change
//               </button>
//             </div>
//           </div>
//           <div className="userPasswordText">Password</div>
//           <div className="containerForPasswordAndEdit">
//             <div className="containerForPassword">
//               <p className="pUserPassword">******</p>
//             </div>
//             <div className="editPassword">
//               <button
//                 className="changePasswordText"
//                 onClick={() => setChangePasswordIsClicked(true)}
//               >
//                 Change
//               </button>
//             </div>
//           </div>
//           <div className="containerForAddFile">
//             <img
//               src={`http://localhost:3000/${actualUser?.avatar}`}
//               height={250}
//               width={250}
//             />

//             <div className="fileInput">
//               <input
//                 type="file"
//                 id="avatar"
//                 name="avatar"
//                 accept="image/png, image/jpeg"
//                 onChange={onChangePicture}
//               />
//               <button className="changeFile" onClick={sendAvatar}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default UserDetailsCopy;

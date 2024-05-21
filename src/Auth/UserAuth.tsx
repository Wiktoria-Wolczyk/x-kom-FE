// import React from 'react'

// const UserAuth = () => {
//   return (
// <div className="divForUser">
//   <Menu isOpen={menuLoginIsOpen}>
//     <>
//       <MenuButton
//         onClick={handleChangeAuthMenuOpen}
//         className="loginButtonClass"
//         as={IconButton}
//         variant="outline"
//         aria-label="Options"
//         icon={
//           <Avatar
//             className="avatar"
//             size="sm"
//             name="Penguin"
//             // src="https://i.pinimg.com/736x/ac/5a/ba/ac5abaa60fc9b50ca8764221f3787dfc.jpg"
//             src="p"
//           />
//         }
//       />

//       <MenuList className="loginList">
//         <div className="loginContainer">
//           <span className="loginText">Log In</span>
//           <div className="divForLoginBy">
//             <input className="logInByGoogle" type="button" value="Google" />
//             <div className="lineBetweenLogin"></div>
//           </div>
//           <div className="divForLoginInputs">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <Input
//                     className="email"
//                     placeholder="email"
//                     size="lg"
//                     bgColor={"white"}
//                     {...field}
//                   />
//                 )}
//               />
//               {/* <input className="emailInput" placeholder="email" /> */}
//               <Controller
//                 name="password"
//                 control={control}
//                 render={({ field }) => (
//                   <Input
//                     className="password"
//                     placeholder="password"
//                     size="lg"
//                     bgColor={"white"}
//                     {...field}
//                   />
//                 )}
//               />

//               {/* <input className="passwordInput" placeholder="password" /> */}

//               <div className="divForForgotPasswordButton">
//                 <button className="forgotPasswordButton">
//                   Forgot Password
//                 </button>
//               </div>

//               <input
//                 type="submit"
//                 className="buttonLogIn"
//                 style={{
//                   color: buttonLoginIsClicked ? "green" : "red",
//                 }}
//               />
//             </form>
//           </div>
//           <div className="divForRegister">
//             <input
//               className="buttonRegister"
//               type="button"
//               value="Register"
//               onClick={() => {
//                 navigate("/register");
//                 setMenuLoginIsOpen(false);
//               }}
//             />
//           </div>
//         </div>
//       </MenuList>
//     </>
//   </Menu>
// </div>;
//  )
// }
// export default UserAuth

export default {};

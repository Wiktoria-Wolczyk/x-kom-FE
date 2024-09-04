import React from "react";
import { useContext, useState, useEffect } from "react";
import { LoginContext } from "../context/loginContext/LoginContext";
import "./copyCss.css";
import { useNavigate } from "react-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Input, Stack } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { IActualUser } from "../context/loginContext/LoginContext";
import { useMutation } from "@tanstack/react-query";
import "../Profile/UserDetails.css";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

interface IFileWithPreview extends File {
  preview?: string;
}

function UserDetails() {
  const navigate = useNavigate();
  const { actualUser, setActualUser } = useContext(LoginContext);
  const [editNameIsClicked, setEditNameIsClicked] = useState(false);
  const [changeEmailIsClicked, setChangeEmailIsClicked] = useState(false);
  const [changePasswordIsClicked, setChangePasswordIsClicked] = useState(false);
  const [files, setFiles] = useState<IFileWithPreview[]>([]);
  const [dragDropIsClicked, setDragDropIsClicked] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const mutation = useMutation({
    mutationFn: (data: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => {
      return axios.put(
        `http://localhost:3000/users/${actualUser?.id}`,

        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    },
    onSuccess: (data, variables) => {
      const newActualUser = {
        ...actualUser!,
        ...variables,
      };
      setActualUser(newActualUser);

      toast("account updated!", {
        icon: "👏",
      });
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setDragDropIsClicked(true);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const sendAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", files[0]!);
    formData.append("userID", `${actualUser!.id}`);

    try {
      const response = await axios.post(
        "http://localhost:3000/files/fs/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const updatedUser: IActualUser = {
        ...actualUser!,
        avatar: response.data.message.avatar,
      };

      setActualUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  };

  const thumbs = files.map((file) => (
    <div style={thumb as object} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview!);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview!));
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: actualUser?.firstName || "",
      lastName: actualUser?.lastName || "",
      email: actualUser?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      setEditNameIsClicked(false);

      await mutation.mutate({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error(err);
      toast.error("server error - try again later");
    }
  };

  // const updateAvatar = async (data: IUserAvatar) => {
  //   try {
  //     setSaveAvatarIsClicked(true);

  //     const updateUserAvatar = async () =>
  //       axios.put(
  //         `http://localhost:3000/users/files/fs/upload`,
  //         {
  //           avatar: ,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //     await updateUserAvatar();

  //     let updatedUser = {
  //       ...actualUser!,
  //       avatar: ,
  //     };
  //     setActualUser(updatedUser);

  //     localStorage.getItem("token");
  //     // reset();
  //     toast("avatar updated!", {
  //       icon: "👏",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("server error - try again later");
  //   }
  // };

  return (
    <>
      {editNameIsClicked ? (
        <div className="containerForChangeUserNameComponent">
          <div className="divForReturnButtonInChangeUserName">
            <button
              className="returnButtonInChangeUserName"
              onClick={() => setEditNameIsClicked(false)}
            >
              <i className="fa-solid fa-chevron-left "></i>
            </button>
            <p onClick={() => navigate("/user_details")}>Your details</p>
          </div>
          <div className="containerForForm">
            <form
              className="informationsAboutUser"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="informationsFirstName">FirstName: </label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="firstName"
                      placeholder="FirstName"
                      size="lg"
                      bgColor={"white"}
                      {...field}
                    />
                  )}
                />
                <label className="informationsLastName">LastName: </label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="lastName"
                      placeholder="LastName"
                      size="lg"
                      bgColor={"white"}
                      {...field}
                    />
                  )}
                />
              </div>
              <input
                className="buttonAcceptNameChanges"
                type="submit"
                value="Save"
              />
            </form>
          </div>
        </div>
      ) : changeEmailIsClicked ? (
        <div className="containerForChangeUserNameComponent">
          <div className="divForReturnButtonInChangeUserName">
            <button
              className="returnButtonInChangeUserName"
              onClick={() => setChangeEmailIsClicked(false)}
            >
              <i className="fa-solid fa-chevron-left "></i>
            </button>
            <p onClick={() => navigate("/user_details")}>Your details</p>
          </div>
          <div className="containerForForm">
            <form
              className="informationsAboutUser"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="informationsFirstName">Email: </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="loginEmail"
                      placeholder="Email"
                      size="lg"
                      {...field}
                    />
                  )}
                />
              </div>
              <input
                className="buttonAcceptNameChanges"
                type="submit"
                value="Save"
              />
            </form>
          </div>
        </div>
      ) : changePasswordIsClicked ? (
        <div className="containerForChangeUserNameComponent">
          <div className="divForReturnButtonInChangeUserName">
            <button
              className="returnButtonInChangeUserName"
              onClick={() => setChangePasswordIsClicked(false)}
            >
              <i className="fa-solid fa-chevron-left "></i>
            </button>
            <p onClick={() => navigate("/user_details")}>Your details</p>
          </div>
          <div className="containerForForm">
            <form
              className="informationsAboutUser"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="informationsFirstName">Password: </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="passwordToChange"
                      placeholder="Password"
                      size="lg"
                      {...field}
                    />
                  )}
                />
              </div>
              <input
                className="buttonAcceptNameChanges"
                type="submit"
                value="Save"
              />
            </form>
          </div>
        </div>
      ) : (
        <>
          <button
            className="returnButtonInUserDetails"
            onClick={() => navigate("/list")}
          >
            <i className="fa-solid fa-chevron-left "></i>
            <p>Wróć</p>
          </button>
          <p className="textAccountSettings">Ustawienia konta</p>
          <div className="accountDataText">Dane konta</div>
          <div className="yourDetailsText">Twoje dane</div>
          <div className="containerForUserNameAndEdit">
            <div className="containerForUserName">
              <p className="pUserFirstName">{actualUser?.firstName}</p>
              <p>{actualUser?.lastName}</p>
            </div>
            <div className="editUserName">
              <button
                className="editNameText"
                onClick={() => setEditNameIsClicked(true)}
              >
                Edytuj
              </button>
            </div>
          </div>
          <div className="userEmailText">E-mail</div>
          <div className="containerForEmailAndEdit">
            <div className="containerForEmail">
              <p className="pUserEmail">{actualUser?.email}</p>
            </div>
            <div className="changeEmail">
              <button
                className="editEmailText"
                onClick={() => setChangeEmailIsClicked(true)}
              >
                Zmień
              </button>
            </div>
          </div>
          <div className="userPasswordText">Password</div>
          <div className="containerForPasswordAndEdit">
            <div className="containerForPassword">
              <p className="pUserPassword">******</p>
            </div>
            <div className="editPassword">
              <button
                className="changePasswordText"
                onClick={() => setChangePasswordIsClicked(true)}
              >
                Zmień
              </button>
            </div>
          </div>
          <div>
            <div className="divForYourConsentsAndNotificationSettings">
              Twoje zgody i ustawienia powiadomień
            </div>
            <div className="divForPrivacyPolicyTextAndButton">
              <span>Zaznaczając pola, akceptujesz</span>
              <button className="privacyPolicy">Politykę prywatności</button>
            </div>
            <div className="containerForCheckboxPrivacyPolicy">
              <Stack pl={0} mt={1} spacing={4}>
                <Checkbox
                  className="parentCheckboxInPrivacyPolicy"
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    setCheckedItems([
                      e.target.checked,
                      e.target.checked,
                      e.target.checked,
                      e.target.checked,
                    ])
                  }
                >
                  Zaznacz wszystkie
                </Checkbox>

                <Checkbox
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                >
                  Chcę otrzymywać informacje o aktualnych ofertach oraz
                  promocjach w wiadomości e-mail{" "}
                  <button className="privacyPolicy">Więcej</button>
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[1]}
                  onChange={(e) =>
                    setCheckedItems([checkedItems[0], e.target.checked])
                  }
                >
                  Chcę otrzymywać wiadomości SMS.{" "}
                  <button className="privacyPolicy">Więcej</button>
                </Checkbox>

                <Checkbox
                  isChecked={checkedItems[2]}
                  onChange={(e) =>
                    setCheckedItems([
                      checkedItems[0],
                      checkedItems[1],
                      e.target.checked,
                    ])
                  }
                >
                  Chcę otrzymywać informacje telefonicznie{" "}
                  <button className="privacyPolicy">Więcej</button>
                </Checkbox>
                <Checkbox
                  isChecked={checkedItems[3]}
                  onChange={(e) =>
                    setCheckedItems([
                      checkedItems[0],
                      checkedItems[1],
                      checkedItems[2],
                      e.target.checked,
                    ])
                  }
                >
                  Chcę otrzymywać ofertę dopasowaną do moich potrzeb{" "}
                  <button className="privacyPolicy">Więcej</button>
                </Checkbox>
              </Stack>
              <div className="divForButtonSaveAgreement">
                <button className="agreementButton">Zapisz zgody</button>
              </div>
            </div>
          </div>
          <div className="avatarAndDragZoneContainer">
            <div className="dropzoneContainer">
              <img
                className="avatarImage"
                src={`http://localhost:3000/${actualUser?.avatar}`}
                height={250}
                width={250}
              />

              <div
                className="styleForDragDrop"
                style={{ height: dragDropIsClicked ? "300px" : "100px" }}
              >
                <section className="containerDopzone">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p>
                      {"Przeciągnij i upuść plik aby zmienić zdjęcie profilowe"}
                    </p>
                  </div>
                  <aside style={thumbsContainer as object}>{thumbs}</aside>
                </section>
              </div>
              <button className="sendAvatar" onClick={sendAvatar}>
                Zapisz zdjęcie
              </button>
            </div>
          </div>
          {/* <div className="containerForAddFile">
            {" "}
            <img
              src={`http://localhost:3000/${actualUser?.avatar}`}
              height={250}
              width={250}
            />
            <div className="fileInput">
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={onChangePicture}
              />
            </div>
          </div> */}
        </>
      )}
    </>
  );
}

// function Previews(props: any) {
//   const [files, setFiles] = useState<any[]>([]);
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "image/*": [],
//     },
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file: any) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });

//   const thumbs = files.map((file) => (
//     <div style={thumb as any} key={file.name}>
//       <div style={thumbInner}>
//         <img
//           src={file.preview}
//           style={img}
//           // Revoke data uri after image is loaded
//           onLoad={() => {
//             URL.revokeObjectURL(file.preview);
//           }}
//         />
//       </div>
//     </div>
//   ));

//   useEffect(() => {
//     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
//     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
//   }, []);

//   return (
//     <div className="dropzoneContainer">
//       <div className="styleForDragDrop">
//         <section className="container">
//           <div {...getRootProps({ className: "dropzone" })}>
//             <input {...getInputProps()} />
//             <p>Drag 'n' drop some files here, or click to select files</p>
//           </div>
//           <aside style={thumbsContainer as any}>{thumbs}</aside>
//         </section>
//       </div>
//     </div>
//   );
// }

// <Previews />;

export default UserDetails;

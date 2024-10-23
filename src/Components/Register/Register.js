import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { auth, db } from "../../../Firebase/Firebase";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { width, height, totalSize } from "react-native-dimension";
import Constant from "../../Constant/Constant";

// Define your validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^01[0-5]\d{8}$/, "Phone number must start with '01' followed by a digit from 0 to 5 and be 11 digits long")
    .required("Phone number is required"),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*\W)(?=.*[0-9]).{8,16}$/, "Password must contain at least one number, one special character, and one uppercase letter")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
    watch,
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const checkUsernameExists = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const onHandleSubmit = async (data) => {
    try {
      const usernameExists = await checkUsernameExists(data.name);
      if (usernameExists) {
        Alert.alert("Username already exists", "Please choose a different username.");
        return;
      }

      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          username: data.name,
          phoneNum: data.phoneNumber,
          userEmail: data.email,
        });
      }
      Alert.alert("Success", "User Registered Successfully!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "This email is already registered. Please log in.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: width(5), paddingTop: height(5) }}>
        <Text style={{ fontSize: totalSize(4), textAlign: "center", marginBottom: height(4) }}>Register</Text>

        <View style={{ marginBottom: height(2) }}>
          <TextInput
            label="Name"
            mode="outlined"
            style={{ marginBottom: height(2) }}
            error={!!errors.name}
            {...register("name")}
            onChangeText={(value) => {
              trigger("name");
              setValue("name", value);
            }}
          />
          {errors.name && <Text style={{ color: "red" }}>{errors.name.message}</Text>}
        </View>

        <View style={{ marginBottom: height(2) }}>
          <TextInput
            label="Email"
            mode="outlined"
            style={{ marginBottom: height(2) }}
            error={!!errors.email}
            {...register("email")}
            onChangeText={(value) => {
              trigger("email");
              setValue("email", value);
            }}
          />
          {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}
        </View>

        <View style={{ marginBottom: height(2) }}>
          <TextInput
            label="Phone Number"
            mode="outlined"
            style={{ marginBottom: height(2) }}
            error={!!errors.phoneNumber}
            {...register("phoneNumber")}
            onChangeText={(value) => {
              trigger("phoneNumber");
              setValue("phoneNumber", value);
            }}
          />
          {errors.phoneNumber && <Text style={{ color: "red" }}>{errors.phoneNumber.message}</Text>}
        </View>

        <View style={{ marginBottom: height(2) }}>
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            style={{ marginBottom: height(2) }}
            error={!!errors.password}
            {...register("password")}
            onChangeText={(value) => {
              trigger("password");
              setValue("password", value);
            }}
          />
          {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}
        </View>

        <View style={{ marginBottom: height(2) }}>
          <TextInput
            label="Confirm Password"
            mode="outlined"
            secureTextEntry
            style={{ marginBottom: height(2) }}
            error={!!errors.confirmPassword}
            {...register("confirmPassword")}
            onChangeText={(value) => {
              trigger("confirmPassword");
              setValue("confirmPassword", value);
            }}
          />
          {errors.confirmPassword && <Text style={{ color: "red" }}>{errors.confirmPassword.message}</Text>}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Constant.Colors.purple,
            paddingVertical: height(2),
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={handleSubmit(onHandleSubmit)}
          disabled={!isValid}
        >
          <Text style={{ color: "white", fontSize: totalSize(2.5) }}>Register</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: height(2) }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: Constant.Colors.purple }}>Login now</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;

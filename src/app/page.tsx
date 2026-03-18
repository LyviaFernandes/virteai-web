import Card from "@/components/card-carrosel/Card";
import ButtonEnter from "@/components/enter-button/Button";
import Footer from "@/components/footer/Footer";
import HeaderEnter from "@/components/header-enter/HeaderEnter";
import HeaderHome from "@/components/header-logout/Header";
import Input from "@/components/input/Input";
import Image from "next/image";
import HomePage from "./Home/page";
import AboutUs from "./AboutUs/page";
import Login from "./Login/page";
import PatientSingup from "./SingUpPatient/page";
import TherapistSingup from "./SingUpTherapist/page";
import RedefinePassword from "./RedefineWeb/page";
import Profile from "./Profile/page";
import Acess from "./AccountAcess/page";
import TherapistList from "./TherapistList/page";
import Questionnaire from "./AQ10TestWeb/page";
import BigQuestionnaire from "./AQ50TestWeb/page";

export default function Home() {
  return (
    <Questionnaire/>
    
  );
}

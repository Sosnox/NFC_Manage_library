import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "./Login";
import ManageCard from "./ManageCard";
import Visualization from "./Visualization";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
    >
     <Visualization/>
    </main>
  );
}

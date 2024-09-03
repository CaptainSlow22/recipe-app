import Link from "next/link";
import React from "react";
import Spline from "@splinetool/react-spline";

export default async function Home() {

  return (
    <main>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen px-8 md:px-10 lg:px-32">
        <div className="flex flex-col w-full">
          <h1 className="text-4xl md:text-8xl lg:text-8xl text-left font-black text-green-600">Enjoy food</h1>
          <h1 className="text-4xl md:text-8xl lg:text-8xl text-left font-black ">from all over the world🌎</h1>
          <Link href="/login"><button className="mt-8 text-2xl px-4 py-2 md:text-4xl md:px-8 md:py-4 rounded-full text-nowrap bg-black text-white font-black hover:scale-105 hover:shadow-xl">Get Started</button></Link>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:items-center lg:h-screen lg:w-screen">
        <Spline
          scene="https://prod.spline.design/ooAISnAsmnCOvDID/scene.splinecode" 
        />
        </div>
      </div>
    </main>
  );
}
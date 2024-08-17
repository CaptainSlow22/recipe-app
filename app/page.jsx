import Link from "next/link";
import React from "react";
import Spline from "@splinetool/react-spline";

export default async function Home() {

  return (
    <main>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen px-8 md:px-10 lg:px-32">
        <div className="flex flex-col w-full md:w-2/3">
          <h1 className="text-4xl md:text-4xl lg:text-8xl text-left font-black text-green-600">Enjoy food</h1>
          <h1 className="text-4xl md:text-4xl lg:text-8xl text-left font-black md:w-2/3">from all over the world🌎</h1>
          <Link href="/login" className="inline-block"><button className="mt-8 text-2xl px-4 py-2 md:text-4xl md:px-8 md:py-4 rounded-full text-nowrap bg-black text-white font-black hover:scale-105 hover:shadow-xl">Log In</button></Link>
        </div>
        <div className="hidden md:flex md:flex-col md:items-center md:h-full md:w-full">
        <Spline
        scene="https://prod.spline.design/ooAISnAsmnCOvDID/scene.splinecode" 
      />
        </div>
      </div>
    </main>
  );
}
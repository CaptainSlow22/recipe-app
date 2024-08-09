import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
    return (
      <>
        <Navbar/>
        <main className="bg-gray-100">{children}</main>
      </>
    )
  }
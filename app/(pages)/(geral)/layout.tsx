import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow justify-between flex gap-2 flex-col">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

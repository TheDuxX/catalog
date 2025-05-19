import Footer from "../_components/footer";
import Header from "../_components/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow justify-between flex flex-col">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

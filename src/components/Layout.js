import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = (props) => {
  const { children } = props;
  return (
    <div className="mx-auto w-[1500px]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

import Navigation from "../Navigation";

export default function MainLayout({ children, parentPage, extramenu }: any) {
  return (
    <div className="h-screen w-screen flex flex-col  overflow-x-hidden">
      <Navigation />
      <div className="p-4 w-full z-1 4xl:w-[60%]">{children}</div>
    </div>
  );
}

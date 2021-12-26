import Navigation from "../Navigation";

export default function MainLayout({ children, parentPage, extramenu }: any) {
  return (
    <div className="h-screen w-screen flex flex-col 4xl:w-[60%]">
      <Navigation parentPage={parentPage} extramenu={extramenu} />
      <div className="p-4 w-full z-1">{children}</div>
    </div>
  );
}

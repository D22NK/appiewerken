import Navigation from "../Navigation";

export default function MainLayout({ children, parentPage }: any) {
  return (
    <div className="h-screen w-screen flex flex-row 4xl:w-[60%]">
      <Navigation parentPage={parentPage} />
      <div className="m-10 w-full">{children}</div>
    </div>
  );
}

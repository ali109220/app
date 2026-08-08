import FormToaster from "@/site/FormToaster";

export default function ConnectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <FormToaster />
    </>
  );
}

import FormToaster from "@/site/FormToaster";

export default function CareersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <FormToaster />
    </>
  );
}

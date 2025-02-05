import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";

export default async function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10">
        <CustomServerImage
          dbImageName="wxj6qt7h4f2w69wjwkk2kre6-bg-ocean.webp"
          className="opacity-10"
        />
      </div>
      <div className="prose dark:prose-invert mx-auto max-w-full">
        {children}
      </div>
    </div>
  );
}

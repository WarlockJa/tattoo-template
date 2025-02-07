export default async function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="prose prose-invert prose-img:m-0 mx-auto max-w-full">
      {children}
    </div>
  );
}

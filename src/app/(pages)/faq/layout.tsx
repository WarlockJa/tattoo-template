export default async function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="prose dark:prose-invert mx-auto max-w-full">{children}</div>
  );
}

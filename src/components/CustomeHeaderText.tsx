import AnimatedComponent from "./UniversalComponents/AnimatedComponent";

export default function CustomeHeaderText({ text }: { text: string }) {
  return (
    <AnimatedComponent once className="text-center">
      <h1 className="py-4 text-3xl sm:text-4xl md:text-5xl">{text}</h1>
    </AnimatedComponent>
  );
}

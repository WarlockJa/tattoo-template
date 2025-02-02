import AnimatedComponent from "./UniversalComponents/AnimatedComponent";

export default function CustomeHeaderText({ text }: { text: string }) {
  return (
    <AnimatedComponent once className="text-center">
      <h2 className="font-kings py-4 text-3xl sm:text-4xl md:text-5xl">
        {text}
      </h2>
    </AnimatedComponent>
  );
}

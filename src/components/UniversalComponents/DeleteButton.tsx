import { Loader2Icon, Trash2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export function DeleteButton({
  isLoading,
  isDisabled,
  className,
  execute,
  title,
  description,
}: ButtonProps & {
  isLoading?: boolean;
  isDisabled: boolean;
  execute: () => void;
  title: string;
  description: string;
}) {
  // TODO add translations
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isDisabled}>
        <Button className={className} size={"icon"} variant={"destructive"}>
          {isLoading ? (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="w-full object-contain hover:stroke-destructive" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-md">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={execute}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

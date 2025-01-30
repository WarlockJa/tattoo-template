"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function SonnerErrorCard({
  title,
  errors,
}: {
  title: string;
  errors: React.JSX.Element | string;
}) {
  return (
    <Card className="w-full bg-destructive text-destructive-foreground">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardContent className="p-0 pl-4">{errors}</CardContent>
      </CardHeader>
    </Card>
  );
}

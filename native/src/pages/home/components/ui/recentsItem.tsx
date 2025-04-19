import { Book } from "@/shared/lib/appSchema";
import React from "react";

type RecentsItemProps = {
	book: Book;
	coverPath: string | null;
};

export default function RecentsItem({ book, coverPath }: RecentsItemProps) {
	return <li>{book.title}</li>;
}

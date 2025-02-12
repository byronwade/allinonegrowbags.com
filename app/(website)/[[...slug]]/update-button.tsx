"use client";

import { useState } from "react";
import { updateContact } from "@/app/_actions/update-contact";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function UpdateButton() {
	const [isUpdating, setIsUpdating] = useState(false);

	const handleUpdate = async () => {
		try {
			setIsUpdating(true);
			const result = await updateContact();

			if (result.success) {
				toast({
					title: "Success",
					description: "Contact page updated successfully",
					variant: "success",
				});
				// Refresh the page to show the changes
				window.location.reload();
			} else {
				toast({
					title: "Error",
					description: result.error || "Failed to update contact page",
					variant: "destructive",
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "An unexpected error occurred",
				variant: "destructive",
			});
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<Button onClick={handleUpdate} disabled={isUpdating} className="fixed bottom-4 right-4 bg-purple hover:bg-purple-dark">
			{isUpdating ? "Updating..." : "Update Contact Page"}
		</Button>
	);
}

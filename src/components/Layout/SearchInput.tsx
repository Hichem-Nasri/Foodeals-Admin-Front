"use client"
import { FC } from "react"
import { Input } from "../custom/Input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form"
import { Search } from "lucide-react"
import { InputFieldForm } from "../custom/InputField"

interface SearchInputProps { }

export const SearchInput: FC<SearchInputProps> = ({ }) => {
	const schema = z.object({
		search: z.string(),
	})
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		mode: "onBlur",
		defaultValues: {
			search: "",
		},
	})
	const { handleSubmit, control } = form

	const onsubmit = (data: z.infer<typeof schema>) => { }
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onsubmit)} className="w-full">
				<InputFieldForm
					form={form}
					name="search"
					placeholder="Rechercher"
					className="lg:w-[23.438rem] py-3 h-fit lg:bg-lynch-50 bg-white"
					iconLeftColor="text-lynch-300"
					IconLeft={Search}
				/>
			</form>
		</Form>
	)
}

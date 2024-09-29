import * as React from "react"
import { cn } from "@/lib/utils"
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { AvatarAndName } from "@/components/AvatarAndName"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

export type MultiSelectOptionsType = {
	key: string | number
	label: string
	avatar?: string
}
interface MultiSelectProps {
	options: MultiSelectOptionsType[]
	selectedValues: string[]
	onSelect: (value: string[]) => void
	transform?: (value: MultiSelectOptionsType[]) => JSX.Element[]
	disabled?: boolean
	placeholder?: string
	searchPlaceholder?: string
	id?: string
	emptyAvatar?: string
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
	options,
	selectedValues,
	onSelect,
	transform,
	disabled = false,
	placeholder = "sélectionner",
	searchPlaceholder,
	emptyAvatar,
	id,
}) => {
	const selectedOptions = options.filter((option) => selectedValues.includes(option.key.toString()))
	return (
		<Popover>
			<PopoverTrigger disabled={disabled} id={id} className="w-full">
				<div
					className={cn(
						"flex items-center gap-2 py-2 px-3 w-full rounded-[12px] bg-lynch-50 border-0 text-lynch-400 hover:text-lynch-700 font-normal text-base min-h-14 max-w-[32.625rem]",
						disabled ? "opacity-50" : "cursor-pointer",
						selectedValues.length > 0 ? "border-textGray" : ""
					)}>
					{selectedValues.length == 1 && !transform ? (
						selectedOptions[0].avatar && (
							<AvatarAndName avatar={selectedOptions[0].avatar} name={selectedOptions[0].label} />
						)
					) : !selectedValues.length && !transform ? (
						<AvatarAndName avatar={emptyAvatar} name={placeholder} />
					) : transform && selectedValues.length ? (
						selectedOptions.length > 3 ? (
							<React.Fragment>
								{transform(selectedOptions).slice(0, 3)}
								<Dialog>
									<DialogTrigger>
										{transform([
											{
												key: "more",
												label: `+${selectedOptions.length - 3}`,
											},
										])}
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Activité du partenaire</DialogTitle>
											<DialogDescription className="flex flex-wrap gap-3">
												{transform(selectedOptions)}
											</DialogDescription>
										</DialogHeader>
									</DialogContent>
								</Dialog>
							</React.Fragment>
						) : (
							transform(selectedOptions)
						)
					) : transform && !selectedValues.length ? (
						placeholder
					) : (
						<AvatarAndName avatar={emptyAvatar} name="Multi" />
					)}
					<ChevronDown className="opacity-50 ml-auto" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="rounded-[16px] p-3">
				<Command className="flex flex-col gap-5 p-0">
					<CommandInput
						className="bg-lynch-50 placeholder:text-base placeholder:font-normal text-base font-normal placeholder:text-input text-textGray"
						placeholder={searchPlaceholder}
					/>
					<CommandList>
						<CommandGroup className="p-0">
							{!disabled &&
								options?.map((option) => {
									const isSelected = selectedValues.includes(option.key.toString())
									return (
										<CommandItem
											key={option.key}
											onSelect={() => {
												if (isSelected) {
													const newData = selectedValues.filter((selected) => option.key !== selected)
													onSelect(newData)
												} else {
													const newData = [...selectedValues, option.key] as string[]
													onSelect(newData)
												}
											}}
											className="gap-3 items-center cursor-pointer py-2 px-3 rounded-[12px] text-base font-normal text-lynch-500">
											<Checkbox checked={isSelected} />
											<AvatarAndName avatar={option.avatar} name={option.label} />
										</CommandItem>
									)
								})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

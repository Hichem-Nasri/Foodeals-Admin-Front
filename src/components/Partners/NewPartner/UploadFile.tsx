import { Input } from "@/components/custom/Input"
import { CloudUpload, FileMinus, X } from "lucide-react"
import { FC, useState } from "react"

interface UploadFileProps {
	value?: File
	onChange?: (file: File) => void
	disabled?: boolean
}

export const UploadFile: FC<UploadFileProps> = ({ disabled, onChange, value }) => {
	const [files, setFiles] = useState<File[]>([])

	return (
		<div className={"flex relative w-full"}>
			<Input
				name="file"
				disabled={disabled}
				onChange={() => {}}
				value={""}
				IconRight={CloudUpload}
				placeholder={files.length ? "" : "Charger le contrat"}
			/>
			<input
				type="file"
				className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
				onChange={(e) => setFiles((prev) => [...prev, e.target.files![0]])}
				disabled={disabled}
			/>
			<div className="flex gap-3 items-center absolute top-1/2 -translate-y-1/2 left-4">
				{files &&
					files.map((file) => (
						<span
							className="flex items-center gap-3 py-[0.4rem] px-3 bg-lynch-200 text-lynch-500 rounded-[100px] z-20"
							key={file.name}>
							<FileMinus size={14} />
							{file.name.split(".")[0]}
							<X
								className="cursor-pointer"
								size={14}
								onClick={() => setFiles(files.filter((prev) => prev.name !== file.name))}
							/>
						</span>
					))}
			</div>
		</div>
	)
}

// components/IframeRenderer.tsx
import { Input } from "@/components/custom/Input"
import { FormField } from "@/components/ui/form"
import { PartnerInformationSchema } from "@/types/PartnerSchema"
import { Link2 } from "lucide-react"
import React, { FC, Fragment } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

interface IframeRendererProps {
	form: UseFormReturn<z.infer<typeof PartnerInformationSchema>>
	disabled?: boolean
}

export const IframeRenderer: FC<IframeRendererProps> = ({ form, disabled }) => {
	return (
		<FormField
			control={form.control}
			name="mapLocation"
			render={({ field }) => (
				<Fragment>
					<Input {...field} type="text" label="Iframe" value={field.value} IconLeft={Link2} disabled={disabled} />
					<div className="iframe-container [&>iframe]:w-full" dangerouslySetInnerHTML={{ __html: field.value }} />
				</Fragment>
			)}
		/>
	)
}

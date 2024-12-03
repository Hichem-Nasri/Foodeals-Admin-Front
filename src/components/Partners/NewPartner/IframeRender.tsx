// components/IframeRenderer.tsx
import { Input } from '@/components/custom/Input'
import { FormField } from '@/components/ui/form'
import { PartnerInformationSchema } from '@/types/PartnerSchema'
import { Link2 } from 'lucide-react'
import React, {
    FC,
    Fragment,
    useEffect,
    useState,
    useCallback,
    useMemo,
} from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface IframeRendererProps {
    form: UseFormReturn<z.infer<any>>
    disabled?: boolean
}

const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

const IframeRenderer: FC<IframeRendererProps> = ({ form, disabled }) => {
    const [inputValue, setInputValue] = useState(form.getValues('mapLocation'))

    const updateInputValue = useCallback(
        debounce((value: string) => {
            setInputValue(value)
        }, 500),
        []
    )

    useEffect(() => {
        const subscription = form.watch((value) => {
            updateInputValue(value.mapLocation)
        })
        return () => subscription.unsubscribe()
    }, [form, updateInputValue])

    const iframeContent = useMemo(() => inputValue, [inputValue])

    return (
        <FormField
            control={form.control}
            name="mapLocation"
            render={({ field }) => (
                <Fragment>
                    <Input
                        {...field}
                        type="text"
                        label="Iframe"
                        value={field.value}
                        IconLeft={Link2}
                        disabled={disabled}
                    />
                    <div
                        className="iframe-container [&>iframe]:w-full [&>iframe]:rounded-[12px]"
                        dangerouslySetInnerHTML={{ __html: iframeContent }}
                    />
                </Fragment>
            )}
        />
    )
}

export default React.memo(IframeRenderer)

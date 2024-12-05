'use client'
import { FC, useState } from 'react'
import { Input } from '../custom/Input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form'
import { Search } from 'lucide-react'
import { InputFieldForm } from '../custom/InputField'
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command'
import { pagesData } from '@/lib/pages'
import Link from 'next/link'

interface SearchInputProps {}

export const SearchInput: FC<SearchInputProps> = ({}) => {
    const schema = z.object({
        search: z.string(),
    })
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            search: '',
        },
    })
    const [search, setSearch] = useState('')
    const ListPage = pagesData
    const { handleSubmit, control } = form

    const onsubmit = (data: z.infer<typeof schema>) => {}
    return (
        // <Command>
        //     <CommandInput
        //         name="search"
        //         placeholder="Rechercher"
        //         className="lg:w-[23.438rem] py-3 h-fit lg:bg-lynch-50 bg-white"
        //         onValueChange={(value) => setSearch(value)}
        //     />
        //     <CommandList>
        //         <CommandGroup heading="pages">
        //             {ListPage.map((page, index) => (
        //                 <Link href={page.href} key={index.toString()}>
        //                     <CommandItem className="w-full">
        //                         <page.icon className="w-5 h-5 text-lynch-300" />
        //                         {page.label}
        //                     </CommandItem>
        //                 </Link>
        //             ))}
        //         </CommandGroup>
        //     </CommandList>
        // </Command>
        <Form {...form}>
            <form onSubmit={handleSubmit(onsubmit)} className="w-full">
                <InputFieldForm
                    control={control}
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

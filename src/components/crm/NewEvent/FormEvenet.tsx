'use client'
import { CustomButton } from '@/components/custom/CustomButton'
import { Input } from '@/components/custom/Input'
import { Label } from '@/components/Label'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { EvenetType } from '@/types/CrmType'
import axios from 'axios'
import { CheckCheck, ChevronLeft, FilePlus, X } from 'lucide-react'
import React, { FC, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

interface EvenProps {
    newEven: { object: string; message: string }
    changeEven: (key: string, value: string) => void
    open: boolean
    setOpen: (value: boolean) => void
    setEventCreate: (prev: EvenetType[]) => void
    Evenet: EvenetType[]
    label: string
}

export const FormEvenement: FC<EvenProps> = ({
    newEven,
    changeEven,
    open,
    setOpen,
    setEventCreate,
    Evenet,
    label,
}) => {
    const [errors, setErrors] = useState({ object: '', message: '' })

    const validate = () => {
        let valid = true
        let newErrors = { object: '', message: '' }

        if (newEven.message.length < 3) {
            newErrors.object = 'Element 1 must be at least 3 characters long'
            valid = false
        }

        if (newEven.object.length < 3) {
            newErrors.message = 'Element 2 must be at least 3 characters long'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) {
            try {
                const evenet: EvenetType = {
                    object: newEven.object,
                    message: newEven.message,
                    date: new Date().toISOString(),
                    lead: Evenet.length + 1, // Change this value to the lead id
                }
                // await axios.post('http://localhost:8080/api/v1/crm/prospects/{id}/events/create', newEven)
                setEventCreate([...Evenet, evenet])
                changeEven('object', '')
                changeEven('message', '')
                console.log('newEven:', newEven)
                setOpen(false)
            } catch (error) {}
        }
    }
    const isMobile = useMediaQuery({ query: '(max-width:1024px)' })
    const styleDialog = isMobile
        ? 'h-screen min-w-full flex justify-center items-center p-0'
        : 'top-0 translate-y-[-50%] data-[state=open]:translate-y-0 gap-4 border border-neutral-200 bg-white shadow-lg duration-200 data-[state=closed]:animate-none data-[state=open]:animate-none data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-0 data-[state=open]:zoom-in-0 data-[state=closed]:slide-out-to-right-full data-[state=closed]:slide-out-to-top-[0%] data-[state=open]:slide-in-from-right-full data-[state=open]:slide-in-from-top-[0%] sm:rounded-none sm:rounded-l-xl rounded-none  data-[state=open]:translate-x-[calc(50vw-700px)] h-screen min-w-[700px] bg-blend-overlay'
    return (
        <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
            <DialogTrigger>
                <CustomButton
                    onClick={() => {
                        setOpen(true)
                        changeEven('object', '')
                        changeEven('message', '')
                        setErrors({
                            object: '',
                            message: '',
                        })
                    }}
                    label={label}
                    IconRight={FilePlus}
                    className="bg-transparent hover:bg-mountain-500 text-mountain-500 hover:text-white border border-mountain-500 transition-all delay-100 duration-150"
                />
            </DialogTrigger>
            <DialogContent showContent={false} className={`${styleDialog}`}>
                <div className="h-full overflow-y-auto flex justify-start items-center flex-col w-full m-auto space-y-6 relative">
                    <DialogTitle className=" w-full flex flex-col justify-center items-center">
                        <div className="px-2 flex justify-between items-center text-base font-normal w-full text-lynch-400 lg:flex-row flex-row-reverse p-6">
                            <span
                                className={`${
                                    isMobile &&
                                    'text-lynch-950 text-normal font-base'
                                }`}
                            >
                                Nouveau évènement
                            </span>
                            <DialogClose
                                className="cursor-pointer text-lynch-400 hover:text-red-500 transition-all hover:scale-105 delay-100 duration-150"
                                onClick={() => {
                                    setOpen(false)
                                    changeEven('object', '')
                                    changeEven('message', '')
                                    setErrors({
                                        object: '',
                                        message: '',
                                    })
                                }}
                            >
                                {isMobile ? <ChevronLeft /> : <X />}
                            </DialogClose>
                        </div>
                        {isMobile && (
                            <span className="bg-mountain-500 w-full h-[2px]" />
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        <div className="flex items-start justify-between w-full px-2">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col items-center space-y-4 "
                            >
                                <div className="w-full px-2 space-y-2">
                                    <Label label="Object" htmlFor="object" />
                                    <Input
                                        type="text"
                                        name="object"
                                        value={newEven.object}
                                        onChange={(e: any) => {
                                            changeEven('object', e)
                                        }}
                                        className="w-full"
                                    />
                                    {errors.object &&
                                        newEven.object.length < 3 && (
                                            <span className="text-xs text-red-500">
                                                *{errors.object}
                                            </span>
                                        )}
                                </div>
                                <div className="w-full px-2 space-y-2">
                                    <Label label="Message" htmlFor="message" />
                                    <Textarea
                                        name="message"
                                        value={newEven.message}
                                        onChange={(e: any) => {
                                            changeEven(
                                                'message',
                                                e.target.value
                                            )
                                        }}
                                        className="w-full min-h-64 focus-visible:ring-0 focus:ring-0 outline-none text-lynch-400 font-normal text-base"
                                        cols={100}
                                        spellCheck={false}
                                        rows={100}
                                    />
                                    {errors.message &&
                                        newEven.message.length < 3 && (
                                            <span className="text-xs text-red-500">
                                                *{errors.message}
                                            </span>
                                        )}
                                </div>
                                <div
                                    className={`flex w-full ${
                                        !isMobile
                                            ? 'justify-end'
                                            : 'justify-between'
                                    } items-center space-x-4`}
                                >
                                    {isMobile && (
                                        <CustomButton
                                            type="button"
                                            label="Annuler"
                                            onClick={() => {
                                                setOpen(false)
                                                changeEven('object', '')
                                                changeEven('message', '')
                                                setErrors({
                                                    object: '',
                                                    message: '',
                                                })
                                            }}
                                            className="bg-transparent hover:bg-mountain-500 text-mountain-500 hover:text-white border border-mountain-500 transition-all delay-100 duration-150 min-w-[170.5px]"
                                            IconRight={X}
                                        />
                                    )}
                                    <CustomButton
                                        type="submit"
                                        label={
                                            isMobile
                                                ? 'CONFIRMER'
                                                : 'Confirmé l’évènement'
                                        }
                                        className={
                                            !isMobile
                                                ? 'justify-self-end bg-transparent hover:bg-mountain-500 text-mountain-500 hover:text-white border border-mountain-500 transition-all delay-100 duration-150 min-w-[170.5px]'
                                                : 'bg-mountain-400 text-white hover:bg-mountain-500 border border-mountain-500 hover:border-mountain-500 transition-all delay-100 duration-150 min-w-[170.5px]'
                                        }
                                        IconRight={CheckCheck}
                                    />
                                </div>
                            </form>
                        </div>
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog>
    )
}

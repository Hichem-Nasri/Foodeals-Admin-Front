import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ProductType } from '@/types/products'
import { Calendar, Eye, PencilLine } from 'lucide-react'
import { AppRoutes } from '@/lib/routes'
import Link from 'next/link'

interface ProductCardProps {
    product: ProductType
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col gap-3 bg-white p-6  h-auto rounded-[20px] max-w-[400px] min-w-full">
            <div className="flex justify-between items-center h-full w-full">
                <div className="flex flex-col justify-center gap-[3px] w-full">
                    <div className="justify-self-start flex justify-start items-start space-x-1 ">
                        <Avatar className="w-[46px] h-[46px]">
                            <AvatarImage
                                src={product.product.avatar}
                                sizes="46px"
                            />
                            <AvatarFallback>
                                {product.product.name &&
                                    product.product.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="gap-4">
                            <h1 className="text-lg">{product.product.name}</h1>
                            <h3 className="text-sm text-mountain-400">
                                {product.category}
                            </h3>
                        </div>
                    </div>
                    <div className="justify-center text-lynch-500 flex justify-items-center space-x-1.5">
                        <Calendar size={18} />
                        <h3 className="text-sm ">{product.date}</h3>
                    </div>
                </div>
                <div className="gap-3 w-full flex justify-end items-center">
                    <Link
                        href={
                            AppRoutes.ProductDetails.replace(
                                ':id',
                                product.id
                            ) + '?mode=edit'
                        }
                        className="size-11 rounded-full text-white bg-lynch-300 flex justify-center items-center hover:bg-lynch-500 transition-colors"
                    >
                        <PencilLine size={24} />
                    </Link>
                    <Link
                        href={AppRoutes.ProductDetails.replace(
                            ':id',
                            product.id
                        )}
                        className="size-11 rounded-full text-white bg-lynch-300 flex justify-center items-center hover:bg-lynch-500 transition-colors"
                    >
                        <Eye size={24} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

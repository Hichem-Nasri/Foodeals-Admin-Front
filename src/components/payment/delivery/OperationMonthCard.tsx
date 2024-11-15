import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProductType } from '@/types/products'
import { Calendar, Eye, PencilLine } from 'lucide-react'
import { AppRoutes } from '@/lib/routes'
import Link from 'next/link'
import { OperationMonthDeliveriesType } from './column/paymentOperationMonth'

interface ProductCardProps {
    product: OperationMonthDeliveriesType
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col gap-3 bg-white p-6  h-auto rounded-[20px] max-w-[400px] min-w-full">
            <div className="flex justify-between items-center h-full w-full">
                <div className="flex flex-col justify-center gap-[3px] w-full">
                    <div className="justify-self-start flex justify-start items-start space-x-1 ">
                        <Avatar className="w-[46px] h-[46px]">
                            <AvatarImage
                                src={product.Product.avatarPath}
                                sizes="46px"
                            />
                            <AvatarFallback>
                                {product.Product.name &&
                                    product.Product.name[0]}
                            </AvatarFallback>
                        </Avatar>
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

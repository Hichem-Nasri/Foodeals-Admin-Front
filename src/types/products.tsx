import { createColumnHelper } from '@tanstack/react-table'
import { ContactType } from './GlobalType'
import { AvatarAndName } from '@/components/AvatarAndName'
import { capitalize } from './utils'
import { PhoneBadge } from '@/components/Partners/PhoneBadge'
import { EmailBadge } from '@/components/Partners/EmailBadge'
import { ActionsMenu } from '@/components/custom/ActionsMenu'
import { Archive, Eye, Pen } from 'lucide-react'
import { z } from 'zod'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { AppRoutes } from '@/lib/routes'

export const Price = z.object({
    amount: z.number(),
    currency: z.string(),
})

export const ProductSchema = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    barcode: z.string(),
    type: z.string(),
    price: Price,
    productImagePath: z.string(),
    categoryId: z.string(),
    subCategoryId: z.string(),
    brandId: z.string(),
    rayonId: z.string(),
})

export type ProductSchemaType = z.infer<typeof ProductSchema>

type AvatarType = {
    name: string
    avatar: string
}

export type ProductType = {
    id: string
    ref: string
    product: AvatarType
    date: string
    codeBar: string
    brand: string
    category: string
    subCategory: string
    poweredby: AvatarType
    store: AvatarType
    phone: string
    email: string
}

const columnHelperProducts = createColumnHelper<ProductType>()

export const columnsProducts = (router: AppRouterInstance) => [
    columnHelperProducts.accessor('ref', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Réf',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('product', {
        cell: (info) => (
            <AvatarAndName
                name={info.getValue().name}
                avatar={info.getValue().avatar}
            />
        ),
        header: 'Nom',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('date', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Date de creation',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('codeBar', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Codebar',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('brand', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Marque',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('category', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Catégorie',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('subCategory', {
        cell: (info) => <div>{info.getValue()}</div>,
        header: 'Sous Catégorie',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('poweredby', {
        cell: (info) => {
            const fullName = `${capitalize(info.getValue().name)}`
            return (
                <AvatarAndName
                    name={fullName}
                    avatar={info.getValue().avatar}
                />
            )
        },
        header: 'Alimenter par',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('store', {
        cell: (info) => (
            <AvatarAndName
                name={info.getValue().name}
                avatar={info.getValue().avatar}
            />
        ),
        header: 'Magasin',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('phone', {
        cell: (info) => <PhoneBadge phone={info.getValue()} />,
        header: 'Téléphone',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('email', {
        cell: (info) => <EmailBadge email={info.getValue()} />,
        header: 'Email',
        footer: (info) => info.column.id,
    }),
    columnHelperProducts.accessor('id', {
        cell: (info) => {
            return (
                <ActionsMenu
                    id={info.getValue()}
                    menuList={[
                        {
                            label: 'Voir',
                            icon: Eye,
                            actions: () => {
                                router.push(
                                    AppRoutes.ProductDetails.replace(
                                        ':id',
                                        info.getValue()
                                    )
                                )
                            },
                        },
                        {
                            label: 'Modifier',
                            icon: Pen,
                            actions: () => {
                                router.push(
                                    AppRoutes.ProductDetails.replace(
                                        ':id',
                                        info.getValue()
                                    ) + '?mode=edit'
                                )
                            },
                        },
                        {
                            label: 'Archiver',
                            icon: Archive,
                            actions: () => {},
                        },
                    ]}
                />
            )
        },
        header: 'Activité',
        footer: (info) => info.column.id,
    }),
]

export const dataProducts: ProductType[] = [
    {
        id: '1',
        ref: 'REF-1',
        product: {
            name: 'Product 1',
            avatar: 'https://via.placeholder.com/120',
        },
        date: '2021-09-01',
        codeBar: '123456789',
        brand: 'Brand 1',
        category: 'Category 1',
        subCategory: 'Sub Category 1',
        poweredby: {
            name: 'Powered By 1',
            avatar: 'https://via.placeholder.com/120',
        },
        store: { name: 'Store 1', avatar: 'https://via.placeholder.com/120' },
        phone: '+212 6 12345678',
        email: 'test@gmial.com',
    },
    {
        id: '2',
        ref: 'REF-2',
        product: {
            name: 'Product 2',
            avatar: 'https://via.placeholder.com/120',
        },
        date: '2021-09-02',
        codeBar: '123456789',
        brand: 'Brand 2',
        category: 'Category 2',
        subCategory: 'Sub Category 2',
        poweredby: {
            name: 'Powered By 2',
            avatar: 'https://via.placeholder.com/120',
        },
        store: { name: 'Store 2', avatar: 'https://via.placeholder.com/120' },
        phone: '+212 6 12345678',
        email: 'test2@gmail.com',
    },
]

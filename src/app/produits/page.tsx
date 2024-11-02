import { Layout } from '@/components/Layout/Layout'
import React, { FC } from 'react'
import Product from '../../components/Products'
import { useQuery } from '@tanstack/react-query'
import { fetchProduct } from '@/lib/api/product/fetchProduct'

interface ProductPageProps {}

const ProductPage: FC<ProductPageProps> = () => {
    return (
        <Layout>
            <Product />
        </Layout>
    )
}

export default ProductPage

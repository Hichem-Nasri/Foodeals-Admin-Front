import { Layout } from '@/components/Layout/Layout'
import React, { FC } from 'react'
import Product from '../../components/Products'

interface ProductPageProps {}

const ProductPage: FC<ProductPageProps> = () => {
    return (
        <Layout>
            <h1>Product Page</h1>
            {/* <Product /> */}
        </Layout>
    )
}

export default ProductPage

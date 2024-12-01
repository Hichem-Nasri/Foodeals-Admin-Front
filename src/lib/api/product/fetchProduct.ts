import api from '@/lib/Auth'
import { API_URL } from '..'
import { appApi } from '@/lib/routes'
import { ProductSchemaType, ProductType } from '@/types/products'

export async function fetchProduct(
    id: string
): Promise<{ status: number; data: any }> {
    try {
        const response = await api
            .get(API_URL + appApi.productDetails.replace('{productId}', id))
            .catch((error) => {
                throw new Error('Failed to fetch product')
            })
        return { data: response.data, status: response.status } // TODO: replace demoData with response.data
    } catch (error) {
        console.error(error)
        return { data: [], status: 500 } // TODO: replace demoData with response.data
    }
}

export async function fetchAllProduct(
    currentPage: number,
    pageSize: number
): Promise<{ status: number; data: ProductType[] }> {
    try {
        const response = await api
            .get(
                API_URL +
                    appApi.productList +
                    `?page=${currentPage}&size=${pageSize}`
            )
            .catch((error) => {
                throw new Error('Failed to fetch product')
            })
        return { data: [], status: response.status } // TODO: replace demoData with response.data
    } catch (error) {
        console.error(error)
        return { data: [], status: 500 } // TODO: replace demoData with response.data
    }
}

export const emptyProduct: ProductSchemaType = {
    name: '',
    description: '',
    price: {
        amount: 0,
        currency: 'USD',
    },
    categoryId: '',
    subCategoryId: '',
    productImagePath: '',
    barcode: '',
    type: '',
    title: '',
    brandId: '',
    rayonId: '',
}

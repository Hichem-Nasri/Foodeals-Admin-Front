import api from '@/api/Auth'
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
        return { data: demoData, status: response.status } // TODO: replace demoData with response.data
    } catch (error) {
        console.error(error)
        return { data: demoData, status: 200 } // TODO: replace demoData with response.data
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

export const demoData: ProductSchemaType = {
    title: 'Demo Product',
    description: 'This is a demo product',
    marque: 'Demo Marque',
    subCategories: 'Demo Subcategory',
    categories: 'Demo Category',
    avatar: 'https://img.freepik.com/free-photo/foundation-with-dark-background_23-2148978146.jpg?t=st=1730482023~exp=1730485623~hmac=bbc9a6cf6637648c68bc930b30f33ea02ea5adccfc84daa95fcb121a5c016c63&w=1060',
    codeBar: '1234567890',
}

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {Text} from '@chakra-ui/react'



const ProductDetails = ({product}) => {
    if(product){
        return (
            <div className="t-product-details" itemScope itemType="http://schema.org/">
                <Text>This is the product: {product.name}</Text>
                {product && (
                    <Helmet>
                        <title>{product.name}</title>
                        <meta name="description" content={product.name} />
                    </Helmet>
                )}
            </div>
        )
    }
}
ProductDetails.getTemplateName = () => 'product-details'
ProductDetails.shouldGetProps = async ({previousParams, params}) => {
   return !previousParams || previousParams.productId !== params.productId
}
ProductDetails.getProps = async ({params, api}) => {
   await api.auth.login()
   const product = await api.shopperProducts.getProduct({
   parameters: {id: params.productId, allImages: true}
   })
   return {
   product: product
   }
}
ProductDetails.propTypes = {
    product: PropTypes.object,
    errorMessage: PropTypes.string,
    params: PropTypes.object,
    trackPageLoad: PropTypes.func
}
export default ProductDetails

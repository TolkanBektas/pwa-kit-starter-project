import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {Text} from '@chakra-ui/react'
import {pluckIds} from '../../utils/utils'
import {Tooltip} from '@chakra-ui/react'


const ProductDetails = ({product , promotions}) => {
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
                <Text>These are the promotions (if any):</Text>
                    {promotions && promotions.map(({id, calloutMsg, details}) => (
                    <Tooltip key={id} label={details} >
                        <Text>{calloutMsg}</Text>
                    </Tooltip>
                ))}
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

    const promotionIds = pluckIds(product.productPromotions, 'promotionId')
    // Get the promotions for the product
    const promotions = await api.shopperPromotions.getPromotions({
        parameters: {ids: promotionIds}
    })

    return {
        product: product,
        promotions: promotions.data
    }
}

ProductDetails.propTypes = {
    product: PropTypes.object,
    promotions: PropTypes.array,
    errorMessage: PropTypes.string,
    params: PropTypes.object,
    trackPageLoad: PropTypes.func
}

export default ProductDetails

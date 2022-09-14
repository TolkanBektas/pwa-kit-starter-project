import React , {useState}  from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {pluckIds} from '../../utils/utils'
import {Tooltip, Spinner, Text} from '@chakra-ui/react'
import {useCommerceAPI} from '../../commerce-api/utils'


const ProductDetails = ({product , promotions}) => {
    if(product){
        const api = useCommerceAPI()
        const [promotionMap, setPromotionMap] = useState({})
        const {productPromotions} = product

        const handleHover = (id) => {
        // Don't make a network request if you already loaded this data.
            if (promotionMap[id]) {
                return
            }
            const getPromotion = async (id) => {
                const promotions = await api.shopperPromotions.getPromotions({
                    parameters: {ids: id}
                })
                setPromotionMap({...promotionMap, [id]: promotions.data[0]})
            }
            getPromotion(id)
        }

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
                { productPromotions && productPromotions.map(({promotionId, calloutMsg}) => (
                    <Tooltip onOpen={() => { handleHover(promotionId)}} key={promotionId} label={ (promotionMap[promotionId] && promotionMap[promotionId] )} aria-label="Promotion details">
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

    // const promotionIds = pluckIds(product.productPromotions, 'promotionId')
    // // Get the promotions for the product
    // const promotions = await api.shopperPromotions.getPromotions({
    //     parameters: {ids: promotionIds}
    // })

    return {
        product: product
        // ,
        // promotions: promotions.data
    }
}

ProductDetails.propTypes = {
    product: PropTypes.object,
    // promotions: PropTypes.array,
    errorMessage: PropTypes.string,
    params: PropTypes.object,
    trackPageLoad: PropTypes.func
}

export default ProductDetails

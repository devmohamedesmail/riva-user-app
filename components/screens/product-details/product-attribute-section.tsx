import React from 'react'
import { View } from 'react-native'
import ProductSectionHeader from './product-section-header'
import ProductAttributeChip from './product-attribute-chip'
import { Attribute, AttributeValue } from '@/@types/stores'


// interface AttributeValue {
//     id?: number
//     value: string
//     price: number
// }

// interface Attribute {
//     id: number
//     name: string
//     values: AttributeValue[]
// }
export default function ProductAttributeSection({
    attributes,
    selectedAttribute,
    onSelectAttribute,
}: {
    attributes: Attribute[]
    selectedAttribute: { name: string; value: string; price: number } | null
    onSelectAttribute: (attr: { name: string; value: string; price: number }) => void
}) {
    return (
        <>
            {attributes.map((attribute) => (
                <View key={attribute.id} className="mb-2">

                    <ProductSectionHeader title={attribute.name} icon="tune" />
                    <View className="flex-row flex-wrap px-4">
                        {attribute.values.map((val, idx) => (
                            <ProductAttributeChip
                                key={idx}
                                attrValue={val}
                                attribute={attribute}
                                isSelected={selectedAttribute?.value === val.value}
                                onSelect={onSelectAttribute}
                            />
                        ))}
                    </View>
                </View>
            ))}
        </>
    )
}

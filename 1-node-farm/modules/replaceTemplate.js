module.exports = (template, product) => {
    let output = template.replace(/{% product_name %}/g, product.productName);// product_name is global
    output = output.replace(/{% prod_img %}/g, product.image);
    output = output.replace(/{% prod_price %}/g, product.price);
    output = output.replace(/{% prod_from %}/g, product.from);
    output = output.replace(/{% product_nutrient_name %}/g, product.nutrients);
    output = output.replace(/{% prod_qty %}/g, product.quantity);
    output = output.replace(/{% prod_description %}/g, product.description);
    output = output.replace(/{% prod_id %}/g, product.id);

    if (!product.organic) output = output.replace(/{% not_organic %}/g, "not-organic")

    
    return output;
}
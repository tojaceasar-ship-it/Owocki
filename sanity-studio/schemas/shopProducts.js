import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'shopProduct',
  title: 'Shop Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the product',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the product',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the product in the default currency',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Product images',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Product category (e.g., T-shirts, Hoodies, Accessories)',
    }),
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', type: 'string', title: 'Size' },
            { name: 'color', type: 'string', title: 'Color' },
            { name: 'stock', type: 'number', title: 'Stock Quantity', initialValue: 0 },
          ],
        },
      ],
      description: 'Product variants for size and color',
    }),
    defineField({
      name: 'printfulId',
      title: 'Printful ID',
      type: 'string',
      description: 'ID linking to Printful API for order fulfillment',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'out of stock', 'limited'],
      },
      description: 'Current status of the product',
    }),
  ],
});

import { type SchemaTypeDefinition } from 'sanity'
import guests from './guests'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [guests],
}


import { type SchemaTypeDefinition } from 'sanity'
import guests from './guests'
import content from './content'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [guests, content],
}


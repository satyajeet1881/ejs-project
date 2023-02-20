import { isNil } from 'lodash'
import { QueryFilter } from '../../typings'
/**
 * pagination
 *
 * @export
 * @param {Filter<any>} filter
 * @returns {Filter<any>}
 */
export function paginate (filter: any = {}): QueryFilter {
  const limit = !isNil(filter.limit) ? Number(filter.limit) : 100
  const skip = !isNil(filter.skip) ? Number(filter.skip) : 0
  return { limit, skip }
}

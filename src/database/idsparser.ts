/**
 * knex wants lists for IN comparions to be lists of strings
 * Process the ANY inputs of the Express Request objects in to lists of strings 
 * @param inputs 
 * @returns string[]
 */
export const idsParser = (inputs: any): string[] => ((inputs) || []).map((a: any) => a.toString()) 
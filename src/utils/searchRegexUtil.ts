export const sanitize = (expression: string) : string =>
    expression.replace(/[*-\[\]{}()+?.,^$|#\s\\]/g, '').toLowerCase();

export const createSearchRegex = (highlight: string) : RegExp => new RegExp(`(${highlight})`, 'ig');
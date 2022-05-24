export const sanitize = (expression: string) : string =>
    expression.trim().replace(/[*\-[\]{}()+?.,^$|#\\]/g, '').toLowerCase();

export const createSearchRegex = (highlight: string) : RegExp => new RegExp(`(${highlight})`, 'ig');
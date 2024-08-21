export const red = '#b71c1c'
export const green = '#008550'
export const pink = '#f55196'
export const yellow = '#f2cc8f'
export const blue = '#57c9e8'
export const darkBlue = '#15305B'
export const purple = '#7F7CAF'
export const darkPurple = '#3e3e74'

export const primaryColor = '#000000'
export const primaryFontColor = '#000000'

export const colorPalette = [ '#008550', '#57c9e8', '#7F7CAF', '#f55196', '#f2cc8f' ]

export const gradientStart = [ '#7F7CAF' ]
export const gradientEnd = [ '#57c9e8' ]

// get the suffix for a number
export function nth( n ) {
    var s = [ "th", "st", "nd", "rd" ],
        v = n % 100;
    return ( s[ ( v - 20 ) % 10 ] || s[ v ] || s[ 0 ] );
}
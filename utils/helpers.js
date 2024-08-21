// format a number to add commas if it's 1000 or more
export const formatCurrency = ( number ) => {
    if ( typeof number === 'number' ) {
        if ( number === 0 ) return '$0';
        // if number if negative, remove the negative sign
        if ( number < 0 ) {
            number = number * -1;
            return '-$' + number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," );
        }
        return '$' + number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," );
    }
}

// format a date whose format is 2021-01-04 to mm/dd/yyyy
export const formatDate = ( date ) => {
    if ( date ) {
        const dateArray = date.split( '-' );
        const year = dateArray[ 0 ];
        const month = dateArray[ 1 ];
        const day = dateArray[ 2 ];
        return month + '/' + day + '/' + year;
    }
}
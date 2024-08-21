// fetch strain suggestions from supabase
export async function fetchSuggestions() {
    const {
        data
    } = await supabase
        .from( 'strains' )
        .select()
        .ilike( 'name', `%${ strainName.value }%` )
        .limit( 50 )
    if ( data ) {
        let strainSuggestions = data
        strainSuggestions = data.map( ( strain ) => {
            return {
                name: strain.name ?? '',
                id: strain.id,
                subtitle: strain.subtitle,
                category: strain.category,
                image_url: strain.image_url,
                display_name: `${ strain.name } (${ strain.category })`,
            }
        } )
        return strainSuggestions
    }
}
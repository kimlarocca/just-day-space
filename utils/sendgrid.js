export async function requestNewStrain( strainName, strainCategory, userEmail ) {
    let msg = {
        personalizations: [ {
            to: [ {
                email: 'frontdesk@cuetip.com',
                name: 'Cuetip Benchmark App',
            }, ],
        }, ],
        from: {
            email: 'noreply@cuetip.com',
            name: 'Cuetip Benchmark App',
        },
        subject: 'New Strain Request',
        content: [ {
                type: 'text/plain',
                value: 'New Strain Request! User Email: ' + userEmail + ' Strain Name: ' + strainName + ' Category: ' + strainCategory + '',
            },
            {
                type: 'text/html',
                value: `<h1>New Strain Request!</h1><p>User Email: ${userEmail}</p><p>Strain Name: ${strainName}</p><p>Category: ${strainCategory}</p>`,
            },
        ],
    }
    const {
        data
    } = await useFetch( '/api/sendgrid', {
        method: 'POST',
        body: msg,
    } )
}
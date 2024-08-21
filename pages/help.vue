<template>
  <div class="hemp">
    <Html lang="en">
      <Head>
        <Title>Cuetip Benchmark | Help Center</Title>
      </Head>
    </Html>
    <h2 class="mb-4">Help Center</h2>
    <div class="container-white p-4 mb-4">
      <p>
        Welcome to the Cuetip Benchmark Help Center! Here you can find how-to
        videos and answers to common questions about the Cuetip Benchmark app.
        If you can't find the answer to your question, please contact us at
        <a href="mailto:help@cuetip.com">help@cuetip.com</a> or click on the
        "help" button on the lower right corner of your screen.
      </p>
    </div>
    <div class="container">
      <Accordion>
        <AccordionTab header="Onboarding Onto The Cuetip Benchmark App">
          <iframe
            class="mb-4"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/hvq02tnvLlg?si=KiFjZGdreG9u9noc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p>
            In this video, we'll guide you through the steps to set up your
            account. You'll select your role, provide some information about
            yourself, and add a project to your profile. Please watch the video
            to familiarize yourself with the onboarding process.
          </p>
        </AccordionTab>
        <AccordionTab header="Adding Strains to Your Cuetip Benchmark Profile">
          <iframe
            class="mb-4"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/EZuougyzsNo?si=8zQ4q1e4pnlUmEbp"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p>
            In this video, we will show you how to add strains to your Cuetip
            Benchmark profile. From the My Strains page, we will guide you
            through the process of searching for a strain, selecting a project
            and growing method, and adding it to your profile. You can add as
            many strains as you like and delete them if needed.
          </p>
        </AccordionTab>
        <AccordionTab
          header="Entering Your Weekly Pricing in the Cuetip Benchmark App"
        >
          <iframe
            class="mb-4"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/QpT35C6aPWw?si=H0QdPnL-biNk-1NI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p>
            In this video, we will guide you on how to enter your weekly pricing
            into your Cuetip Benchmark app. We will show you step-by-step
            instructions on how to navigate to the weekly pricing section, enter
            the price per pound for each strain, and confirm your entries.
            Please watch the video to ensure you are entering your weekly
            pricing correctly.
          </p>
        </AccordionTab>
        <AccordionTab
          header="Viewing Your Pricing History in the Cuetip Benchmark App"
        >
          <iframe
            class="mb-4"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/57GtEa-xti4?si=LaNmsYAtimcT_8lU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p>
            In this video, we will show you how to view your weekly pricing
            history in your Cuetip Benchmark app. You can also view the weekly
            average price for our users, as well as the variance between your
            price and the average price.
          </p>
        </AccordionTab>
        <AccordionTab
          header="Walkthrough of Cuetip Benchmark's Cannabis Dashboard"
        >
          <iframe
            class="mb-4"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/V6FZigLC6rA?si=czc-WkCbPIGTbeeS"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p>
            In this video, we will show you how to navigate the Cuetip Benchmark
            Cannabis Dashboard and interpret the data. We will explore the
            weekly price comparison, the all-time price performance, submissions
            by lineage and growing method, and the yearly average prices for
            Sativa and Indica. Please watch the video to gain insights and make
            informed decisions on how to price your cannabis.
          </p>
        </AccordionTab>
        <AccordionTab
          header="Updating Your Profile in the Cuetip Benchmark App"
        >
          <iframe
            class="mb-4"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Zb69a3VsgHc?si=BK02Cxf1c7s8GiWd"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p>
            In this video, we will guide you through the process of updating
            your profile in Cuetip Benchmark's app. We will show you how to add
            or delete a photo, update your user type, and make changes to your
            name, phone number, number of workers, and projects. Follow along to
            ensure your profile is up to date.
          </p>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
definePageMeta( {
  middleware: 'auth',
} )

const currentUser = useSupabaseUser()
const loading = ref( true )
const supabase = useSupabaseClient()
const pricingData = ref( null )

async function getGrowingMethodAverage ( start, category ) {
  // set endDate as the start date plus 7 days
  const endDate = new Date( start )
  endDate.setDate( endDate.getDate() + 7 )
  const data = await supabase.rpc( 'get_average_prices_by_growing_method', {
    start_date: start,
    end_date: endDate,
    growing_method_name: category
  } )
  return data?.data
}

onMounted( async () => {
  // get the pricing history data for the logged in user
  let { data } = await supabase
    .from( 'pricing' )
    .select( '*' )
    .eq( 'user_id', currentUser.value.id )
    .order( 'created_at', { ascending: false } )
  if ( data ) {
    pricingData.value = data
    // for each item in pricingData, get the average price for the growing method
    for ( let i = 0; i < pricingData.value.length; i++ ) {
      pricingData.value[ i ].average = await getGrowingMethodAverage(
        pricingData.value[ i ].created_at,
        pricingData.value[ i ].growing_method
      )
    }
  }
  loading.value = false
} )
</script>
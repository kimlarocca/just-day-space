// import all the primevue components you need here

import {
    defineNuxtPlugin
} from "#app"
import PrimeVue from "primevue/config"

import Accordion from "primevue/accordion"
import AccordionTab from "primevue/accordiontab"
import Avatar from "primevue/avatar"
import AutoComplete from "primevue/autocomplete"
import Button from "primevue/button"
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import InlineMessage from 'primevue/inlinemessage';
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import Message from "primevue/message"
import Password from 'primevue/password';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import Sidebar from 'primevue/sidebar';
import Tooltip from 'primevue/tooltip'
import Textarea from 'primevue/textarea'

export default defineNuxtPlugin( ( nuxtApp ) => {
    nuxtApp.vueApp.use( PrimeVue, {
        ripple: true
    } )
    nuxtApp.vueApp.component( 'Accordion', Accordion )
    nuxtApp.vueApp.component( 'AccordionTab', AccordionTab )
    nuxtApp.vueApp.component( 'Avatar', Avatar )
    nuxtApp.vueApp.component( 'AutoComplete', AutoComplete )
    nuxtApp.vueApp.component( 'Button', Button )
    nuxtApp.vueApp.component( 'Calendar', Calendar )
    nuxtApp.vueApp.component( 'Checkbox', Checkbox )
    nuxtApp.vueApp.component( 'Dialog', Dialog )
    nuxtApp.vueApp.component( 'Divider', Divider )
    nuxtApp.vueApp.component( 'Dropdown', Dropdown )
    nuxtApp.vueApp.component( 'FileUpload', FileUpload )
    nuxtApp.vueApp.component( 'InlineMessage', InlineMessage )
    nuxtApp.vueApp.component( 'InputSwitch', InputSwitch )
    nuxtApp.vueApp.component( 'InputText', InputText )
    nuxtApp.vueApp.component( 'InputMask', InputMask )
    nuxtApp.vueApp.component( 'InputNumber', InputNumber )
    nuxtApp.vueApp.component( 'Message', Message )
    nuxtApp.vueApp.component( 'Password', Password )
    nuxtApp.vueApp.component( 'ProgressBar', ProgressBar )
    nuxtApp.vueApp.component( 'ProgressSpinner', ProgressSpinner )
    nuxtApp.vueApp.component( 'Sidebar', Sidebar )
    nuxtApp.vueApp.component( 'Textarea', Textarea )
    nuxtApp.vueApp.component( 'Tooltip', Tooltip )
    nuxtApp.vueApp.directive( 'tooltip', Tooltip )
} )
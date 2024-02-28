import moment from "moment"

export const url = window.location.origin.replace("3000", "5000")

export const apiUrl = `${url}/api`
export const serviceUrl = `${url}/service`

export const days = [
    { value: "01", name: "Monday", slug: "Mon" },
    { value: "02", name: "Tuesday", slug: "Tue" },
    { value: "03", name: "Wednesday", slug: "Wed" },
    { value: "04", name: "Thursday", slug: "Thu" },
    { value: "05", name: "Friday", slug: "Fri" },
    { value: "06", name: "Saturday", slug: "Sat" },
    { value: "07", name: "Sunday", slug: "Sun" },
  ]
  export const months = [
    { value: "01", name: "January", slug: "Jan" },
    { value: "02", name: "February", slug: "Feb" },
    { value: "03", name: "March", slug: "Mar" },
    { value: "04", name: "April", slug: "Apr" },
    { value: "05", name: "May", slug: "May" },
    { value: "06", name: "June", slug: "Jun" },
    { value: "07", name: "July", slug: "Jul" },
    { value: "08", name: "August", slug: "Aug" },
    { value: "09", name: "September", slug: "Sep" },
    { value: "10", name: "October", slug: "Oct" },
    { value: "11", name: "November", slug: "Nov" },
    { value: "12", name: "December", slug: "Dec" },
  ]
  export const years = new Array(5).fill(null).map((_, index) => moment().subtract(index, 'years').year())

export const isProduct = (type) => type === "product"

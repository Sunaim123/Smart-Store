import React from "react"
import Content from "../components/Content"
import ContactForm from "../components/ContactForm"
import Header from "../components/Navbar.jsx"


function Contact() {

    const ContactPageContent = {
      title: 'Contact Us',
      introduction: 'We\'d love to hear from you! If you have any questions, feedback, or suggestions, our dedicated support team is ready to assist you. Feel free to reach out at support@compare.com, and we\'ll be delighted to help.',
      vision: 'Thank you for choosing us as your shopping partner. Get ready to shop smart, save more, and experience the joy of seamless shopping with us.',
      title3: 'Happy shopping!'
    }
    
    return (
      <>
      <Header />
      
        <Content {...ContactPageContent}/>
        
        <ContactForm/>
      </>
    )
  }
  export default Contact
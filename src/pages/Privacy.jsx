import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Header from "../components/Navbar.jsx"

function Privacy() {
  return (
    <>
      <Header/>
      <section style={{ paddingTop: "50px", paddingBottom: "50px" }}>
        <Container fluid="lg">
          <h3 className="head-h1 fw-bold gradient-color mb-md-2 mb-6 about-title-heading">
            Privacy & Policy
          </h3>
          <Row className="align-items-center">
            <Col md={12} className="mb-4 mb-md-0">
              <p>
                Thank you for choosing us as your trusted shopping companion.
                This Privacy Policy outlines how we collect, use, disclose, and
                protect your personal information when you access and use our
                web-based platform and services. By using All In one Shoppign
                Solution, you consent to the practices described in this Privacy
                Policy.
              </p>
              <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 about-title-heading">
                Information We Collect
              </h3>
              <p>
                We may collect certain personal information from you when you
                interact with our platform. The types of information we collect
                may include, but are not limited to:
              </p>

              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Personal Identifiers:
                </span>{" "}
                Your name, email address, contact information, and other
                identifiers that allow us to communicate with you and provide
                personalized services.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Shopping Preferences:
                </span>{" "}
                Information about your shopping preferences and habits,
                including past purchases and product preferences, to offer you
                tailored recommendations.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Device and Usage Information:
                </span>{" "}
                Information about the device you use to access our platform,
                such as IP address, browser type, operating system, and usage
                patterns, to improve the performance and functionality of our
                services.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Payment Information:
                </span>{" "}
                In the case of purchases made through our platform, we may
                collect and process payment information necessary to complete
                the transaction securely.
              </p>
              <div>
                <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 about-title-heading">
                  How We Use Your Information
                </h3>
                <p>
                  We use the information we collect for various purposes,
                  including but not limited to:
                </p>
                <p className="privacy-personal-identifier">
                  <span className="fw-bold gradient-color ">
                    Improving User Experience:
                  </span>{" "}
                  To enhance and personalize your experience on our platform,
                  making it more efficient, relevant, and user-friendly.
                </p>
                <p className="privacy-personal-identifier">
                  <span className="fw-bold gradient-color ">
                    Providing Recommendations:
                  </span>{" "}
                  To offer personalized product recommendations based on your
                  preferences and shopping history.
                </p>
                <p className="privacy-personal-identifier">
                  <span className="fw-bold gradient-color ">
                    Process Transactions:
                  </span>{" "}
                  To process your purchases and transactions securely and
                  efficiently.
                </p>
                <p className="privacy-personal-identifier">
                  <span className="fw-bold gradient-color ">
                    Communication:
                  </span>{" "}
                  To communicate with you regarding updates, new features,
                  promotional offers, and other important information related to
                  All In One Shopping Solution.
                </p>
                <p className="privacy-personal-identifier">
                  <span className="fw-bold gradient-color ">
                    Analytics and Research:
                  </span>{" "}
                  To analyze user trends, preferences, and behavior in order to
                  improve our services and make data-driven decisions.
                </p>
              </div>
              <div>
                {" "}
                <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 about-title-heading">
                  Data Security and Protection
                </h3>
                <p>
                  We take data security and protection seriously. We employ
                  industry-standard security measures to safeguard your personal
                  information from unauthorized access, disclosure, alteration,
                  or destruction. However, it is essential to note that no
                  method of data transmission over the internet or electronic
                  storage is entirely secure, and we cannot guarantee absolute
                  security.
                </p>
              </div>
              <div>
                <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 about-title-heading">
                  Disclosure of Information
                </h3>
                <p>
                  We do not sell, trade, or rent your personal information to
                  third parties for marketing purposes. We may share your
                  information with trusted service providers and partners who
                  assist us in delivering our services. These third parties are
                  required to maintain the confidentiality of your information
                  and are prohibited from using it for any other purpose.
                </p>
              </div>
              <div>
                <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 about-title-heading">
                  Third-Party Links
                </h3>
                <p>
                  Our platform may contain links to third-party websites or
                  services that are not under our control. We are not
                  responsible for the privacy practices or content of these
                  third-party sites. We recommend reviewing the privacy policies
                  of any third-party sites you visit.
                </p>
              </div>
              <div>
                <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 about-title-heading">
                  Changes to This Privacy Policy
                </h3>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will post
                  the revised Privacy Policy on our platform with the "Last
                  Updated" date. Your continued use of All In One Shopping
                  Solution after any modifications to this Privacy Policy
                  signifies your acceptance of the changes.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
export default Privacy

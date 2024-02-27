import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Header from "../components/Navbar.jsx"

function Faq() {
  return (
    <>
    <Header />
    <section style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <Container fluid="lg">
        <h3  className="head-h2 fw-bold gradient-color mb-md-2 mb-6 about-title-heading">
          Frequently Asked Questions (FAQ) - All In One Shopping Solution
        </h3>
        <Row className="align-items-center">
          <Col md={12} className="mb-4 mb-md-0">
            <div>
              {" "}
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-6 mt-4 ">
                1. What is All In One Shopping Solution?
              </h3>
              <p className="mb-4">
                All In One Shopping Solution is a comprehensive web-based
                platform that offers a one-stop solution for analyzing and
                comparing product prices in the healthcare and grocery markets.
                It collaborates with popular portals to provide users with the
                best deals.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-6 ">
                2. How does All In One Shopping Solution work?
              </h3>
              <p className="privacy-personal-identifier">
                All In One Shopping Solution utilizes sophisticated algorithms
                to analyze and compare product prices from various online
                portals. By examining factors such as price and availability,
                the platform identifies the most optimal products and offers
                tailored recommendations to users.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-6 ">
                3. What benefits does All In One Shopping Solution offer?
              </h3>
              <p className="privacy-personal-identifier">
                All In One Shopping Solution simplifies the shopping process by
                helping users find the best products at the most favorable
                prices. Additionally, users are rewarded with points for every
                purchase, which can be redeemed for future discounts, making
                their shopping experience even more rewarding.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-6 ">
                4. Is All In One Shopping Solution limited to specific product
                categories?
              </h3>
              <p className="privacy-personal-identifier">
                No, All In One Shopping Solution caters to wide range of
                products. It covers a wide array of items within these
                categories, allowing users to conveniently compare prices across
                different types of products.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-4 ">
                5. How reliable are the product recommendations on All In One
                Shopping Solution?
              </h3>
              <p className="privacy-personal-identifier">
                The product recommendations on All In One Shopping Solution are
                backed by accurate and up-to-date data from reputable online
                portals. The platform prioritizes delivering reliable
                suggestions to assist users in making informed purchase
                decisions.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-4 ">
                6. Are there any fees for using All In One Shopping Solution?
              </h3>
              <p className="privacy-personal-identifier">
                All In One Shopping Solution is entirely free to use. There are
                no hidden charges or subscription fees, ensuring that users can
                access its services without any financial burden.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-4 ">
                7. How can users earn and redeem reward points on All In One
                Shopping Solution?*
              </h3>
              <p className="privacy-personal-identifier">
                Users can earn reward points for every purchase they make
                through All In One Shopping Solution. Accumulated points can be
                redeemed to avail discounts on subsequent purchases, providing
                users with significant savings.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-4 ">
                8. How does All In One Shopping Solution prioritize user data
                security?
              </h3>
              <p className="privacy-personal-identifier">
                At All In One Shopping Solution, user data security is a top
                priority. Stringent measures are in place to protect personal
                information, and the platform follows industry best practices to
                ensure user privacy.
              </p>
            </div>
            <div>
              <h3 className="head-h5 fw-bold gradient-color mb-md-2 mb-4 ">
                9. Is All In One Shopping Solution available in multiple
                languages?
              </h3>
              <p className="privacy-personal-identifier">
                As of now, All In One Shopping Solution supports English as for
                now. The platform is actively working on expanding language
                options to cater to a broader user base.
              </p>

            </div>
            <div className="mt-5 fw-bold gradient-color head-h4 ">
            Please keep in mind that the information provided in this FAQ is subject to updates and changes on the platform, and users are encouraged to check for any new developments or announcements.
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}
export default Faq

import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Header from "../components/Navbar.jsx"

const TermsCondition = () => {
  return (
    <>
    <Header/>
    <section style={{ paddingTop: "50px", paddingBottom: "50px" }}>
      <Container fluid="lg">
        <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-6 about-title-heading">
          TERMS & CONDITIONS
        </h3>
        <Row className="align-items-center">
          <Col md={12} className="mb-4 mb-md-0">
            <p>
              Welcome to All In One Shopping Solution! Before using our
              web-based platform and services, we kindly request you to read and
              understand the following Terms and Conditions ("Terms"). By
              accessing or using [Platform Name], you agree to be bound by these
              Terms, as well as our Privacy Policy. If you do not agree with any
              part of these Terms, please refrain from using our platform.
            </p>
            <div>
              {" "}
              <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 ">
                Use of the Platform
              </h3>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">Eligibility:</span>{" "}
                You must be at least 18 years old and capable of forming a
                legally binding agreement to use All In One Shopping Solution.
                If you are accessing our platform on behalf of a company or
                organization, you represent that you have the authority to bind
                that entity to these Terms.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Account Creation:
                </span>{" "}
                To access certain features of our platform, you may need to
                create a user account. You are solely responsible for
                maintaining the confidentiality of your account credentials, and
                you agree not to share your login details with others.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Prohibited Activities:
                </span>{" "}
                You agree not to use All In One Shopping Solution for any
                unlawful, fraudulent, or unauthorized purposes. You also agree
                not to engage in any activity that could harm our platform,
                compromise its security, or interfere with the experience of
                other users.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Prohibited Activities:
                </span>{" "}
                You agree not to use All In One Shopping Solution for any
                unlawful, fraudulent, or unauthorized purposes. You also agree
                not to engage in any activity that could harm our platform,
                compromise its security, or interfere with the experience of
                other users.
              </p>
            </div>
            <div>
              <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 ">
                Intellectual Property
              </h3>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">Ownership:</span> All
                content and materials available on All In One Shopping Solution,
                including but not limited to logos, text, graphics, images,
                software, and other intellectual property, are the exclusive
                property of our company or its licensors.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Limited License:
                </span>{" "}
                You are granted a limited, non-exclusive, non-transferable
                license to access and use All In One Shopping Solution for
                personal, non-commercial purposes. You may not modify,
                distribute, reproduce, or exploit any part of the platform
                without our express written permission.
              </p>
            </div>
            <div>
              <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 ">
                Disclaimer of Warranties
              </h3>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">As-Is Basis</span> All
                In one SHopping Solution is provided on an "as-is" and "as
                available" basis. We make no warranties or representations,
                express or implied, regarding the accuracy, reliability, or
                suitability of the platform for your specific needs. s.
              </p>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Third-Party Content
                </span>{" "}
                Our platform may include content provided by third parties,
                including product prices and availability. We do not endorse or
                guarantee the accuracy or reliability of such content.
              </p>
            </div>
            <div>
              <h3 className="head-h2 fw-bold gradient-color mb-md-2 mb-4 ">
                Limitation of Liability
              </h3>
              <p className="privacy-personal-identifier">
                <span className="fw-bold gradient-color ">
                  Maximum Liability
                </span>{" "}
                Our total liability to you for any claim arising out of or
                relating to All In One Shopping Solution or these Terms shall
                not exceed the amount you have paid (if any) to us in the last
                three months. s.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default TermsCondition
